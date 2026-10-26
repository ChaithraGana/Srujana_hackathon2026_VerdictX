import hashlib
import json
from datetime import datetime
from models import ProofPathRecordRequest, ProofPathRecordResponse

def create_proofpath_record(req: ProofPathRecordRequest) -> ProofPathRecordResponse:
    # Deterministic payload to hash
    now = datetime.now()
    timestamp_str = now.strftime("%d %b %Y · %H:%M IST")
    record_id = f"RL-{now.strftime('%Y-%m%d')}-AP"

    payload = {
        "record_id": record_id,
        "case_id": req.case_id,
        "business_name": req.business_name,
        "turnover_inr": req.turnover_inr,
        "verdict": req.verdict,
        "citation": req.citation,
        "completed_actions": sorted(req.completed_actions),
        "timestamp": timestamp_str
    }

    serialized = json.dumps(payload, sort_keys=True).encode("utf-8")
    raw_hash = hashlib.sha256(serialized).hexdigest()
    # Format as spaced 4-character hex chunks for clean display
    spaced_digest = " ".join(raw_hash[i:i+4] for i in range(0, 64, 4))

    return ProofPathRecordResponse(
        record_id=record_id,
        timestamp=timestamp_str,
        sha256_digest=spaced_digest,
        source_document="Notification No. 10/2023 — Central Tax",
        official_url="https://gstcouncil.gov.in/node/4365",
        business_name=req.business_name,
        turnover_display=f"₹{req.turnover_inr / 10000000:.1f} Crore",
        citation=req.citation,
        verdict=req.verdict,
        verification_status="Summary Checked & Timestamped",
        completed_actions=req.completed_actions,
        disclaimer="ReguLens creates a tamper-evident record of the regulatory source reviewed, the assessment made, and the actions recorded by the user. This supports internal recordkeeping and traceability; it does not guarantee compliance or a particular legal outcome."
    )
