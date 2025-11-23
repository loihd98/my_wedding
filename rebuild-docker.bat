@echo off
echo 🐳 Rebuilding and Restarting Wedding App Docker Container...

REM Stop and remove containers
echo 🛑 Stopping containers...
docker-compose down

REM Remove old images (optional but recommended)
echo 🗑️ Removing old Docker images...
for /f "delims=" %%i in ('docker images -q --filter "reference=*wedding-app*" 2^>nul') do docker rmi %%i 2>nul
if %ERRORLEVEL% neq 0 echo No wedding-app images to remove

REM Clean up unused Docker resources
echo 🧹 Cleaning up Docker system...
docker system prune -f

REM Build new image with no cache
echo 🔨 Building new Docker image...
docker-compose build --no-cache
if %ERRORLEVEL% neq 0 (
    echo ❌ Docker build failed! Check the logs above.
    pause
    exit /b 1
)

REM Start containers
echo 🚀 Starting containers...
docker-compose up -d
if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to start containers! Check docker-compose.yml
    pause
    exit /b 1
)

REM Wait for container to be ready
echo ⏳ Waiting for container to start...
timeout /t 10 >nul

REM Check container status
echo 🔍 Checking container status...
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

REM Show recent logs
echo 📋 Recent container logs:
docker-compose logs --tail=20 wedding-app

echo.
echo ✅ Docker rebuild completed!
echo 🌐 Website should be available at: http://localhost:3000
echo 📊 Monitor logs: docker-compose logs -f wedding-app
pause