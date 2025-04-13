# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
RUN npm install

COPY . .

COPY .env .env

RUN npm install -g  ts-node ts-node-dev typescript

CMD ["sh", "-c", "npm run dev"]
