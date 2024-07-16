FROM node:18-alpine as build

RUN mkdir /usr/app

WORKDIR /usr/app 
 
COPY . .

RUN npm install

RUN npm run build

# Nginx 

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /usr/app/dist ./

CMD [ "nginx","-g","daemon off;"]