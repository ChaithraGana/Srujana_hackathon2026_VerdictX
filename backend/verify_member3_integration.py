from fastapi.testclient import TestClient
from main import app
import sys

def verify_all():
    client = TestClient(app)
    
    print("=================================================================")
    print("   ReguLens — Member 3 Multi-Case Integration & Audit Test Runner")
    print("=================================================================")

    # 1. Test Case A endpoint
    res_a = client.get("/api/tests/case-a")
    assert res_a.status_code == 200, f"Case A failed: {res_a.status_code}"
    data_a = res_a.json()
    print(f"[PASS] /api/tests/case-a: {data_a['passed']}/{data_a['total_tests']} scenarios passed ({data_a['accuracy_percentage']}%)")
    assert data_a['all_passed'] is True

    # 2. Test Case B endpoint
    res_b = client.get("/api/tests/case-b")
    assert res_b.status_code == 200, f"Case B failed: {res_b.status_code}"
    data_b = res_b.json()
    print(f"[PASS] /api/tests/case-b: {data_b['passed']}/{data_b['total_tests']} scenarios passed ({data_b['accuracy_percentage']}%)")
    print(f"       Zero-Fabrication Guardrail: {data_b['zero_fabrication_audit']}")
    assert data_b['all_passed'] is True

    # 3. Test Case C endpoint
    res_c = client.get("/api/tests/case-c")
    assert res_c.status_code == 200, f"Case C failed: {res_c.status_code}"
    data_c = res_c.json()
    print(f"[PASS] /api/tests/case-c: {data_c['passed']}/{data_c['total_tests']} scenarios passed ({data_c['accuracy_percentage']}%)")
    print(f"       Zero-Fabrication Guardrail: {data_c['zero_fabrication_audit']}")
    assert data_c['all_passed'] is True

    # 4. Test Dataset Audit endpoint
    res_audit = client.get("/api/tests/member3/audit")
    assert res_audit.status_code == 200, f"Audit failed: {res_audit.status_code}"
    data_audit = res_audit.json()
    print(f"[PASS] /api/tests/member3/audit: {data_audit['passed']}/{data_audit['total_checks']} static checks passed")
    assert data_audit['all_passed'] is True

    # 5. Test Unified /api/tests/member3/all endpoint
    res_all = client.get("/api/tests/member3/all")
    assert res_all.status_code == 200, f"All failed: {res_all.status_code}"
    data_all = res_all.json()
    print(f"[PASS] /api/tests/member3/all: {data_all['total_passed']}/{data_all['total_test_scenarios']} total scenarios passed across {data_all['total_test_suites']} cases ({data_all['overall_accuracy_percentage']}%)")
    print(f"       Audit Status: {data_all['zero_fabrication_audit']}")
    assert data_all['overall_accuracy_percentage'] == 100.0

    print("=================================================================")
    print(" ALL 23 TEST SCENARIOS + 12 DATASET AUDIT CHECKS PASSED (100%)!  ")
    print("=================================================================")

if __name__ == "__main__":
    verify_all()
