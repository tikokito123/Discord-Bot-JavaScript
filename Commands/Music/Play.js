const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const Discord = require('discord.js');


const queue = new Map();
const favSongUser = new Map();

module.exports =
{
    name: 'play',
    aliases: ['skip', 'stop', 'favorite', 'leave', 'pause', 'resume', 'pmf', 'q'],
    description: 'Play some Music. A music Bot :) ',
    cooldown: 0.5,
    guildOnly: true,
    async execute(message, args,client, cmd){

        const user = favSongUser.get(message.member.id);

        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send('You need to be in the voice channel to play some music');

        const Permission = voiceChannel.permissionsFor(message.client.user);

        if(!Permission.has('CONNECT')) return message.channel.send('you don\'t have the correct permissions');

        const serverQueue = queue.get(message.guild.id);
        
        if(cmd === 'play')
        {
            if(!args.length) return message.channel.send('You need to send the second argument');
            let song = {};

            if(ytdl.validateURL(args[0])){
                const songInfo = await ytdl.getInfo(args[0]);
                song  = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };

            }
            else
            {
                const videoFinder = async query => 
                {
                    const videoResult = await ytSearch(query);
                    
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }
                const video = await videoFinder(args.join(' '));
                if(video){
                    song = {title: video.title, url: video.url};

                }
                else{
                    message.channel.send('Error finding the video');
                }
            }
            
            if(!serverQueue){
                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: [],
                    playing: true
                }
                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);
                
                try{
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                    
                }
                catch(err){
                    queue.delete(message.guild.id);
                    message.channel.send('Error Connection');
                    throw err;
                }
            }
            else
            {
            serverQueue.songs.push(song);
            const replies = ['Hope It\'s Katatonia 😬', 'Hope It\'s Soen 😬', 'Hope It\'s NF 😬', 'Hope It\'s MOTM 😬', 'Hope It\'s Sleep Token 😬','Hope It\'s Hopsin 😬'];
            
            const r = Math.floor(Math.random() * replies.length);

            const songEmbed = new Discord.MessageEmbed()
            .setColor('#ff9966')
            .setTitle(`🎶🎶 Song Added! 🎶🎶`)
            .setDescription(`👍🎶🎶 ${song.title} added to your queue 🎶🎶🙂 `)
            .setURL(song.url)
            .setThumbnail('https://nashvilleampexpo.com/wp-content/uploads/2020/08/The-20-Best-Royalty-Free-Music-Sites-in-2018.png')
            .setFooter(replies[r]);
            
            return await message.channel.send(songEmbed);
        }
    }
    else if(cmd === 'favorite') FavoriteSong(message, args, user);
    else if(cmd === 'skip') SkipSong(message, serverQueue, message.guild, serverQueue.songs[0]);
    else if(cmd === 'stop') StopSong(message, serverQueue);
    else if(cmd === 'leave') LeaveVoiceChat(message.guild, serverQueue);
    else if(cmd === 'pause') serverQueue.connection.dispatcher.pause();
    else if(cmd === 'resume') serverQueue.connection.dispatcher.resume();
    else if(cmd === 'pmf') PlayFavoriteSong(message, message.guild, user, serverQueue);
    else if(cmd === 'q') DisplayQueue(message, serverQueue);
    }
}
   
