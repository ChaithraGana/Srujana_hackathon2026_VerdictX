// ReguLens Comprehensive Internationalization (i18n) Engine
// Supports English (en), Kannada (kn - Host Affinity), and Hindi (hi)

export type Language = 'en' | 'kn' | 'hi';

export interface Translations {
  // Navigation & Shell
  brandTagline: string;
  demoWorkspace: string;
  demoOnline: string;
  workspaceSettings: string;
  operationsLead: string;
  demoData: string;
  operationalView: string;
  evidenceLedAssessment: string;
  backToHome: string;
  signIn: string;
  getStarted: string;
  enterWorkspace: string;
  skipIntro: string;
  explorePlatform: string;
  
  // Navigation Menu
  navOverview: string;
  navObservatory: string;
  navApplicability: string;
  navSimulator: string;
  navProofPath: string;
  navMSME: string;

  // Landing Page
  heroEyebrow: string;
  heroTitle1: string;
  heroTitle2: string;
  heroLede: string;
  heroOriginal: string;
  heroAmended: string;
  heroPreviousText: string;
  heroAmendedText: string;
  openObservatory: string;
  threeQuestionsEyebrow: string;
  threeQuestionsTitle1: string;
  threeQuestionsTitle2: string;
  threeQuestionsLede: string;
  
  // Story Cards
  story1Eyebrow: string;
  story1Title: string;
  story1Body: string;
  story2Eyebrow: string;
  story2Title: string;
  story2Body: string;
  story3Eyebrow: string;
  story3Title: string;
  story3Body: string;

  // Dashboard Page
  welcomeEyebrow: string;
  welcomeTitle1: string;
  welcomeTitle2: string;
  welcomeLede: string;
  activeProfile: string;
  analyzeUpdate: string;
  backendRibbon: string;
  viewBenchmark: string;
  hideBenchmark: string;
  benchmarkTitle: string;
  benchmarkSub: string;
  metricChanges: string;
  metricApplicable: string;
  metricActions: string;
  metricDeadlines: string;
  signalDeskEyebrow: string;
  signalDeskTitle: string;
  searchPlaceholder: string;
  allImpact: string;
  sortLatest: string;
  sortImpact: string;
  colRegulation: string;
  colAuthority: string;
  colPublished: string;
  colEffective: string;
  colImpact: string;
  colVerification: string;
  recentReasoningEyebrow: string;
  recentReasoningTitle: string;
  viewApplicability: string;

  // Comparison / Observatory
  observatoryEyebrow: string;
  observatoryTitle1: string;
  observatoryTitle2: string;
  verifiedRecord: string;
  statutoryComparison: string;
  statutoryComparisonLede: string;
  prevProvision: string;
  amendedProvision: string;
  changeTrace: string;
  regionalBriefingLabel: string;
  whatChangedTitle: string;
  whatChangedDesc: string;
  whyMattersTitle: string;
  whyMattersDesc: string;
  whatStayedTitle: string;
  whatStayedDesc: string;
  nextQuestionPrompt: string;
  runApplicabilityCheck: string;

  // Applicability Page
  whereStandEyebrow: string;
  whereStandTitle1: string;
  whereStandTitle2: string;
  deterministicEval: string;
  testScenarioBtn: string;
  viewProofPathBtn: string;
  whyVerdictTitle: string;
  conditionsChecked: string;
  rowThreshold: string;
  rowThresholdVal: string;
  rowAttribute: string;
  rowAttributeVal: string;
  rowSuppliedVal: string;
  rowOutcome: string;
  rowOutcomeVal: string;
  rowPanStatus: string;
  rowPanStatusVal: string;
  rowCitation: string;
  applicabilityNote: string;
  readyForRecord: string;
  createRecordBtn: string;

  // Simulator Page
  simEyebrow: string;
  simTitle1: string;
  simTitle2: string;
  resetProfileBtn: string;
  scenarioHeading: string;
  aggregateTurnover: string;
  employeeCount: string;
  operatingStates: string;
  selectAllApply: string;
  statutoryExclusions: string;
  sezExclusionLabel: string;
  historyVerification: string;
  evidenceStatus: string;
  liveAssessmentEyebrow: string;
  liveUpdatesIndicator: string;
  deterministicOutcome: string;
  changedConditionLabel: string;
  thresholdUsed: string;
  profileTurnover: string;
  statesSelected: string;
  simDisclaimer: string;
  saveToProofPath: string;

  // ProofPath Page
  proofEyebrow: string;
  proofTitle1: string;
  proofTitle2: string;
  recordVerifiedBadge: string;
  recordIdLabel: string;
  timestampLabel: string;
  resultLabel: string;
  verificationLabel: string;
  sourceDocHeading: string;
  gazetteLinked: string;
  shaDigestLabel: string;
  shaDigestDesc: string;
  copyDigest: string;
  copied: string;
  snapshotHeading: string;
  actionRecordHeading: string;
  nextSteps: string;
  traceabilityHeading: string;
  traceabilityDesc: string;
  markReviewedBtn: string;
  reviewedNoted: string;
  readyForReview: string;
  proofDisclaimer: string;

  // Footer & Common
  footerCopyright: string;
  footerDemoNote: string;
  finePrint: string;
  applicable: string;
  notApplicable: string;
  reviewRequired: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    brandTagline: 'REGULATORY INTELLIGENCE',
    demoWorkspace: 'ACTIVE WORKSPACE',
    demoOnline: 'ENTERPRISE WORKSPACE ONLINE',
    workspaceSettings: 'Workspace settings',
    operationsLead: 'Operations lead',
    demoData: '',
    operationalView: 'Operational view',
    evidenceLedAssessment: 'Evidence-led assessment',
    backToHome: 'Back to home',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    enterWorkspace: 'Enter ReguLens',
    skipIntro: 'Skip intro',
    explorePlatform: 'Explore the platform',

    navOverview: 'Overview',
    navObservatory: 'Document observatory',
    navApplicability: 'Applicability',
    navSimulator: 'What-If simulator',
    navProofPath: 'ProofPath evidence',
    navMSME: 'MSME Verification',

    heroEyebrow: 'Regulatory intelligence for Indian business',
    heroTitle1: 'Every change.',
    heroTitle2: 'A clearer path forward.',
    heroLede: 'Understand what changed. Discover what applies to your business. Know what to do next with verifiable ground-truth evidence.',
    heroOriginal: 'Original provision',
    heroAmended: 'Amended provision',
    heroPreviousText: 'Previous threshold wording, shown in red as removed text.',
    heroAmendedText: 'New threshold wording, shown in green as inserted text.',
    openObservatory: 'Open document observatory',
    threeQuestionsEyebrow: 'Three questions. One operational view.',
    threeQuestionsTitle1: 'Regulation is only',
    threeQuestionsTitle2: 'the beginning.',
    threeQuestionsLede: 'ReguLens turns legal changes into a traceable decision path for founders, CFOs, and operations leaders.',

