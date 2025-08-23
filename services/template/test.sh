#!/usr/bin/env bash
# test.sh - quick curl tests for test service

BASE_URL="http://localhost:8000/api/template"

echo "===> Testing valid POST"
curl -s -X POST "$BASE_URL/test" \
  -H "Content-Type: application/json" \
  -d '{"testString": "hello world!"}' | jq
echo -e "\n"

echo "===> Testing missing parameter"
curl -s -X POST "$BASE_URL/test" \
  -H "Content-Type: application/json" \
  -d '{}' | jq
echo -e "\n"
