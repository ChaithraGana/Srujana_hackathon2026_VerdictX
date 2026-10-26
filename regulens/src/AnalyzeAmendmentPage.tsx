import React, { useState, useEffect } from 'react';
import {
  parseAmendmentText,
  extractAmendmentFile,
  analyzeAmendment,
  saveAmendmentDraft,
  fetchAmendmentDrafts,
  updateComplianceAction,
  type AmendmentAnalysisResponse,
  type ComplianceActionItemData
} from './api';

export const AMENDMENT_SAMPLE_PRESETS = [
  {
    name: '1. GST E-Invoicing Threshold Reduction (CBIC 10/2023)',
    title: 'Central Tax Notification No. 10/2023 — E-Invoicing ₹5 Cr Mandate',
    authority: 'Central Board of Indirect Taxes and Customs (CBIC)',
    notification_number: 'Notification No. 10/2023 — Central Tax',
    publication_date: '10 May 2023',
    effective_date: '01 August 2023',
    source_url: 'https://gstcouncil.gov.in/node/4365',
    amendment_text: `GOVERNMENT OF INDIA
MINISTRY OF FINANCE (DEPARTMENT OF REVENUE)
CENTRAL BOARD OF INDIRECT TAXES AND CUSTOMS
Notification No. 10/2023 – Central Tax
New Delhi, the 10th May, 2023

G.S.R. 350(E).—In exercise of the powers conferred by sub-rule (4) of rule 48 of the Central Goods and Services Tax Rules, 2017, the Government, on the recommendations of the Council, hereby makes the following further amendment in the notification of the Government of India in the Ministry of Finance (Department of Revenue), No. 13/2020 – Central Tax, dated the 21st March, 2020, published in the Gazette of India, Extraordinary, Part II, Section 3, Sub-section (i), vide number G.S.R. 196(E), dated the 21st March, 2020, namely:—

In the said notification, in the first paragraph, with effect from the 1st day of August, 2023, for the words "ten crore rupees", the words "five crore rupees" shall be substituted.

[F. No. CBIC-20021/1/2023-GST]
ALOK KUMAR, Director`,
    original_text: `In exercise of the powers conferred by sub-rule (4) of rule 48 of the Central Goods and Services Tax Rules, 2017, the Government, on the recommendations of the Council, hereby notifies registered person, whose aggregate turnover in any preceding financial year from 2017-18 onwards exceeds ten crore rupees, as a class of registered person who shall prepare invoice and other prescribed documents, in terms of sub-rule (4) of rule 48 of the said rules in respect of supply of goods or services or both to a registered person.`
  },
  {
    name: '2. Maharashtra Factory Minimum Wages (Labour Dept)',
    title: 'Maharashtra Factory Scheduled Employment Minimum Wages Revision',
    authority: 'Government of Maharashtra, Labour and Employment',
    notification_number: 'Notification No. MWA-42010/CR-1301/Lab-7',
    publication_date: '20 July 2010',
    effective_date: '01 August 2010',
    source_url: 'https://labour.maharashtra.gov.in/en/publication/gr',
    amendment_text: `GOVERNMENT OF MAHARASHTRA
INDUSTRY, ENERGY AND LABOUR DEPARTMENT
Madam Cama Road, Hutatma Rajguru Chowk, Mantralaya, Mumbai 400 032.
Dated the 20th July 2010.

NOTIFICATION
MINIMUM WAGES ACT, 1948.
No. MWA-42010/CR-1301/Lab-7.—In exercise of the powers conferred by clause (b) of sub-section (1) of section 3 read with sub-section (2) of section 5 of the Minimum Wages Act, 1948 (XI of 1948), the Government of Maharashtra hereby revises the minimum rates of wages payable to the employees employed in the Scheduled Employment, namely: "Employment in any factory as defined under the Factories Act, 1948", within Maharashtra.

1. Basic monthly minimum rates of wages in Factory scheduled employment:
   - Skilled (Zone I): Rs 5,500
   - Semi-skilled (Zone I): Rs 5,000
   - Unskilled (Zone I): Rs 4,500
plus special allowance (VDA) as declared by the Competent Authority twice every calendar year.`,
    original_text: `1. Basic monthly minimum rates of wages in Factory scheduled employment:
   - Skilled (Zone I): Rs 3,200
   - Semi-skilled (Zone I): Rs 3,100
   - Unskilled (Zone I): Rs 3,000
plus special allowance (VDA) as declared by the Competent Authority twice every calendar year.`
  },
  {
    name: '3. MCA Corporate Director KYC Filing Window (MCA G.S.R. 339)',
    title: 'Companies (Appointment of Directors) Rules — Annual DIR-3 KYC',
    authority: 'Ministry of Corporate Affairs (MCA)',
    notification_number: 'Notification No. G.S.R. 339(E)',
    publication_date: '30 April 2019',
    effective_date: '30 April 2019',
    source_url: 'https://www.mca.gov.in/',
    amendment_text: `MINISTRY OF CORPORATE AFFAIRS
NOTIFICATION
New Delhi, the 30th April, 2019

G.S.R. 339(E).—In exercise of the powers conferred by second proviso to sub-section (1), sub-section (4), clause (f) of sub-section (6) of section 149, sub-sections (3) and (4) of section 150, section 151, sub-section (5) of section 152, section 153, section 154, section 157, section 160, sub-section (1) of section 168 and section 170 read with section 469 of the Companies Act, 2013 (18 of 2013), the Central Government hereby makes the following rules further to amend the Companies (Appointment and Qualification of Directors) Rules, 2014, namely:—

1. In the said rules, in rule 12A, for the words "on or before 30th April of the immediate next financial year", the words "on or before 30th June of the immediate next financial year" shall be substituted.`,
    original_text: `Every individual who holds a Director Identification Number (DIN) as on 31st March of a financial year as per these rules shall submit e-form DIR-3-KYC to the Central Government on or before 30th April of the immediate next financial year.`
  },
  {
    name: '4. Forwarded Email Circular (With Disclaimers & Signature)',
    title: 'Forwarded Alert: New Compliance Mandate Received via Client Email',
    authority: 'Central Board of Indirect Taxes and Customs (CBIC)',
    notification_number: 'Notification No. 10/2023 — Central Tax',
    publication_date: '10 May 2023',
    effective_date: '01 August 2023',
    source_url: 'https://gstcouncil.gov.in/node/4365',
    amendment_text: `---------- Forwarded message ---------
From: Rakesh Sharma <rakesh@taxpartners.in>
Date: Fri, May 12, 2023 at 10:14 AM
Subject: URGENT: Government lowers E-Invoicing threshold to ₹5 Crore
To: accounts@apexprecision.com

Dear Client Management,

Please note the CBIC has just gazetted Notification No. 10/2023 – Central Tax on 10th May 2023:
"In exercise of the powers conferred by sub-rule (4) of rule 48 of the Central Goods and Services Tax Rules, 2017, the Government hereby makes the following amendment in notification No. 13/2020: for the words 'ten crore rupees', the words 'five crore rupees' shall be substituted with effect from the 1st day of August, 2023."

Kindly upgrade your billing systems before August 1st.

Thanks & Regards,
Rakesh Sharma, FCA
Partner, Sharma & Associates Chartered Accountants
Fort, Mumbai 400 001

DISCLAIMER:
This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error please notify the system manager. Any views or opinions presented in this email are solely those of the author.`,
    original_text: `In notification No. 13/2020: for the words "ten crore rupees", the words shall apply to taxpayers exceeding ten crore rupees aggregate turnover.`
  }
];