    story1Eyebrow: '01 / What changed?',
    story1Title: 'See the difference, not just the document.',
    story1Body: 'A focused comparison isolates the provision that moved, anchors it to the official Gazette notification, and keeps the source in view.',
    story2Eyebrow: '02 / Does it affect me?',
    story2Title: 'A regulation is only relevant when you know where you stand.',
    story2Body: 'Transparent conditions connect the statutory rule to turnover, employee count, location, and the operating profile of a real business.',
    story3Eyebrow: '03 / What happens next?',
    story3Title: 'From legal change to practical action.',
    story3Body: 'Keep the reasoning, evidence, and next action together — so compliance moves from anxiety into an operating rhythm.',

    welcomeEyebrow: 'Your regulatory landscape',
    welcomeTitle1: 'Know what changed.',
    welcomeTitle2: 'Know where you stand.',
    welcomeLede: 'Know what to do next — with a verifiable source trail for every decision.',
    activeProfile: 'Active business profile',
    analyzeUpdate: 'Analyze regulatory update',
    backendRibbon: 'Connected to FastAPI Backend & Supabase PostgreSQL · Grounded in official Gazette notifications.',
    viewBenchmark: 'View Statutory Validation Suite (23/23 Passed)',
    hideBenchmark: 'Hide Benchmark Tests',
    benchmarkTitle: 'STATUTORY VALIDATION OBSERVATORY (MULTI-JURISDICTION)',
    benchmarkSub: '23 of 23 Scenarios Passed (100% Deterministic Accuracy)',
    metricChanges: 'Changes analyzed',
    metricApplicable: 'Potentially applicable',
    metricActions: 'Actions requiring attention',
    metricDeadlines: 'Verified upcoming deadlines',
    signalDeskEyebrow: 'Signal desk / 04',
    signalDeskTitle: 'Regulatory changes',
    searchPlaceholder: 'Search regulation or authority',
    allImpact: 'All impact',
    sortLatest: 'Latest published',
    sortImpact: 'Highest impact',
    colRegulation: 'Regulation / notification',
    colAuthority: 'Authority',
    colPublished: 'Publication date',
    colEffective: 'Effective date',
    colImpact: 'Business impact',
    colVerification: 'Verification',
    recentReasoningEyebrow: 'Recent reasoning / 03',
    recentReasoningTitle: 'Business-specific assessments',
    viewApplicability: 'View applicability',

    observatoryEyebrow: 'Document observatory / GST e-invoicing',
    observatoryTitle1: 'A provision under',
    observatoryTitle2: 'examination.',
    verifiedRecord: 'VERIFIED RECORD · RL-2023-10CT',
    statutoryComparison: 'Provision comparison',
    statutoryComparisonLede: 'Exact statutory text changes extracted from the Gazette of India. Verified under Section 52(1)(q) of the Indian Copyright Act, 1957.',
    prevProvision: 'Previous provision',
    amendedProvision: 'Amended provision',
    changeTrace: 'change trace',
    regionalBriefingLabel: 'Regional Briefing:',
    whatChangedTitle: 'The threshold moved from ₹10 crore to ₹5 crore.',
    whatChangedDesc: 'Notification No. 10/2023–Central Tax amends Notification No. 13/2020 to reduce the mandatory e-invoicing threshold for B2B supplies to ₹5 Crore.',
    whyMattersTitle: 'Tier-4 SMEs enter mandatory scope.',
    whyMattersDesc: 'Aggregate turnover across any preceding financial year from 2017-18 onward is evaluated across all GSTINs sharing the same PAN.',
    whatStayedTitle: 'Exempted categories remain protected.',
    whatStayedDesc: 'SEZ units, insurer/banking/financial institutions, GTAs, and passenger transport services continue to be excluded under Rule 48(4) proviso.',
    nextQuestionPrompt: 'Does this amendment affect Apex Precision Components Pvt Ltd?',
    runApplicabilityCheck: 'Run applicability check',

    whereStandEyebrow: 'Applicability / Apex Precision Components',
    whereStandTitle1: 'Where do you',
    whereStandTitle2: 'stand?',
    deterministicEval: 'DETERMINISTIC EVALUATION',
    testScenarioBtn: 'Test what-if scenario',
    viewProofPathBtn: 'View ProofPath record',
    whyVerdictTitle: 'Why this verdict?',
    conditionsChecked: '4 conditions checked',
    rowThreshold: 'Statutory threshold',
    rowThresholdVal: 'Aggregate turnover exceeds ₹5 crore',
    rowAttribute: 'Business attribute checked',
    rowAttributeVal: 'FY 2022–23 aggregate turnover',
    rowSuppliedVal: '₹8.2 crore',
    rowOutcome: 'Rule outcome',
    rowOutcomeVal: 'Threshold crossed → mandatory e-invoicing',
    rowPanStatus: 'PAN aggregation status',
    rowPanStatusVal: 'Verified across all active GSTINs',
    rowCitation: 'Statutory citation',
    applicabilityNote: 'Evaluated using deterministic rule logic against Section 52(1)(q) public Gazette provisions. ReguLens supports operational readiness; consult tax counsel for formal filings.',
    readyForRecord: 'This assessment is ready for an evidence record.',
    createRecordBtn: 'Create ProofPath record',

    simEyebrow: 'What-If simulator / Rule lens',
    simTitle1: 'Move the inputs.',
    simTitle2: 'See what changes.',
    resetProfileBtn: 'Reset to profile',
    scenarioHeading: 'Profile conditions',
    aggregateTurnover: 'Aggregate turnover',
    employeeCount: 'Employee count',
    operatingStates: 'Operating states',
    selectAllApply: 'select all that apply',
    statutoryExclusions: 'Statutory exclusions (Rule 48(4))',
    sezExclusionLabel: 'SEZ Unit / Proviso Exclusion',
    historyVerification: 'Turnover-history verification',
    evidenceStatus: 'evidence status',
    liveAssessmentEyebrow: '02 / Live legal assessment',
    liveUpdatesIndicator: 'Updates deterministically as inputs change',
    deterministicOutcome: 'DETERMINISTIC EVALUATION OUTCOME',
    changedConditionLabel: 'Changed condition',
    thresholdUsed: 'Threshold used',
    profileTurnover: 'Profile turnover',
    statesSelected: 'States selected',
    simDisclaimer: 'Deterministic rule logic based on Notification 10/2023-CT. Input changes trigger instant re-evaluation.',
    saveToProofPath: 'Save assessment to ProofPath',

