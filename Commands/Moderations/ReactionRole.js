module.exports = {
    name: 'reactionRole',
    description: 'setup a reaction role message',
    aliases: ['rr', 'roles'],
    async execute(message, args, Discord, client){
        const channel = '815250249001074689';        
        const fromTheShabesRole = message.guild.roles.cache.find(role => role.name === '✡️חרדיאלים✡️');
        const fromTheStreetsRole = message.guild.roles.cache.find(role => role.name === 'מהשכונה');
        const happyGregRole = message.guild.roles.cache.find(role => role.name === 'HappyGregory');
        
        const dosiEmoji = '✡️';
        const streetEmoji = '🖕';
        const happyGreg = '😬';

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#e42643')
        .setTitle('CHOOSE A GANG')
        .setDescription('Choosing a gang will allow you to interact with the gang \n\n'
        + `${dosiEmoji} If you are ✡️חרדיאלים✡️\n\n`
        + `${streetEmoji} If you are from the streets\n\n`
        + `${happyGreg} If you are a happyGreg dude` 
        );
        if(message.channel.id === channel){
            let messageEmbed = await message.channel.send(newEmbed);
            messageEmbed.react(dosiEmoji);
            messageEmbed.react(streetEmoji);
            messageEmbed.react(happyGreg);
        }

        client.on('messageReactionAdd', async (reaction, user) => 
        {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            
   
            if(message.channel.id == channel){
                if(reaction.emoji.name === dosiEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fromTheShabesRole);
                }
                if(reaction.emoji.name === streetEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fromTheStreetsRole);
                }
                if(reaction.emoji.name === happyGreg){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(happyGregRole);
                }
            }
            else{
                await message.channel.send('This command works only under channel name roles!');
                return;
            }

        });
        client.on('messageReactionRemove', async (reaction, user) => 
        {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(message.channel.id == channel)
            {
                if(reaction.emoji.name === dosiEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fromTheShabesRole);
                }
                if(reaction.emoji.name === streetEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fromTheStreetsRole);
                }
                if(reaction.emoji.name === happyGreg){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(happyGregRole);
                }
            }
            else
            {
                return;
            }
        });        
    }
}
