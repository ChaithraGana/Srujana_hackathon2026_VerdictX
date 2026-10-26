import requests

with open("sample_certificates/apex_precision_udyam_sample.pdf", "rb") as f:
    files = {"file": ("cert.pdf", f, "application/pdf")}
    data = {
        "udyam_number": "UDYAM-MH-26-0048291",
        "enterprise_name": "Apex Precision Components Pvt Ltd"
    }
    r = requests.post("http://localhost:8000/api/msme/verify", files=files, data=data)
    print("Status code:", r.status_code)
    res = r.json()
    print("Verdict:", res.get("verdict"))
    print("Confidence:", res.get("confidence_score"))
    print("Audit Digest:", res.get("sha256_audit_digest")[:20], "...")
