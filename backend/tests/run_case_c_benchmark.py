
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEST_FILE = ROOT / "tests" / "case_c_test_cases.json"
DATA_FILE = ROOT / "datasets" / "processed" / "case_c_mca.json"

VALID_RESULTS = {"CHANGE_DETECTED", "REVIEW_REQUIRED"}

def main():
    with TEST_FILE.open(encoding="utf-8") as f:
        tests = json.load(f)["test_cases"]

    with DATA_FILE.open(encoding="utf-8") as f:
        data = json.load(f)

    assert data["case_id"] == "CASE_C_MCA_DIRECTOR_KYC"
    assert len(tests) == 8, "Expected exactly eight test scenarios"

    ids = [case["id"] for case in tests]
    assert len(set(ids)) == 8, "Duplicate test IDs found"
    assert set(ids) == {f"C{i:02d}" for i in range(1, 9)}

    for case in tests:
        assert case["expected_result"] in VALID_RESULTS

    provisions = data.get("provisions", [])
    rule12a = next(
        (p for p in provisions
         if p.get("rule") == "12A"
         and p.get("amendment_notification") == "G.S.R. 339(E)"),
        None
    )
    assert rule12a is not None, "G.S.R. 339(E) Rule 12A provision missing"

    # Select the exact 2019 April amendment record rather than assuming it is first.
    assert "30th April" in rule12a["baseline_wording"]
    assert "30th June" in rule12a["amended_wording"]
    assert data["validation_status"] == "REVIEW_REQUIRED"

    print("PASS: benchmark JSON structure")
    print("PASS: eight unique scenarios C01-C08")
    print("PASS: Rule 12A deadline-change fields")
    print("PASS: unresolved validation status preserved")
    print()
    print("SCENARIO INVENTORY")
    for case in tests:
        print(f'{case["id"]}: expected {case["expected_result"]}')

    print()
    print("LIMITATION: These are benchmark integrity checks.")
    print("They do NOT execute the ReguLens application or")
    print("prove that its change-detection logic works.")
    print("Integrated application tests remain PENDING.")

if __name__ == "__main__":
    main()

