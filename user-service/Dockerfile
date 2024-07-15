FROM node:18.18.0-alpine

WORKDIR /user-service

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

RUN tsc

CMD ["node", "dist/app.js"]

