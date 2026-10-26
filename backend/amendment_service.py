"""
ReguLens - Regulatory Amendment Document & Text Extraction Service
Handles Feature 1 & 2:
- Copy-paste email / notification parsing with metadata heuristic extraction & noise separation.
- Document extraction for PDF, DOCX, TXT, and EML formats.
- Untrusted input sanitization, file-size limits, scanned PDF detection, and OCR warnings.
"""

import re
import io
import zipfile
import email
from email import policy
import xml.etree.ElementTree as ET
from typing import Dict, Any, Optional, List, Tuple
from pypdf import PdfReader


MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB limit


def sanitize_text(text: str) -> str:
    """Sanitizes untrusted input, removing control characters while preserving formatting."""
    if not text:
        return ""
    # Strip null bytes and non-printable control chars except \n, \r, \t
    sanitized = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    return sanitized.strip()


def separate_email_noise(raw_text: str) -> Dict[str, Any]:
    """
    Separates email metadata, forwarding headers, disclaimers, and signatures
    from the actual statutory amendment text without silently deleting potential legal content.
    """
    lines = raw_text.splitlines()
    clean_lines: List[str] = []
    email_headers: Dict[str, str] = {}
    signatures: List[str] = []
    disclaimers: List[str] = []

    in_signature = False
    in_disclaimer = False

    # Regex patterns for email header recognition
    from_pattern = re.compile(r'^(?:From|Sender):\s*(.+)', re.IGNORECASE)
    to_pattern = re.compile(r'^(?:To|Recipient):\s*(.+)', re.IGNORECASE)
    subject_pattern = re.compile(r'^(?:Subject):\s*(.+)', re.IGNORECASE)
    date_pattern = re.compile(r'^(?:Date|Sent):\s*(.+)', re.IGNORECASE)
    forward_pattern = re.compile(r'^-{3,}\s*(?:Forwarded message|Original Message)\s*-{3,}', re.IGNORECASE)

    # Disclaimers / Sign-off triggers
    sig_triggers = re.compile(r'^(?:Thanks & Regards|Regards|Best Regards|Warm Regards|Sincerely|Yours truly|Cheers)[\s,]*$', re.IGNORECASE)
    disclaimer_triggers = re.compile(r'(?:confidentiality notice|this email and any files transmitted|disclaimer:|strictly confidential|privileged/confidential)', re.IGNORECASE)

    for line in lines:
        stripped = line.strip()

        # Check for forwarded header divider
        if forward_pattern.search(stripped):
            continue

        # Check for top-level email headers
        m_from = from_pattern.match(stripped)
        if m_from:
            email_headers['from'] = m_from.group(1).strip()
            continue
        m_subject = subject_pattern.match(stripped)
        if m_subject:
            email_headers['subject'] = m_subject.group(1).strip()
            continue
        m_date = date_pattern.match(stripped)
        if m_date:
            email_headers['date'] = m_date.group(1).strip()
            continue
        m_to = to_pattern.match(stripped)
        if m_to:
            email_headers['to'] = m_to.group(1).strip()
            continue

        # Check for signature block
        if sig_triggers.match(stripped):
            in_signature = True
            signatures.append(line)
            continue
        if in_signature:
            signatures.append(line)
            continue

        # Check for disclaimer block
        if disclaimer_triggers.search(stripped):
            in_disclaimer = True
            disclaimers.append(line)
            continue
        if in_disclaimer:
            disclaimers.append(line)
            continue

        clean_lines.append(line)

    amendment_body = "\n".join(clean_lines).strip()
    # If stripping was overly aggressive and left nothing, fallback to raw text to avoid silent loss
    if not amendment_body and raw_text.strip():
        amendment_body = raw_text.strip()
        signatures = []
        disclaimers = []

    return {
        "amendment_text": amendment_body,
        "email_metadata": email_headers,
        "signatures": "\n".join(signatures).strip() if signatures else None,
        "disclaimers": "\n".join(disclaimers).strip() if disclaimers else None,
        "separated_noise_detected": bool(email_headers or signatures or disclaimers)
    }


