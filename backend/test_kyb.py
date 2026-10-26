from kyb_service import conduct_full_kyb_verification

# Test 1: Legitimate Registered Indian Company
valid_company = {
    "company_name": "Apex Precision Components Pvt Ltd",
    "registered_state": "Maharashtra",
    "cin_llpin": "U29300MH2016PTC284910",
    "gstin": "27AAQCA1234F1ZK",
    "pan": "AAQCA1234F",
    "director_din": "08492011",
    "corporate_email": "arjun@apexprecision.com",
    "entity_type": "Private Limited"
}
res1 = conduct_full_kyb_verification(valid_company)
print("--- TEST 1: Apex Precision (Valid) ---")
print("Trust Score:", res1["trust_score"], "%")
print("Status:", res1["approval_status"])
print("Is Approved:", res1["is_approved"])
print("Digest:", res1["kyb_sha256_digest"][:24], "...")
for item in res1["checklist"]:
    print(f" - [{item['status']}] {item['item']}: {item['note']}")

# Test 2: Fraudulent / Spoofed Company
fake_company = {
    "company_name": "Ghost Shell Enterprise",
    "registered_state": "Karnataka",
    "cin_llpin": "INVALID_CIN_123",
    "gstin": "27FAKEGSTIN999",
    "pan": "INVALIDPAN",
    "director_din": "123",
    "corporate_email": "fake@gmail.com",
    "entity_type": "Private Limited"
}
res2 = conduct_full_kyb_verification(fake_company)
print("\n--- TEST 2: Ghost Shell (Invalid) ---")
print("Trust Score:", res2["trust_score"], "%")
print("Status:", res2["approval_status"])
print("Is Approved:", res2["is_approved"])
