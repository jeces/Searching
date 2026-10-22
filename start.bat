@echo off
title Secondhand Price Search App
echo =========================================================
echo  Starting Secondhand Market Price App Server and Web Client...
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
echo [INFO] Starting Backend Crawling Server on http://localhost:4000 ...
start /b node server.js > server.log 2>&1

echo.
echo [INFO] Starting Frontend Application on http://localhost:3000 ...
echo.

call npm run dev -- --open
pause
