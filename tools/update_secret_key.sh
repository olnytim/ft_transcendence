#!/bin/bash

# Безопасное обновление DJANGO_SECRET_KEY в .env файле

echo "🔐 Обновление DJANGO_SECRET_KEY..."

# Генерируем новый ключ
NEW_KEY=$(python3 tools/generate_secret_key.py | cut -d= -f2)

# Создаем временный файл
TEMP_FILE=$(mktemp)

# Копируем .env файл, исключая старую строку DJANGO_SECRET_KEY
grep -v '^DJANGO_SECRET_KEY=' .env > "$TEMP_FILE"

# Добавляем новый ключ
echo "DJANGO_SECRET_KEY='$NEW_KEY'" >> "$TEMP_FILE"

# Заменяем оригинальный файл
mv "$TEMP_FILE" .env

echo "✅ DJANGO_SECRET_KEY успешно обновлен!" 