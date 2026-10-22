@echo off
chcp 65001 > nul
echo =========================================================
echo  번개장터 & 중고나라 통합 시세 검색 웹/앱 실행 중...
echo =========================================================
echo.

:: Node.js 설치 여부 확인
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되어 있지 않습니다.
    echo https://nodejs.org 에서 Node.js를 먼저 설치해주세요.
    pause
    exit /b
)

:: node_modules 확인 및 패키지 설치
if not exist "node_modules\" (
    echo [안내] 필요한 패키지를 설치하고 있습니다. 잠시만 기다려주세요...
    call npm install
)

echo.
echo [안내] 개발 서버를 시작합니다. 브라우저가 자동으로 열립니다...
echo [주소] http://localhost:3000
echo.

call npm run dev -- --open
pause
