const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: ['i'],
    description: 'Generate your server invite',
    guildOnly: true,
    async execute(message, args)
    {
        let invite = await message.channel.createInvite();
       
        const user = message.mentions.users.first();
        
        if(user){
            return user.send(`$Come to our server :) ${invite}`)
            .then(console.log('succeced'))
            .catch(error => console.error(error));
        }
        else return message.channel.send(`Come to our server ${invite}`);
    }
}