def extract_metadata_heuristics(text: str, email_meta: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
    """
    Extracts available statutory metadata (Notification number, authority, dates, URLs)
    using deterministic legal pattern matching. Never fabricates missing values.
    """
    title = ""
    authority = ""
    notification_number = ""
    publication_date = ""
    effective_date = ""
    official_url = ""
    missing_fields: List[str] = []

    # 1. Authority extraction heuristics
    auth_patterns = [
        (r'\b(?:CBIC|Central Board of Indirect Taxes and Customs|GST Council)\b', 'CBIC / GST Council'),
        (r'\b(?:Ministry of Corporate Affairs|MCA)\b', 'Ministry of Corporate Affairs'),
        (r'\b(?:Reserve Bank of India|RBI)\b', 'Reserve Bank of India'),
        (r'\b(?:Ministry of Labour and Employment|Labour Department|Labour Ministry)\b', 'Ministry of Labour & Employment'),
        (r'\b(?:Ministry of Micro, Small and Medium Enterprises|MSME Ministry)\b', 'Ministry of MSME'),
        (r'\b(?:Securities and Exchange Board of India|SEBI)\b', 'SEBI'),
        (r'\b(?:Directorate General of Foreign Trade|DGFT)\b', 'DGFT')
    ]
    for pattern, name in auth_patterns:
        if re.search(pattern, text, re.IGNORECASE):
            authority = name
            break

    # 2. Notification / Circular number extraction
    notif_match = re.search(
        r'(?:Notification\s+No\.?\s*([0-9]+/[0-9]+(?:-[A-Za-z\s]+)?)|G\.S\.R\.?\s*([0-9]+(?:\([A-Za-z0-9]+\))?)|Circular\s+No\.?\s*([0-9]+/[0-9]+/[0-9]+-[A-Za-z]+)|Order\s+No\.?\s*([0-9]+/[0-9]+))',
        text,
        re.IGNORECASE
    )
    if notif_match:
        notification_number = notif_match.group(0).strip()

    # 3. Publication Date extraction
    pub_match = re.search(
        r'(?:published\s+on|dated\s+|date\s*:\s*|New Delhi,\s+the\s+)(\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+,?\s+\d{4}|\d{1,2}[-/\.]\d{1,2}[-/\.]\d{4})',
        text,
        re.IGNORECASE
    )
    if pub_match:
        publication_date = pub_match.group(1).strip()
    elif email_meta and email_meta.get('date'):
        publication_date = email_meta['date']

    # 4. Effective Date extraction
    eff_match = re.search(
        r'(?:shall\s+come\s+into\s+force\s+(?:on|with\s+effect\s+from)|effective\s+(?:from|date\s*:?)|with\s+effect\s+from\s+the)\s+(\d{1,2}(?:st|nd|rd|th)?\s+(?:day\s+of\s+)?[A-Za-z]+,?\s+\d{4}|\d{1,2}[-/\.]\d{1,2}[-/\.]\d{4})',
        text,
        re.IGNORECASE
    )
    if eff_match:
        effective_date = eff_match.group(1).strip()

    # 5. Source URL extraction
    url_match = re.search(r'https?://[a-zA-Z0-9\.\-_/]+(?:\.gov\.in|\.nic\.in|[a-zA-Z0-9\.\-_/]+)', text)
    if url_match:
        official_url = url_match.group(0).strip()

    # 6. Title extraction
    # Try finding subject from email or first prominent line
    if email_meta and email_meta.get('subject'):
        title = email_meta['subject'].replace('Fwd:', '').replace('FW:', '').strip()
    else:
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        for line in lines[:6]:
            if len(line) > 10 and len(line) < 120 and not line.lower().startswith(('from:', 'to:', 'date:')):
                title = line
                break
        if not title and notification_number:
            title = f"Statutory Amendment: {notification_number}"

    # Track missing fields
    if not title:
        missing_fields.append("Amendment Title")
        title = "Untitled Regulatory Amendment"
    if not authority:
        missing_fields.append("Issuing Authority")
    if not notification_number:
        missing_fields.append("Notification or Circular Number")
    if not publication_date:
        missing_fields.append("Publication Date")
    if not effective_date:
        missing_fields.append("Effective Date")
    if not official_url:
        missing_fields.append("Official Source URL")

    # Compute extraction confidence score (0 to 100)
    found_count = 6 - len(missing_fields)
    confidence = round((found_count / 6.0) * 100, 1)

    is_verified = bool(official_url and ('.gov.in' in official_url or '.nic.in' in official_url or 'gstcouncil.gov.in' in official_url or 'mca.gov.in' in official_url))
    return {
        "title": title,
        "authority": authority,
        "notification_number": notification_number,
        "publication_date": publication_date,
        "effective_date": effective_date,
        "official_url": official_url,
        "missing_fields": missing_fields,
        "extraction_confidence": confidence,
        "source_verified": is_verified,
        "is_source_verified": is_verified,
        "source_status_label": "Officially verified source content" if is_verified else "Source not independently verified"
    }


def extract_text_from_pdf(file_bytes: bytes) -> Tuple[str, bool, Optional[str]]:
    """
    Extracts text from PDF bytes. Detects scanned or encrypted documents.
    Returns (extracted_text, is_scanned, warning_message).
    """
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        if reader.is_encrypted:
            return ("", False, "PDF is password-protected or encrypted. Please provide an unencrypted copy.")

        extracted_pages: List[str] = []
        for idx, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            if page_text.strip():
                extracted_pages.append(f"[Page {idx + 1}]\n{page_text.strip()}")

        full_text = "\n\n".join(extracted_pages).strip()

        # If zero or virtually zero text extracted from non-empty pages, it is a scanned PDF
        if len(reader.pages) > 0 and len(full_text) < 30:
            return (
                "",
                True,
                "Scanned PDF detected without embedded text layer. Optical Character Recognition (OCR) is required to parse this document."
            )

        return (full_text, False, None)
    except Exception as e:
        return ("", False, f"Failed to parse PDF document: {str(e)}")


def extract_text_from_docx(file_bytes: bytes) -> Tuple[str, bool, Optional[str]]:
    """
    Extracts readable text from DOCX document preserving headings, section numbers,
    and tables using XML namespace parsing.
    """
    try:
        with zipfile.ZipFile(io.BytesIO(file_bytes)) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)

            namespaces = {
                'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
            }

            extracted_chunks: List[str] = []

            # Extract body elements (paragraphs and tables) in document order
            body = tree.find('w:body', namespaces)
            if body is None:
                return ("", False, "DOCX structure missing document body.")

            for child in body:
                tag = child.tag.split('}')[-1]
                if tag == 'p':
                    # Paragraph
                    texts = child.findall('.//w:t', namespaces)
                    p_text = "".join([t.text for t in texts if t.text])
                    if p_text.strip():
                        extracted_chunks.append(p_text.strip())
                elif tag == 'tbl':
                    # Table
                    rows = child.findall('.//w:tr', namespaces)
                    table_rows = []
                    for row in rows:
                        cells = row.findall('.//w:tc', namespaces)
                        row_text = " | ".join([
                            "".join([t.text for t in cell.findall('.//w:t', namespaces) if t.text]).strip()
                            for cell in cells
                        ])
                        if row_text.strip():
                            table_rows.append(f"| {row_text} |")
                    if table_rows:
                        extracted_chunks.append("\n".join(table_rows))

            full_text = "\n\n".join(extracted_chunks).strip()
            if not full_text:
                return ("", False, "Document contains no readable text paragraphs.")

            return (full_text, False, None)
    except Exception as e:
        return ("", False, f"Failed to parse DOCX document: {str(e)}")


