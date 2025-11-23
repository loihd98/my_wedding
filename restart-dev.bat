@echo off
echo 🔄 Restarting Wedding Site with Performance Optimizations...

REM Kill any existing Next.js processes
echo 🛑 Stopping existing processes...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 >nul

REM Clear Next.js cache
echo 🧹 Clearing cache...
if exist .next rmdir /s /q .next
npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Build failed. Check your code for errors.
    pause
    exit /b 1
)

REM Start development server
echo 🚀 Starting optimized development server...
echo ✅ Server restarted with performance optimizations!
echo 📱 Website: http://localhost:3000
npm run dev

pause