const replies = ['pong', 'Beep']

module.exports = {
	name: 'ping',
	description: 'Pong!',
	aliases: ['p', 't'],
	cooldown: 2,
	async execute(message, args) {
        const r = Math.floor(Math.random() * replies.length);
		await message.channel.send(replies[r]);
	},
};