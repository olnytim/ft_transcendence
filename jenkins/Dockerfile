FROM jenkins/jenkins:lts-jdk17

# Устанавливаем Docker CLI, чтобы Jenkins мог выполнять docker-команды
USER root
RUN apt-get update && apt-get install -y curl gnupg
RUN install -m 0755 -d /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
RUN chmod a+r /etc/apt/keyrings/docker.gpg
RUN echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update && apt-get install -y docker-ce-cli docker-compose-plugin

# Добавляем пользователя jenkins в группу docker, чтобы он имел права на сокет
# (предполагается, что GID группы docker на хосте будет передан при сборке)
ARG DOCKER_GID=999
RUN groupadd -g ${DOCKER_GID} docker || true
RUN usermod -aG docker jenkins

# Возвращаемся к пользователю jenkins

