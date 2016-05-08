FROM node:slim

WORKDIR /app

COPY package.json ./
RUN npm cache clean
RUN npm install

RUN docker pull dockerfile/mongodb
RUN docker run -d -p 27017:27017 --name mongodb dockerfile/mongodb
RUN npm run seed

COPY . ./
RUN npm run build

EXPOSE 9999
ENV NODE_ENV=production PORT=9999 CONFIG=server

ENTRYPOINT npm run server
