FROM node:22 AS build

RUN apt-get update && apt-get install -y xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "serve", "-p", "5000"]
