#!/bin/bash

echo "🔐Обновление DJANGO_SECRET_KEY..."
NEW_KEY=$(python3 tools/generate_secret_key.py | cut -d= -f2)
TEMP_FILE=$(mktemp)
grep -v '^DJANGO_SECRET_KEY=' .env > "$TEMP_FILE"
echo "DJANGO_SECRET_KEY='$NEW_KEY'" >> "$TEMP_FILE"
mv "$TEMP_FILE" .env

echo "✅DJANGO_SECRET_KEY успешно обновлен!"