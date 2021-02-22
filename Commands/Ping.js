const replies = ['pong', 'Beep']

module.exports = {
	name: 'ping',
	description: 'Pong!',
	execute(message, args) {
        const r = Math.floor(Math.random() * replies.length);
		message.channel.send(replies[r]);
	},
};