module.exports = 
{
    name: 'create',
    aliases: ['voice', 'text'],
    description: `Create a text and a voice channel. Use 'voice' for Voice channel, and 'text' for text`,
    execute(message,args, client, cmd){

        let name = args.join(' ');
        
        if(cmd == 'text' && message.author.hasPermission('MANAGE_CHANNELS' || 'ADMINISTRATOR')){
            message.guild.channels.create(name , {type: 'text'}).then(channel => console.log(channel)).catch(err => console.error(err));
        }
        else{
            message.reply('You do not have a permission to do so');
        }
        
        if(cmd == 'voice' && message.author.hasPermission('MANAGE_CHANNELS' || 'ADMINISTRATOR')){
            message.guild.channels.create(name, {type: 'voice'}).then(channel => console.log(channel)).catch(err => console.log(err));
            
        }
    }
};