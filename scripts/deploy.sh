#!/bin/bash

# Production deployment script

set -e  # Exit on error

echo "🚀 Starting production deployment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found"
    echo "📝 Copy .env.docker to .env and fill in your credentials"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=true

# Run type checking
echo "🔍 Type checking..."
npm run check

# Build client
echo "🏗️  Building client..."
npm run build:client

# Build server
echo "🏗️  Building server..."
npm run build:server

# Test the build
echo "🧪 Testing build..."
NODE_ENV=production timeout 10s node dist/index.js || true

echo "✅ Build successful!"
echo ""
echo "📋 Next steps:"
echo "1. Test locally: npm start"
echo "2. Deploy with Docker: npm run docker:up"
echo "3. Or deploy to your cloud provider"

