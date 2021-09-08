const replies = ['pong', 'Beep']

module.exports = {
	name: 'ping',
	description: 'Pong!',
	aliases: ['p'],
	cooldown: 2,
	async execute(message, args) {
        const r = Math.floor(Math.random() * replies.length);
		await message.channel.send(replies[r]);
	},
};