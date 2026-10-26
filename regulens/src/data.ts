export type RegulationRecord = {
  id: string;
  title: string;
  authority: string;
  published: string;
  effective: string;
  impact: 'High' | 'Medium' | 'Low';
  status: 'Verified source' | 'Review required' | 'Source linked';
  summary: string;
};

export const regulations: RegulationRecord[] = [
  {
    id: 'CASE_A_GST_E_INVOICING',
    title: 'GST e-invoicing threshold amendment',
    authority: 'CBIC / GST Council',
    published: '10 May 2023',
    effective: '01 Aug 2023',
    impact: 'High',
    status: 'Verified source',
    summary: 'Turnover threshold lowered from ₹10 Crore to ₹5 Crore under Rule 48(4) for mandatory B2B e-invoicing.',
  },
  {
    id: 'CASE_C_MCA_DIRECTOR_KYC',
    title: 'MCA Director KYC deadline extension',
    authority: 'Ministry of Corporate Affairs',
    published: '30 Apr 2019',
    effective: '30 Apr 2019',
    impact: 'Medium',
    status: 'Source linked',
    summary: 'Substituted 30 June for 30 April for annual DIR-3 KYC filing deadline under Rule 12A.',
  },
  {
    id: 'CASE_B_MAHARASHTRA_WAGES',
    title: 'Maharashtra factory minimum wages revision',
    authority: 'Maharashtra Labour Department',
    published: '20 Jul 2010',
    effective: '20 Jul 2010',
    impact: 'Medium',
    status: 'Review required',
    summary: 'Revised basic monthly wage rates across Zones I, II, and III for factory employment.',
  },
  {
    id: 'GST_CIRCULAR_198_2023',
    title: 'E-invoicing applicability for Government/TDS entities',
    authority: 'CBIC / GST Policy Wing',
    published: '17 Jul 2023',
    effective: 'Immediate',
    impact: 'Low',
    status: 'Source linked',
    summary: 'Clarification regarding supply to entities registered solely for TDS under Section 51.',
  },
];

export const assessments = [
  { regulation: 'GST e-invoicing threshold amendment', business: 'Apex Precision Components Pvt Ltd', verdict: 'Applicable', evidence: 'Notification 10/2023-CT · Rule 48(4)' },
  { regulation: 'MCA Director KYC deadline extension', business: 'Apex Precision Components Pvt Ltd', verdict: 'Review Required', evidence: 'G.S.R. 339(E) · Rule 12A' },
  { regulation: 'Maharashtra factory minimum wages revision', business: 'Apex Precision Components Pvt Ltd', verdict: 'Applicable', evidence: 'MWA-42010/CR-1301/Lab-7 · Zone I' },
];

export const profile = {
  name: 'Apex Precision Components Pvt Ltd',
  sector: 'Industrial manufacturing (NIC 2930)',
  state: 'Maharashtra',
  operating_states: ['Maharashtra', 'Karnataka'],
  turnover: 82000000, // ₹8.2 Crore
  employees: 24,
  gstin: '27AAQCA****1ZK',
};

export const comparison = {
  notification: 'Notification No. 10/2023 — Central Tax',
  date: '10 May 2023 (Effective: 01 Aug 2023)',
  citation: 'CBIC · CGST Rules, 2017 · Rule 48(4) · Official Gazette',
  official_url: 'https://gstcouncil.gov.in/node/4365',
  previous: [
    { no: '1', text: 'In Notification No. 13/2020-Central Tax, in the first paragraph, for the words', mark: 'normal' },
    { no: '2', text: '₹10 crore [ten crore rupees]', mark: 'removed' },
    { no: '3', text: 'the words shall be substituted with effect from the 1st day of August, 2023.', mark: 'normal' },
  ],
  amended: [
    { no: '1', text: 'In Notification No. 13/2020-Central Tax, in the first paragraph, for the words', mark: 'normal' },
    { no: '2', text: '₹5 crore [five crore rupees]', mark: 'inserted' },
    { no: '3', text: 'the words shall be substituted with effect from the 1st day of August, 2023.', mark: 'normal' },
  ],
};

