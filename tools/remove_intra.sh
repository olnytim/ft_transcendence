#!/bin/bash

# Скрипт для удаления старой авторизации Intra
echo "Удаление старой авторизации Intra..."

# Удаляем папку intrauth
if [ -d "back/intrauth" ]; then
    echo "Удаляем папку back/intrauth..."
    rm -rf back/intrauth
    echo "✓ Папка back/intrauth удалена"
else
    echo "Папка back/intrauth не найдена"
fi

# Проверяем, что новая папка users существует
if [ ! -d "back/users" ]; then
    echo "❌ Ошибка: папка back/users не найдена!"
    echo "Убедитесь, что новая система авторизации создана"
    exit 1
fi

echo "✓ Удаление завершено"
echo ""
echo "Теперь нужно:"
echo "1. Создать и применить миграции: python manage.py makemigrations && python manage.py migrate"
echo "2. Создать суперпользователя: python manage.py createsuperuser"
echo "3. Перезапустить проект: make re" 