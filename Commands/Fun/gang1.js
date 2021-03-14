module.exports = {
    name: 'gang1',
    aliases: ['sb', 'g1'],
    description: 'לאמיר נמאס לנשום',
    guildOnly: true,
    execute(message, args){
        if(message.guild.id !== '497900056972754979') return message.channel.send('you cannot use it here.');

        const Tiko = message.guild.members.cache.get('239813718383263745');
        const Liav = message.guild.members.cache.get('412511990775545866');
        const Gadi = message.guild.members.cache.get('284228138995810304');
        
        return message.channel.send(`${Tiko}, ${Gadi}, ${Liav} כנסו`);
    }
}