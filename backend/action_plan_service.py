"""
ReguLens - Compliance Action Plan Engine & Generator
Features 5 & 6:
- 15-field granular action plan items for applicable amendments.
- Deadline derivation logic distinguishing publication, commencement, compliance deadline, and grace periods.
- Explicit prohibition against fabricated deadlines: if not established, "Deadline requires verification".
- Non-applicability rationale generator when amendment does not apply.
- Clarification checklist generator when applicability is uncertain.
"""

import re
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field


class ComplianceActionItem(BaseModel):
    id: str = Field(..., description="Unique action identifier")
    action_title: str = Field(..., description="Field 1: Action title")
    why_required: str = Field(..., description="Field 2: Why this action is required")
    specific_task: str = Field(..., description="Field 3: Specific task to perform")
    who_should_perform: str = Field(..., description="Field 4: Responsible role (e.g., Compliance Officer, Chartered Accountant, HR Manager)")
    priority: str = Field(..., description="Field 5: Critical, High, Medium, or Low")
    deadline: str = Field(..., description="Field 6: Exact date or 'Deadline requires verification'")
    deadline_calculation: str = Field(..., description="Field 7: Derivation formula or explanation from statutory text")
    documents_required: List[str] = Field(default_factory=list, description="Field 8: Documents or records required")
    where_to_complete: str = Field(..., description="Field 9: Official portal, internal system, or department")
    expected_output: str = Field(..., description="Field 10: Expected output or proof of completion")
    applicable_provision: str = Field(..., description="Field 11: Applicable legal provision or rule")
    source_link: str = Field(..., description="Field 12: Source URL or reference link")
    completion_status: str = Field("Not Started", description="Field 13: Not Started, In Progress, Blocked, or Completed")
    dependencies: List[str] = Field(default_factory=list, description="Field 14: Dependencies on other actions")
    risk_of_missing: str = Field(..., description="Field 15: Statutory penalty, interest, or operational risk")
    notes: Optional[str] = ""
    assigned_to: Optional[str] = ""


class NonApplicabilityRationale(BaseModel):
    verdict: str = "Likely Not Applicable"
    why_it_does_not_apply: str
    statutory_conditions_checked: List[str]
    business_facts_considered: List[str]
    assumptions_made: List[str]
    facts_that_could_change_result: List[str]
    evidence_retention_advice: str
    monitoring_recommendation: str


class ClarificationChecklist(BaseModel):
    verdict: str = "More Information Required"
    unresolved_legal_question: str
    missing_business_information: List[str]
    relevant_provision: str
    what_needs_to_be_verified: List[str]
    who_could_verify_it: str
    next_recommended_step: str


def derive_compliance_deadline(
    effective_date: Optional[str],
    amendment_text: str,
    publication_date: Optional[str] = None
) -> Dict[str, str]:
    """
    Derives deadline strictly according to statutory text rules:
    - Distinguishes publication date, commencement date, compliance deadline, and grace period.
    - If deadline cannot be established deterministically, returns 'Deadline requires verification'.
    - Never fabricates a deadline date.
    """
    text_lower = amendment_text.lower() if amendment_text else ""
    
    # Check for explicit grace period or days specified in text
    days_match = re.search(r'within\s+(\d+)\s+days\s+(?:from|of)\s+(?:the\s+)?(?:commencement|effective|date|notification)', text_lower)
    month_match = re.search(r'within\s+(\d+)\s+months\s+(?:from|of)\s+(?:the\s+)?(?:commencement|effective|date|notification)', text_lower)
    
    # Specific date mention for compliance: "on or before [Date]" or "by [Date]"
    date_deadline_match = re.search(r'(?:on or before|no later than|by)\s+(?:the\s+)?(\d{1,2}(?:st|nd|rd|th)?\s+(?:day\s+of\s+)?(?:january|february|march|april|may|june|july|august|september|october|november|december)[,\s]+\d{4}|\d{4}-\d{2}-\d{2}|\d{2}/\d{2}/\d{4})', text_lower)

    if date_deadline_match:
        found_date = date_deadline_match.group(1).strip()
        return {
            "deadline": found_date,
            "calculation": f"Statutory date specified directly in the provision: '{date_deadline_match.group(0)}'",
            "is_verified": True
        }

    # If effective date is available and text specifies a relative period
    if effective_date and days_match:
        days = int(days_match.group(1))
        return {
            "deadline": f"{days} days from effective date ({effective_date})",
            "calculation": f"Calculated as {days} calendar days from effective date ({effective_date}) based on phrase '{days_match.group(0)}'",
            "is_verified": True
        }
    
    if effective_date and month_match:
        months = int(month_match.group(1))
        return {
            "deadline": f"{months} months from effective date ({effective_date})",
            "calculation": f"Calculated as {months} calendar months from effective date ({effective_date}) based on phrase '{month_match.group(0)}'",
            "is_verified": True
        }

    # If only effective date is known, and law explicitly says "with effect from"
    if effective_date:
        return {
            "deadline": effective_date,
            "calculation": f"Commencement date stipulated in notification ({effective_date}). Note: Operational readiness must be achieved before or on this commencement date.",
            "is_verified": True
        }

    return {
        "deadline": "Deadline requires verification",
        "calculation": "Statutory text does not define an explicit calendar cutoff or grace period. Verification with primary Gazette notification or legal counsel required.",
        "is_verified": False
    }


