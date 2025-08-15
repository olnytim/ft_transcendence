# Jenkins: локальный запуск и тест пайплайна

Этот проект уже содержит Jenkinsfile и Docker-образ Jenkins, способный выполнять `docker compose` внутри контейнера через примонтированный сокет Docker.

## Что делает пайплайн
- Собирает образы postgres, back, front и nginx.
- Готовит .env из env.example, если его нет.
- Запускает Postgres и прогоняет backend-тесты с coverage.
- Поднимает стек (postgres, back, front, nginx) и запускает Cypress e2e против `https://nginx:443` (самоподписанный SSL игнорируется).
- В конце всегда делает `docker compose down -v --remove-orphans`.

## Предварительные требования
- Docker и Docker Compose (плагин) установлены на хосте.
- Файл `.env` в корне; если его нет, создайте копию `env.example` и при необходимости отредактируйте значения.

## Запуск Jenkins локально
1. Соберите и поднимите сервис Jenkins:
   - В составе `docker-compose-main.yaml` уже есть сервис `jenkins` с пробросом портов 8082 (UI) и 50000 (JNLP).
2. Откройте Jenkins UI: http://localhost:8082
3. Получите пароль разблокировки (initialAdminPassword) из контейнера Jenkins и завершите мастер-настройку.
4. Установите рекомендованные плагины. Дополнительно ничего ставить не требуется — пайплайн использует шеловые шаги и Docker.
5. Создайте Pipeline job, укажите SCM на этот репозиторий и путь к Jenkinsfile: `Jenkinsfile`.
6. Запустите сборку и проверьте логи стадий.

## Частые проблемы
- Permission denied на `/var/run/docker.sock` в Jenkins: передайте корректный `DOCKER_GID` через `docker-compose-main.yaml` (аргумент сборки образа Jenkins) так, чтобы он совпадал с GID группы docker на хосте.
- Cypress падает из‑за SSL: в пайплайне включено `CYPRESS_VERIFY_SSL=false`, а также `chromeWebSecurity=false` в конфиге, и frontend-образ содержит нужные системные библиотеки для headless запуска.
- Бэкенд тесты требуют БД: пайплайн поднимает `postgres` и ждёт healthcheck перед запуском тестов.

## Структура
- `jenkins/Dockerfile` — образ Jenkins с Docker CLI и compose‑plugin, добавление пользователя jenkins в группу docker.
- `Jenkinsfile` — описывает стадии CI.

