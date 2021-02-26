module.exports = {
	name: 'kick',
	aliases: ['k'],
	description: 'kick the player want to kick, if you want him to return then use the comeback kick',
	guildOnly: true,
	cooldown: 2,
	execute(message, args) {
		if(!message.guild.roles.cache.find(role => role.id === '497923786805346304'))return;

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
				})
			}
			target.kick();
			message.channel.send(`${user} has been kicked`);
		}
		else{
			message.channel.send('You cannot kick that member');
		}
	},
};