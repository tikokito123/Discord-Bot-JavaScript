const Discord = require('discord.js');


module.exports = {
	name: 'ban',
	aliases: ['b'],
	description: 'Ban the user',
	guildOnly: true,
	cooldown: 0.5,
	execute(message, args) {
		if(!message.member.hasPermission('ADMINISTRATOR', 'BAN_MEMBERS') || message.guild.me.hasPermission('ADMINISTRATOR', 'BAN_MEMBERS')) {
			message.reply('You/me Don\'t have the Permission to Ban!!!');
			return;
		};

		const user = message.mentions.users.first();
		if(user)
        {
            if(args[1] === 'fuckoff'){
				const reply = 'Emmmm... Yes... fuck you';

				user.send(reply).
				then(() => 
				{
					console.log('replied');
				}).catch(error => {
					console.error('could not send the reply', error);
				})
			}
			const target = message.guild.members.cache.get(user.id);
			target.ban();
			const newEmbed = new Discord.MessageEmbed()
			.setColor('#A40000')
			.setTitle('BANNED!')
			.setDescription(`FUCK YOU, YOU LITTLE SON OF A BITCH. WE DON'T NEED TO SEE ${user} ANYMORE`)
			.setURL('https://www.youtube.com/watch?v=dTJFtCG2-xA')
			.setThumbnail('https://e7.pngegg.com/pngimages/188/405/png-clipart-human-s-middle-finger-emoji-domain-middle-finger-the-finger-emoji-hand-thumb-signal.png')
			.setFooter('ברוך שפטרנו');
			message.channel.send(newEmbed);
		}
		else{
			message.reply('You cannot ban that member. It is not my fault, Use a fucking @member smh');
		}
	},
};