module.exports = {
    name: 'clear',
    description: 'Clear the chat',
    cooldown: 5,
    aliases: ['c'],
    guildOnly: true,
    async execute(message, args){
        if(!args[0]) return message.reply('Please enter the amount of messages that you want to clear');
        if(isNaN(args[0])) return message.reply('Please enter a valid number');

        if(args[0] > 100 || args[0] < 1) return message.reply('Please enter a number between 1 to 100');
        
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });

        await message.reply(`Clear ${args[0]} messages`);

    }
}