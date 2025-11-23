#!/bin/bash

echo "🔄 Restarting Wedding Site with Performance Optimizations..."

# Kill any existing Next.js processes
echo "🛑 Stopping existing processes..."
pkill -f "next"
pkill -f "node.*next"

# Wait a moment
sleep 2

# Clear Next.js cache
echo "🧹 Clearing cache..."
rm -rf .next
npm run build || {
    echo "❌ Build failed. Check your code for errors."
    exit 1
}

# Start development server
echo "🚀 Starting optimized development server..."
npm run dev

echo "✅ Server restarted with performance optimizations!"
echo "📱 Website: http://localhost:3000"