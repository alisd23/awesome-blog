FROM node:slim

WORKDIR /app

COPY package.json ./
RUN npm cache clean
RUN npm install

COPY . ./
RUN npm run build

EXPOSE 9999
ENV NODE_ENV=production PORT=9999 CONFIG=server

ENTRYPOINT node compiled/server/boot.js
