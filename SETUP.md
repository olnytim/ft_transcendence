# 🚀 Настройка проекта ft_transcendence

## Быстрый старт

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd ft_transcendence
```

### 2. Настройка переменных окружения
```bash
# Копируем пример файла
cp env.example .env

# Генерируем безопасный SECRET_KEY
python tools/generate_secret_key.py
```

### 3. Редактирование .env файла
Откройте файл `.env` и настройте следующие параметры:

#### Обязательные настройки:
```bash
# Django
DJANGO_SECRET_KEY=<сгенерированный_ключ>
DJANGO_DEBUG=True

# База данных
POSTGRES_DB=test_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=<надежный_пароль>
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

#### Настройки мониторинга:
```bash
# Elasticsearch
ELASTIC_PASSWORD=<надежный_пароль>
ELASTIC_USER=elastic

# Grafana
GF_USER=admin
GF_PASSWORD=<надежный_пароль>

# Kibana
KIBANA_USER=kibana_system
```

#### Опциональные настройки (для production):
```bash

# Email для алертов
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<ваш_email>
SMTP_PASSWORD=<app_password>
```

### 4. Запуск проекта
```bash
# Сборка и запуск всех сервисов
make build

# Или пошагово:
make gen      # Генерация сертификатов и конфигов
make up       # Запуск сервисов
```

### 5. Проверка работы
- **Основное приложение**: https://localhost:8081
- **Grafana**: http://localhost:3000
- **Prometheus**: http://localhost:9090

## 🔧 Управление проектом

### Команды Make:
```bash
make build    # Полная сборка проекта
make up       # Запуск сервисов
make down     # Остановка сервисов
make re       # Перезапуск
make clean    # Очистка контейнеров
make fclean   # Полная очистка
```

### Просмотр логов:
```bash
# Логи всех сервисов
docker-compose logs

# Логи конкретного сервиса
docker-compose back
docker-compose logs front
```

## 🔍 Отладка

### Проверка статуса сервисов:
```bash
# Статус контейнеров
docker ps

# Использование ресурсов
docker stats
```

### Доступ к контейнерам:
```bash
# Backend контейнер
docker exec -it back bash

# База данных
docker exec -it postgres psql -U admin -d test_db

# Frontend контейнер
docker exec -it front sh
```

## 🛠️ Разработка

### Добавление новых переменных окружения:
1. Добавьте переменную в `env.example`
2. Обновите `back/back/settings.py` для использования переменной
3. Обновите `docker-compose-main.yaml` если нужно
4. Обновите документацию

### Структура переменных окружения:
- **DJANGO_*** - настройки Django
- **POSTGRES_*** - настройки базы данных
- **ELASTIC_*** - настройки Elasticsearch
- **GF_*** - настройки Grafana
- **SMTP_*** - настройки email (для алертов)

## 🔒 Безопасность

### Production настройки:
1. Измените `DJANGO_DEBUG=False`
2. Используйте надежные пароли
3. Настройте SSL сертификаты
4. Ограничьте доступ к портам
5. Настройте firewall

### Генерация паролей:
```bash
# Генерация случайного пароля
openssl rand -base64 32

# Или используйте Python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## 📚 Дополнительные ресурсы

- [Django Documentation](https://docs.djangoproject.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [ELK Stack Documentation](https://www.elastic.co/guide/) 