FROM node:18.18.0-alpine

WORKDIR /file-upload-server

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

RUN tsc

CMD ["node", "dist/app.js"]

