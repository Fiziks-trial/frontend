#!/bin/bash
# Quick Start Guide for Fiziks Projectile Motion Lab

echo "🚀 Fiziks Projectile Motion Lab - Quick Start"
echo "=============================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🎮 Starting development server..."
echo "   URL: http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""

npm run dev
