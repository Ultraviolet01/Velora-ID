@echo off
REM Create Next.js folder structure
setlocal enabledelayedexpansion

cd /d "%~dp0"

REM Create all directories
mkdir src\app
mkdir "src\app\(marketing)"
mkdir "src\app\(app)"
mkdir "src\app\(app)\dashboard"
mkdir "src\app\(app)\onboarding"
mkdir "src\app\(app)\creator"
mkdir "src\app\(app)\merchant"
mkdir "src\app\(app)\defi"
mkdir "src\app\(app)\proof-vault"
mkdir "src\app\(app)\verifier"
mkdir "src\app\docs"
mkdir "src\app\api"
mkdir "src\components\ui"
mkdir "src\components\layout"
mkdir "src\components\onboarding"
mkdir "src\components\dashboard"
mkdir "src\components\proof"
mkdir "src\components\eligibility"
mkdir "src\components\ai"
mkdir "src\lib"
mkdir "src\services"
mkdir "src\hooks"
mkdir "src\types"
mkdir "src\config"
mkdir "src\data"

echo.
echo All directories created successfully!
echo.
pause
