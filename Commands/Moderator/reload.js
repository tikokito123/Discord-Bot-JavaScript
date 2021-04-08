const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	execute(message, args) {
                
        if(message.author.id !== '239813718383263745') return message.channel.send(`Only the Lord Tikokito can execute this command!🙏🙏🙏 WORSHIP THE LORD TIKOKITO🙏🙏🙏`);
		if(!args.length) return message.reply('which command you want me to reload, **Lord Tiko?** 🙏');
        
        const commandName = args[0].toLowerCase();

        const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return message.channel.send(`**My Lord** 🙏, There is no command with name or alias \`${commandName}\`,my Lord ${message.author}! 🙏`);
        
        const commandFolders = fs.readdirSync('./Commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./Commands/${folder}`).includes(`${commandName}.js`));

        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.error(error);
            message.reply(`**My Lord** 🙏, There was an error while reloading a command, \`${command.name}\`:\n\`${error.message}\`, My Lord 🙏`);
        }
    
        return message.reply(`**My Lord** 🙏, Command \`${command.name}\` was reloaded! **My Lord** 🙏🙏🙏`);
    }
};
