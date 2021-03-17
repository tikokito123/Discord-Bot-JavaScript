module.exports =
{
    //this is a private command
    name: 'gadi',
    aliases: ['g'],
    cooldown: 0,
    guildOnly: true,
    async execute(message, args){
        if(message.guild.id !== '497900056972754979') return message.reply('This is a private command! You cannot use it here.');  
        
        const gadi = message.guild.members.cache.get('284228138995810304');
        const replies = ['גבר גבר גבר', 'בקבה נודר את גדי דוקר', ` אתה הומו`, 'אני לא מוכן לבדיחות הקיצוניות שלך. ערב טוב.', 'לא אני שמתי לב', 'אתה בסדר אתה']
        const r = Math.floor(Math.random() * replies.length);
        await message.channel.send(replies[r] + `${gadi}`);
       
        const chanceToreply = [``, ``, `אני יודע השפלתי השפלתי`, ``, ``]
        
        
        const r2 = Math.floor(Math.random() * chanceToreply.length)
        
        if(chanceToreply[r2] === ``) return;

        await message.channel.send(chanceToreply[r2]);
    }
}
