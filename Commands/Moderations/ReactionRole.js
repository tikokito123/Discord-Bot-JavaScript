module.exports = {
    name: 'reactionRole',
    description: 'setup a reaction role message',
    aliases: ['rr', 'roles'],
    async execute(message, args, Discord, client){
        const channel = '814864797698490411';
        const fromTheHoodRole = message.guild.roles.cache.find(role => role.name === 'Stupid Role');
        const fromTheStreetsRole = message.guild.roles.cache.find(role => role.name === 'Another Supid Role');
        
        const hoodEmoji = '🍋';
        const streetEmoji = '🍇';

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#e42643')
        .setTitle('Choose a gang')
        .setDescription('Choosing a gang will allow you to interact with the gang \n\n'
        + `${hoodEmoji} For the hood\n`
        + `${streetEmoji} For the streets` 
        );

        let messageEmbed = await message.channel.send(newEmbed);
        messageEmbed.react(hoodEmoji);
        messageEmbed.react(streetEmoji);

        client.on('messageReactionAdd', async (reaction, user) => 
        {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === hoodEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fromTheHoodRole);
                }
                if(reaction.emoji.name === streetEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fromTheStreetsRole);
                }
            }
            else{
                return;
            }

        });
        client.on('messageReactionRemove', async (reaction, user) => 
        {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === hoodEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fromTheHoodRole);
                }
                if(reaction.emoji.name === streetEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fromTheStreetsRole);
                }
            }
            else{
                return;
            }
            
        });
    }
}