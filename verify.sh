#!/bin/bash

# Verification Script
# Run this to verify your installation and setup

echo "🔍 Verifying Wedding Website Installation..."
echo "============================================"
echo ""

ERRORS=0
WARNINGS=0

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Found $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
    ((ERRORS++))
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ Found v$NPM_VERSION${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
    ((ERRORS++))
fi

# Check dependencies
echo -n "Checking node_modules... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Dependencies not installed${NC}"
    echo "  Run: npm install"
    ((WARNINGS++))
fi

# Check package.json
echo -n "Checking package.json... "
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
    ((ERRORS++))
fi

# Check main files
echo ""
echo "Checking main project files:"

FILES=(
    "app/layout.tsx"
    "app/page.tsx"
    "components/Hero.tsx"
    "components/Timeline.tsx"
    "components/EventDetails.tsx"
    "components/Gallery.tsx"
    "components/RSVP.tsx"
    "components/Footer.tsx"
    "lib/animations.ts"
    "lib/utils.ts"
    "middleware.ts"
    "next.config.js"
    "tailwind.config.ts"
    "Dockerfile"
    "docker-compose.yml"
    "nginx.conf"
)

for file in "${FILES[@]}"; do
    echo -n "  $file... "
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
        ((ERRORS++))
    fi
done

# Check documentation
echo ""
echo "Checking documentation:"

DOCS=(
    "README.md"
    "CUSTOMIZATION.md"
    "DEPLOYMENT.md"
    "PROJECT_SUMMARY.md"
    "QUICK_START.md"
    "ARCHITECTURE.md"
    "DOCS_INDEX.md"
)

for doc in "${DOCS[@]}"; do
    echo -n "  $doc... "
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${YELLOW}⚠${NC}"
        ((WARNINGS++))
    fi
done

# Check image directories
echo ""
echo "Checking image directories:"
echo -n "  public/images/... "
if [ -d "public/images" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Directory not found${NC}"
    mkdir -p public/images
    echo -e "  ${GREEN}Created public/images${NC}"
fi

echo -n "  public/images/gallery/... "
if [ -d "public/images/gallery" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Directory not found${NC}"
    mkdir -p public/images/gallery
    echo -e "  ${GREEN}Created public/images/gallery${NC}"
fi

# Check for images
echo ""
echo "Checking for wedding images:"
echo -n "  Hero background (hero-bg.jpg)... "
if [ -f "public/images/hero-bg.jpg" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Not found - Add your hero image${NC}"
    ((WARNINGS++))
fi

echo -n "  OG image (og-image.jpg)... "
if [ -f "public/images/og-image.jpg" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Not found - Add your OG image${NC}"
    ((WARNINGS++))
fi

GALLERY_COUNT=$(find public/images/gallery -type f 2>/dev/null | wc -l)
echo "  Gallery photos... ${GALLERY_COUNT} found"
if [ "$GALLERY_COUNT" -lt 6 ]; then
    echo -e "  ${YELLOW}⚠ Add more photos to gallery (at least 6-9 recommended)${NC}"
    ((WARNINGS++))
fi

# Check environment file
echo ""
echo -n "Checking environment file (.env.local)... "
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ Not found${NC}"
    if [ -f ".env.example" ]; then
        echo "  Creating from .env.example..."
        cp .env.example .env.local
        echo -e "  ${GREEN}Created .env.local${NC}"
    else
        ((WARNINGS++))
    fi
fi

# Check build
echo ""
echo -n "Checking if project can build... "
if [ -d ".next" ]; then
    echo -e "${GREEN}✓ Previously built${NC}"
else
    echo -e "${YELLOW}⚠ Not built yet${NC}"
    echo "  Run: npm run build"
    ((WARNINGS++))
fi

# Summary
echo ""
echo "============================================"
echo "Verification Summary:"
echo "============================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Your installation is complete. Next steps:"
    echo "1. Read CUSTOMIZATION.md to personalize your site"
    echo "2. Add your wedding photos to public/images/"
    echo "3. Run: npm run dev"
    echo "4. Visit: http://localhost:3000"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS warnings found${NC}"
    echo ""
    echo "Your installation is functional but needs attention."
    echo "Review the warnings above and:"
    echo "1. Add missing images"
    echo "2. Customize your content"
    echo "3. Run: npm run dev"
else
    echo -e "${RED}✗ $ERRORS errors found${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠ $WARNINGS warnings found${NC}"
    fi
    echo ""
    echo "Please fix the errors above before proceeding."
    echo "Common fixes:"
    echo "  - Install Node.js from: https://nodejs.org/"
    echo "  - Run: npm install"
    echo "  - Ensure all files are present"
    exit 1
fi

echo ""
echo "============================================"
echo "📚 Documentation Quick Links:"
echo "============================================"
echo "  Getting Started: QUICK_START.md"
echo "  Customization:   CUSTOMIZATION.md"
echo "  Deployment:      DEPLOYMENT.md"
echo "  Full Docs:       DOCS_INDEX.md"
echo ""
echo "🎉 Happy wedding planning!"
