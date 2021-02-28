const Embed = require("../Core/Embed");

module.exports = {
	name: 'kick',
	aliases: ['k'],
	description: 'kick the player want to kick, if you want him to return then use the comeback kick',
	guildOnly: true,
	cooldown: 2,
	execute(message, args, Discord) {
		if(!message.member.hasPermission('ADMINISTRATOR', 'KICK_MEMBERS')) 
		{
			message.reply('You Don\'t have the Permission to kick!');
			return;
		};

		const user = message.mentions.users.first();
		if(user){
			const target = message.guild.members.cache.get(user.id);
			
			if(args[1] === 'comeback'){
				const reply = 'סתם נו מה אתה לוקח ללב https://discord.gg/SHwPXdg';

				user.send(reply).
				then(() => 
				{
					console.log('replied');
				}).catch(error => {
					console.error('could not send the reply', error);
				});
			}
			const newEmbed = new Discord.MessageEmbed()
			.setColor('#FFFF00')
			.setTitle('Kicked')
			.setDescription(`${user} has been kicked!`)
			.setURL('https://www.youtube.com/watch?v=dTJFtCG2-xA')
			.setThumbnail('https://e7.pngegg.com/pngimages/188/405/png-clipart-human-s-middle-finger-emoji-domain-middle-finger-the-finger-emoji-hand-thumb-signal.png')
			.setFooter('The user can return when he get kicked!');
			target.kick();
			message.channel.send(newEmbed);
		}
		else{
			message.channel.send('You cannot kick that member');
		}
	},
};