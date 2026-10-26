import os
import json
from typing import List, Dict, Any, Optional
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Supabase & PostgreSQL Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip().rstrip("/")
if SUPABASE_URL.endswith("/rest/v1"):
    SUPABASE_URL = SUPABASE_URL[:-8]
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "").strip()
DEMO_OFFLINE_MODE = os.getenv("DEMO_OFFLINE_MODE", "true").lower() in ("true", "1", "yes")

_supabase_client = None

if SUPABASE_URL and SUPABASE_KEY and not DEMO_OFFLINE_MODE:
    try:
        from supabase import create_client, Client
        _supabase_client: Optional[Client] = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✓ Connected to Supabase PostgreSQL cloud instance.")
    except Exception as e:
        print(f"! Failed to connect to Supabase: {e}. Falling back to resilient local store.")
        _supabase_client = None


# Resilient In-Memory & File Store (Guarantees zero crashes during venue network drops)
_LOCAL_PROFILES = [
    {
        "id": "APEX_001",
        "name": "Apex Precision Components Pvt Ltd",
        "sector": "Industrial manufacturing (NIC 2930)",
        "state": "Karnataka",
        "operating_states": ["Karnataka", "Maharashtra", "Tamil Nadu"],
        "annual_turnover_inr": 82000000,
        "employees": 48,
        "gstin": "29AABCA1234F1Z5",
        "is_sez_unit": False,
        "pan_aggregation_verified": True,
        "turnover_period_verified": True
    }
]

_LOCAL_REGULATIONS = [
    {
        "id": "NOTIF_10_2023_CT",
        "case_id": "CASE_A_GST_E_INVOICING",
        "title": "Notification No. 10/2023 — Central Tax",
        "authority": "CBIC",
        "published": "10 May 2023",
        "effective": "01 Aug 2023",
        "impact": "High",
        "status": "Verified source",
        "summary": "Mandatory e-invoicing threshold reduced from ₹10 Crore to ₹5 Crore for all B2B supplies under CGST Rule 48(4).",
        "official_url": "https://gstcouncil.gov.in/node/4365"
    },
    {
        "id": "MAHA_MW_2010",
        "case_id": "CASE_B_MAHA_MIN_WAGES",
        "title": "Maharashtra Minimum Wages Revision 2010",
        "authority": "Govt of Maharashtra",
        "published": "28 Oct 2010",
        "effective": "01 Nov 2010",
        "impact": "High",
        "status": "Verified demo",
        "summary": "Revised basic rates for engineering manufacturing across Zone I, II, III under Minimum Wages Act, 1948.",
        "official_url": "https://mahakamgar.maharashtra.gov.in/"
    },
    {
        "id": "MCA_DIR_KYC_2019",
        "case_id": "CASE_C_MCA_DIR_KYC",
        "title": "Companies (Appointment and Qualification of Directors) Third Amendment Rules, 2019",
        "authority": "MCA",
        "published": "25 Jul 2019",
        "effective": "25 Jul 2019",
        "impact": "Medium",
        "status": "Verified demo",
        "summary": "Introduction of simplified Web-form DIR-3 KYC WEB for zero-change annual compliance with zero filing fees.",
        "official_url": "https://www.mca.gov.in/"
    }
]

_LOCAL_PROOFPATH_RECORDS: List[Dict[str, Any]] = [
    {
        "record_id": "RL-2023-10CT-APEX",
        "case_id": "CASE_A_GST_E_INVOICING",
        "timestamp": "10 May 2023 · 14:30 IST",
        "sha256_digest": "7d2e 9f14 0502 1c5c 2d71 9f3a 52e0 3f90 0bb0 3e71 b20c 9c14 3ab5 1d70 6e82",
        "source_document": "Notification No. 10/2023 — Central Tax",
        "official_url": "https://gstcouncil.gov.in/node/4365",
        "business_name": "Apex Precision Components Pvt Ltd",
        "turnover_display": "₹8.2 Crore",
        "citation": "Notification 10/2023-CT · Rule 48(4)",
        "verdict": "Applicable",
        "verification_status": "Summary Checked & Timestamped",
        "completed_actions": [
            "Obtain IRP credentials for e-invoice generation before 1 Aug 2023",
            "Configure ERP/billing software to generate IRN hash and Signed QR Code",
            "Notify B2B customers of mandatory e-invoicing compliance"
        ],
        "disclaimer": "ReguLens creates a tamper-evident record of the regulatory source reviewed, the assessment made, and the actions recorded by the user. This supports internal recordkeeping and traceability; it does not guarantee compliance or a particular legal outcome."
    }
]


def get_profiles() -> List[Dict[str, Any]]:
    if _supabase_client:
        try:
            res = _supabase_client.table("profiles").select("*").execute()
            if res.data:
                return res.data
        except Exception as e:
            print(f"! Supabase query failed: {e}. Using local store.")
    return _LOCAL_PROFILES


def get_regulations() -> List[Dict[str, Any]]:
    if _supabase_client:
        try:
            res = _supabase_client.table("regulations").select("*").execute()
            if res.data:
                return res.data
        except Exception as e:
            print(f"! Supabase query failed: {e}. Using local store.")
    return _LOCAL_REGULATIONS


def save_proofpath_record(record: Dict[str, Any]) -> Dict[str, Any]:
    if _supabase_client:
        try:
            _supabase_client.table("proofpath_records").upsert(record).execute()
        except Exception as e:
            print(f"! Supabase save failed: {e}. Saving to resilient local store.")
    
    # Store locally as well
    _LOCAL_PROOFPATH_RECORDS.append(record)
    return record


def get_proofpath_records() -> List[Dict[str, Any]]:
    if _supabase_client:
        try:
            res = _supabase_client.table("proofpath_records").select("*").order("created_at", desc=True).execute()
            if res.data:
                return res.data
        except Exception as e:
            print(f"! Supabase query failed: {e}. Using local store.")
    return _LOCAL_PROOFPATH_RECORDS
