const {prefix} = require('../../config.json');

module.exports = 
{
    name: 'help',
    description: 'List of commands the bot can do',
    aliases: ['h'],
    usage: ['command Name'],
    cooldown: 0.5,
    execute(message, args){
        const data = [];
        const { commands } = message.client;

        if(!args.length)
        {
            data.push('Here\'s a list of all the commands');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command`);
            return message.author.send(data, {split: true}).
            then(() => 
            {
                if(message.channel.type === 'dm') return;
                message.reply('I\'ve send you dm with all of the commands');
            }).catch(error =>
                {
                    console.error('Could not send a dm', error);
                    message.reply('It seems like something went wrong, Do you have DMs disabled?');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command) return message.reply(`There is no such thing ${args[0]} or whatever you said.`);

        data.push(`**Name**: ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        data.push(`Cooldown: ${command.cooldown || 0.5} second(s)`);

        message.channel.send(data, { split: true });
    }
}