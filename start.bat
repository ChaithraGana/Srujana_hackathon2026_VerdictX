@echo off
TITLE ReguLens - Enterprise Regulatory Compliance Platform
COLOR 0A

echo ==============================================================================
echo           ReguLens - Enterprise Regulatory Compliance Platform
echo               Srujana Tech Fest 2026 - Legal Services (LS-02)
echo ==============================================================================
echo.

set WORKSPACE_ROOT=%~dp0
set BACKEND_DIR=%WORKSPACE_ROOT%backend
set FRONTEND_DIR=%WORKSPACE_ROOT%regulens

:: 1. Check Python
echo [1/4] Checking Python environment...
python --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Python is not found in PATH! Please ensure Python 3.10+ is installed.
    pause
    exit /b 1
)

:: 2. Check Node.js
echo [2/4] Checking Node.js environment...
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not found in PATH! Please ensure Node.js 18+ is installed.
    pause
    exit /b 1
)

:: 3. Launch Backend in new window
echo [3/4] Launching FastAPI Backend on port 8000...
start "ReguLens Backend (Port 8000)" cmd /k "cd /d %BACKEND_DIR% && python -m uvicorn main:app --reload --port 8000"

:: 4. Launch Frontend in new window
echo [4/4] Launching React + Vite Frontend on port 3000...
start "ReguLens Frontend (Port 3000)" cmd /k "cd /d %FRONTEND_DIR% && npm run dev"

echo.
echo ==============================================================================
echo  Both services launched successfully!
echo.
echo  - Frontend UI:        http://localhost:3000/
echo  - Backend API:        http://localhost:8000/
echo  - Swagger API Docs:   http://localhost:8000/docs
echo  - 8/8 Benchmark Suite: http://localhost:8000/api/tests/case-a
echo ==============================================================================
echo.
echo Opening ReguLens in your default browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:3000/

exit /b 0