const DisplayQueue = (message, serverQueue) =>{

    if(!serverQueue) return message.reply(`There is no songs in the queue`);
        const QueueEmbed = new Discord.MessageEmbed()
        .setTitle('🎵 Songs Queue 🎶');

        serverQueue.songs.forEach(song => {
            QueueEmbed.addField(`**${song.title}**\n`, `🎸\`${song.title}\`🎶`);
    });
    message.channel.send(QueueEmbed);
    message.channel.send(`Now playing **${serverQueue.songs[0].title}**!`)
}
const LeaveVoiceChat = async (guild, serverQueue) => {
   
    const songQueue = queue.get(guild.id);
    
    try{
        await songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    catch(err){
        console.error(err, 'Maybe The bot is not in a vc');
        return;
    }
}
const FavoriteSong = async (message,args, user) => {
    
    let song = {};

    if(!args.length){
        if(favSongUser.has(user)){
            const favsong = favSongUser.get(user);
            return await message.reply(`Your favorite song is **${favsong.title}**`);
        }
        else return message.reply('You need to give a URL of your favorite song');
    }
        
    if(ytdl.validateURL(args[0])){
        const songInfo = await ytdl.getInfo(args[0]);
        song  = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
    }
    else
    {
        const videoFinder = async query => 
        {
            const videoResult = await ytSearch(query);
            
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }
        const video = await videoFinder(args.join(' '));
        if(video){
            song = {title: video.title, url: video.url};
        }
        else{
            message.channel.send('Error finding the video');
        }
    }

    if(!user) favSongUser.set(user, song);
    else favSongUser[user] = song; 
    
        
    return await message.reply(`Your favorite song is **${song.title}**`);
}

const PlayFavoriteSong = async (message, guild, user, serverQueue) => {
    
    try{
        if(favSongUser.has(user)){
            const song = favSongUser.get(user);            
            if(serverQueue)
            {
                const favoriteSongEmbed = new Discord.MessageEmbed()
                .setTitle(`🎹 Hold up Hold Up, ${message.member.user.username} Wants us to listen to his favorite song 😎`)
                .setColor('#3870ab')
                .setDescription(`Your **🎶favorite song🎶** just added to the queue! 🎸🎵\n
                The name of your favorite song is:**🎸🎵 ${song.title}🎶🎹**`)
                serverQueue.songs.push(song);
                await message.channel.send(favoriteSongEmbed);  
            }
            else
            {
                const voiceChannel = message.member.voice.channel;
                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: [],
                    playing: true
                }
                queue.set(guild.id, queueConstructor);
                queueConstructor.songs.push(song);
                
                try{
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    await videoPlayer(message.guild, queueConstructor.songs[0]);
                    
                }
                catch(err){
                    queue.delete(message.guild.id);
                    message.channel.send('Error Connection');
                    throw err;
                }
            }
        }
        else message.reply('enter your favorite song first!');
    }
    catch(err){
        console.error(err, 'could not play fav song');
    }
}


const videoPlayer = async (guild, song) => {
    const byeEmbed = new Discord.MessageEmbed()
    .setColor('#000000')
    .setTitle('The party has been stopped 😒, IM OUT FROM HERE 😠');
    
    const songQueue = queue.get(guild.id);
    if(!song){
        await songQueue.textChannel.send(byeEmbed);
        await songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;        
    }
    
    const stream = ytdl(song.url, {filter: 'audioonly'});
    songQueue.connection.play(stream, {seek: 0, volume: 0.5,quality: 'highestaudio', highWaterMark: 1 << 25 })
    .on('finish', () => {
        songQueue.songs.shift();
        videoPlayer(guild, songQueue.songs[0]);
    }).on("error", error => console.error(error));;
    
    await songQueue.textChannel.send(`🎸🎵 Now playing **${song.title}** 🎸🎵`);
}
const SkipSong = (message, serverQueue, guild, song) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be in the Channel to execute this command');
    if(!serverQueue) return message.channel.send('There are no song in the queue');
    
    try
    {
        serverQueue.connection.dispatcher.destroy();
        videoPlayer(guild, song)
    }
    catch(err){
        console.error(err, 'could not skip');
    }    
}

const StopSong = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be in the Channel to execute this command');
    try{
        serverQueue.connection.dispatcher.destroy();
        serverQueue.songs = [];
    }
    catch(err) {
        console.error(err, 'already typed destroyed!');
    }
    finally
    {
        serverQueue.connection.dispatcher.leave();
    }
}
