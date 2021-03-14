module.exports = 
{
    name: 'create',
    aliases: ['voice', 'text'],
    description: `Create a text and a voice channel. Use 'voice' for Voice channel, and 'text' for text`,
    guildOnly: true,
    execute(message,args, client, cmd){

        let name = args.join(' ');
        
        if(cmd == 'text' && message.member.hasPermission('MANAGE_CHANNELS' || 'ADMINISTRATOR')){
            message.guild.channels.create(name , {type: 'text'}).then(channel => message.channel.send(`Text ${channel} created succesfuly`)).catch(err => console.error(err));
        }
        else{
            message.reply('You do not have a permission to do so');
        }
        
        if(cmd == 'voice' && message.member.hasPermission('MANAGE_CHANNELS' || 'ADMINISTRATOR')){
            message.guild.channels.create(name, {type: 'voice'}).then(channel => message.channel.send(`Voice ${channel} has created`)).catch(err => console.log(err));
            
        }
    }
};