    proofEyebrow: 'ProofPath / Evidence vault',
    proofTitle1: 'A record that can',
    proofTitle2: 'be followed.',
    recordVerifiedBadge: 'Cryptographic Record Verified',
    recordIdLabel: 'RECORD ID',
    timestampLabel: 'ASSESSMENT TIMESTAMP',
    resultLabel: 'RESULT',
    verificationLabel: 'VERIFICATION',
    sourceDocHeading: 'Source document',
    gazetteLinked: 'Gazette linked',
    shaDigestLabel: 'SHA-256 digest',
    shaDigestDesc: 'Tamper-evident record hash for internal traceability and change audit.',
    copyDigest: 'Copy digest',
    copied: 'Copied',
    snapshotHeading: 'Assessment snapshot',
    actionRecordHeading: 'Action record',
    nextSteps: 'Next steps',
    traceabilityHeading: 'Traceability summary',
    traceabilityDesc: 'Source link, profile snapshot, rule outcome, and action checklist are timestamped.',
    markReviewedBtn: 'Mark summary reviewed',
    reviewedNoted: 'Review noted.',
    readyForReview: 'Ready for review.',
    proofDisclaimer: 'ReguLens creates a tamper-evident record of the regulatory source reviewed, the assessment made, and the actions recorded by the user. This supports internal recordkeeping and traceability; it does not guarantee compliance or replace formal legal counsel.',

