# syntax=docker/dockerfile:1
FROM node:18 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD [ "yarn", "dev" ]