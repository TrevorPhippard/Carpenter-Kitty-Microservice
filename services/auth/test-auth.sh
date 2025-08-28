#!/bin/bash

BASE_URL="http://localhost:4001"
EMAIL="manualtest$(date +%s)@example.com"
USERNAME="manualtest"
PASSWORD="testpassword"
NEW_PASSWORD="newtestpassword"

echo "=== 1️⃣ Health check ==="
curl -s -w "\nHTTP Status: %{http_code}\n" $BASE_URL/
echo -e "\n"

echo "=== 2️⃣ Sign up ==="
SIGNUP_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/sign-up/email" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}")
echo "Response: $SIGNUP_RESPONSE"
echo -e "\n"

echo "=== 3️⃣ Sign in ==="
SIGNIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/sign-in" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")
echo "Response: $SIGNIN_RESPONSE"
# extract token (assumes JSON { "token": "<value>" })
TOKEN=$(echo $SIGNIN_RESPONSE | grep -oP '(?<="token":")[^"]+')
echo "Token: $TOKEN"
echo -e "\n"

echo "=== 4️⃣ Get session info ==="
curl -s "$BASE_URL/auth/get-session"
echo -e "\n"

echo "=== 5️⃣ Get current user info ==="
curl -s "$BASE_URL/auth/me" -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "=== 6️⃣ Sign out ==="
curl -s -X POST "$BASE_URL/auth/sign-out" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\"}"
echo -e "\n"

echo "=== 7️⃣ Reset password ==="
curl -s -X POST "$BASE_URL/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"newPassword\":\"$NEW_PASSWORD\"}"
echo -e "\n"

echo "=== Done ==="
