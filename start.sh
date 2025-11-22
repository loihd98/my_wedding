#!/bin/bash

# Quick Start Script
# This script helps you get started quickly

echo "🎉 Welcome to Loi & Hang Wedding Website Setup!"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 20+ from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm $(npm --version) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ Created .env.local - Please update with your values"
fi

# Create placeholder images directory
mkdir -p public/images/gallery

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Add your wedding photos:"
echo "   - public/images/hero-bg.jpg (1920x1080)"
echo "   - public/images/og-image.jpg (1200x630)"
echo "   - public/images/gallery/*.jpg (1200x800)"
echo ""
echo "2. Customize your content:"
echo "   - Read CUSTOMIZATION.md for detailed instructions"
echo "   - Update couple names in components/Hero.tsx"
echo "   - Update wedding date and event details"
echo "   - Update love story in components/Timeline.tsx"
echo ""
echo "3. Start development server:"
echo "   npm run dev"
echo ""
echo "4. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "   README.md          - Project overview"
echo "   CUSTOMIZATION.md   - How to customize"
echo "   DEPLOYMENT.md      - How to deploy"
echo "   PROJECT_SUMMARY.md - Complete feature list"
echo ""
echo "🚀 Happy coding!"