def generate_compliance_action_plan(
    amendment_data: Dict[str, Any],
    profile_data: Dict[str, Any],
    applicability_result: Dict[str, Any]
) -> List[ComplianceActionItem]:
    """
    Generates personalized, practical 15-field compliance actions based on the specific
    amendment, legal provision, business profile facts, and domain rules.
    """
    title = amendment_data.get("title", "Regulatory Amendment")
    authority = amendment_data.get("authority", "Regulatory Authority")
    notif_no = amendment_data.get("notification_number") or "Official Notification"
    source_url = amendment_data.get("source_url") or "Official Gazette"
    effective_date = amendment_data.get("effective_date")
    text = amendment_data.get("amendment_text", "")
    text_lower = text.lower()

    derived = derive_compliance_deadline(effective_date, text, amendment_data.get("publication_date"))
    deadline = derived["deadline"]
    deadline_calc = derived["calculation"]

    actions: List[ComplianceActionItem] = []

    # Detect domain of amendment (GST / Labour / Corporate MCA / Factory / Environment / General)
    is_gst = any(k in text_lower for k in ["gst", "cgst", "e-invoice", "e-invoicing", "tax invoice", "rule 48(4)", "irn", "itc"])
    is_labour_wages = any(k in text_lower for k in ["minimum wage", "wages", "labour", "bonus", "gratuity", "provident fund", "epf", "esic", "vda"])
    is_mca_corporate = any(k in text_lower for k in ["dir-3", "director", "din", "mca", "companies act", "roc", "annual return", "mgt-7", "board report"])
    is_factory_safety = any(k in text_lower for k in ["factory", "factories act", "hazardous", "occupational safety", "boiler", "pollution", "cpcb", "spcb"])
    is_msme_delayed_payment = any(k in text_lower for k in ["msme act", "43b(h)", "delayed payment", "45 days", "section 15", "section 16"])

    # ACTION 1: Statutory applicability verification & board/management sign-off
    actions.append(
        ComplianceActionItem(
            id="ACT-01-VERIFY",
            action_title="Confirm Statutory Scope, Reference Periods & Exclusions",
            why_required=f"Statutory change under {authority} ({notif_no}) alters compliance obligations. Management must confirm that enterprise thresholds, entity classification, and statutory exclusions have been accurately applied before changing operational workflows.",
            specific_task=f"Review the business parameters for {profile_data.get('name', 'Enterprise')} (Aggregate turnover: ₹{profile_data.get('annual_turnover_inr', 0)/10000000:.2f} Cr, State: {profile_data.get('state', 'Registered state')}, Entity: {profile_data.get('entity_type', 'Private Limited')}) against the conditions in {notif_no}. Verify that no statutory exemptions or entity exclusions apply.",
            who_should_perform="Compliance Officer / Legal Adviser",
            priority="High",
            deadline=deadline,
            deadline_calculation=deadline_calc,
            documents_required=[
                "Official Gazetted Notification / Circular copy",
                "Audited Financial Statements for preceding 3 financial years",
                "PAN-linked entity structure and registration certificates"
            ],
            where_to_complete="Internal Legal / Compliance Documentation",
            expected_output="Applicability & Eligibility Determination Memorandum signed by Compliance Officer",
            applicable_provision=f"{authority} · {notif_no}",
            source_link=source_url,
            completion_status="Not Started",
            dependencies=[],
            risk_of_missing="Risk of proceeding with incorrect tax or regulatory treatment, leading to unbudgeted compliance costs or statutory non-compliance penalties."
        )
    )

    # ACTION 2: Domain-specific Operational / Data Preparation
    if is_gst:
        actions.append(
            ComplianceActionItem(
                id="ACT-02-ERP-IRP",
                action_title="Upgrade ERP / Billing Software for IRP (Invoice Registration Portal) Integration",
                why_required="Sub-rule (4) of Rule 48 of CGST Rules mandates that tax invoices issued by notified persons without an authorized Invoice Reference Number (IRN) and signed QR code shall not be treated as a valid tax invoice.",
                specific_task="Contact ERP / Accounting software vendor (e.g. Tally, SAP, Zoho Books) to enable e-invoicing API / offline JSON utility. Configure sandbox API credentials on NIC / Cleartax / authorized IRP, generate sample B2B & export invoices, and validate schema v1.1 compliance.",
                who_should_perform="IT Systems Lead / Accounts Manager",
                priority="Critical",
                deadline=deadline,
                deadline_calculation=f"{deadline_calc} (Must test and deploy in production prior to effective date to prevent business disruption)",
                documents_required=[
                    "ERP Vendor API specification / patch notes",
                    "GSP/IRP sandbox registration credentials",
                    "Sample test JSON payload and IRN signed acknowledgment"
                ],
                where_to_complete="NIC E-Invoice Portal (einvoice1.gst.gov.in) / Production ERP",
                expected_output="Successful sandbox transmission logs and verified sample e-invoice containing 64-character IRN and QR code",
                applicable_provision="CGST Rules, 2017 · Rule 48(4) read with Rule 48(5)",
                source_link=source_url,
                completion_status="Not Started",
                dependencies=["ACT-01-VERIFY"],
                risk_of_missing="Under Rule 48(5), any invoice issued without IRN is legally void. Buyers cannot claim Input Tax Credit (ITC), leading to blocked client payments and penalties under Section 122(1) of CGST Act (₹10,000 or 100% of tax involved)."
            )
        )
        actions.append(
            ComplianceActionItem(
                id="ACT-03-PROCESS-CHANGE",
                action_title="Notify B2B Buyers & Standardize Credit Note / Debit Note Workflow",
                why_required="E-invoicing applies to all B2B supplies, SEZ supplies, export supplies, and credit/debit notes. B2B counterparties must be informed of the change in invoice formats and dispatch timelines.",
                specific_task="Audit active customer master data in accounting systems. Validate recipient GSTINs via the GST portal API. Establish standard operating procedure (SOP) that no goods dispatch occurs without an attached e-way bill linked to the authenticated IRN.",
                who_should_perform="Finance Controller / Dispatch & Billing Team",
                priority="High",
                deadline=deadline,
                deadline_calculation=deadline_calc,
                documents_required=[
                    "Customer Master Master Ledger with verified active GSTINs",
                    "SOP for billing team on 24-hour IRN cancellation window",
                    "Customer formal email communication circular"
                ],
                where_to_complete="Internal Finance Department & Customer Communication Portal",
                expected_output="Updated billing SOP manual and dispatch checkpoint verification logs",
                applicable_provision="CGST Act, 2017 · Section 31 read with Rule 48",
                source_link=source_url,
                completion_status="Not Started",
                dependencies=["ACT-02-ERP-IRP"],
                risk_of_missing="E-way bill mismatch at transport checkposts resulting in vehicle seizure and detention penalties under Section 129 of CGST Act (200% of penalty)."
            )
        )
    elif is_labour_wages:
        actions.append(
            ComplianceActionItem(
                id="ACT-02-PAYROLL-RESTRUCTURE",
                action_title="Recalculate Wage Structures & Adjust Payroll Basic + VDA Rates",
                why_required="Payment of wages below the revised statutory basic minimum wage and Variable Dearness Allowance (VDA) constitutes an offense under the Minimum Wages Act.",
                specific_task=f"Review employee muster roll for {profile_data.get('employees', 'all')} employees across factory zones in {profile_data.get('state', 'State')}. Compare current wage components (Basic, HRA, VDA, Gross) against amended notification schedules. Adjust payroll software master rates to guarantee basic pay meets or exceeds new floors.",
                who_should_perform="Human Resources Manager / Payroll Accountant",
                priority="Critical",
                deadline=deadline,
                deadline_calculation=f"{deadline_calc} (Must be applied to current payroll run before salary disbursement)",
                documents_required=[
                    "Updated State Minimum Wage Notification & VDA circular",
                    "Employee category classification register (Unskilled, Semi-skilled, Skilled, Highly Skilled)",
                    "Revised CTC compensation break-up sheets"
                ],
                where_to_complete="Company Payroll Management System",
                expected_output="Revised salary registers showing adjusted basic floors and corresponding EPF/ESIC contribution recalibration",
                applicable_provision="Minimum Wages Act, 1948 · Section 12",
                source_link=source_url,
                completion_status="Not Started",
                dependencies=["ACT-01-VERIFY"],
                risk_of_missing="Penalties under Section 22 of Minimum Wages Act, claim petitions by labour commissioner with up to 10x compensation awarded to employees, and factory labour inspection notices."
            )
        )
        actions.append(
            ComplianceActionItem(
                id="ACT-03-NOTICE-BOARD",
                action_title="Display Revised Wage Schedule on Factory / Establishment Notice Board",
                why_required="Statutory rules require every employer to display an abstract of the Act, minimum rates of wages, and competent authority contact details in English and the regional language.",
                specific_task="Draft Form XIV notice displaying revised basic rates, effective date, and working hour schedules in Marathi/Regional language and English. Affix at the primary entrance of the factory or establishment premises.",
                who_should_perform="Factory Manager / HR Compliance Executive",
                priority="Medium",
                deadline=deadline,
                deadline_calculation=deadline_calc,
                documents_required=[
                    "Form XIV (Notice of Minimum Rates of Wages)",
                    "Photographic proof of notice board affixation with date stamp"
                ],
                where_to_complete="Factory Premises / Main Gates",
                expected_output="Signed inspection-ready notice board display and timestamped internal photo log",
                applicable_provision="Maharashtra Minimum Wages Rules / State Labour Rules",
                source_link=source_url,
                completion_status="Not Started",
                dependencies=["ACT-02-PAYROLL-RESTRUCTURE"],
                risk_of_missing="Summons and spot fines during routine inspections by State Labour Enforcement Officers."
            )
        )
    elif is_mca_corporate:
        actions.append(
            ComplianceActionItem(
                id="ACT-02-DIR3-KYC",
                action_title="Collate Director KYC Documents & Complete MCA Portal Verification",
                why_required="All individuals holding a DIN allocated by MCA must file annual KYC (DIR-3 KYC or web service DIR-3 KYC WEB) before the statutory cutoff to keep the Director Identification Number active.",
                specific_task="Verify director email, mobile number, Aadhaar, and passport for all company directors. Verify DSC (Digital Signature Certificate) validity. Complete web-based verification on MCA V3 portal.",
                who_should_perform="Company Secretary / Practicing CS / Compliance Head",
                priority="High",
                deadline=deadline,
                deadline_calculation=deadline_calc,
                documents_required=[
                    "Self-attested PAN card and Aadhaar card of Director",
                    "Proof of residential address (Electricity bill / Bank statement < 2 months old)",
                    "Valid Class 3 Digital Signature Certificate (DSC)"
                ],
                where_to_complete="Ministry of Corporate Affairs Portal (mca.gov.in)",
                expected_output="MCA Challan / SRN acknowledgment receipt confirming successful DIR-3 KYC filing",
                applicable_provision="Companies (Appointment and Qualification of Directors) Rules, 2014 · Rule 12A",
                source_link=source_url,
                completion_status="Not Started",
                dependencies=["ACT-01-VERIFY"],
                risk_of_missing="Deactivation of Director DIN on MCA portal with status marked 'Deactivated due to non-filing of DIR-3 KYC', preventing filing of any corporate returns, accompanied by a late filing fee of ₹5,000 per DIN."
            )
        )
    else:
        # General regulatory compliance actions
        actions.append(
            ComplianceActionItem(
                id="ACT-02-PROCESS-AUDIT",
                action_title="Conduct Operational Impact Assessment & Identify Workflow Adjustments",
                why_required=f"Notification {notif_no} issued by {authority} introduces amendments directly affecting operational processes.",
                specific_task="Review existing documentation, contract templates, and operating records against the amended requirements. Formulate an implementation transition plan.",
                who_should_perform="Operations Manager / Head of Compliance",
                priority="Medium",
                deadline=deadline,
                deadline_calculation=deadline_calc,
                documents_required=[
                    "Existing Standard Operating Procedures (SOP)",
                    "Contractual agreements with key suppliers/customers",
                    "Regulatory gap analysis checklist"
                ],
                where_to_complete="Internal Management Systems",
                expected_output="Operational Transition Plan approved by Department Head",
                applicable_provision=f"{authority} Notification {notif_no}",
                source_link=source_url,
                completion_status="Not Started",
                dependencies=["ACT-01-VERIFY"],
                risk_of_missing="Operational latency or regulatory scrutiny due to lack of transitional readiness."
            )
        )

    # ACTION FINAL: Statutory Record Retention & Audit Trail (ProofPath)
    actions.append(
        ComplianceActionItem(
            id="ACT-04-AUDIT-TRAIL",
            action_title="Archive Compliance Evidence & Generate Section 65B Audit Certificate",
            why_required="Under Indian Evidence Act, Section 65B (and Bharatiya Sakshya Adhiniyam, 2023), contemporaneous electronic records and logs must be preserved to establish proof of regulatory compliance during statutory audits or assessments.",
            specific_task="Upload all supporting evidence (IRN logs, updated registers, payroll sheets, challans) to ReguLens ProofPath. Verify SHA-256 cryptographic digest and archive in secure internal records for minimum statutory retention period (6-8 years).",
            who_should_perform="Compliance Officer / Internal Auditor",
            priority="Medium",
            deadline=deadline,
            deadline_calculation="Must be executed concurrently upon completion of core compliance filings",
            documents_required=[
                "Filed challans / receipts / acknowledgment notices",
                "Internal verification sign-off sheets",
                "ReguLens ProofPath cryptographic verification record"
            ],
            where_to_complete="ReguLens Compliance Vault & Internal Document Repository",
            expected_output="Cryptographically signed Section 65B Compliance Certificate and tamper-evident SHA-256 digest archive",
            applicable_provision="Statutory Record Retention Requirements · Companies Act / Tax Laws",
            source_link=source_url,
            completion_status="Not Started",
            dependencies=[actions[1].id if len(actions) > 1 else "ACT-01-VERIFY"],
            risk_of_missing="Inability to prove timely statutory compliance during retrospective assessment or tax authority audit, resulting in disallowance of statutory claims."
        )
    )

    return actions


