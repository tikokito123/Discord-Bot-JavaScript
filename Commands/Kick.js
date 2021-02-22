module.exports = {
	name: 'kick',
	description: 'Tell you which player you want to kick',
	execute(message, args) {
        const user = message.mentions.users.first();
		message.channel.send(`You want to kick ${user}`);
	},
};