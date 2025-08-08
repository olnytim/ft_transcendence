#!/bin/bash

echo "🔄 Полный сброс базы данных..."

# Останавливаем контейнеры
echo "Останавливаем контейнеры..."
docker-compose -f docker-compose-main.yaml down

# Удаляем volume с базой данных
echo "Удаляем volume с базой данных..."
docker volume rm $(docker volume ls -q | grep postgres) 2>/dev/null || true

# Удаляем старые миграции (кроме __init__.py)
echo "Удаляем старые миграции..."
find back -path "*/migrations/*.py" -not -name "__init__.py" -delete
find back -path "*/migrations/*.pyc" -delete

# Создаем новые миграции
echo "Создаем новые миграции..."
cd back
python manage.py makemigrations users
python manage.py makemigrations pong
python manage.py makemigrations clicker
cd ..

# Запускаем контейнеры
echo "Запускаем контейнеры..."
docker-compose -f docker-compose-main.yaml up -d postgres

# Ждем готовности базы данных
echo "Ждем готовности базы данных..."
sleep 10

# Применяем миграции
echo "Применяем миграции..."
cd back
python manage.py migrate
cd ..

echo "✅ База данных успешно сброшена и пересоздана!"
echo ""
echo "Теперь можно запустить проект:"
echo "make build" 