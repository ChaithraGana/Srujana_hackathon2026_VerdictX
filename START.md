# ReguLens — Quickstart & Startup Guide
### Srujana Tech Fest 2026 | Problem Statement: LS-02

This guide outlines how to start, verify, and demonstrate **ReguLens**, the enterprise regulatory compliance and change impact platform for Indian statutory notifications (CBIC Notification 10/2023-CT / Rule 48(4)).

---

## ⚡ 1. One-Click Startup (Recommended)

You can launch both the **FastAPI Backend** and the **Vite React Frontend** with a single click:

- **Command Prompt / Windows Explorer**:
  Double-click or run:
  ```cmd
  start.bat
  ```
- **PowerShell**:
  ```powershell
  .\start.ps1
  ```

This will automatically:
1. Open a terminal running FastAPI on `http://localhost:8000` with hot-reload.
2. Open a terminal running Vite + React on `http://localhost:3000` with hot-reload.
3. Automatically launch your default browser to `http://localhost:3000/`.

---

## 🛠️ 2. Manual Startup (Step-by-Step)

If you prefer running services in separate dedicated terminals:

### Terminal 1: Backend (FastAPI)
```bash
cd d:/Hackathon/backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Member 3 Benchmark Test Suite**: [http://localhost:8000/api/tests/case-a](http://localhost:8000/api/tests/case-a)

### Terminal 2: Frontend (React + Vite + Three.js)
```bash
cd d:/Hackathon/regulens
npm install
npm run dev
```
- **Application URL**: [http://localhost:3000/](http://localhost:3000/)

---

## 🔑 3. Environment Credentials Configuration

Your credentials are saved in:
- [`backend/.env`](file:///d:/Hackathon/backend/.env)
- [`.env`](file:///d:/Hackathon/.env)

```env
# Google Gemini API
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# Supabase (PostgreSQL Cloud Instance)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-or-service-key

# Direct PostgreSQL Connection
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres

# Offline Resilience (false = cloud live; true = deterministic zero-drop local mode)
DEMO_OFFLINE_MODE=false
```

*Note: The system automatically reloads upon saving your `.env` file without requiring process restarts.*

---

## 🧪 4. Verification & Testing

Verify that all systems are operational:

1. **Backend Health**:
   ```bash
   curl http://localhost:8000/api/health
   ```
   *Expected: `{"status": "healthy", ...}`*

2. **Benchmark 8/8 Tests**:
   ```bash
   curl http://localhost:8000/api/tests/case-a
   ```
   *Expected: `8 of 8 passed (100% deterministic accuracy)`*

3. **Regional Briefings (Kannada with Chanakya Host Affinity)**:
   ```bash
   curl "http://localhost:8000/api/briefing/CASE_A_GST_E_INVOICING?lang=kn"
   ```

4. **ProofPath SHA-256 Ledger Generation**:
   Visit [http://localhost:3000/proofpath](http://localhost:3000/proofpath) and click "Generate Tamper-Evident Record".

---

## 🎬 5. Judge Demonstration Workflow

When presenting to the evaluators, use this suggested flow:

1. **Dashboard (`/`)**:
   - Highlight the dynamic Three.js 3D regulatory knowledge graph.
   - Click **"View Member 3 Benchmark"** to show the live 8/8 scenario pass rate.
2. **Document Observatory (`/comparison`)**:
   - Show side-by-side Gazette statutory text diffs (₹10 Cr $\rightarrow$ ₹5 Cr substitution under Notification 10/2023-CT).
   - Switch language tabs to demonstrate regional briefings in **ಕನ್ನಡ (Kannada)** and **हिन्दी (Hindi)**.
3. **What-If Horizon Simulator (`/simulator`)**:
   - Move turnover sliders across the ₹5 Crore boundary to watch the deterministic verdict adapt instantly.
   - Toggle statutory exclusions (e.g., SEZ units under Rule 48(4)).
4. **ProofPath Audit Vault (`/proofpath`)**:
   - Check off compliance actions (IRP registration, ERP update).
   - Generate and inspect the SHA-256 cryptographic compliance certificate with statutory disclaimers.
