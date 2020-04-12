FROM node:13.12.0-alpine3.11 as BUILD

COPY ./src /app/src
COPY ./tsconfig.json /app/tsconfig.json
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./customTypings /app/customTypings
COPY ./webpack.config.js /app/webpack.config.js

WORKDIR /app

RUN npm ci

RUN npm run build

##
##
##

FROM wlfio/simple-srv:0.1.0

COPY /app/dist /hope/node/app/dist/host/www