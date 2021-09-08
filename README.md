# DISCORD BOT FOR YOUR SERVER

simple steps to set the bot up...


notes before starting: 
1. make sure you have docker + docker-compose install
2. make sure you have mongoDB
3. you will need to download ffmpeg for music bot to work!

* IMPORTANT! make sure you have created app on discord developers page!
you will need to take the token and put it insde the env variable!

# ENV:
prefix=!
token=**yourPrivateTokenApp
mongoPath=mongodb://host.docker.internal:27017/Users


# docker compose 

1. git clone https://github.com/tikokito123/Discord-Bot-JavaScript.git

2. cd ~APP_PATH/discord-bot-javaScript

3. docker-compose build

4. docker-compose up
