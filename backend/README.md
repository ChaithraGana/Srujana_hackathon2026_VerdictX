# ReguLens Backend Service

The high-performance API backend for **ReguLens (Problem Statement LS-02)**.

## Architecture
- **Framework:** FastAPI (Python 3.10+)
- **Validation:** Pydantic v2
- **Rule Engine:** Deterministic statutory logic matching Member 3's benchmark datasets (`datasets/processed/case_a_gst.json`)
- **Integrity Tests:** Automated runner for benchmark scenarios A01–A08 (`tests/case_a_test_cases.json`)
- **Evidence Integrity:** SHA-256 cryptographic digests for ProofPath audit records

## Setup & Running

```bash
cd d:/Hackathon/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- **Interactive API Documentation (Swagger UI):** `http://localhost:8000/docs`
- **Health Check:** `http://localhost:8000/api/health`
- **Run Live Benchmark Test Suite:** `http://localhost:8000/api/tests/case-a`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/regulations` | Returns curated regulatory cases (GST, MCA, Maharashtra Wages) |
| `GET` | `/api/diff/{case_id}` | Returns character and clause level side-by-side legal diff |
| `GET` | `/api/profiles` | Returns synthetic SME profiles (Apex Components & CloudSpark) |
| `POST` | `/api/evaluate` | Evaluates SME profile against statutory conditions |
| `POST` | `/api/simulate` | Real-time What-If simulator endpoint |
| `POST` | `/api/proofpath/record` | Computes SHA-256 hash and generates verifiable action record |
| `GET` | `/api/briefing/{case_id}?lang=kn` | Regional language synthesis (English, Kannada, Hindi) |
| `GET` | `/api/tests/case-a` | Executes Member 3's benchmark test suite live |
