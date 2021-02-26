module.exports = {
	name: 'ban',
	aliases: ['b'],
	description: 'Ban the user',
	guildOnly: true,
	cooldown: 1000,
	execute(message, args) {
		if(!message.guild.roles.cache.find(role => role.id === '497923786805346304'))return;

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
			message.channel.send(`FUCK YOU, YOU LITTLE SON OF A BITCH. WE DON'T NEED TO SEE ${user} ANYMORE`);
		}
		else{
			message.channel.send('You cannot ban that member');
		}
	},
};