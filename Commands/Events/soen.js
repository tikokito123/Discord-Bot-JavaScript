const Discord = require('discord.js');
module.exports = {
    name: 'soen',
    description: '5.5.2020 BAAAABBBYYYYY',
    execute(message, args){
        const SoenEmbed = new Discord.MessageEmbed()
        .setTitle('🎸5.5 BABBBYYY🤘')
        .setDescription('🤘🤘YOU HAVE ALWAYS BEEN THERE COVERING THE SUN \n ACHING IN MY CHEST!🤘🤘')
        .setURL('https://progstage-productions.com/soen/')
        .setColor('#7E5CFA')
        .addField(`GROWING DARKNESS WAR WITHHH IN!!! EMPTINESS SHADOWS ALTER MY REFLECTION `, '🤘Desolation marks my skin🤘🎸🎸🎸🎸🎸🎸🎸🎸')
        .setThumbnail('https://i1.wp.com/tuonelamagazine.com/wp-content/uploads/2021/01/SOEN-IMPERIAL-cover-home-800.jpg?fit=800%2C800')
        .setImage('https://www.punk-rocker.com/wp-content/uploads/2020/12/soen-release-video-for-new-single-monarch.jpg');
        
        return message.reply(SoenEmbed);
    }
}