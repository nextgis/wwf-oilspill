FROM node:lts-alpine as build-deps
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm i
COPY . ./
RUN npm run prod

FROM nginx:alpine
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
