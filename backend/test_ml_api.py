import urllib.request
import json

# Test 1: Ranked Regulations
req1 = urllib.request.Request("http://127.0.0.1:8000/api/ml/ranked-regulations")
with urllib.request.urlopen(req1) as resp:
    data = json.loads(resp.read().decode())
    print("Ranked Regulations:", len(data))
    for r in data:
        print(f" - [{r['relevance_score']}%] ({r['confidence_tier']}) {r['title']}")

# Test 2: Custom Circular Evaluation (Unrelated RBI Circular)
payload = json.dumps({
    "title": "RBI Master Direction - Non-Banking Financial Company - Systemically Important Non-Deposit taking Company",
    "authority": "Reserve Bank of India",
    "summary": "Every non-deposit taking NBFC with asset size of Rs 500 Crore shall submit monthly returns via XBRL portal."
}).encode("utf-8")

req2 = urllib.request.Request(
    "http://127.0.0.1:8000/api/ml/evaluate-circular",
    data=payload,
    headers={"Content-Type": "application/json"}
)
with urllib.request.urlopen(req2) as resp:
    result = json.loads(resp.read().decode())
    print("\nCustom Evaluation Result:")
    print(" - Score:", result["relevance_score"], "%")
    print(" - Tier:", result["confidence_tier"])
    print(" - Action Priority:", result["action_priority"])
    print(" - Signals:", result["matching_signals"])
    print(" - Explanation:", result["model_explanation"])
