#!/bin/bash

# The CPS Punisher - Deployment Script
# Copyright © 2024 Darren Guay - All Rights Reserved

echo "🛡️  THE CPS PUNISHER - DEPLOYMENT SCRIPT"
echo "=========================================="
echo ""

# Check if DEV_MODE is disabled
echo "🔍 Checking DEV_MODE status..."
if grep -q "const DEV_MODE = true" App.tsx; then
    echo "❌ ERROR: DEV_MODE is still enabled in App.tsx!"
    echo "   Please set DEV_MODE = false before deploying to production."
    exit 1
fi
echo "✅ DEV_MODE is disabled"
echo ""

# Check for required files
echo "📋 Checking required files..."
required_files=("package.json" "vite.config.ts" "index.html" "App.tsx")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ ERROR: Required file $file not found!"
        exit 1
    fi
done
echo "✅ All required files present"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ ERROR: npm install failed!"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Run build
echo "🔨 Building production bundle..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Build failed!"
    exit 1
fi
echo "✅ Build successful"
echo ""

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ ERROR: dist directory not found!"
    exit 1
fi
echo "✅ dist directory created"
echo ""

# Git check
echo "📝 Checking Git status..."
if [ -d ".git" ]; then
    echo "✅ Git repository initialized"
    
    # Check for uncommitted changes
    if [[ -n $(git status -s) ]]; then
        echo "⚠️  WARNING: You have uncommitted changes"
        echo "   Commit them before deploying:"
        echo "   git add ."
        echo "   git commit -m 'Your commit message'"
        echo ""
    else
        echo "✅ No uncommitted changes"
    fi
else
    echo "⚠️  WARNING: Not a git repository"
    echo "   Initialize git with: git init"
    echo ""
fi

echo "=========================================="
echo "✅ PRE-DEPLOYMENT CHECKS COMPLETE!"
echo ""
echo "🚀 Ready to deploy! Choose your platform:"
echo ""
echo "OPTION 1 - VERCEL (Recommended):"
echo "  npm install -g vercel"
echo "  vercel --prod"
echo ""
echo "OPTION 2 - NETLIFY:"
echo "  npm install -g netlify-cli"
echo "  netlify deploy --prod"
echo ""
echo "OPTION 3 - MANUAL:"
echo "  Upload the /dist folder to your hosting provider"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🛡️  Fight Back. Defend Your Family."
echo "   Copyright © 2024 Darren Guay - All Rights Reserved"
