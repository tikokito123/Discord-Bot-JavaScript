const replies = ['pong', 'Beep']

module.exports = {
	name: 'ping',
	description: 'Pong!',
	cooldown: 2,
	execute(message, args) {
        const r = Math.floor(Math.random() * replies.length);
		message.channel.send(replies[r]);
	},
};