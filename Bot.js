
//vars
const replies = [ 'Hello world', 'Nice to meet you guys', 'I Speak English very very', 'I am working'] 

const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.login(process.env.TOKEN);
client.on('message', GotMessage);

function GotMessage(msg)
{
    console.log(msg.content);
    if(msg.channel.id == '812914720788447255' && msg.content === 'Ping')
    {
        const r = Math.floor(Math.random() * replies.length);
        msg.reply(replies[r]);
    }
}
