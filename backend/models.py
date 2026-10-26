from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Dict, Any

class RegulationSummary(BaseModel):
    id: str
    title: str
    authority: str
    published: str
    effective: str
    impact: Literal['High', 'Medium', 'Low']
    status: Literal['Verified source', 'Verified demo', 'Review required', 'Source linked']
    summary: str
    notification_number: str
    official_url: str

class DiffRow(BaseModel):
    no: str
    text: str
    mark: Literal['normal', 'removed', 'inserted']

class LegalDiffResponse(BaseModel):
    case_id: str
    notification: str
    date: str
    citation: str
    official_url: str
    previous: List[DiffRow]
    amended: List[DiffRow]
    summary_of_change: str
    why_it_matters: str
    what_stayed_same: str

class SMEProfile(BaseModel):
    id: Optional[str] = "SME_A"
    name: str = "Apex Precision Components Pvt Ltd"
    sector: str = "Industrial manufacturing"
    nic_code: str = "2930"
    state: str = "Maharashtra"
    operating_states: List[str] = ["Maharashtra", "Karnataka"]
    annual_turnover_inr: float = 82000000.0  # 8.2 Crore
    employees: int = 24
    gstin: str = "27AAQCA****1ZK"
    gst_regime: str = "Regular"
    is_synthetic: bool = True
    pan_aggregation_verified: bool = True
    turnover_period_verified: bool = True
    entity_exclusion_applies: Optional[bool] = False

class ApplicabilityEvaluationRequest(BaseModel):
    case_id: str = "CASE_A_GST_E_INVOICING"
    profile: SMEProfile

class ConditionCheck(BaseModel):
    label: str
    value: str
    status: Literal['verified', 'warning', 'info']

class ApplicabilityEvaluationResponse(BaseModel):
    case_id: str
    business_name: str
    verdict: Literal['Applicable', 'Not Applicable', 'Review Required']
    headline: str
    reason: str
    statutory_citation: str
    effective_date: str
    conditions_checked: List[ConditionCheck]
    action_items: List[str]

class SimulatorRequest(BaseModel):
    case_id: str = "CASE_A_GST_E_INVOICING"
    turnover_inr: float
    employees: int
    states: List[str]
    statutory_exclusion: bool = False
    turnover_history_verified: bool = True

class SimulatorResponse(BaseModel):
    verdict: Literal['Applicable', 'Not Applicable', 'Review Required']
    headline: str
    reason: str
    changed_condition: str
    threshold_used: str
    profile_turnover: str
    states_count: int
    is_exclusion_active: bool
    is_history_verified: bool

class ProofPathRecordRequest(BaseModel):
    case_id: str
    business_name: str
    turnover_inr: float
    verdict: str
    citation: str
    completed_actions: List[str]

class ProofPathRecordResponse(BaseModel):
    record_id: str
    timestamp: str
    sha256_digest: str
    source_document: str
    official_url: str
    business_name: str
    turnover_display: str
    citation: str
    verdict: str
    verification_status: str
    completed_actions: List[str]
    disclaimer: str

class RegionalBriefingResponse(BaseModel):
    case_id: str
    language: str
    verdict: str
    headline: str
    spoken_summary: str
    action_bullet_points: List[str]
    statutory_source: str
    title: Optional[str] = None
    summary: Optional[str] = None
    actions: Optional[List[str]] = None
    disclaimer: Optional[str] = None

class TranslationRequest(BaseModel):
    text: Optional[str] = None
    items: Optional[List[str]] = None
    target_language: Literal['en', 'kn', 'hi'] = 'kn'
    prefer_ml: bool = True

class TranslationResponse(BaseModel):
    translated_text: Optional[str] = None
    translated_items: Optional[List[str]] = None
    target_language: str
    engine: str
    is_machine_translated: bool
    cached: bool
    label_notice: str


# ==========================================
# AMENDMENT UPLOAD, ANALYSIS & ACTION PLANS
# ==========================================

class AmendmentMetadata(BaseModel):
    title: str = Field(..., description="Amendment title")
    issuing_authority: str = Field(..., description="Issuing authority")
    notification_number: Optional[str] = Field(None, description="Notification or circular number")
    publication_date: Optional[str] = Field(None, description="Publication date")
    effective_date: Optional[str] = Field(None, description="Effective / commencement date")
    official_source_url: Optional[str] = Field(None, description="Official source URL")
    is_source_verified: bool = Field(False, description="Whether source is independently verified")
    source_status_label: str = Field("Source not independently verified", description="Verified vs unverified badge")
    confidence_score: float = Field(0.0, description="Extraction confidence score (0.0 to 1.0)")
    missing_fields: List[str] = Field(default_factory=list, description="Fields missing from input")
    extraction_warnings: List[str] = Field(default_factory=list, description="Warnings or issues during extraction")


class AmendmentParseRequest(BaseModel):
    raw_text: str = Field(..., description="Raw pasted email, circular, or article text")
    original_text: Optional[str] = Field(None, description="Optional original statutory text for diff comparison")


class AmendmentAnalyzeRequest(BaseModel):
    title: str
    issuing_authority: str
    notification_number: Optional[str] = None
    publication_date: Optional[str] = None
    effective_date: Optional[str] = None
    official_source_url: Optional[str] = None
    amendment_text: str
    original_text: Optional[str] = None
    profile: Optional[SMEProfile] = None


class ComplianceActionUpdate(BaseModel):
    action_id: str
    completion_status: Literal['Not Started', 'In Progress', 'Blocked', 'Completed']
    notes: Optional[str] = None
    assigned_to: Optional[str] = None


class AmendmentDraft(BaseModel):
    draft_id: str
    title: str
    authority: str
    notification_number: Optional[str] = None
    publication_date: Optional[str] = None
    effective_date: Optional[str] = None
    source_url: Optional[str] = None
    amendment_text: str
    original_text: Optional[str] = None
    saved_at: str


