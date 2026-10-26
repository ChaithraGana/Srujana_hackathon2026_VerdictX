import urllib.request
import json

base = "http://127.0.0.1:8000/api/auth"

# Test 1: Verify Company
req1 = urllib.request.Request(
    f"{base}/verify-company",
    data=json.dumps({
        "company_name": "Apex Precision Components Pvt Ltd",
        "registered_state": "Maharashtra",
        "cin_llpin": "U29300MH2016PTC284910",
        "gstin": "27AAQCA1234F1ZK",
        "pan": "AAQCA1234F",
        "director_din": "08492011",
        "corporate_email": "arjun@apexprecision.com"
    }).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)
with urllib.request.urlopen(req1) as resp:
    res = json.loads(resp.read().decode())
    print("Verify Company:", res["approval_status"], "| Score:", res["trust_score"], "%")

# Test 2: Login (MFA Challenge)
req2 = urllib.request.Request(
    f"{base}/login",
    data=json.dumps({
        "email": "arjun@apexprecision.com",
        "password": "SecretPassword123",
        "role": "Compliance Officer / Director"
    }).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)
with urllib.request.urlopen(req2) as resp:
    res = json.loads(resp.read().decode())
    print("Login:", res["status"], "| Challenge:", res["session_challenge"])

# Test 3: MFA Verify
req3 = urllib.request.Request(
    f"{base}/verify-mfa",
    data=json.dumps({
        "session_challenge": res["session_challenge"],
        "otp_code": "123456"
    }).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)
with urllib.request.urlopen(req3) as resp:
    res = json.loads(resp.read().decode())
    print("MFA Verify:", res["status"], "| Token:", res["token"][:20], "...")