    footerCopyright: '© 2026 ReguLens · Evidence-first regulatory intelligence',
    footerDemoNote: 'Enterprise Regulatory Intelligence Platform · Grounded in official Gazette notifications',
    finePrint: 'Regulatory intelligence for operational planning. Not a substitute for formal legal counsel.',
    applicable: 'Applicable',
    notApplicable: 'Not Applicable',
    reviewRequired: 'Review Required'
  },

  kn: {
    brandTagline: 'ಕಾನೂನು ನಿಯಮಾವಳಿ ವಿಶ್ಲೇಷಣೆ',
    demoWorkspace: 'ಸಕ್ರಿಯ ಕಾರ್ಯಸ್ಥಳ',
    demoOnline: 'ಕಾರ್ಯಸ್ಥಳ ಸಕ್ರಿಯವಾಗಿದೆ',
    workspaceSettings: 'ಕಾರ್ಯಸ್ಥಳ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    operationsLead: 'ಕಾರ್ಯಾಚರಣೆ ಮುಖ್ಯಸ್ಥರು',
    demoData: '',
    operationalView: 'ಕಾರ್ಯಾಚರಣೆ ದೃಷ್ಟಿಕೋನ',
    evidenceLedAssessment: 'ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಮೌಲ್ಯಮಾಪನ',
    backToHome: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    signIn: 'ಲಾಗಿನ್ ಮಾಡಿ',
    getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    enterWorkspace: 'ReguLens ಪ್ರವೇಶಿಸಿ',
    skipIntro: 'ಪರಿಚಯ ಬಿಟ್ಟುಬಿಡಿ',
    explorePlatform: 'ವೇದಿಕೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',

    navOverview: 'ಅವಲೋಕನ',
    navObservatory: 'ಕಾನೂನು ದಾಖಲಾತಿ',
    navApplicability: 'ಅನ್ವಯಿಸುವಿಕೆ',
    navSimulator: 'ಸಿಮ್ಯುಲೇಟರ್',
    navProofPath: 'ಸಾಕ್ಷ್ಯ ಸಂಗ್ರಹ (ProofPath)',
    navMSME: 'MSME ಪ್ರಮಾಣಪತ್ರ ಪರಿಶೀಲನೆ',

    heroEyebrow: 'ಭಾರತೀಯ ಉದ್ಯಮಗಳಿಗೆ ಕಾನೂನು ನಿಯಮಾವಳಿ ಬುದ್ಧಿಮತ್ತೆ',
    heroTitle1: 'ಪ್ರತಿಯೊಂದು ಬದಲಾವಣೆ.',
    heroTitle2: 'ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ದಾರಿ.',
    heroLede: 'ಏನು ಬದಲಾಗಿದೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ನಿಮ್ಮ ವ್ಯವಹಾರಕ್ಕೆ ಇದು ಅನ್ವಯಿಸುತ್ತದೆಯೇ ಎಂದು ತಿಳಿಯಿರಿ. ಅಧಿಕೃತ ಸಾಕ್ಷ್ಯಗಳೊಂದಿಗೆ ಮುಂದಿನ ಹೆಜ್ಜೆಯನ್ನು ಇರಿಸಿ.',
    heroOriginal: 'ಹಿಂದಿನ ನಿಬಂಧನೆ',
    heroAmended: 'ತಿದ್ದುಪಡಿ ಮಾಡಿದ ನಿಬಂಧನೆ',
    heroPreviousText: 'ಹಳೆಯ ಮಿತಿಯ ವಿವರ (ತೆಗೆದುಹಾಕಲಾದ ಪಠ್ಯ ಕೆಂಪು ಬಣ್ಣದಲ್ಲಿ).',
    heroAmendedText: 'ಹೊಸ ಮಿತಿಯ ವಿವರ (ಸೇರಿಸಲಾದ ಪಠ್ಯ ಹಸಿರು ಬಣ್ಣದಲ್ಲಿ).',
    openObservatory: 'ದಾಖಲಾತಿ ವೀಕ್ಷಿಸಿ',
    threeQuestionsEyebrow: 'ಮೂರು ಪ್ರಶ್ನೆಗಳು. ಒಂದು ಸ್ಪಷ್ಟ ನೋಟ.',
    threeQuestionsTitle1: 'ನಿಯಮಾವಳಿ ಬದಲಾವಣೆ',
    threeQuestionsTitle2: 'ಕೇವಲ ಆರಂಭ ಮಾತ್ರ.',
    threeQuestionsLede: 'ReguLens ಕಾನೂನು ಬದಲಾವಣೆಗಳನ್ನು ಸಂಸ್ಥಾಪಕರು ಮತ್ತು ಹಣಕಾಸು ಮುಖಂಡರಿಗೆ ಸುಲಭ ನಿರ್ಧಾರಗಳನ್ನಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ.',

    story1Eyebrow: '01 / ಏನು ಬದಲಾಗಿದೆ?',
    story1Title: 'ದಾಖಲೆಯಷ್ಟೇ ಅಲ್ಲ, ನಿಖರ ವ್ಯತ್ಯಾಸವನ್ನು ನೋಡಿ.',
    story1Body: 'ಅಧಿಕೃತ ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆಯನ್ನು ಹೋಲಿಸಿ, ಬದಲಾದ ನಿಯಮವನ್ನು ಕಣ್ಣಾರೆ ಪರಿಶೀಲಿಸಿ.',
    story2Eyebrow: '02 / ಇದು ನನಗೆ ಅನ್ವಯಿಸುತ್ತದೆಯೇ?',
    story2Title: 'ನಿಮ್ಮ ವ್ಯವಹಾರದ ಸ್ಥಿತಿ ತಿಳಿದಾಗ ಮಾತ್ರ ನಿಯಮವು ಅರ್ಥಪೂರ್ಣ.',
    story2Body: 'ನಿಮ್ಮ ವಹಿವಾಟು, ಉದ್ಯೋಗಿಗಳು ಮತ್ತು ಶಾಖೆಗಳ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ನಿಖರ ಫಲಿತಾಂಶ ನೀಡುತ್ತದೆ.',
    story3Eyebrow: '03 / ಮುಂದೆ ಏನು ಮಾಡಬೇಕು?',
    story3Title: 'ಕಾನೂನು ಬದಲಾವಣೆಯಿಂದ ಪ್ರಾಯೋಗಿಕ ಕ್ರಮದವರೆಗೆ.',
    story3Body: 'ಕಾರಣ, ಸಾಕ್ಷ್ಯ ಮತ್ತು ಕ್ರಮಗಳ ಪಟ್ಟಿಯನ್ನು ಒಟ್ಟಿಗೆ ಇರಿಸಿ - ಅನುಸರಣೆಯನ್ನು ಸುಲಭಗೊಳಿಸಿ.',

    welcomeEyebrow: 'ನಿಮ್ಮ ನಿಯಂತ್ರಣ ಭೂದೃಶ್ಯ',
    welcomeTitle1: 'ಏನು ಬದಲಾಗಿದೆ ತಿಳಿಯಿರಿ.',
    welcomeTitle2: 'ನಿಮ್ಮ ಸ್ಥಾನವನ್ನು ಗುರುತಿಸಿ.',
    welcomeLede: 'ಪ್ರತಿ ನಿರ್ಧಾರಕ್ಕೂ ಅಧಿಕೃತ ಮೂಲದ ಸಾಕ್ಷ್ಯದೊಂದಿಗೆ ಮುಂದೆ ಏನು ಮಾಡಬೇಕೆಂದು ತಿಳಿಯಿರಿ.',
    activeProfile: 'ಸಕ್ರಿಯ ವ್ಯವಹಾರ ಪ್ರೊಫೈಲ್',
    analyzeUpdate: 'ಅಪ್‌ಡೇಟ್ ವಿಶ್ಲೇಷಿಸಿ',
    backendRibbon: 'FastAPI ಬ್ಯಾಕೆಂಡ್ ಮತ್ತು Supabase PostgreSQL ನೊಂದಿಗೆ ಸಂಪರ್ಕ ಹೊಂದಿದೆ · ಅಧಿಕೃತ ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆಗಳು.',
    viewBenchmark: 'ಸದಸ್ಯ 3 ಪರೀಕ್ಷಾ ವರದಿ (8/8 ಉತ್ತೀರ್ಣ)',
    hideBenchmark: 'ಪರೀಕ್ಷೆಗಳನ್ನು ಮರೆಮಾಡಿ',
    benchmarkTitle: 'ಸದಸ್ಯ 3 ದೃಢೀಕರಣ ಸೂಟ್ (ಪ್ರಕರಣ A: GST E-INVOICING)',
    benchmarkSub: '8 ರಲ್ಲಿ 8 ಸನ್ನಿವೇಶಗಳು ಉತ್ತೀರ್ಣ (100% ನಿಖರತೆ)',
    metricChanges: 'ವಿಶ್ಲೇಷಿಸಲಾದ ಬದಲಾವಣೆಗಳು',
    metricApplicable: 'ಅನ್ವಯವಾಗುವ ಸಾಧ್ಯತೆ',
    metricActions: 'ಗಮನಿಸಬೇಕಾದ ಕ್ರಮಗಳು',
    metricDeadlines: 'ಮುಂಬರುವ ಗಡುವುಗಳು',
    signalDeskEyebrow: 'ಸಿಗ್ನಲ್ ಡೆಸ್ಕ್ / 04',
    signalDeskTitle: 'ನಿಯಂತ್ರಣ ಬದಲಾವಣೆಗಳು',
    searchPlaceholder: 'ನಿಯಮ ಅಥವಾ ಪ್ರಾಧಿಕಾರವನ್ನು ಹುಡುಕಿ',
    allImpact: 'ಎಲ್ಲಾ ಪ್ರಭಾವ',
    sortLatest: 'ಇತ್ತೀಚಿನ ಪ್ರಕಟಣೆ',
    sortImpact: 'ಹೆಚ್ಚಿನ ಪ್ರಭಾವ',
    colRegulation: 'ನಿಯಮಾವಳಿ / ಅಧಿಸೂಚನೆ',
    colAuthority: 'ಪ್ರಾಧಿಕಾರ',
    colPublished: 'ಪ್ರಕಟಣೆಯ ದಿನಾಂಕ',
    colEffective: 'ಜಾರಿಗೆ ಬಂದ ದಿನಾಂಕ',
    colImpact: 'ವ್ಯವಹಾರದ ಪ್ರಭಾವ',
    colVerification: 'ಪರಿಶೀಲನೆ',
    recentReasoningEyebrow: 'ಇತ್ತೀಚಿನ ವಿಶ್ಲೇಷಣೆ / 03',
    recentReasoningTitle: 'ವ್ಯವಹಾರ ನಿರ್ದಿಷ್ಟ ಮೌಲ್ಯಮಾಪನಗಳು',
    viewApplicability: 'ಅನ್ವಯಿಸುವಿಕೆ ವೀಕ್ಷಿಸಿ',

    observatoryEyebrow: 'ದಾಖಲಾತಿ ವೇಧಶಾಲೆ / GST ಇ-ಇನ್‌ವಾಯ್ಸಿಂಗ್',
    observatoryTitle1: 'ಪರಿಶೀಲನೆಯಲ್ಲಿರುವ',
    observatoryTitle2: 'ಶಾಸನಬದ್ಧ ನಿಬಂಧನೆ.',
    verifiedRecord: 'ದೃಢೀಕೃತ ದಾಖಲೆ · RL-2023-10CT',
    statutoryComparison: 'ನಿಬಂಧನೆಗಳ ಹೋಲಿಕೆ',
    statutoryComparisonLede: 'ಭಾರತೀಯ ಗೆಜೆಟ್‌ನಿಂದ ಹೊರತೆಗೆಯಲಾದ ನಿಖರ ಪಠ್ಯ ಬದಲಾವಣೆಗಳು. ಭಾರತೀಯ ಹಕ್ಕುಸ್ವಾಮ್ಯ ಕಾಯ್ದೆ 1957 ರ ಸೆಕ್ಷನ್ 52(1)(q) ಅಡಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.',
    prevProvision: 'ಹಿಂದಿನ ನಿಬಂಧನೆ',
    amendedProvision: 'ತಿದ್ದುಪಡಿ ಮಾಡಿದ ನಿಬಂಧನೆ',
    changeTrace: 'ಬದಲಾವಣೆ ಜಾಡು',
    regionalBriefingLabel: 'ಪ್ರಾದೇಶಿಕ ಬ್ರೀಫಿಂಗ್:',
    whatChangedTitle: 'ವಹಿವಾಟಿನ ಮಿತಿಯನ್ನು ₹10 ಕೋಟಿಯಿಂದ ₹5 ಕೋಟಿಗೆ ಇಳಿಸಲಾಗಿದೆ.',
    whatChangedDesc: 'ಅಧಿಸೂಚನೆ 10/2023-ಸೆಂಟ್ರಲ್ ಟ್ಯಾಕ್ಸ್ ಅಡಿಯಲ್ಲಿ ₹5 ಕೋಟಿಗಿಂತ ಹೆಚ್ಚು ವಹಿವಾಟು ಹೊಂದಿರುವ B2B ಪೂರೈಕೆಗಳಿಗೆ E-Invoicing ಕಡ್ಡಾಯವಾಗಿದೆ.',
    whyMattersTitle: 'ಸಣ್ಣ ಮತ್ತು ಮಧ್ಯಮ ಉದ್ಯಮಗಳು (SME) ಇದರ ವ್ಯಾಪ್ತಿಗೆ ಬರುತ್ತವೆ.',
    whyMattersDesc: '2017-18 ರಿಂದ ಯಾವುದೇ ಆರ್ಥಿಕ ವರ್ಷದಲ್ಲಿ ₹5 ಕೋಟಿ ಮೀರಿದ ವಹಿವಾಟನ್ನು ಪ್ಯಾನ್-ವೈಡ್ ಆಧಾರದ ಮೇಲೆ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ.',
    whatStayedTitle: 'ವಿನಾಯಿತಿ ಪಡೆದ ವರ್ಗಗಳು ಸುರಕ್ಷಿತವಾಗಿವೆ.',
    whatStayedDesc: 'SEZ ಘಟಕಗಳು, ಬ್ಯಾಂಕಿಂಗ್, ವಿಮಾ ಸಂಸ್ಥೆಗಳು ಮತ್ತು ಸರಕು ಸಾಗಣೆ (GTA) ಸೇವೆಗಳಿಗೆ Rule 48(4) ರ ಅಡಿಯಲ್ಲಿ ವಿನಾಯಿತಿ ಮುಂದುವರಿದಿದೆ.',
    nextQuestionPrompt: 'ಈ ತಿದ್ದುಪಡಿ ಅಪೆಕ್ಸ್ ಪ್ರೆಸಿಷನ್ ಕಾಂಪೊನೆಂಟ್ಸ್ ಪ್ರೈವೇಟ್ ಲಿಮಿಟೆಡ್‌ಗೆ ಅನ್ವಯಿಸುತ್ತದೆಯೇ?',
    runApplicabilityCheck: 'ಅನ್ವಯಿಸುವಿಕೆ ಪರಿಶೀಲನೆ ನಡೆಸಿ',

    whereStandEyebrow: 'ಅನ್ವಯಿಸುವಿಕೆ / ಅಪೆಕ್ಸ್ ಪ್ರೆಸಿಷನ್ ಕಾಂಪೊನೆಂಟ್ಸ್',
    whereStandTitle1: 'ನಿಮ್ಮ ವ್ಯವಹಾರದ',
    whereStandTitle2: 'ಸ್ಥಾನ ಎಲ್ಲಿದೆ?',
    deterministicEval: 'ನಿಖರ ನಿಯಮ ಮೌಲ್ಯಮಾಪನ',
    testScenarioBtn: 'ಸಿಮ್ಯುಲೇಶನ್ ಪರೀಕ್ಷಿಸಿ',
    viewProofPathBtn: 'ProofPath ದಾಖಲೆ ನೋಡಿ',
    whyVerdictTitle: 'ಈ ಫಲಿತಾಂಶ ಏಕೆ?',
    conditionsChecked: '4 ಷರತ್ತುಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    rowThreshold: 'ಶಾಸನಬದ್ಧ ಮಿತಿ',
    rowThresholdVal: 'ಒಟ್ಟು ವಹಿವಾಟು ₹5 ಕೋಟಿ ಮೀರಿದೆ',
    rowAttribute: 'ಪರಿಶೀಲಿಸಲಾದ ಗುಣಲಕ್ಷಣ',
    rowAttributeVal: '2022–23 ಆರ್ಥಿಕ ವರ್ಷದ ಒಟ್ಟು ವಹಿವಾಟು',
    rowSuppliedVal: '₹8.2 ಕೋಟಿ',
    rowOutcome: 'ನಿಯಮದ ಫಲಿತಾಂಶ',
    rowOutcomeVal: 'ಮಿತಿ ಮೀರಿದೆ → E-Invoicing ಕಡ್ಡಾಯ',
    rowPanStatus: 'PAN ಒಟ್ಟುಗೂಡಿಸುವಿಕೆ ಸ್ಥಿತಿ',
    rowPanStatusVal: 'ಎಲ್ಲಾ GSTIN ಗಳಲ್ಲಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    rowCitation: 'ಶಾಸನಬದ್ಧ ಉಲ್ಲೇಖ',
    applicabilityNote: 'ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಖರ ನಿಯಮಗಳ ಮೂಲಕ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗಿದೆ. ಕಾನೂನು ಸಲಹೆಗಾಗಿ ತೆರಿಗೆ ಸಲಹೆಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    readyForRecord: 'ಈ ಮೌಲ್ಯಮಾಪನವು ಸಾಕ್ಷ್ಯ ದಾಖಲೆಗೆ ಸಿದ್ಧವಾಗಿದೆ.',
    createRecordBtn: 'ProofPath ದಾಖಲೆ ರಚಿಸಿ',

    simEyebrow: 'ಸಿಮ್ಯುಲೇಟರ್ / ನಿಯಮ ಲೆನ್ಸ್',
    simTitle1: 'ಇನ್‌ಪುಟ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ.',
    simTitle2: 'ಫಲಿತಾಂಶ ನೋಡಿ.',
    resetProfileBtn: 'ಮೂಲ ಪ್ರೊಫೈಲ್‌ಗೆ ಮರುಹೊಂದಿಸಿ',
    scenarioHeading: 'ಪ್ರೊಫೈಲ್ ಷರತ್ತುಗಳು',
    aggregateTurnover: 'ಒಟ್ಟು ವಹಿವಾಟು (Turnover)',
    employeeCount: 'ಉದ್ಯೋಗಿಗಳ ಸಂಖ್ಯೆ',
    operatingStates: 'ಕಾರ್ಯನಿರ್ವಹಿಸುವ ರಾಜ್ಯಗಳು',
    selectAllApply: 'ಅನ್ವಯಿಸುವ ಎಲ್ಲವನ್ನೂ ಆಯ್ಕೆಮಾಡಿ',
    statutoryExclusions: 'ಶಾಸನಬದ್ಧ ವಿನಾಯಿತಿಗಳು (Rule 48(4))',
    sezExclusionLabel: 'SEZ ಘಟಕ / ವಿನಾಯಿತಿ',
    historyVerification: 'ಹಿಂದಿನ ವಹಿವಾಟು ದೃಢೀಕರಣ',
    evidenceStatus: 'ಸಾಕ್ಷ್ಯ ಸ್ಥಿತಿ',
    liveAssessmentEyebrow: '02 / ಲೈವ್ ಕಾನೂನು ಮೌಲ್ಯಮಾಪನ',
    liveUpdatesIndicator: 'ಇನ್‌ಪುಟ್‌ಗಳು ಬದಲಾದಂತೆ ತಕ್ಷಣ ನವೀಕರಣಗೊಳ್ಳುತ್ತದೆ',
    deterministicOutcome: 'ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶ',
    changedConditionLabel: 'ಬದಲಾದ ಸ್ಥಿತಿ',
    thresholdUsed: 'ಬಳಸಿದ ಮಿತಿ',
    profileTurnover: 'ಪ್ರಸ್ತುತ ವಹಿವಾಟು',
    statesSelected: 'ಆಯ್ಕೆಮಾಡಿದ ರಾಜ್ಯಗಳು',
    simDisclaimer: 'ಅಧಿಸೂಚನೆ 10/2023-CT ಆಧಾರಿತ ನಿಖರ ನಿಯಮ ತರ್ಕ. ಬದಲಾವಣೆಗಳು ತಕ್ಷಣ ಮೌಲ್ಯಮಾಪನಗೊಳ್ಳುತ್ತವೆ.',
    saveToProofPath: 'ProofPath ನಲ್ಲಿ ಉಳಿಸಿ',

    proofEyebrow: 'ProofPath / ಸಾಕ್ಷ್ಯ ವಾಲ್ಟ್',
    proofTitle1: 'ತಪಾಸಣೆಗೆ ಒಳಪಡಿಸಬಹುದಾದ',
    proofTitle2: 'ಅಧಿಕೃತ ದಾಖಲೆ.',
    recordVerifiedBadge: 'ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ದಾಖಲೆ ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    recordIdLabel: 'ದಾಖಲೆ ಸಂಖ್ಯೆ (ID)',
    timestampLabel: 'ಮೌಲ್ಯಮಾಪನ ಸಮಯ',
    resultLabel: 'ಫಲಿತಾಂಶ',
    verificationLabel: 'ಪರಿಶೀಲನೆ',
    sourceDocHeading: 'ಮೂಲ ದಾಖಲೆ',
    gazetteLinked: 'ಗೆಜೆಟ್ ಲಿಂಕ್ ಮಾಡಲಾಗಿದೆ',
    shaDigestLabel: 'SHA-256 ಹ್ಯಾಶ್',
    shaDigestDesc: 'ಆಂತರಿಕ ಲೆಕ್ಕಪರಿಶೋಧನೆ ಮತ್ತು ತಪಾಸಣೆಗಾಗಿ ಬದಲಾಯಿಸಲಾಗದ ಡಿಜಿಟಲ್ ಮುದ್ರೆ.',
    copyDigest: 'ಹ್ಯಾಶ್ ನಕಲಿಸಿ',
    copied: 'ನಕಲಿಸಲಾಗಿದೆ',
    snapshotHeading: 'ಮೌಲ್ಯಮಾಪನ ಸ್ನ್ಯಾಪ್‌ಶಾಟ್',
    actionRecordHeading: 'ಕ್ರಮಗಳ ದಾಖಲೆ',
    nextSteps: 'ಮುಂದಿನ ಕ್ರಮಗಳು',
    traceabilityHeading: 'ಜಾಡು ಸಾರಾಂಶ',
    traceabilityDesc: 'ಮೂಲ ಲಿಂಕ್, ಪ್ರೊಫೈಲ್ ವಿವರ, ನಿಯಮ ಫಲಿತಾಂಶ ಮತ್ತು ಕ್ರಮಗಳ ಪಟ್ಟಿಯನ್ನು ಮುದ್ರಿಸಲಾಗಿದೆ.',
    markReviewedBtn: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    reviewedNoted: 'ಪರಿಶೀಲನೆ ದಾಖಲಾಗಿದೆ.',
    readyForReview: 'ಪರಿಶೀಲನೆಗೆ ಸಿದ್ಧವಾಗಿದೆ.',
    proofDisclaimer: 'ReguLens ಪರಿಶೀಲಿಸಿದ ನಿಯಂತ್ರಕ ಮೂಲ, ಮಾಡಿದ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ದಾಖಲಿಸಿದ ಕ್ರಮಗಳ ವಿಶ್ವಾಸಾರ್ಹ ದಾಖಲೆಯನ್ನು ರಚಿಸುತ್ತದೆ. ಇದು ಆಂತರಿಕ ದಾಖಲೆಗೆ ಸಹಾಯಕ.',

    footerCopyright: '© 2026 ReguLens · ಸಾಕ್ಷ್ಯಾಧಾರಿತ ನಿಯಂತ್ರಣ ಬುದ್ಧಿಮತ್ತೆ',
    footerDemoNote: 'ಅಧಿಕೃತ ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆಗಳ ಆಧಾರಿತ ನಿಯಂತ್ರಣ ಬುದ್ಧಿಮತ್ತೆ ವೇದಿಕೆ',
    finePrint: 'ಕಾರ್ಯಾಚರಣೆ ಯೋಜನೆಗಾಗಿ ನಿಯಂತ್ರಣ ಬುದ್ಧಿಮತ್ತೆ. ಇದು ಕಾನೂನು ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.',
    applicable: 'ಅನ್ವಯಿಸುತ್ತದೆ (Applicable)',
    notApplicable: 'ಅನ್ವಯಿಸುವುದಿಲ್ಲ (Not Applicable)',
    reviewRequired: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ (Review Required)'
  },

  hi: {
    brandTagline: 'नियामक अनुपालन बुद्धिमत्ता',
    demoWorkspace: 'सक्रिय कार्यक्षेत्र',
    demoOnline: 'कार्यक्षेत्र ऑनलाइन है',
    workspaceSettings: 'कार्यक्षेत्र सेटिंग्स',
    operationsLead: 'संचालन प्रमुख',
    demoData: '',
    operationalView: 'परिचालन दृश्य',
    evidenceLedAssessment: 'साक्ष्य-आधारित मूल्यांकन',
    backToHome: 'होम पर वापस जाएं',
    signIn: 'साइन इन करें',
    getStarted: 'शुरू करें',
    enterWorkspace: 'ReguLens में प्रवेश करें',
    skipIntro: 'परिचय छोड़ें',
    explorePlatform: 'प्लेटफ़ॉर्म देखें',

    navOverview: 'अवलोकन',
    navObservatory: 'दस्तावेज़ वेधशाला',
    navApplicability: 'प्रयोज्यता',
    navSimulator: 'व्हाट-इफ़ सिम्युलेटर',
    navProofPath: 'साक्ष्य संग्रह (ProofPath)',
    navMSME: 'MSME प्रमाणन सत्यापन',

    heroEyebrow: 'भारतीय व्यवसायों के लिए नियामक बुद्धिमत्ता',
    heroTitle1: 'प्रत्येक बदलाव।',
    heroTitle2: 'एक स्पष्ट राह।',
    heroLede: 'समझें कि क्या बदला है। जानें कि आपके व्यवसाय पर क्या लागू होता है। आधिकारिक साक्ष्यों के साथ तुरंत आवश्यक कदम उठाएं।',
    heroOriginal: 'पूर्व प्रावधान',
    heroAmended: 'संशोधित प्रावधान',
    heroPreviousText: 'पिछली सीमा का विवरण (हटाया गया पाठ लाल रंग में)।',
    heroAmendedText: 'नई सीमा का विवरण (जोड़ा गया पाठ हरे रंग में)।',
    openObservatory: 'दस्तावेज़ वेधशाला खोलें',
    threeQuestionsEyebrow: 'तीन प्रश्न। एक संपूर्ण दृष्टिकोण।',
    threeQuestionsTitle1: 'विनियमन केवल',
    threeQuestionsTitle2: 'एक शुरुआत है।',
    threeQuestionsLede: 'ReguLens कानूनी बदलावों को संस्थापकों, सीएफओ और संचालन प्रमुखों के लिए स्पष्ट निर्णय में बदलता है।',

    story1Eyebrow: '01 / क्या बदला है?',
    story1Title: 'केवल दस्तावेज़ नहीं, सटीक अंतर देखें।',
    story1Body: 'आधिकारिक राजपत्र (Gazette) अधिसूचना की तुलना करके ठीक वही प्रावधान देखें जो बदला है।',
    story2Eyebrow: '02 / क्या यह मुझ पर लागू होता है?',
    story2Title: 'विनियमन तभी सार्थक है जब आप अपनी स्थिति जानते हों।',
    story2Body: 'पारदर्शी शर्तें नियम को वास्तविक व्यवसाय के टर्नओवर, कर्मचारियों और परिचालन से जोड़ती हैं।',
    story3Eyebrow: '03 / आगे क्या करना है?',
    story3Title: 'कानूनी बदलाव से व्यावहारिक कार्रवाई तक।',
    story3Body: 'तर्क, साक्ष्य और अगले कदमों को एक साथ रखें — अनुपालन को अपनी कार्यशैली का हिस्सा बनाएं।',

    welcomeEyebrow: 'आपका नियामक परिदृश्य',
    welcomeTitle1: 'जानें क्या बदला है।',
    welcomeTitle2: 'पहचानें अपनी स्थिति।',
    welcomeLede: 'हर निर्णय के लिए आधिकारिक साक्ष्य के साथ जानें कि आगे क्या कदम उठाना है।',
    activeProfile: 'सक्रिय व्यावसायिक प्रोफ़ाइल',
    analyzeUpdate: 'नियामक अपडेट का विश्लेषण करें',
    backendRibbon: 'FastAPI बैकएंड और Supabase PostgreSQL से जुड़ा है · आधिकारिक राजपत्र अधिसूचनाओं पर आधारित।',
    viewBenchmark: 'वैधानिक सत्यापन सुइट देखें (23/23 सफल)',
    hideBenchmark: 'परीक्षण छिपाएं',
    benchmarkTitle: 'वैधानिक सत्यापन वेधशाला (बहु-क्षेत्रीय)',
    benchmarkSub: '23 में से 23 परिदृश्य उत्तीर्ण (100% सटीक)',
    metricChanges: 'विश्लेषित बदलाव',
    metricApplicable: 'लागू होने योग्य',
    metricActions: 'ध्यान देने योग्य कदम',
    metricDeadlines: 'सत्यापित आगामी समयसीमा',
    signalDeskEyebrow: 'सिग्नल डेस्क / 04',
    signalDeskTitle: 'नियामक बदलाव',
    searchPlaceholder: 'विनियम या प्राधिकरण खोजें',
    allImpact: 'सभी प्रभाव',
    sortLatest: 'नवीनतम प्रकाशित',
    sortImpact: 'उच्चतम प्रभाव',
    colRegulation: 'विनियम / अधिसूचना',
    colAuthority: 'प्राधिकरण',
    colPublished: 'प्रकाशन तिथि',
    colEffective: 'प्रभावी तिथि',
    colImpact: 'व्यावसायिक प्रभाव',
    colVerification: 'सत्यापन',
    recentReasoningEyebrow: 'हालिया तर्क / 03',
    recentReasoningTitle: 'व्यवसाय-विशिष्ट मूल्यांकन',
    viewApplicability: 'प्रयोज्यता देखें',

    observatoryEyebrow: 'दस्तावेज़ वेधशाला / GST ई-इनवॉइसिंग',
    observatoryTitle1: 'जांच के अधीन',
    observatoryTitle2: 'वैधानिक प्रावधान।',
    verifiedRecord: 'सत्यापित रिकॉर्ड · RL-2023-10CT',
    statutoryComparison: 'प्रावधानों की तुलना',
    statutoryComparisonLede: 'भारत के राजपत्र से निकाला गया सटीक पाठ संशोधन। भारतीय कॉपीराइट अधिनियम 1957 की धारा 52(1)(q) के तहत सत्यापित।',
    prevProvision: 'पूर्व प्रावधान',
    amendedProvision: 'संशोधित प्रावधान',
    changeTrace: 'परिवर्तन ट्रेस',
    regionalBriefingLabel: 'क्षेत्रीय ब्रीफिंग:',
    whatChangedTitle: 'टर्नओवर सीमा ₹10 करोड़ से घटाकर ₹5 करोड़ की गई।',
    whatChangedDesc: 'अधिसूचना सं. 10/2023-केंद्रीय कर के तहत B2B आपूर्ति के लिए अनिवार्य ई-इनवॉइसिंग सीमा घटाकर ₹5 करोड़ कर दी गई है।',
    whyMattersTitle: 'टियर-4 SME अनिवार्य दायरे में आते हैं।',
    whyMattersDesc: '2017-18 के बाद से किसी भी वित्तीय वर्ष में ₹5 करोड़ से अधिक का कुल टर्नओवर पैन-स्तरीय आधार पर आंका जाता है।',
    whatStayedTitle: 'छूट प्राप्त श्रेणियां सुरक्षित हैं।',
    whatStayedDesc: 'SEZ इकाइयां, बैंकिंग, बीमा संस्थान और माल परिवहन (GTA) सेवाएं Rule 48(4) के तहत छूट प्राप्त हैं।',
    nextQuestionPrompt: 'क्या यह संशोधन एपेक्स प्रिसिजन कॉम्पोनेंट्स प्राइवेट लिमिटेड को प्रभावित करता है?',
    runApplicabilityCheck: 'प्रयोज्यता जांच चलाएं',

    whereStandEyebrow: 'प्रयोज्यता / एपेक्स प्रिसिजन कॉम्पोनेंट्स',
    whereStandTitle1: 'आपकी व्यावसायिक',
    whereStandTitle2: 'स्थिति क्या है?',
    deterministicEval: 'सटीक नियम मूल्यांकन',
    testScenarioBtn: 'व्हाट-इफ़ परिदृश्य जांचें',
    viewProofPathBtn: 'ProofPath रिकॉर्ड देखें',
    whyVerdictTitle: 'यह निर्णय क्यों?',
    conditionsChecked: '4 शर्तें जांची गईं',
    rowThreshold: 'वैधानिक सीमा',
    rowThresholdVal: 'कुल टर्नओवर ₹5 करोड़ से अधिक',
    rowAttribute: 'जांची गई व्यावसायिक विशेषता',
    rowAttributeVal: 'वित्तीय वर्ष 2022-23 का कुल टर्नओवर',
    rowSuppliedVal: '₹8.2 करोड़',
    rowOutcome: 'नियम का परिणाम',
    rowOutcomeVal: 'सीमा पार हुई → ई-इनवॉइसिंग अनिवार्य',
    rowPanStatus: 'PAN एकत्रीकरण स्थिति',
    rowPanStatusVal: 'सभी सक्रिय GSTIN में सत्यापित',
    rowCitation: 'वैधानिक संदर्भ',
    applicabilityNote: 'राजपत्र प्रावधानों के विरुद्ध सटीक नियम तर्क का उपयोग करके मूल्यांकन किया गया। औपचारिक फाइलिंग के लिए कर सलाहकार से परामर्श लें।',
    readyForRecord: 'यह मूल्यांकन साक्ष्य रिकॉर्ड के लिए तैयार है।',
    createRecordBtn: 'ProofPath रिकॉर्ड बनाएं',

    simEyebrow: 'व्हाट-इफ़ सिम्युलेटर / नियम लेंस',
    simTitle1: 'मान बदलें।',
    simTitle2: 'बदलाव देखें।',
    resetProfileBtn: 'मूल प्रोफ़ाइल पर रीसेट करें',
    scenarioHeading: 'प्रोफ़ाइल शर्तें',
    aggregateTurnover: 'कुल टर्नओवर',
    employeeCount: 'कर्मचारियों की संख्या',
    operatingStates: 'परिचालन वाले राज्य',
    selectAllApply: 'जो भी लागू हो चुनें',
    statutoryExclusions: 'वैधानिक छूट (Rule 48(4))',
    sezExclusionLabel: 'SEZ इकाई / छूट',
    historyVerification: 'टर्नओवर इतिहास सत्यापन',
    evidenceStatus: 'साक्ष्य स्थिति',
    liveAssessmentEyebrow: '02 / लाइव कानूनी मूल्यांकन',
    liveUpdatesIndicator: 'मान बदलते ही तुरंत स्वतः अपडेट होता है',
    deterministicOutcome: 'मूल्यांकन परिणाम',
    changedConditionLabel: 'बदली हुई शर्त',
    thresholdUsed: 'प्रयुक्त सीमा',
    profileTurnover: 'वर्तमान टर्नओवर',
    statesSelected: 'चयनित राज्य',
    simDisclaimer: 'अधिसूचना 10/2023-CT पर आधारित सटीक नियम तर्क। इनपुट बदलते ही तुरंत पुनः मूल्यांकन होता है।',
    saveToProofPath: 'ProofPath में सहेजें',

    proofEyebrow: 'ProofPath / साक्ष्य वॉल्ट',
    proofTitle1: 'एक ऑडिट-योग्य',
    proofTitle2: 'विश्वसनीय रिकॉर्ड।',
    recordVerifiedBadge: 'क्रिप्टोग्राफ़िक रिकॉर्ड सत्यापित',
    recordIdLabel: 'रिकॉर्ड आईडी',
    timestampLabel: 'मूल्यांकन समय',
    resultLabel: 'परिणाम',
    verificationLabel: 'सत्यापन',
    sourceDocHeading: 'स्रोत दस्तावेज़',
    gazetteLinked: 'राजपत्र लिंक किया गया',
    shaDigestLabel: 'SHA-256 डाइजेस्ट',
    shaDigestDesc: 'आंतरिक ट्रेसिबिलिटी और ऑडिट के लिए छेड़छाड़-रोधी रिकॉर्ड हैश।',
    copyDigest: 'डाइजेस्ट कॉपी करें',
    copied: 'कॉपी हो गया',
    snapshotHeading: 'मूल्यांकन स्नैपशॉट',
    actionRecordHeading: 'कार्रवाई रिकॉर्ड',
    nextSteps: 'अगले कदम',
    traceabilityHeading: 'ट्रेसिबिलिटी सारांश',
    traceabilityDesc: 'स्रोत लिंक, प्रोफ़ाइल स्नैपशॉट, नियम परिणाम और कार्रवाई चेकलिस्ट को टाइमस्टैम्प किया गया है।',
    markReviewedBtn: 'समीक्षित चिह्नित करें',
    reviewedNoted: 'समीक्षा दर्ज की गई।',
    readyForReview: 'समीक्षा के लिए तैयार।',
    proofDisclaimer: 'ReguLens समीक्षा किए गए नियामक स्रोत, किए गए मूल्यांकन और उपयोगकर्ता द्वारा दर्ज की गई कार्रवाइयों का एक छेड़छाड़-रोधी रिकॉर्ड बनाता है।',

    footerCopyright: '© 2026 ReguLens · साक्ष्य-प्रथम नियामक बुद्धिमत्ता',
    footerDemoNote: 'आधिकारिक राजपत्र अधिसूचनाओं पर आधारित नियामक बुद्धिमत्ता प्लेटफ़ॉर्म',
    finePrint: 'परिचालन योजना के लिए नियामक बुद्धिमत्ता। औपचारिक कानूनी सलाह का विकल्प नहीं।',
    applicable: 'लागू होता है (Applicable)',
    notApplicable: 'लागू नहीं होता (Not Applicable)',
    reviewRequired: 'समीक्षा आवश्यक (Review Required)'
  }
};
