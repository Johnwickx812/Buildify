@echo off
setlocal
cd /d "%~dp0"

echo.
echo ========================================================
echo   Buildify - Application Launcher
echo ========================================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)

:: Check for node_modules
if not exist node_modules (
    echo [1/2] Dependencies not found. Installing now (npm login/config not required)...
    call npm install
) else (
    echo [1/2] Dependencies already installed.
)

echo.
echo [2/2] Starting development server...
echo.
echo Press Ctrl+C in this terminal to stop the application.
echo.
echo The application will be available at: http://localhost:8080
echo.

:: Open browser automatically
start http://localhost:8080

:: Start the dev server
call npm run dev

pause
