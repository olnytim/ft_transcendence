FROM jenkins/jenkins:lts-jdk17

USER root

# 1) Базовые утилиты
RUN apt-get update && apt-get install -y \
    ca-certificates curl gnupg git make jq \
 && rm -rf /var/lib/apt/lists/*

# 2) Репозиторий Docker + CLI + Compose v2 (Debian bookworm)
RUN install -m 0755 -d /etc/apt/keyrings \
 && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
 && chmod a+r /etc/apt/keyrings/docker.gpg \
 && sh -c 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list' \
 && apt-get update && apt-get install -y docker-ce-cli docker-compose-plugin \
 && rm -rf /var/lib/apt/lists/*

# 3) Доступ к docker.sock (Docker Desktop: root:root 660)
RUN usermod -aG root jenkins

# 4) Отключаем setup wizard и фиксируем путь к JCasC (лежит в самом образе)
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
ENV CASC_JENKINS_CONFIG=/usr/local/jenkins-casc/casc.yaml

# 5) Плагины и JCasC
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugins < /usr/share/jenkins/ref/plugins.txt

# 6) Сам конфиг JCasC (не зависит от volume)
COPY casc.yaml /usr/local/jenkins-casc/casc.yaml

USER jenkins
