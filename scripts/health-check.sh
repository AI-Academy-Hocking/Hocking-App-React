#!/bin/bash

# Health check script for production monitoring

HEALTH_URL="${1:-http://localhost:3000}"

# Check if server is responding
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL")

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Server is healthy (HTTP $HTTP_CODE)"
    exit 0
else
    echo "❌ Server is unhealthy (HTTP $HTTP_CODE)"
    exit 1
fi

