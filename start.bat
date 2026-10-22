@echo off
title Secondhand Price Search App
echo =========================================================
echo  Starting Secondhand Market Price App (Bungae & Joonggo)...
echo =========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [INFO] Installing required packages. Please wait...
    call npm install
)

if not exist "node_modules\" (
    echo [ERROR] npm install failed. Please check your network connection and retry.
    pause
    exit /b 1
)

echo.
echo [INFO] Starting web server at http://localhost:3000 ...
echo.

call npx vite --open
pause
