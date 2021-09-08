const Discord = require('discord.js');

const { name } = require("./help")

module.exports = {
    name: 'display',
    description: 'Embeds!',
    aliases: ['e', 'd'],
    execute(message, args){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ff9966')
        .setTitle('Welcome :)')
        .setDescription('This is a embed for server rules')
        .addFields(
            {name: 'Rule 1', value: 'Something'},
            {name: 'Rule 2', value: 'Something'},
            {name: 'Rule 3', value: 'Something'}
        )
        .setURL('https://www.youtube.com/watch?v=dTJFtCG2-xA')
        .setImage('https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80')
        .setFooter('Make sure to checkout the rules channel');

        message.channel.send(newEmbed);
        
    }
}