export interface RegionalBriefing {
  title: string;
  verdict: string;
  summary: string;
  actions: string[];
  disclaimer: string;
}

export const regionalBriefings: Record<'en' | 'kn' | 'hi', RegionalBriefing> = {
  en: {
    title: 'Mandatory E-Invoicing Threshold Lowered to ₹5 Crore',
    verdict: 'Applicable',
    summary: 'Notification 10/2023 mandates electronic invoicing for all registered B2B suppliers with turnover exceeding ₹5 Crore, effective 1 August 2023. You must upgrade billing software to generate IRN invoices.',
    actions: [
      'Register on the Invoice Registration Portal (IRP).',
      'Ensure billing software embeds IRN and Signed QR Code on all B2B tax invoices.',
      'Verify buyer GSTINs to safeguard their Input Tax Credit (ITC).'
    ],
    disclaimer: 'Notification No. 10/2023-Central Tax · CGST Rule 48(4)'
  },
  kn: {
    title: 'E-Invoicing ಮಿತಿಯನ್ನು ₹5 ಕೋಟಿಗೆ ಇಳಿಸಲಾಗಿದೆ',
    verdict: 'ಅನ್ವಯಿಸುತ್ತದೆ (Applicable)',
    summary: 'Notification 10/2023 ರ ಪ್ರಕಾರ, ₹5 ಕೋಟಿಗಿಂತ ಹೆಚ್ಚು ವಹಿವಾಟು (Turnover) ಹೊಂದಿರುವ B2B ಪೂರೈಕೆದಾರರಿಗೆ 1 ಆಗಸ್ಟ್ 2023 ರಿಂದ E-Invoicing ಕಡ್ಡಾಯವಾಗಿದೆ. ನಿಮ್ಮ ಬಿಲ್ಲಿಂಗ್ ಸಾಫ್ಟ್‌ವೇರ್ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ.',
    actions: [
      'Invoice Registration Portal (IRP) ನಲ್ಲಿ ಲಾಗಿನ್ ಸಕ್ರಿಯಗೊಳಿಸಿ.',
      'ಎಲ್ಲಾ B2B ಬಿಲ್‌ಗಳಲ್ಲಿ IRN ಮತ್ತು QR Code ಮುದ್ರಿಸಲು Billing Software update ಮಾಡಿ.',
      'ಗ್ರಾಹಕರ Input Tax Credit (ITC) ತೊಂದರೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.'
    ],
    disclaimer: 'Notification No. 10/2023-Central Tax · CGST Rule 48(4)'
  },
  hi: {
    title: 'E-Invoicing की सीमा घटाकर ₹5 करोड़ की गई',
    verdict: 'लागू होता है (Applicable)',
    summary: 'Notification 10/2023 के तहत 1 अगस्त 2023 से ₹5 करोड़ से अधिक Turnover वाले सभी B2B कारोबारियों के लिए E-Invoice अनिवार्य है. अपने बिलिंग सॉफ्टवेयर को समय पर अपडेट करें.',
    actions: [
      'Invoice Registration Portal (IRP) पर खाता सक्रिय करें.',
      'सभी B2B इनवॉइस पर IRN और QR Code प्रिंट करने हेतु Billing Software अपडेट करें.',
      'ग्राहकों का Input Tax Credit (ITC) सुरक्षित रखने के लिए समय पर ई-इनवॉइस जारी करें.'
    ],
    disclaimer: 'Notification No. 10/2023-Central Tax · CGST Rule 48(4)'
  }
};

export const digest = '7a2e 9f14 0b82 6cde 1a9c 4f7d 8b3a 1e20 5f9d 88a0 3e71 b28c 9c14 3ab5 1d70 6e82';
