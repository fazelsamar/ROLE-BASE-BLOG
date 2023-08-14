# FROM node:15.13-alpine
# WORKDIR /react
# COPY package*.json .
# RUN npm install
# COPY . /react/
# RUN npm run build

# FROM node:15.13-alpine as build-stage
# WORKDIR /react
# COPY package*.json /react/
# RUN npm install -g npm
# RUN npm install
# COPY . /react/
# RUN npm run build


FROM nginx:latest
RUN apt-get update && apt-get install -y procps
RUN mkdir -p /home/app/staticfiles
RUN mkdir -p /home/app/mediafiles
RUN mkdir -p /home/app/reactfiles

# VOLUME /react/build/ /home/app/reactfiles

# COPY --from=build-stage /react/build/ /usr/share/nginx/html