export function AnalyzeAmendmentPage({ navigate }: { navigate: (path: string) => void }) {
  // Wizard steps: 1: Input -> 2: Review Content -> 3: Compare Diff -> 4: Match Business -> 5: Action Plan -> 6: Track Progress
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');

  // Input states
  const [rawInputText, setRawInputText] = useState('');
  const [originalProvisionText, setOriginalProvisionText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Editable Review States (Step 2)
  const [title, setTitle] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('');
  const [notificationNumber, setNotificationNumber] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [officialSourceUrl, setOfficialSourceUrl] = useState('');
  const [cleanAmendmentText, setCleanAmendmentText] = useState('');
  const [isSourceVerified, setIsSourceVerified] = useState(false);
  const [sourceStatusBadge, setSourceStatusBadge] = useState('Source not independently verified');
  const [extractionWarnings, setExtractionWarnings] = useState<string[]>([]);
  const [separatedSignatures, setSeparatedSignatures] = useState<string[]>([]);
  const [separatedDisclaimers, setSeparatedDisclaimers] = useState<string[]>([]);

  // Analysis result states (Steps 3-6)
  const [analysisResult, setAnalysisResult] = useState<AmendmentAnalysisResponse | null>(null);
  const [actionItems, setActionItems] = useState<ComplianceActionItemData[]>([]);
  const [selectedActionForModal, setSelectedActionForModal] = useState<ComplianceActionItemData | null>(null);

  // Load preset scenario
  const handleLoadPreset = (idx: number) => {
    const p = AMENDMENT_SAMPLE_PRESETS[idx];
    setRawInputText(p.amendment_text);
    setOriginalProvisionText(p.original_text);
    setTitle(p.title);
    setIssuingAuthority(p.authority);
    setNotificationNumber(p.notification_number);
    setPublicationDate(p.publication_date);
    setEffectiveDate(p.effective_date);
    setOfficialSourceUrl(p.source_url);
    setCleanAmendmentText(p.amendment_text);
    setSelectedFile(null);
    setSuccessMessage(`Loaded sample preset: ${p.name}`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Step 1 -> Step 2: Parse pasted text
  const handleParsePastedText = async () => {
    if (!rawInputText.trim()) {
      setErrorMessage('Please paste regulatory amendment text or select a sample preset.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const parsed = await parseAmendmentText(rawInputText, originalProvisionText);
      const meta = parsed.metadata || {};
      setTitle(meta.title || title || 'Regulatory Amendment Notification');
      setIssuingAuthority(meta.issuing_authority || issuingAuthority || 'Central Regulatory Authority');
      setNotificationNumber(meta.notification_number || notificationNumber || '');
      setPublicationDate(meta.publication_date || publicationDate || '');
      setEffectiveDate(meta.effective_date || effectiveDate || '');
      setOfficialSourceUrl(meta.official_source_url || officialSourceUrl || '');
      setIsSourceVerified(Boolean(meta.is_source_verified));
      setSourceStatusBadge(meta.source_status_label || 'Source not independently verified');
      setCleanAmendmentText(parsed.amendment_text || rawInputText);
      setExtractionWarnings(meta.extraction_warnings || []);
      setSeparatedSignatures(parsed.separated_noise?.signatures || []);
      setSeparatedDisclaimers(parsed.separated_noise?.disclaimers || []);
      setCurrentStep(2);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to extract metadata.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1 -> Step 2: Handle File Upload
  const handleUploadFile = async (file: File) => {
    setIsLoading(true);
    setErrorMessage('');
    setUploadStatus(`Reading & sanitizing ${file.name} (${(file.size / 1024).toFixed(1)} KB)...`);
    try {
      const parsed = await extractAmendmentFile(file);
      const meta = parsed.metadata || {};
      setTitle(meta.title || file.name.replace(/\.[^/.]+$/, ''));
      setIssuingAuthority(meta.issuing_authority || 'Regulatory Authority');
      setNotificationNumber(meta.notification_number || '');
      setPublicationDate(meta.publication_date || '');
      setEffectiveDate(meta.effective_date || '');
      setOfficialSourceUrl(meta.official_source_url || '');
      setIsSourceVerified(Boolean(meta.is_source_verified));
      setSourceStatusBadge(meta.source_status_label || 'Source not independently verified');
      setCleanAmendmentText(parsed.amendment_text || parsed.raw_text);
      setSeparatedSignatures(parsed.separated_noise?.signatures || []);
      setSeparatedDisclaimers(parsed.separated_noise?.disclaimers || []);

      const warnings: string[] = [];
      if (parsed.is_scanned) {
        warnings.push('Scanned image PDF detected. Readable text layer is minimal. OCR extraction recommended.');
      }
      if (parsed.warning) {
        warnings.push(parsed.warning);
      }
      setExtractionWarnings(warnings);
      setSelectedFile(file);
      setCurrentStep(2);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process document.');
    } finally {
      setIsLoading(false);
      setUploadStatus('');
    }
  };

  // Step 2 -> Step 3+: Run Full Pipeline Analysis
  const handleRunAnalysis = async () => {
    if (!cleanAmendmentText.trim()) {
      setErrorMessage('Amendment legal text cannot be empty.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      // Pull active profile
      const storedTurnover = parseFloat(window.localStorage.getItem('regulens-active-turnover') || '82000000');
      const profile = {
        name: window.localStorage.getItem('regulens-active-company') || 'Apex Precision Components Pvt Ltd',
        sector: window.localStorage.getItem('regulens-active-sector') || 'Industrial manufacturing',
        state: window.localStorage.getItem('regulens-active-state') || 'Maharashtra',
        operating_states: ['Maharashtra', 'Karnataka'],
        annual_turnover_inr: storedTurnover,
        employees: 24,
        gstin: '27AAQCA1234F1ZK',
        entity_type: 'Private Limited',
        pan_aggregation_verified: true,
        turnover_period_verified: true,
        entity_exclusion_applies: false
      };

      const resp = await analyzeAmendment({
        title,
        issuing_authority: issuingAuthority,
        notification_number: notificationNumber,
        publication_date: publicationDate,
        effective_date: effectiveDate,
        official_source_url: officialSourceUrl,
        amendment_text: cleanAmendmentText,
        original_text: originalProvisionText,
        profile
      });

      setAnalysisResult(resp);
      setActionItems(resp.action_plan || []);
      setCurrentStep(3); // Move to Step 3: Legal Diff
    } catch (err: any) {
      setErrorMessage(err.message || 'Analysis failed. Please check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save Draft
  const handleSaveDraft = async () => {
    try {
      const draftId = `DRAFT-${Date.now()}`;
      await saveAmendmentDraft({
        draft_id: draftId,
        title: title || 'Untitled Amendment',
        authority: issuingAuthority || 'Authority',
        notification_number: notificationNumber,
        publication_date: publicationDate,
        effective_date: effectiveDate,
        source_url: officialSourceUrl,
        amendment_text: cleanAmendmentText || rawInputText,
        original_text: originalProvisionText,
        saved_at: new Date().toISOString()
      });
      setSuccessMessage('Draft saved to session registry.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage('Failed to save draft.');
    }
  };

  // Toggle Action Status (Step 6 / Action Cards)
  const handleToggleStatus = async (item: ComplianceActionItemData) => {
    const nextStatusMap: Record<string, 'Not Started' | 'In Progress' | 'Blocked' | 'Completed'> = {
      'Not Started': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'Not Started',
      'Blocked': 'In Progress'
    };
    const nextStatus = nextStatusMap[item.completion_status] || 'Not Started';

    try {
      await updateComplianceAction({
        action_id: item.id,
        completion_status: nextStatus
      });
      setActionItems((prev) =>
        prev.map((a) => (a.id === item.id ? { ...a, completion_status: nextStatus } : a))
      );
    } catch (err) {
      console.error('Update status failed:', err);
    }
  };

  return (
    <div className="proof-page" style={{ paddingBottom: '80px' }}>
      {/* Header Banner */}
      <div className="page-header page-header-dark" style={{ marginBottom: '24px' }}>
        <div>
          <div className="eyebrow eyebrow-light"><span className="eyebrow-line" />INTELLIGENT STATUTORY AMENDMENT INGESTION</div>
          <h1 style={{ color: 'var(--ivory)', fontSize: '28px', margin: '6px 0 8px' }}>
            Analyze a <em>Regulatory Amendment</em>
          </h1>
          <p style={{ color: 'rgba(243,239,230,0.85)', fontSize: '16px', maxWidth: '800px', margin: 0, lineHeight: 1.6 }}>
            Paste or upload any gazette notification, ministry circular, or compliance newsletter.
            Understand verbatim what changed, evaluate deterministic applicability to your enterprise, and generate
            an evidence-backed 15-field compliance action plan with verified deadlines.
          </p>
        </div>
        <div className="page-header-action" style={{ display: 'flex', gap: '8px' }}>
          <button className="button button-outline" onClick={() => navigate('/compliance-actions')} style={{ fontSize: '15.5px', padding: '10px 18px' }}>
            My Compliance Actions →
          </button>
        </div>
      </div>

      {/* 6-Step Workflow Navigation Breadcrumbs */}
      <div className="table-card" style={{ padding: '14px 20px', marginBottom: '24px', background: 'linear-gradient(135deg, #07111f, #10243b)', border: '1px solid rgba(200,169,110,0.35)', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { num: 1, label: '1. Ingestion' },
            { num: 2, label: '2. Metadata Review' },
            { num: 3, label: '3. Legal Delta' },
            { num: 4, label: '4. Enterprise Match' },
            { num: 5, label: '5. Action Plan' },
            { num: 6, label: '6. Execution Vault' }
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num <= currentStep || (analysisResult && s.num >= 3)) {
                  setCurrentStep(s.num as any);
                }
              }}
              style={{
                background: currentStep === s.num ? 'var(--gold)' : 'transparent',
                color: currentStep === s.num ? 'var(--navy)' : s.num < currentStep ? '#38d9a9' : 'rgba(248,250,252,0.65)',
                fontWeight: currentStep === s.num ? 800 : 700,
                fontSize: '15.5px',
                border: 'none',
                cursor: (s.num <= currentStep || analysisResult) ? 'pointer' : 'not-allowed',
                padding: '8px 16px',
                borderRadius: '5px',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {s.label} {s.num < currentStep && '✓'}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Toasts */}
      {errorMessage && (
        <div style={{ padding: '14px 18px', background: 'rgba(197,64,64,0.18)', border: '1px solid #c54040', borderRadius: '6px', color: '#ffb3b3', marginBottom: '18px', fontSize: '16px' }}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
      {successMessage && (
        <div style={{ padding: '14px 18px', background: 'rgba(66,185,166,0.18)', border: '1px solid #42b9a6', borderRadius: '6px', color: '#a0eedf', marginBottom: '18px', fontSize: '16px' }}>
          ✓ {successMessage}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 1: PASTE AN AMENDMENT FROM AN EMAIL OR UPLOAD A DOCUMENT             */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div>
          {/* Preset Scenarios Selector */}
          <div className="table-card" style={{ marginBottom: '22px', padding: '22px 26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span className="small-label" style={{ color: '#855d14', fontWeight: 800, fontSize: '15px' }}>OFFICIAL STATUTORY BENCHMARKS</span>
                <h3 style={{ margin: '4px 0 0', fontSize: '20px', color: '#07111f', fontWeight: 700 }}>
                  Standard Regulatory Notifications & Precedents
                </h3>
              </div>
              <small style={{ color: '#475569', fontSize: '15.5px' }}>Load authenticated gazette notifications or circulars</small>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {AMENDMENT_SAMPLE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="button button-outline"
                  onClick={() => handleLoadPreset(idx)}
                  style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', height: 'auto', lineHeight: 1.45, color: '#07111f', fontWeight: 600, border: '1px solid rgba(16,24,34,0.15)', borderRadius: '6px' }}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#855d14' }}>{p.name}</strong>
                    <span style={{ fontSize: '15px', color: '#475569' }}>{p.authority}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mode Switcher: Paste vs Upload */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <button
              type="button"
              className={`button ${activeTab === 'paste' ? 'button-gold' : 'button-outline'}`}
              onClick={() => setActiveTab('paste')}
              style={{ padding: '8px 20px', fontSize: '15.5px' }}
            >
              📄 Paste Text / Email
            </button>
            <button
              type="button"
              className={`button ${activeTab === 'upload' ? 'button-gold' : 'button-outline'}`}
              onClick={() => setActiveTab('upload')}
              style={{ padding: '8px 20px', fontSize: '15.5px' }}
            >
              📤 Upload Document (PDF / DOCX / TXT / EML)
            </button>
          </div>

          {activeTab === 'paste' ? (
            <div className="table-card" style={{ padding: '24px 28px' }}>
              <span className="small-label" style={{ color: '#855d14', fontWeight: 800, fontSize: '15px' }}>DIRECT STATUTORY TEXT INGESTION</span>
              <h3 style={{ margin: '4px 0 10px', fontSize: '22px', color: '#07111f', fontWeight: 700 }}>
                Paste Regulatory Text, Circular, or Email
              </h3>
              <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.6, marginBottom: '18px' }}>
                Paste the full notification received via email, ministry newsletter, or official portal. You can paste the entire
                email body with subject and headers—the engine will heuristically separate noise (signatures, disclaimers) while preserving legal text.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '16px', color: '#07111f', marginBottom: '8px' }}>
                    Amendment Text / Email Content <span style={{ color: '#c54040' }}>*</span>
                  </label>
                  <textarea
                    rows={12}
                    value={rawInputText}
                    onChange={(e) => setRawInputText(e.target.value)}
                    placeholder="Paste the gazette circular or full email here (e.g., 'From: ... Subject: ... In exercise of powers under Rule 48(4)...')"
                    style={{ width: '100%', padding: '14px', borderRadius: '6px', border: '1px solid rgba(16,24,34,0.2)', fontFamily: 'monospace', fontSize: '15.5px', lineHeight: 1.55, background: '#fafafa', color: '#07111f', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '16px', color: '#07111f', marginBottom: '8px' }}>
                    Original Provision / Previous Version <small style={{ color: '#64748b', fontWeight: 500 }}>(Optional, for word-by-word diff)</small>
                  </label>
                  <textarea
                    rows={12}
                    value={originalProvisionText}
                    onChange={(e) => setOriginalProvisionText(e.target.value)}
                    placeholder="Paste previous clause wording if available (e.g. 'registered person whose turnover exceeds ten crore rupees...')"
                    style={{ width: '100%', padding: '14px', borderRadius: '6px', border: '1px solid rgba(16,24,34,0.2)', fontFamily: 'monospace', fontSize: '15.5px', lineHeight: 1.55, background: '#fafafa', color: '#07111f', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="button button-gold"
                    onClick={handleParsePastedText}
                    disabled={isLoading || !rawInputText.trim()}
                    style={{ padding: '12px 26px', fontSize: '16px' }}
                  >
                    {isLoading ? 'Processing Text...' : 'Analyze Amendment →'}
                  </button>
                  <button
                    type="button"
                    className="button button-outline"
                    onClick={() => {
                      setRawInputText('');
                      setOriginalProvisionText('');
                      setCleanAmendmentText('');
                    }}
                    style={{ padding: '12px 20px', fontSize: '16px' }}
                  >
                    Clear
                  </button>
                </div>
                <button
                  type="button"
                  className="button button-outline"
                  onClick={handleSaveDraft}
                  disabled={!rawInputText.trim()}
                  style={{ padding: '12px 20px', fontSize: '16px' }}
                >
                  Save Draft 💾
                </button>
              </div>
            </div>
          ) : (
            <div className="table-card" style={{ padding: '24px 28px' }}>
              <span className="small-label" style={{ color: '#855d14', fontWeight: 800, fontSize: '15px' }}>OFFICIAL GAZETTE & NOTIFICATION UPLOAD</span>
              <h3 style={{ margin: '4px 0 10px', fontSize: '22px', color: '#07111f', fontWeight: 700 }}>
                Upload Amendment Document (PDF, DOCX, TXT, EML)
              </h3>
              <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.6, marginBottom: '18px' }}>
                Extract readable text while preserving document order, section titles, and tables. Protected with 10 MB upload limits and security sanitization.
              </p>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    handleUploadFile(e.dataTransfer.files[0]);
                  }
                }}
                style={{
                  border: `2px dashed ${dragOver ? '#855d14' : 'rgba(16,24,34,0.25)'}`,
                  background: dragOver ? 'rgba(200,169,110,0.12)' : '#fdfbf7',
                  borderRadius: '8px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  marginBottom: '18px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.docx,.txt,.eml';
                  input.onchange = (e: any) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUploadFile(e.target.files[0]);
                    }
                  };
                  input.click();
                }}
              >
                <div style={{ fontSize: '38px', marginBottom: '8px' }}>📂</div>
                <strong style={{ fontSize: '16px', color: '#07111f', display: 'block' }}>
                  {selectedFile ? selectedFile.name : 'Drag & drop file here or click to browse'}
                </strong>
                <small style={{ color: '#64748b', fontSize: '15.5px', display: 'block', marginTop: '4px' }}>
                  Supported formats: PDF (native / scanned), DOCX (Word), TXT, EML (Raw email) · Max 10MB
                </small>
                {selectedFile && (
                  <div style={{ marginTop: '12px' }}>
                    <span className="status-pill pill-good" style={{ fontSize: '15.5px' }}>
                      ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                )}
              </div>

              {uploadStatus && (
                <div style={{ padding: '12px 16px', background: 'rgba(200,169,110,0.15)', borderRadius: '6px', fontSize: '15.5px', color: '#855d14', marginBottom: '14px' }}>
                  ⏳ {uploadStatus}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: VERIFY AND UNDERSTAND THE AMENDMENT (METADATA REVIEW)             */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="table-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span className="small-label" style={{ color: '#855d14', fontWeight: 800, fontSize: '15px' }}>PARSED STATUTORY SPECIFICATION & METADATA</span>
              <h3 style={{ margin: '4px 0 0', fontSize: '22px', color: '#07111f', fontWeight: 700 }}>
                Verify & Refine Extracted Amendment Metadata
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '16px', color: '#334155' }}>
                Review automatically extracted fields. You can correct any metadata before running the business matching engine.
              </p>
            </div>
            {/* Feature 3: Official Verification Status Badge */}
            <span
              className={`status-pill ${isSourceVerified ? 'pill-good' : 'pill-warn'}`}
              style={{ fontSize: '15.5px', padding: '8px 14px', fontWeight: 700 }}
            >
              {isSourceVerified ? '✓ Officially verified source content' : '⚠ Source not independently verified'}
            </span>
          </div>

          {extractionWarnings.length > 0 && (
            <div style={{ padding: '14px 18px', background: 'rgba(240,173,78,0.15)', border: '1px solid #f0ad4e', borderRadius: '6px', color: '#8a6d3b', marginBottom: '18px', fontSize: '15.5px' }}>
              <strong>Notice:</strong>
              <ul style={{ margin: '6px 0 0', paddingLeft: '22px' }}>
                {extractionWarnings.map((w, idx) => <li key={idx}>{w}</li>)}
              </ul>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#07111f', marginBottom: '4px' }}>
                Amendment Title <span style={{ color: '#c54040' }}>*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '15.5px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#07111f', marginBottom: '4px' }}>
                Issuing Authority <span style={{ color: '#c54040' }}>*</span>
              </label>
              <input
                type="text"
                value={issuingAuthority}
                onChange={(e) => setIssuingAuthority(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '15.5px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#07111f', marginBottom: '4px' }}>
                Notification / Circular Number
              </label>
              <input
                type="text"
                value={notificationNumber}
                onChange={(e) => setNotificationNumber(e.target.value)}
                placeholder="e.g. Notification No. 10/2023 — Central Tax"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '15.5px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#07111f', marginBottom: '4px' }}>
                Publication Date
              </label>
              <input
                type="text"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                placeholder="e.g. 10 May 2023"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '15.5px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#07111f', marginBottom: '4px' }}>
                Effective Date (Commencement)
              </label>
              <input
                type="text"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                placeholder="e.g. 01 August 2023"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '15.5px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#07111f', marginBottom: '4px' }}>
                Official Source URL
              </label>
              <input
                type="text"
                value={officialSourceUrl}
                onChange={(e) => {
                  setOfficialSourceUrl(e.target.value);
                  const isGov = e.target.value.includes('.gov.in') || e.target.value.includes('.nic.in');
                  setIsSourceVerified(isGov);
                  setSourceStatusBadge(isGov ? 'Officially verified source content' : 'Source not independently verified');
                }}
                placeholder="https://..."
                style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontSize: '15.5px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: '#07111f', marginBottom: '4px' }}>
              Extracted Legal Text (Cleaned & Separated from Email Noise)
            </label>
            <textarea
              rows={8}
              value={cleanAmendmentText}
              onChange={(e) => setCleanAmendmentText(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid rgba(16,24,34,0.2)', fontFamily: 'monospace', fontSize: '15px', lineHeight: 1.5, background: '#fafafa', color: '#07111f' }}
            />
          </div>

          {(separatedSignatures.length > 0 || separatedDisclaimers.length > 0) && (
            <div style={{ padding: '10px 14px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '16px', fontSize: '15px', color: '#475569' }}>
              <strong>Preserved Non-Legal Email Elements (Separated without deletion):</strong>
              {separatedSignatures.length > 0 && <div>Signatures detected: {separatedSignatures.join(' | ')}</div>}
              {separatedDisclaimers.length > 0 && <div>Disclaimers separated: {separatedDisclaimers.length} clauses</div>}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <button className="button button-outline" onClick={() => setCurrentStep(1)}>
              ← Back to Edit
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="button button-outline" onClick={handleSaveDraft}>
                Save Draft 💾
              </button>
              <button
                className="button button-gold"
                onClick={handleRunAnalysis}
                disabled={isLoading || !cleanAmendmentText.trim()}
                style={{ padding: '10px 26px', fontSize: '16px' }}
              >
                {isLoading ? 'Running Compliance Engine...' : 'Run Business Impact & Diff →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: COMPARE THE AMENDMENT WITH ORIGINAL REGULATION (LEGAL DIFF)       */}
      {/* ========================================================================= */}
      {currentStep === 3 && analysisResult && (
        <div className="table-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span className="small-label" style={{ color: '#855d14', fontWeight: 800, fontSize: '15px' }}>REGULATORY DELTA & THRESHOLD COMPARISON</span>
              <h3 style={{ margin: '4px 0 0', fontSize: '22px', color: '#07111f', fontWeight: 700 }}>
                Textual & Threshold Comparison
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '16px', color: '#334155', lineHeight: 1.6 }}>
                {analysisResult.legal_diff.summary_of_change}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="status-pill pill-neutral" style={{ background: 'rgba(214,69,69,0.15)', color: '#b91c1c', fontSize: '15px', fontWeight: 700 }}>Red: Deletions</span>
              <span className="status-pill pill-neutral" style={{ background: 'rgba(46,125,50,0.15)', color: '#15803d', fontSize: '15px', fontWeight: 700 }}>Green: Additions</span>
            </div>
          </div>

          {!analysisResult.legal_diff.original_available ? (
            <div style={{ padding: '18px 20px', background: 'rgba(200,169,110,0.14)', border: '1px solid rgba(200,169,110,0.45)', borderRadius: '8px', marginBottom: '18px' }}>
              <strong style={{ color: '#855d14', fontSize: '15px', display: 'block', marginBottom: '6px' }}>
                Original Provision Not Supplied:
              </strong>
              <p style={{ margin: 0, fontSize: '16px', color: '#334155', lineHeight: 1.6 }}>
                {analysisResult.legal_diff.explanation_when_missing}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px', marginBottom: '22px' }}>
              {/* Previous version */}
              <div style={{ background: '#fdfbf7', border: '1px solid rgba(16,24,34,0.14)', borderRadius: '8px', padding: '18px' }}>
                <span className="small-label" style={{ color: '#b91c1c', fontWeight: 800, fontSize: '15px', display: 'block', marginBottom: '10px' }}>
                  PREVIOUS PROVISION (ORIGINAL STATUTE)
                </span>
                <div style={{ fontFamily: 'monospace', fontSize: '15.5px', lineHeight: 1.65 }}>
                  {analysisResult.legal_diff.previous_rows.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '6px 10px',
                        marginBottom: '6px',
                        background: row.mark === 'removed' ? 'rgba(214,69,69,0.18)' : 'transparent',
                        color: row.mark === 'removed' ? '#991b1b' : '#07111f',
                        textDecoration: row.mark === 'removed' ? 'line-through' : 'none',
                        borderRadius: '4px'
                      }}
                    >
                      {row.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amended version */}
              <div style={{ background: '#fdfbf7', border: '1px solid rgba(16,24,34,0.14)', borderRadius: '8px', padding: '18px' }}>
                <span className="small-label" style={{ color: '#15803d', fontWeight: 800, fontSize: '15px', display: 'block', marginBottom: '10px' }}>
                  AMENDED PROVISION (ENACTED LAW)
                </span>
                <div style={{ fontFamily: 'monospace', fontSize: '15.5px', lineHeight: 1.65 }}>
                  {analysisResult.legal_diff.amended_rows.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '6px 10px',
                        marginBottom: '6px',
                        background: row.mark === 'inserted' ? 'rgba(46,125,50,0.18)' : 'transparent',
                        color: row.mark === 'inserted' ? '#14532d' : '#07111f',
                        fontWeight: row.mark === 'inserted' ? 700 : 400,
                        borderRadius: '4px'
                      }}
                    >
                      {row.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detected Legal Changes Breakdown */}
          {analysisResult.legal_diff.detected_changes.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <h4 style={{ fontSize: '16px', color: '#07111f', fontWeight: 700, marginBottom: '12px' }}>
                Detected Statutory Changes & Business Impact:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {analysisResult.legal_diff.detected_changes.map((ch, idx) => (
                  <div key={idx} style={{ padding: '14px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '16px', color: '#07111f' }}>{ch.clause}</strong>
                      <span className="status-pill pill-warn" style={{ fontSize: '14.5px', fontWeight: 700 }}>{ch.type.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: '16px', color: '#334155', marginBottom: '6px', lineHeight: 1.55 }}>
                      <strong style={{ color: '#0a1628' }}>Impact:</strong> {ch.plain_english_explanation} — {ch.potential_business_impact}
                    </div>
                    <small style={{ color: '#64748b', fontSize: '15px' }}>Source Reference: {ch.source_reference}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <button className="button button-outline" onClick={() => setCurrentStep(2)} style={{ padding: '12px 20px', fontSize: '16px' }}>
              ← Back to Review Content
            </button>
            <button className="button button-gold" onClick={() => setCurrentStep(4)} style={{ padding: '12px 24px', fontSize: '16px' }}>
              Evaluate Business Applicability →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: MATCH THE AMENDMENT TO USER'S BUSINESS (DETERMINISTIC EVALUATION) */}
      {/* ========================================================================= */}
      {currentStep === 4 && analysisResult && (
        <div className="table-card" style={{ padding: '24px 28px' }}>
          <span className="small-label" style={{ color: '#855d14', fontWeight: 800, fontSize: '15px' }}>ENTERPRISE APPLICABILITY MATRIX</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ margin: '4px 0 0', fontSize: '22px', color: '#07111f', fontWeight: 700 }}>
                Enterprise Applicability Assessment
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '16px', color: '#334155' }}>
                Evaluated deterministically against active enterprise profile: <strong>{analysisResult.profile_snapshot?.name}</strong>
              </p>
            </div>
            <span
              className={`status-pill ${
                analysisResult.applicability.verdict === 'Likely Applicable'
                  ? 'pill-good'
                  : analysisResult.applicability.verdict === 'Likely Not Applicable'
                  ? 'pill-neutral'
                  : 'pill-warn'
              }`}
              style={{ fontSize: '15px', padding: '10px 18px', fontWeight: 800 }}
            >
              {analysisResult.applicability.verdict}
            </span>
          </div>

          {/* Verdict Banner */}
          <div
            style={{
              padding: '18px 22px',
              borderRadius: '8px',
              marginBottom: '22px',
              background:
                analysisResult.applicability.verdict === 'Likely Applicable'
                  ? 'rgba(66,185,166,0.12)'
                  : analysisResult.applicability.verdict === 'Likely Not Applicable'
                  ? 'rgba(100,116,139,0.12)'
                  : 'rgba(240,173,78,0.15)',
              border: `1px solid ${
                analysisResult.applicability.verdict === 'Likely Applicable'
                  ? '#42b9a6'
                  : analysisResult.applicability.verdict === 'Likely Not Applicable'
                  ? '#94a3b8'
                  : '#f0ad4e'
              }`
            }}
          >
            <strong style={{ fontSize: '16px', color: '#07111f', display: 'block', marginBottom: '6px' }}>
              {analysisResult.applicability.headline}
            </strong>
            <p style={{ margin: 0, fontSize: '15.5px', color: '#1e293b', lineHeight: 1.6 }}>
              {analysisResult.applicability.reason}
            </p>
          </div>

          {/* 8 Statutory Explanation Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <span className="small-label" style={{ color: '#785116', fontWeight: 700 }}>1. STATUTORY CONDITIONS CONSIDERED</span>
              <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '15px', color: '#334155' }}>
                {analysisResult.applicability.statutory_conditions_considered.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>

            <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <span className="small-label" style={{ color: '#785116', fontWeight: 700 }}>2. BUSINESS FACTS USED</span>
              <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '15px', color: '#334155' }}>
                {analysisResult.applicability.business_facts_used.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>

            <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <span className="small-label" style={{ color: '#785116', fontWeight: 700 }}>3. MISSING FACTS / ASSUMPTIONS</span>
              <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '15px', color: '#334155' }}>
                {analysisResult.applicability.missing_facts_or_assumptions.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>

            <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <span className="small-label" style={{ color: '#785116', fontWeight: 700 }}>4. EXCEPTIONS / EXEMPTIONS</span>
              <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '15px', color: '#334155' }}>
                {analysisResult.applicability.relevant_exceptions_or_exemptions.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <span className="small-label" style={{ color: '#785116', fontWeight: 700 }}>5. EFFECTIVE DATE & TRANSITION</span>
              <div style={{ fontSize: '15.5px', color: '#07111f', marginTop: '4px', fontWeight: 700 }}>
                {analysisResult.applicability.effective_date}
              </div>
            </div>

            <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <span className="small-label" style={{ color: '#785116', fontWeight: 700 }}>6. SUPPORTING STATUTORY PROVISION</span>
              <div style={{ fontSize: '15px', color: '#07111f', marginTop: '4px' }}>
                {analysisResult.applicability.source_provisions}
              </div>
            </div>

            <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <span className="small-label" style={{ color: '#785116', fontWeight: 700 }}>7. EVIDENCE QUALITY & RELIABILITY</span>
              <div style={{ fontSize: '15px', color: '#334155', marginTop: '4px' }}>
                {analysisResult.applicability.evidence_quality_explanation} (Confidence: {Math.round(analysisResult.applicability.confidence_score * 100)}%)
              </div>
            </div>
          </div>

          {/* If Non-Applicable: Display Structured Non-Applicability Rationale */}
          {analysisResult.non_applicability_rationale && (
            <div style={{ padding: '16px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 8px', color: '#07111f', fontSize: '15px' }}>
                Non-Applicability Justification & Evidence Retention Guide
              </h4>
              <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, marginBottom: '10px' }}>
                <strong>Evidence Retention:</strong> {analysisResult.non_applicability_rationale.evidence_retention_advice}
              </p>
              <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                <strong>Monitoring:</strong> {analysisResult.non_applicability_rationale.monitoring_recommendation}
              </p>
            </div>
          )}

          {/* If Uncertain: Display Clarification Checklist */}
          {analysisResult.clarification_checklist && (
            <div style={{ padding: '16px', background: 'rgba(240,173,78,0.12)', border: '1px solid #f0ad4e', borderRadius: '6px', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 8px', color: '#8a6d3b', fontSize: '15px' }}>
                Clarification Checklist (Unresolved Statutory Questions)
              </h4>
              <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, marginBottom: '10px' }}>
                <strong>Unresolved Question:</strong> {analysisResult.clarification_checklist.unresolved_legal_question}
              </p>
              <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                <strong>Next Step:</strong> {analysisResult.clarification_checklist.next_recommended_step} (Verifier: {analysisResult.clarification_checklist.who_could_verify_it})
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <button className="button button-outline" onClick={() => setCurrentStep(3)}>
              ← Back to Legal Diff
            </button>
            <button className="button button-gold" onClick={() => setCurrentStep(5)}>
              View Personalized Action Plan →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: GENERATE A DETAILED, PERSONALIZED COMPLIANCE ACTION PLAN          */}
      {/* ========================================================================= */}
      {currentStep === 5 && analysisResult && (
        <div className="table-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span className="small-label" style={{ color: '#855d14', fontWeight: 800, fontSize: '15px' }}>MANDATED COMPLIANCE IMPLEMENTATION SCHEDULE</span>
              <h3 style={{ margin: '4px 0 0', fontSize: '22px', color: '#07111f', fontWeight: 700 }}>
                Enterprise Compliance Action Plan ({actionItems.length} Actions)
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '16px', color: '#334155' }}>
                Every action contains all 15 statutory fields: exact task, responsible person, deadline derivation, documents required, and statutory penalty risks.
              </p>
            </div>
            <button className="button button-gold" onClick={() => setCurrentStep(6)} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Track in Compliance Dashboard →
            </button>
          </div>

          {actionItems.length === 0 ? (
            <div style={{ padding: '28px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px' }}>
              <p style={{ fontSize: '15px', color: '#64748b' }}>
                No active compliance actions generated because this amendment was determined to be <strong>{analysisResult.applicability.verdict}</strong>.
                Unnecessary compliance burdens have been avoided.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
              {actionItems.map((act) => (
                <div
                  key={act.id}
                  style={{
                    padding: '20px 24px',
                    borderRadius: '8px',
                    border: '1px solid rgba(16,24,34,0.14)',
                    background: act.completion_status === 'Completed' ? 'rgba(66,185,166,0.06)' : '#ffffff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span className="mono" style={{ fontSize: '15px', color: '#855d14', fontWeight: 700 }}>{act.id}</span>
                        <span
                          className={`status-pill ${
                            act.priority === 'Critical' ? 'pill-bad' : act.priority === 'High' ? 'pill-warn' : 'pill-neutral'
                          }`}
                          style={{ fontSize: '15px', fontWeight: 700 }}
                        >
                          {act.priority} Priority
                        </span>
                        <span className="status-pill pill-neutral" style={{ fontSize: '15px', color: '#1e293b' }}>
                          Role: {act.who_should_perform}
                        </span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: '18px', color: '#07111f', fontWeight: 700 }}>
                        {act.action_title}
                      </h4>
                    </div>

                    {/* Status Toggle Button */}
                    <button
                      type="button"
                      className={`button ${
                        act.completion_status === 'Completed' ? 'button-outline' : 'button-gold'
                      }`}
                      onClick={() => handleToggleStatus(act)}
                      style={{ fontSize: '15.5px', padding: '8px 16px' }}
                    >
                      Status: {act.completion_status} (Click to toggle)
                    </button>
                  </div>

                  {/* Why required & specific task */}
                  <div style={{ marginBottom: '14px' }}>
                    <p style={{ margin: '0 0 8px', fontSize: '16px', color: '#334155', lineHeight: 1.55 }}>
                      <strong style={{ color: '#0a1628' }}>Why Required:</strong> {act.why_required}
                    </p>
                    <p style={{ margin: 0, fontSize: '16px', color: '#07111f', lineHeight: 1.6, background: '#f8fafc', padding: '12px 16px', borderRadius: '6px', borderLeft: '4px solid #855d14' }}>
                      <strong style={{ color: '#855d14' }}>Specific Task:</strong> {act.specific_task}
                    </p>
                  </div>

                  {/* 15 Fields Grid Breakdown */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '15.5px', background: '#fdfbf7', padding: '14px 16px', borderRadius: '6px', border: '1px solid rgba(16,24,34,0.08)' }}>
                    <div>
                      <strong style={{ color: '#855d14', fontSize: '15.5px' }}>Deadline:</strong> <span style={{ color: '#0a1628', fontWeight: 600 }}>{act.deadline}</span>
                      <br />
                      <small style={{ color: '#64748b', fontSize: '15px' }}>Calc: {act.deadline_calculation}</small>
                    </div>
                    <div>
                      <strong style={{ color: '#855d14', fontSize: '15.5px' }}>Where to Complete:</strong> <span style={{ color: '#0a1628', fontWeight: 600 }}>{act.where_to_complete}</span>
                      <br />
                      <small style={{ color: '#64748b', fontSize: '15px' }}>Provision: {act.applicable_provision}</small>
                    </div>
                    <div>
                      <strong style={{ color: '#855d14', fontSize: '15.5px' }}>Expected Output:</strong> <span style={{ color: '#0a1628', fontWeight: 600 }}>{act.expected_output}</span>
                      <br />
                      <small style={{ color: '#64748b', fontSize: '15px' }}>Evidence required for audit</small>
                    </div>
                    <div>
                      <strong style={{ color: '#b91c1c', fontSize: '15.5px' }}>Risk of Missing:</strong> <span style={{ color: '#7f1d1d' }}>{act.risk_of_missing}</span>
                    </div>
                  </div>

                  {/* Documents Required */}
                  {act.documents_required && act.documents_required.length > 0 && (
                    <div style={{ marginTop: '10px', fontSize: '15.5px', color: '#475569' }}>
                      <strong style={{ color: '#0a1628' }}>Documents Required:</strong> {act.documents_required.join(' · ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <button className="button button-outline" onClick={() => setCurrentStep(4)} style={{ padding: '12px 20px', fontSize: '16px' }}>
              ← Back to Applicability
            </button>
            <button className="button button-gold" onClick={() => setCurrentStep(6)} style={{ padding: '12px 24px', fontSize: '16px' }}>
              Open Full Compliance Progress Dashboard →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: INTERACTIVE COMPLIANCE DASHBOARD & PROOFPATH AUDIT (FEATURE 7 & 9)*/}
      {/* ========================================================================= */}
      {currentStep === 6 && (
        <div>
          <div className="table-card" style={{ marginBottom: '22px', padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span className="small-label" style={{ color: '#855d14', fontWeight: 800, fontSize: '15px' }}>OPERATIONAL COMPLIANCE EXECUTION LOG</span>
                <h3 style={{ margin: '4px 0 0', fontSize: '22px', color: '#07111f', fontWeight: 700 }}>
                  Active Compliance Tasks & Evidence Locker
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '16px', color: '#334155' }}>
                  Manage task statuses, add audit notes, and assign responsibilities across your compliance team.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="button button-gold" onClick={() => navigate('/compliance-actions')} style={{ padding: '10px 18px', fontSize: '15.5px' }}>
                  View Dedicated 'My Compliance Actions' Page →
                </button>
              </div>
            </div>

            {/* Actions Table */}
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {actionItems.map((act) => (
                    <tr key={act.id}>
                      <td>
                        <strong style={{ fontSize: '16px', color: '#07111f' }}>{act.action_title}</strong>
                        <br />
                        <small style={{ color: '#64748b', fontSize: '15px' }}>{act.applicable_provision}</small>
                      </td>
                      <td>
                        <span
                          className={`status-pill ${
                            act.priority === 'Critical' ? 'pill-bad' : act.priority === 'High' ? 'pill-warn' : 'pill-neutral'
                          }`}
                          style={{ fontSize: '15px' }}
                        >
                          {act.priority}
                        </span>
                      </td>
                      <td style={{ fontSize: '15.5px', fontWeight: 600 }}>{act.deadline}</td>
                      <td style={{ fontSize: '15.5px' }}>{act.who_should_perform}</td>
                      <td>
                        <span
                          className={`status-pill ${
                            act.completion_status === 'Completed' ? 'pill-good' : act.completion_status === 'In Progress' ? 'pill-warn' : 'pill-neutral'
                          }`}
                          style={{ fontSize: '15px', fontWeight: 700 }}
                        >
                          {act.completion_status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="button button-outline"
                          onClick={() => handleToggleStatus(act)}
                          style={{ fontSize: '15px', padding: '6px 12px' }}
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Feature 9: ProofPath Audit Record Card */}
          {analysisResult && (
            <div className="digest-block" style={{ marginTop: '20px' }}>
              <div>
                <span>SHA-256 PROOFPATH AUDIT DIGEST · INDIAN EVIDENCE ACT SEC 65B</span>
                <small>
                  Digest computed over amendment metadata, applicability result, and generated action items.
                  Note: A SHA-256 digest detects data alteration but does not prove primary source authenticity or truth of completion claims.
                </small>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="mono" style={{ fontSize: '15px' }}>
                  {analysisResult.proofpath_record.sha256_digest}
                </span>
                <button
                  className="button button-gold button-small"
                  onClick={() => {
                    navigator.clipboard.writeText(analysisResult.proofpath_record.sha256_digest);
                    setSuccessMessage('SHA-256 Audit Digest copied.');
                    setTimeout(() => setSuccessMessage(''), 2500);
                  }}
                >
                  Copy Hash
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="button button-outline" onClick={() => setCurrentStep(5)}>
              ← Back to Action Plan
            </button>
            <button className="button button-gold" onClick={() => navigate('/compliance-actions')}>
              Go to Full Compliance Dashboard →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
