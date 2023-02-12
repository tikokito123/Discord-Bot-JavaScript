const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    console.log("here");
    console.log(msg.content)
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(token);