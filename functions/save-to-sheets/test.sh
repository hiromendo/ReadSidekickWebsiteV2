#!/bin/bash

# Test script for save-to-sheets Cloud Function

ENDPOINT="https://us-central1-readsidekick.cloudfunctions.net/save-to-sheets"

echo "=== Testing save-to-sheets Cloud Function ==="
echo ""

# Test 1: Valid POST request
echo "Test 1: Valid POST request"
echo "--------------------------"
curl -s -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "Hello, how are you?",
    "translation": "HELLO HOW YOU",
    "userEmail": "test@example.com"
  }' | jq .
echo ""

# Test 2: POST without userEmail (should default to 'anonymous')
echo "Test 2: POST without userEmail"
echo "------------------------------"
curl -s -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "Thank you",
    "translation": "THANK-YOU"
  }' | jq .
echo ""

# Test 3: Missing required fields (should return 400 error)
echo "Test 3: Missing required fields (expect error)"
echo "-----------------------------------------------"
curl -s -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "Only source, no translation"
  }' | jq .
echo ""

# Test 4: CORS preflight (OPTIONS request)
echo "Test 4: CORS preflight (OPTIONS)"
echo "---------------------------------"
curl -s -X OPTIONS "$ENDPOINT" \
  -H "Origin: https://readsidekick.com" \
  -H "Access-Control-Request-Method: POST" \
  -w "HTTP Status: %{http_code}\n" \
  -o /dev/null
echo ""

echo "=== Tests complete ==="
