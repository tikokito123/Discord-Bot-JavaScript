module.exports =
{
    //this is a private command
    name: 'gadi',
    aliases: ['g'],
    description: 'XD',
    execute(message, args){
        
        if(message.guild.id !== '497900056972754979'){
            message.reply('This is a private command! You cannot use it here.');   
            return;
        }

        const user = message.mentions.users.first();
        
        const target = message.guild.members.cache.get(user.id);;

        if(!target === '284228138995810304') return;
        
        const replies = ['גבר גבר גבר', 'בקבה נודר את גדי דוקר', `${user} אתה הומו`]
        const r = Math.floor(Math.random() * replies.length);
        message.channel.send(replies[r]);
       
        const chanceToreply = [``, ``, `אני יודע השפלתי השפלתי`]
        
        const r2 = Math.floor(Math.random() * chanceToreply.length)
        
        if(chanceToreply[r2] === ``) return;

        message.channel.send(chanceToreply[r2]);
    }
}