module.exports =
{
    name: 'gadi',
    aliases: ['g'],
    description: 'XD',
    execute(message, args){
        const user = message.mentions.users.first();
        
        const target = message.guild.members.cache.get(user.id);;

        if(!target === '284228138995810304') return;
        
        const replies = ['גבר גבר גבר', 'בקבה נודר את גדי דוקר', `${user} אתה הומו`]
        const r = Math.floor(Math.random() * replies.length);
        message.channel.send(replies[r]);
    }
}