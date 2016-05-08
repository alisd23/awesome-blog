FROM node:slim

WORKDIR /app

COPY package.json ./
RUN npm cache clean
RUN npm install

COPY . ./
RUN npm run build

RUN docker pull dockerfile/mongodb
RUN docker run -d -p 27017:27017 --name mongodb dockerfile/mongodb


EXPOSE 9999
ENV NODE_ENV=production PORT=9999

ENTRYPOINT node server.js