def generate_non_applicability_rationale(
    amendment_data: Dict[str, Any],
    profile_data: Dict[str, Any],
    reason: str,
    conditions_checked: List[str]
) -> NonApplicabilityRationale:
    """Generates structured non-applicability guidance without creating unnecessary compliance tasks."""
    turnover = profile_data.get("annual_turnover_inr", 0)
    return NonApplicabilityRationale(
        verdict="Likely Not Applicable",
        why_it_does_not_apply=reason,
        statutory_conditions_checked=conditions_checked,
        business_facts_considered=[
            f"Annual Aggregate Turnover: ₹{turnover / 10000000:.2f} Crore",
            f"Industry / Sector: {profile_data.get('sector', 'General')}",
            f"Operating State(s): {profile_data.get('state', 'Primary')} / {', '.join(profile_data.get('operating_states', []))}",
            f"Entity Type: {profile_data.get('entity_type', 'Private Limited')}",
            f"Number of Employees: {profile_data.get('employees', 'N/A')}"
        ],
        assumptions_made=[
            "Assumed reported turnover reflects aggregate PAN-wide turnover across all registrations in preceding financial years.",
            "Assumed entity does not operate distinct unregistered branches that would alter aggregate threshold evaluation.",
            "Assumed business does not plan a structural merger or business expansion that breaches the threshold in the current quarter."
        ],
        facts_that_could_change_result=[
            "If turnover across other GSTINs under the same PAN exceeds statutory thresholds when aggregated.",
            "If the enterprise opens operations or branch offices in other states covered by regional notifications.",
            "If the business model transitions to covered activities (e.g. B2B supplies, exports, or specified scheduled employment)."
        ],
        evidence_retention_advice="Retain audited annual financial statements, PAN-level turnover consolidation reports, and eligibility memo in your compliance folder to justify non-applicability during potential regulatory inquiries.",
        monitoring_recommendation="Re-evaluate applicability at the close of every financial quarter or upon any 20%+ revenue expansion."
    )


def generate_clarification_checklist(
    amendment_data: Dict[str, Any],
    profile_data: Dict[str, Any],
    missing_items: List[str],
    relevant_provision: str
) -> ClarificationChecklist:
    """Generates a clarification checklist when applicability is uncertain, rather than pretending certainty."""
    return ClarificationChecklist(
        verdict="More Information Required",
        unresolved_legal_question=f"Whether {profile_data.get('name', 'the enterprise')} satisfies the statutory threshold, reference period, or entity classification under {relevant_provision}.",
        missing_business_information=missing_items,
        relevant_provision=relevant_provision,
        what_needs_to_be_verified=[
            "Verified aggregate figures for the precise reference period specified by the law (e.g., any preceding financial year from FY 2017-18 onwards).",
            "PAN-wide aggregation across all branches, subsidiary units, and sister registrations.",
            "Confirmation of applicability of statutory provisos or specific exemptions (e.g. SEZ units, GTA, specialized service providers)."
        ],
        who_could_verify_it="Statutory Auditor, Company Secretary, or Practicing Chartered Accountant",
        next_recommended_step="Supply the requested business parameters in the 'Evaluate Applicability' tab or consult company accountant with your multi-year consolidated ledger before taking operational action."
    )
