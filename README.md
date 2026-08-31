# KhelSetu (खेल सेतु) — Grassroots Sports Verification Platform

> **"From Local Performance to Verified Opportunity"**

KhelSetu is a trusted, grassroots sports platform designed to eliminate fake certificates and connect unheralded grassroots badminton talent to state trials, sports academies, and university scholarships through tamper-proof digital achievements and AI-assisted movement evidence.

---

## Complete End-to-End Grassroots Workflow

```
Athlete (Register) ➔ Organizer (Check-In & Submit Score) ➔ Certified Verifier (Independent Review) ➔ Mint Credential & QR ➔ Athlete Performance Passport ➔ Scout Discovery & AI Movement Card
```

---

## Key Features

1. **5 Role Personas with Instant Role Switcher:**
   - **Athlete:** Register for tournaments, digital QR player passes, achievement collection, squat movement test.
   - **Organizer:** Publish tournaments, check in athletes, record podium results with match scorecards.
   - **Verifier:** Independent technical referee review desk; approve/reject with audit logs & generate unique `credential_id`.
   - **Scout:** Multi-criteria search (district, age category, verified tournament wins, movement evidence).
   - **Admin:** Platform governance, organization verification, and immutable JSON audit trails.

2. **Tamper-Proof QR Verification (`/verify/:credentialId`):**
   - Canonical public certificates with referee attestations and official signatures.

3. **Grassroots Performance Passport:**
   - Transparent metrics summary (verified participation, wins, runner-up finishes, reliability rating: High/Medium/Low, prototype points system: 1, 3, 5, 8).

4. **AI Squat Movement Assessment (`ai-service/`):**
   - Python FastAPI + OpenCV + MediaPipe Pose computer-vision observation for bodyweight squat repetitions and joint tracking with clear ethical disclaimers.

---

## Quickstart & Local Setup

### 1. Frontend Web App (React + TypeScript + Vite)

```bash
# Navigate to project
cd KhelSetu

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 2. AI Movement Assessment Service (Python FastAPI)

```bash
cd KhelSetu/ai-service

# Setup virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```

*Note: If the Python AI service is not running, KhelSetu automatically and gracefully uses a clearly marked "Demo Fallback" assessment.*

### 3. Supabase Integration (Optional for Production)

1. Create a project in [Supabase](https://app.supabase.com).
2. Execute SQL scripts in `supabase/migrations/` (`001_initial_schema.sql`, `002_rls_policies.sql`, `003_seed_data.sql`).
3. Set your keys in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## Seed Demo Accounts (1-Click Login)

| Role | Demo Email | Name | Focus |
|---|---|---|---|
| **Athlete** | `athlete@demo.khelsetu.in` | Aarav Joshi | Pune district singles competitor |
| **Organizer** | `organizer@demo.khelsetu.in` | Vikram Malhotra | Pune District Sports Academy director |
| **Verifier** | `verifier@demo.khelsetu.in` | Dr. Sunita Rao | State Badminton Technical Official |
| **Scout** | `scout@demo.khelsetu.in` | Rajesh Kadam | Western Zone Talent Scouting Network |
| **Admin** | `admin@demo.khelsetu.in` | KhelSetu Admin | Governance and audit inspection |

---

## Hackathon Evaluation Walkthrough

1. **Athlete Registration Flow:**
   - Log in as **Athlete** (`athlete@demo.khelsetu.in`).
   - Go to **Discover Events** and register for *"Pune District Badminton Open 2026"*.
   - View your confirmed registration pass.
2. **Organizer Result Submission Flow:**
   - Switch to **Organizer** (`organizer@demo.khelsetu.in`) using the top role switcher.
   - Open *"Rising Stars Academy Tournament"*, view registered players, and submit a match result (Position #1, Score: `21-18, 19-21, 21-16`, attached scorecard URL).
   - Notice the status becomes `PENDING_VERIFICATION` (organizers cannot self-verify).
3. **Independent Verifier Review Flow:**
   - Switch to **Verifier** (`verifier@demo.khelsetu.in`).
   - Open the pending queue, inspect match evidence, and click **Approve & Mint Verified Achievement**.
   - A unique Credential ID (`KS-PUN-2026-XXXX`) and canonical QR code are generated.
4. **Public QR Verification Flow:**
   - Open `/verify/KS-PUN-2026-0814` (or click "Verify" on any achievement).
   - View the official digital certificate and referee seal.
5. **Scout Discovery Flow:**
   - Switch to **Scout** (`scout@demo.khelsetu.in`).
   - Filter athletes by district ("Pune") and verified tournament wins ("1+").
   - Open Aarav Joshi's verified dossier to view his Performance Passport and AI Movement Evidence Card.
