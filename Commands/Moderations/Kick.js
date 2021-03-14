const Embed = require("../Core/embed");
const Discord = require('discord.js');


module.exports = {
	name: 'kick',
	aliases: ['k'],
	description: 'kick the player want to kick, if you want him to return then use the comeback kick',
	guildOnly: true,
	cooldown: 0.5,
	async execute(message, args) {
		if(!message.member.hasPermission('ADMINISTRATOR', 'KICK_MEMBERS') || !message.guild.me.hasPermission('ADMINISTRATOR', 'BAN_MEMBERS')) 
		{
			message.reply('You/me Don\'t have the Permission to kick!');
			return;
		};

		const user = message.mentions.users.first();
		if(user){
			const target = message.guild.members.cache.get(user.id);
			
			if(args[1] === 'comeback'){
				let invite = await message.channel.createInvite();
				const reply = `jk, jk Comeback :). ${invite}`;

				await user.send(reply).
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
			target.kick().then(message.channel.send(newEmbed))
			.catch(err => {
				console.error(err, 'could not kick the member');
				message.channel.send('could not kick the member, this member has the same permission as me');
			});
		}
		else{
			message.channel.send('You cannot kick that member');
		}
	},
};