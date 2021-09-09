# DISCORD BOT FOR YOUR SERVER

simple steps to set the bot up...


notes before starting: 
1. make sure you have docker + docker-compose install

* IMPORTANT! make sure you have created app on discord developers page!
you will need to take the token and put it insde the env variable!

# ENV:
1. prefix=!
2. token=**yourPrivateTokenApp
3. mongoPath=mongodb://host.docker.internal:27017/Users


# docker compose 

1. git clone https://github.com/tikokito123/Discord-Bot-JavaScript.git

2. cd ~APP_PATH/discord-bot-javaScript

3. docker-compose build

4. docker-compose up
