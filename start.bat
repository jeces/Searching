@echo off
title Secondhand Price Search App
echo =========================================================
echo  Starting Secondhand Market Price App (Bungae and Joonggo)...
echo =========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [INFO] Installing required dependencies...
call npm install

echo.
echo [INFO] Starting development web server at http://localhost:3000 ...
echo.

call npm run dev -- --open
pause
