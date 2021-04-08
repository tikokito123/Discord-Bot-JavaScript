//vars
const replies = [ 'Hello world', 'Nice to meet you guys', 'I Speak English very very', 'I am working'] 
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const mongo = require('./Commands/Core/mongo')
const commandFolders = fs.readdirSync('./Commands');
//login to discord
client.on('ready',async () => {
    await mongo().then(mongoose => {
        try{
            console.log('connected!');
        } finally{
            mongoose.connection.close();
        }
    })

    console.log('On');
});

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

client.on('guildCreate', guild => 
{
    if(!guild.available) return;
    
    let isMessageSent = false;
    
    const IntroEmbed = new Discord.MessageEmbed()
    .setAuthor('Tikokito', 'https://cdnb.artstation.com/p/assets/images/images/011/592/433/large/joshua-losier-sleep-token.jpg?1530368240')
    .setColor('#34d80f')
    .setThumbnail('https://goldwallpapers.com/uploads/posts/gangster-spongebob-wallpaper/gangster_spongebob_wallpaper_007.jpg')
    .setTimestamp()
    .setTitle('TikoBot is HERE!! 😎')
    .setURL('https://discord.com/oauth2/authorize?client_id=812915358847074304&permissions=8&scope=bot')
    .setDescription('So, What I can do?')
    .addFields({name: `My prefix: ${prefix}`, value: `Use ${prefix} when you want to call me`},
    {name: `🎸Play Some Music🎶`, value: `Play your favorite songs with TikoBot`},
    {name: '🤣Say Funny jokes🤣', value: `Wanna laugth`},
    {name: '🖕Kick🖕', value: `You know there is an easter egg in the kick command 🤫`},
    {name: '🖕Ban🖕', value: 'Suggestion: If there is someone names Meliodas in your server'},
    {name: '🔴Do some Reaction roles🔴', value: `Choose the role you like`},
    {name: 'clear your channels 💪', value: `clear your text channel`},
    ).addField(`For the commands list type ${prefix}help`, `Help! Help!!`)
    .setFooter('Invite me to your server');


    guild.channels.cache.forEach(channel => {
        if(channel.guild.me.hasPermission('SEND_MESSAGES') && !isMessageSent){
            if(!channel.isText()) return;
            channel.send(IntroEmbed).then(console.log('sent!'))
            .catch(console.log('There was no Text channel || something with a permission!'));
            isMessageSent= true;
        }
    });
});

client.on('guildMemberAdd', guildMember =>
{
    let isMessageSent = false;
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Los Haters!');
        guildMember.roles.add(welcomeRole).then(() => {
            console.log('success');
        }).catch(error => {
            console.error('shit\n', error);
        });
    const welcomeChannel = guildMember.guild.channels.cache.find(channel => channel.name === 'welcome'); 
    const welcome = new Discord.MessageEmbed().setTitle(`Welcome ${guildMember.user.tag} to our server.`).setTimestamp().setColor('#00ecff');
        if(welcomeChannel){
            welcomeChannel.send(welcome);
        }
        else
        {
            guildMember.guild.channels.cache.forEach(channel =>
                {
                    if(channel.guild.me.hasPermission('SEND_MESSAGES') && !isMessageSent && channel.isText()){
                        channel.send(welcome);
                        isMessageSent = true;
                    }
                });
        }
    
});


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
    const cooldownAmount = (command.cooldown || 0.5) * 1000;

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
        command.execute(message, args, client, commandName);
    }
    catch(error)
    {
        console.error(error);
        message.reply('There was an error, please try again (Check out the sintax of your command, maybe you type it wrong)');
    }
});