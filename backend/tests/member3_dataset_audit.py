"""Static quality checks for Member 3's datasets and test definitions.

This is NOT an application/integration test and does not certify legal correctness.
Run from the repository root: python tests/member3_dataset_audit.py
"""
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def load(rel):
    path = ROOT / rel
    with path.open("r", encoding="utf-8-sig") as f:
        return json.load(f)

def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print(f"PASS: {message}")

def unique_ids(items, key, label):
    ids = [item.get(key) for item in items]
    check(all(ids), f"{label}: every scenario has an ID")
    check(len(ids) == len(set(ids)), f"{label}: IDs are unique")

def main():
    a = load("datasets/processed/case_a_gst.json")
    b = load("datasets/processed/case_b_maharashtra_wages.json")
    c = load("datasets/processed/case_c_mca.json")
    ta = load("tests/case_a_test_cases.json")
    tb = load("tests/case_b_test_cases.json")
    tc = load("tests/case_c_test_cases.json")

    check(a.get("case_id") == "CASE_A_GST_E_INVOICING", "Case A dataset identity")
    check(len(a.get("source_documents", [])) >= 3, "Case A has multiple source-document entries")
    check(b.get("status") == "REVIEW_REQUIRED", "Case B unresolved baseline remains flagged")
    check(b.get("baseline", {}).get("original_gazette_verified") is False, "Case B does not claim original Gazette verification")
    check(c.get("validation_status") == "REVIEW_REQUIRED", "Case C unresolved legal status remains flagged")
    check(c.get("application_test_status") == "PENDING", "Case C application testing remains pending")

    unique_ids(ta.get("tests", []), "test_id", "Case A tests")
    unique_ids(tb.get("tests", []), "test_id", "Case B tests")
    unique_ids(tc.get("test_cases", []), "id", "Case C tests")
    check(len(ta.get("tests", [])) >= 5, "Case A has at least five scenarios")
    check(len(tb.get("tests", [])) >= 5, "Case B has at least five scenarios")
    check(len(tc.get("test_cases", [])) == 8, "Case C has eight scenarios")

    allowed = {"CHANGE_DETECTED", "REVIEW_REQUIRED", "APPLICABLE", "EXEMPT", "NO_CHANGE_DETECTED"}
    for label, cases, key in [
        ("Case A", ta.get("tests", []), "expected_result"),
        ("Case B", tb.get("tests", []), "expected_result"),
        ("Case C", tc.get("test_cases", []), "expected_result"),
    ]:
        check(all(item.get(key) in allowed for item in cases), f"{label} expected-result labels are recognized")

    print("\nLIMITATION: These are static dataset checks only.")
    print("They do not execute ReguLens application logic or verify every legal claim.")
    print("Integrated application tests remain PENDING until the backend is available.")

if __name__ == "__main__":
    main()
