<#
.SYNOPSIS
    ReguLens One-Click Startup Script for PowerShell
.DESCRIPTION
    Launches FastAPI Backend (port 8000) and React Vite Frontend (port 3000), then opens the browser.
#>

Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "          ReguLens - Enterprise Regulatory Compliance Platform                " -ForegroundColor Yellow
Write-Host "              Srujana Tech Fest 2026 - Legal Services (LS-02)                 " -ForegroundColor Green
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host ""

$workspace = $PSScriptRoot
$backendDir = Join-Path $workspace "backend"
$frontendDir = Join-Path $workspace "regulens"

# 1. Check Python
Write-Host "[1/4] Checking Python environment..." -ForegroundColor White
try {
    $pyVer = & python --version 2>&1
    Write-Host "  Found $pyVer" -ForegroundColor Gray
} catch {
    Write-Error "Python is not found in PATH! Please ensure Python 3.10+ is installed."
    Exit 1
}

# 2. Check Node
Write-Host "[2/4] Checking Node.js environment..." -ForegroundColor White
try {
    $nodeVer = & node --version 2>&1
    Write-Host "  Found Node $nodeVer" -ForegroundColor Gray
} catch {
    Write-Error "Node.js is not found in PATH! Please ensure Node.js 18+ is installed."
    Exit 1
}

# 3. Launch Backend
Write-Host "[3/4] Launching FastAPI Backend on http://localhost:8000..." -ForegroundColor White
Start-Process cmd.exe -ArgumentList "/k cd /d `"$backendDir`" && python -m uvicorn main:app --reload --port 8000" -WindowStyle Normal

# 4. Launch Frontend
Write-Host "[4/4] Launching React Vite Frontend on http://localhost:3000..." -ForegroundColor White
Start-Process cmd.exe -ArgumentList "/k cd /d `"$frontendDir`" && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "==============================================================================" -ForegroundColor Green
Write-Host " Both services launched successfully!" -ForegroundColor Green
Write-Host "  - Frontend UI:         http://localhost:3000/" -ForegroundColor Cyan
Write-Host "  - Backend API:         http://localhost:8000/" -ForegroundColor Cyan
Write-Host "  - Interactive Docs:    http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "  - Benchmark Tests:     http://localhost:8000/api/tests/case-a" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 3
Start-Process "http://localhost:3000/"
