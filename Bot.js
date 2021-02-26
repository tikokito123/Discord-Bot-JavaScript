//vars
const replies = [ 'Hello world', 'Nice to meet you guys', 'I Speak English very very', 'I am working'] 
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./Commands');
//login to discord
client.on('ready', () => console.log('On'));

client.login(token);

//Looking for the particular folder with the command name that the user has been given...
for (const folder of commandFolders) 
{
	const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) 
    {
		const command = require(`./Commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('message', message =>
{
    //check if the user wants to contact with the bot...
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    
    const command = client.commands.get(commandName) || 
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //if there is no such command then return
    if(!command) return;

    //check if the command can run only on the server/if not return with a message 
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    
    //Cooldowns
    if(!cooldowns.has(command.name))
        cooldowns.set(command.name, new Discord.Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps.has(message.author.id))
    {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if(now < expirationTime){
            const timeLeft = (expirationTime - now) / 1000;
            console.log(timeLeft.toString());
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the command ${command.name}`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try
    {
        command.execute(message, args, Discord);
    }
    catch(error)
    {
        console.error(error);
        message.reply('There was an error, please try again (Check out the sintax of your command, maybe you type it wrong)');
    }
});