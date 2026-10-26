-- ============================================================================
-- ReguLens (LS-02) Database Schema for Supabase / PostgreSQL
-- Srujana Tech Fest 2026 | Track: Legal Services
-- ============================================================================

-- 1. Regulations Table (Statutory gazette clauses, citations, and authority metadata)
CREATE TABLE IF NOT EXISTS public.regulations (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    title TEXT NOT NULL,
    authority TEXT NOT NULL,
    published_date DATE NOT NULL,
    effective_date DATE NOT NULL,
    impact TEXT NOT NULL,
    status TEXT NOT NULL,
    summary TEXT NOT NULL,
    official_url TEXT NOT NULL,
    gazette_pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Business Profiles Table (SME operating footprint, turnover, GSTINs)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sector TEXT NOT NULL,
    state TEXT NOT NULL,
    operating_states TEXT[] NOT NULL DEFAULT '{}',
    annual_turnover_inr NUMERIC NOT NULL,
    employees INTEGER NOT NULL,
    gstin TEXT NOT NULL,
    is_sez_unit BOOLEAN NOT NULL DEFAULT FALSE,
    pan_aggregation_verified BOOLEAN NOT NULL DEFAULT TRUE,
    turnover_period_verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ProofPath Tamper-Evident Records Table (Cryptographic audit trail)
CREATE TABLE IF NOT EXISTS public.proofpath_records (
    record_id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    business_name TEXT NOT NULL,
    turnover_inr NUMERIC NOT NULL,
    verdict TEXT NOT NULL,
    citation TEXT NOT NULL,
    sha256_digest TEXT NOT NULL,
    source_document TEXT NOT NULL,
    official_url TEXT NOT NULL,
    completed_actions TEXT[] NOT NULL DEFAULT '{}',
    disclaimer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Regional Briefings Table (English, Kannada, Hindi translations)
CREATE TABLE IF NOT EXISTS public.regional_briefings (
    id SERIAL PRIMARY KEY,
    case_id TEXT NOT NULL,
    language TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    actions TEXT[] NOT NULL DEFAULT '{}',
    disclaimer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(case_id, language)
);

-- Initial Seed Data: Apex Precision Components Pvt Ltd
INSERT INTO public.profiles (id, name, sector, state, operating_states, annual_turnover_inr, employees, gstin, is_sez_unit)
VALUES (
    'APEX_001',
    'Apex Precision Components Pvt Ltd',
    'Industrial manufacturing (NIC 2930)',
    'Karnataka',
    ARRAY['Karnataka', 'Maharashtra', 'Tamil Nadu'],
    82000000,
    48,
    '29AABCA1234F1Z5',
    FALSE
) ON CONFLICT (id) DO NOTHING;

-- Initial Seed Data: Notification 10/2023-CT
INSERT INTO public.regulations (id, case_id, title, authority, published_date, effective_date, impact, status, summary, official_url)
VALUES (
    'NOTIF_10_2023_CT',
    'CASE_A_GST_E_INVOICING',
    'Notification No. 10/2023 — Central Tax',
    'Central Board of Indirect Taxes and Customs (CBIC)',
    '2023-05-10',
    '2023-08-01',
    'High',
    'Verified demo',
    'Mandatory e-invoicing threshold reduced from ₹10 Crore to ₹5 Crore for all B2B supplies.',
    'https://gstcouncil.gov.in/node/4365'
) ON CONFLICT (id) DO NOTHING;
