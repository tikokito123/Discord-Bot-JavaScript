FROM node:alpine
WORKDIR /usr/app/

COPY ./package.json .

RUN npm install && npm update

RUN apk update
RUN apk add
RUN apk add ffmpeg

COPY . .


CMD ["npm", "start"]