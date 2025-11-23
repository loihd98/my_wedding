#!/bin/bash

echo "🐳 Rebuilding and Restarting Wedding App Docker Container..."

# Stop and remove containers
echo "🛑 Stopping containers..."
docker-compose down

# Remove old images (optional but recommended)
echo "🗑️ Removing old Docker images..."
docker rmi $(docker images -q --filter "reference=*wedding-app*") 2>/dev/null || echo "No wedding-app images to remove"

# Clean up unused Docker resources
echo "🧹 Cleaning up Docker system..."
docker system prune -f

# Build new image with no cache
echo "🔨 Building new Docker image..."
docker-compose build --no-cache

# Start containers
echo "🚀 Starting containers..."
docker-compose up -d

# Wait for container to be ready
echo "⏳ Waiting for container to start..."
sleep 10

# Check container status
echo "🔍 Checking container status..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Show recent logs
echo "📋 Recent container logs:"
docker-compose logs --tail=20 wedding-app

echo ""
echo "✅ Docker rebuild completed!"
echo "🌐 Website should be available at: http://localhost:3000"
echo "📊 Monitor logs: docker-compose logs -f wedding-app"