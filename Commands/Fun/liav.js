module.exports = {
   
    name: 'liav',
    aliases: ['l'],
    description: 'בוא נשמע בוא נשמע',

    execute(message, args) {
        if(message.guild.id !== '497900056972754979') return message.reply('This is a command for a private discord server. To find out, there is an invite: https://discord.gg/GEs36aWK');
        
        const replies = ['בוא נשמע אה?! אההה בוא נשמע!', 'איייי די די די די די... חחח בוא נשמע', 'תגיד איך אתה קורא לעצמך אסי נראה לי ערסי', 'האמת שנפגעתי', 'אתה לא מתבייש אנחנו ברחנו מבנות']
        const r = Math.floor(Math.random() * replies.length);
        const user = message.guild.members.cache.get('412511990775545866');
        message.channel.send(replies[r] + `${user}`);
    }
}