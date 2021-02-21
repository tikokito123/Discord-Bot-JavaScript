
//vars
const replies = [ 'Hello world', 'Nice to meet you guys', 'I Speak English very very', 'I am working'] 

const Discord = require('discord.js');
const client = new Discord.Client();

client.login('ODEyOTE1MzU4ODQ3MDc0MzA0.YDHsbA.6HlFc8qVX_qkzkT5raPIOc7t4Zg');
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
