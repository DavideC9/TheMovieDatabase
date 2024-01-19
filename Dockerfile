FROM node:16-alpine AS build
LABEL authors="david"
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=build /app/dist/the-movie-database/ /usr/share/nginx/html


EXPOSE 80

