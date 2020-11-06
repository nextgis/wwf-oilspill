# FROM node:12 As build

# RUN mkdir /app && mkdir /src
# WORKDIR /src
# COPY package*.json ./

# RUN npm install
# COPY . .
# # RUN git clone --single-branch --depth 1 https://github.com/nextgis/nextgis_frontend.git ./@nextgis
# RUN npm run prod

# FROM node:lts-alpine

# RUN npm install -g history-server
# WORKDIR /app
# COPY --from=build ./src/dist .

# EXPOSE 8080
# CMD [ "history-server", "./" ]

FROM node:lts-alpine

RUN npm install -g history-server

WORKDIR /app

COPY ./dist .

EXPOSE 8080
CMD [ "history-server", "./" ]
