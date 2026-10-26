from typing import Dict, Any, List
from models import SMEProfile, ApplicabilityEvaluationResponse, ConditionCheck, SimulatorRequest, SimulatorResponse

def evaluate_case_a_gst(profile: SMEProfile) -> ApplicabilityEvaluationResponse:
    turnover = profile.annual_turnover_inr
    pan_verified = profile.pan_aggregation_verified
    period_verified = profile.turnover_period_verified
    exclusion = profile.entity_exclusion_applies

    conditions: List[ConditionCheck] = [
        ConditionCheck(
            label="Statutory Threshold",
            value="₹5 Crore (Notification No. 10/2023-CT)",
            status="info"
        ),
        ConditionCheck(
            label="Supplied Aggregate Turnover",
            value=f"₹{turnover / 10000000:.1f} Crore",
            status="verified" if turnover > 0 else "warning"
        ),
        ConditionCheck(
            label="PAN-wide Aggregation",
            value="Verified across registrations" if pan_verified else "Unconfirmed - Multi-GSTIN check needed",
            status="verified" if pan_verified else "warning"
        ),
        ConditionCheck(
            label="Statutory Exclusions (Rule 48(4))",
            value="No exclusions apply" if exclusion is False else ("Exclusion Active (SEZ/GTA/Banking)" if exclusion is True else "Unverified"),
            status="verified" if exclusion is False else ("info" if exclusion is True else "warning")
        )
    ]

    # Evaluate according to statutory rules
    if turnover is None or turnover <= 0:
        return ApplicabilityEvaluationResponse(
            case_id="CASE_A_GST_E_INVOICING",
            business_name=profile.name,
            verdict="Review Required",
            headline="Turnover details required",
            reason="Turnover is missing or zero. A definitive legal applicability check requires verified aggregate turnover.",
            statutory_citation="CGST Rules, 2017 · Rule 48(4)",
            effective_date="1 August 2023",
            conditions_checked=conditions,
            action_items=[
                "Provide verified annual turnover across all GSTINs under company PAN.",
                "Verify whether any supply is made to government entities or SEZ units."
            ]
        )

    if not pan_verified or not period_verified:
        return ApplicabilityEvaluationResponse(
            case_id="CASE_A_GST_E_INVOICING",
            business_name=profile.name,
            verdict="Review Required",
            headline="Aggregation rules need confirmation",
            reason=f"Turnover is ₹{turnover / 10000000:.1f} Cr, but PAN-wide aggregation across all states and relevant financial-year turnover period must be verified before confirming obligation.",
            statutory_citation="Notification 10/2023-Central Tax · Rule 48(4)",
            effective_date="1 August 2023",
            conditions_checked=conditions,
            action_items=[
                "Consolidate turnover figures across all branches/GSTINs under the same PAN from FY 2017-18 onwards.",
                "Review ledger to confirm if aggregate turnover crossed ₹5 Crore in any preceding financial year."
            ]
        )

    if exclusion is None:
        return ApplicabilityEvaluationResponse(
            case_id="CASE_A_GST_E_INVOICING",
            business_name=profile.name,
            verdict="Review Required",
            headline="Statutory exclusions unconfirmed",
            reason="Entity turnover is above threshold, but statutory exclusions under Rule 48(4) proviso (SEZ units, GTA, insurer, banking companies) have not been checked.",
            statutory_citation="Rule 48(4) proviso, CGST Rules 2017",
            effective_date="1 August 2023",
            conditions_checked=conditions,
            action_items=[
                "Confirm entity is not an SEZ (Special Economic Zone) unit or Goods Transport Agency.",
                "Confirm business is not a regulated banking/insurance institution."
            ]
        )

    if exclusion is True:
        return ApplicabilityEvaluationResponse(
            case_id="CASE_A_GST_E_INVOICING",
            business_name=profile.name,
            verdict="Not Applicable",
            headline="Statutory exclusion applies",
            reason="Although aggregate turnover exceeds ₹5 Crore, the business qualifies for statutory exemption under the proviso to Rule 48(4).",
            statutory_citation="Proviso to Rule 48(4) of CGST Rules, 2017",
            effective_date="1 August 2023",
            conditions_checked=conditions,
            action_items=[
                "Maintain documentation supporting SEZ or sector-specific exemption status in tax records."
            ]
        )

    if turnover >= 50000000:  # >= 5 Cr
        return ApplicabilityEvaluationResponse(
            case_id="CASE_A_GST_E_INVOICING",
            business_name=profile.name,
            verdict="Applicable",
            headline="Mandatory E-Invoicing condition met",
            reason=f"{profile.name}'s aggregate turnover of ₹{turnover / 10000000:.1f} Crore exceeds the revised ₹5 Crore threshold notified under Notification No. 10/2023-Central Tax.",
            statutory_citation="Notification No. 10/2023–Central Tax · Rule 48(4)",
            effective_date="1 August 2023",
            conditions_checked=conditions,
            action_items=[
                "Enable Invoice Registration Portal (IRP) credentials for e-invoice generation.",
                "Upgrade billing / ERP software to embed IRN hash and Signed QR Code on all B2B invoices.",
                "Notify corporate clients that valid e-invoices with IRN will be issued to protect their Input Tax Credit (ITC)."
            ]
        )
    else:
        return ApplicabilityEvaluationResponse(
            case_id="CASE_A_GST_E_INVOICING",
            business_name=profile.name,
            verdict="Not Applicable",
            headline="Below statutory threshold",
            reason=f"Aggregate turnover of ₹{turnover / 10000000:.1f} Crore is below the ₹5 Crore threshold under Notification No. 10/2023-Central Tax.",
            statutory_citation="Notification No. 10/2023–Central Tax",
            effective_date="1 August 2023",
            conditions_checked=conditions,
            action_items=[
                "Monitor cumulative turnover towards end of current financial year.",
                "Continue standard tax invoice issuance without mandatory IRN."
            ]
        )

def simulate_case_a(req: SimulatorRequest) -> SimulatorResponse:
    turnover = req.turnover_inr
    employees = req.employees
    states = req.states
    exclusion = req.statutory_exclusion
    history = req.turnover_history_verified

    meets_turnover = turnover >= 50000000  # 5 Cr
    has_profile = employees > 0 and len(states) > 0

    if not has_profile or not history:
        verdict = "Review Required"
        headline = "More evidence needed"
        reason = "The rule outcome cannot be finalized until turnover history and operating profile completeness are confirmed."
        changed = "Turnover history or operating profile completeness needs verification"
    elif meets_turnover and not exclusion:
        verdict = "Applicable"
        headline = "Condition met"
        reason = f"At ₹{turnover / 10000000:.1f} Cr turnover, the ₹5 Crore statutory threshold under Notification 10/2023 is crossed and verified."
        changed = "Turnover threshold crossed (>= ₹5 Crore)"
    else:
        verdict = "Not Applicable"
        headline = "Condition not met"
        reason = "The profile turnover remains below ₹5 Crore, or a statutory exclusion (such as SEZ unit status) is active."
        changed = "Statutory exclusion applied" if exclusion else "Turnover below ₹5 Crore threshold"

    return SimulatorResponse(
        verdict=verdict,
        headline=headline,
        reason=reason,
        changed_condition=changed,
        threshold_used="₹5 Crore",
        profile_turnover=f"₹{turnover / 10000000:.1f} Cr",
        states_count=len(states),
        is_exclusion_active=exclusion,
        is_history_verified=history
    )
