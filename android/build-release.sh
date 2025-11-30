#!/bin/bash

# Build script for Android production release

echo "🔨 Building Hocking App for Android..."

# 1. Build the web app
echo "📦 Building client..."
cd ..
npm run build:client

# 2. Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync android

# 3. Build Android APK
echo "📱 Building Android release..."
cd android
./gradlew assembleRelease

echo "✅ Build complete!"
echo "📍 APK location: android/app/build/outputs/apk/release/app-release-unsigned.apk"
echo ""
echo "⚠️  Don't forget to sign the APK before distributing!"
echo "Sign with: jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore your-keystore.jks app-release-unsigned.apk your-alias"