def extract_text_from_eml(file_bytes: bytes) -> Tuple[str, Dict[str, str], Optional[str]]:
    """
    Extracts email headers and message body from RFC 822 .eml files.
    """
    try:
        msg = email.message_from_bytes(file_bytes, policy=policy.default)
        headers = {
            "subject": str(msg.get("subject", "")),
            "from": str(msg.get("from", "")),
            "to": str(msg.get("to", "")),
            "date": str(msg.get("date", ""))
        }

        body = ""
        # Get body
        if msg.is_multipart():
            for part in msg.walk():
                ctype = part.get_content_type()
                cdispo = str(part.get('Content-Disposition', ''))
                if ctype == 'text/plain' and 'attachment' not in cdispo:
                    body = part.get_content()
                    break
            if not body:
                # Fallback to text/html
                for part in msg.walk():
                    if part.get_content_type() == 'text/html':
                        raw_html = part.get_content()
                        # Basic tag stripping
                        body = re.sub(r'<[^>]+>', ' ', raw_html)
                        break
        else:
            body = msg.get_content()

        return (sanitize_text(body), headers, None)
    except Exception as e:
        return ("", {}, f"Failed to parse EML file: {str(e)}")


def process_uploaded_document(arg1: Any, arg2: Any) -> Dict[str, Any]:
    """
    Unified entry point for document processing.
    Accepts (file_bytes, filename) or (filename, file_bytes).
    Validates file size, type, extracts text, separates noise, and extracts metadata.
    """
    if isinstance(arg1, (bytes, bytearray)):
        file_bytes = bytes(arg1)
        filename = str(arg2)
    else:
        filename = str(arg1)
        file_bytes = bytes(arg2)

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        return {
            "success": False,
            "error": f"File size ({len(file_bytes) / (1024*1024):.1f} MB) exceeds maximum allowed limit of 10 MB.",
            "is_scanned": False
        }

    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
    extracted_text = ""
    is_scanned = False
    warning = None
    email_meta: Dict[str, str] = {}

    if ext == 'pdf':
        extracted_text, is_scanned, warning = extract_text_from_pdf(file_bytes)
    elif ext == 'docx':
        extracted_text, is_scanned, warning = extract_text_from_docx(file_bytes)
    elif ext in ['txt', 'text']:
        try:
            extracted_text = file_bytes.decode('utf-8')
        except UnicodeDecodeError:
            extracted_text = file_bytes.decode('latin-1', errors='replace')
    elif ext == 'eml':
        extracted_text, email_meta, warning = extract_text_from_eml(file_bytes)
    else:
        return {
            "success": False,
            "error": f"Unsupported file extension '.{ext}'. Supported formats are: PDF, DOCX, TXT, EML.",
            "is_scanned": False
        }

    if warning and not extracted_text:
        return {
            "success": False,
            "error": warning,
            "is_scanned": is_scanned
        }

    clean_data = separate_email_noise(extracted_text)
    metadata = extract_metadata_heuristics(clean_data["amendment_text"], email_meta=email_meta or clean_data["email_metadata"])

    return {
        "success": True,
        "filename": filename,
        "file_size_kb": round(len(file_bytes) / 1024.0, 1),
        "file_type": ext.upper(),
        "is_scanned": is_scanned,
        "warning": warning,
        "raw_text": extracted_text,
        "amendment_text": clean_data["amendment_text"],
        "email_metadata": clean_data["email_metadata"] or email_meta,
        "separated_noise": {
            "signatures": clean_data["signatures"],
            "disclaimers": clean_data["disclaimers"]
        },
        "metadata": metadata
    }
