import os
from msme_verification_service import verify_msme_certificate

def run_tests():
    sample_dir = os.path.join(os.path.dirname(__file__), "sample_certificates")
    valid_pdf = os.path.join(sample_dir, "apex_precision_udyam_sample.pdf")
    fake_pdf = os.path.join(sample_dir, "tampered_fake_udyam_sample.pdf")

    print("--- TEST 1: Authentic Certificate (Apex Precision) ---")
    with open(valid_pdf, "rb") as f:
        data = f.read()
    res1 = verify_msme_certificate(
        data,
        "apex_precision_udyam_sample.pdf",
        user_udyam_number="UDYAM-MH-26-0048291",
        user_enterprise_name="Apex Precision Components Pvt Ltd"
    )
    print("Verdict:", res1["verdict"])
    print("Confidence:", res1["confidence_score"], "%")
    print("Extracted URN:", res1["udyam_number"])
    print("Security format:", res1["document_checks"]["format_detected"])
    print("Malware scan:", res1["document_checks"]["malware_scan"])
    print("QR Code detected:", res1["document_checks"]["qr_code_detected"])
    print("Official portal matched:", res1["official_portal"]["is_portal_matched"])
    print("Comparison table rows:", len(res1["comparison_table"]))
    for row in res1["comparison_table"]:
        print(f"  [{row['status']}] {row['field']}: {row['certificate_extracted']} vs {row['user_input']} -> {row['note']}")

    print("\n--- TEST 2: Tampered / Discrepancy Certificate ---")
    with open(fake_pdf, "rb") as f:
        data_fake = f.read()
    res2 = verify_msme_certificate(
        data_fake,
        "tampered_fake_udyam_sample.pdf",
        user_udyam_number="UDYAM-MH-26-0048291",  # User entered Apex, but cert has Fake Impex
        user_enterprise_name="Apex Precision Components Pvt Ltd"
    )
    print("Verdict:", res2["verdict"])
    print("Confidence:", res2["confidence_score"], "%")
    print("Anomalies:", res2["ml_anomaly_analysis"]["anomalies_detected"])
    print("Official direct verify URL:", res2["official_portal"]["direct_verification_url"])

    print("\n--- TEST 3: Unindexed Certificate (Review Required - Never Invent Results) ---")
    res3 = verify_msme_certificate(
        data,
        "apex_precision_udyam_sample.pdf",
        user_udyam_number="UDYAM-KA-99-1234567",  # Valid syntax, but not in indexed gazette
        user_enterprise_name="New Tech Startup India Pvt Ltd"
    )
    print("Verdict:", res3["verdict"])
    print("Confidence:", res3["confidence_score"], "%")
    print("Portal Manual Link Provided:", res3["official_portal"]["direct_verification_url"])

if __name__ == "__main__":
    run_tests()
