const Discord = require('discord.js');

module.exports = {
    name: 'tiko',
    aliases: ['t'],
    async execute(message, args, client){
        const server = client.guilds.cache.get('497900056972754979');
        const invite = await server.channels.cache.get('497900056972754990').createInvite();
        if(message.guild.id !== '497900056972754979') return message.reply(`This is a private command! You cannot use it here.\nTo find out, there is an invite:
        ${invite}`);
        
        const Tiko = message.guild.members.cache.get('239813718383263745');

        const replies = ['שיט, שיט, שיט, שיט', 'אל תעלו, אלללל, אללל תעלו!'];

        const random = Math.floor(replies.length * Math.random());

        return message.channel.send(`${Tiko} ${replies[random]}`);
    }
}