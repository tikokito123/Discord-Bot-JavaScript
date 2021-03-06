module.exports =
{
    //this is a private command
    name: 'gadi',
    aliases: ['g'],
    description: 'XD',
    cooldown: 0,
    async execute(message, args){
        
        if(message.guild.id !== '497900056972754979') return message.reply('This is a private command! You cannot use it here.');  

        const user = message.mentions.users.first();
        
        const target = message.guild.members.cache.get(user);;

        if(!target === '284228138995810304') return;
        
        const replies = ['גבר גבר גבר', 'בקבה נודר את גדי דוקר', ` אתה הומו`, 'אני לא מוכן לבדיחות הקיצוניות שלך. ערב טוב.', 'לא אני שמתי לב', 'אתה בסדר אתה']
        const r = Math.floor(Math.random() * replies.length);
        await message.channel.send(replies[r]);
       
        const chanceToreply = [``, ``, `אני יודע השפלתי השפלתי`]
        
        const r2 = Math.floor(Math.random() * chanceToreply.length)
        
        if(chanceToreply[r2] === ``) return;

        await message.channel.send(chanceToreply[r2]);
    }
}
