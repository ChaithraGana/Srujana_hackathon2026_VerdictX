import requests
import json

def test_translation():
    url = "http://127.0.0.1:8000/api/translate"
    
    # Test 1: Kannada translation of regulatory summary
    p1 = {
        "text": "Notification 10/2023 mandates electronic invoicing for all registered B2B suppliers with turnover exceeding ₹5 Crore, effective 1 August 2023.",
        "target_language": "kn",
        "prefer_ml": True
    }
    r1 = requests.post(url, json=p1)
    print("Test 1 Status:", r1.status_code)
    d1 = r1.json()
    print("Test 1 Engine:", d1["engine"])
    print("Test 1 Machine Translated:", d1["is_machine_translated"])
    print("Test 1 Notice:", d1["label_notice"])
    print("Test 1 Text (repr):", repr(d1["translated_text"]))
    
    # Test 2: Hindi translation of action checklist
    p2 = {
        "items": [
            "Register on the Invoice Registration Portal (IRP).",
            "Ensure billing software embeds IRN and Signed QR Code on all B2B tax invoices.",
            "Verify buyer GSTINs to safeguard their Input Tax Credit (ITC)."
        ],
        "target_language": "hi",
        "prefer_ml": True
    }
    r2 = requests.post(url, json=p2)
    print("\nTest 2 Status:", r2.status_code)
    d2 = r2.json()
    print("Test 2 Engine:", d2["engine"])
    print("Test 2 Items count:", len(d2["translated_items"]))
    print("Test 2 Notice:", d2["label_notice"])

    # Test 3: Cache verification
    r3 = requests.post(url, json=p1)
    print("\nTest 3 Cache Status:", r3.json().get("cached"))

if __name__ == "__main__":
    test_translation()

