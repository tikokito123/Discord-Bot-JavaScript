const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports =
    {
    name: 'play',
    aliases: ['skip', 'stop'],
    description: 'Play some Music, A music Bot :) ',
    async execute(message, args, cmd, client, Discord){
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
            const songEmbed = new Discord.MessageEmbed()
            .setColor('#ff9966')
            .setTitle(`🎶🎶 Song Added! 🎶🎶`)
            .setDescription(`👍🎶🎶 ${song.title} added to your queue 🎶🎶🙂 `)
            .setURL(song.url)
            .setThumbnail('https://nashvilleampexpo.com/wp-content/uploads/2020/08/The-20-Best-Royalty-Free-Music-Sites-in-2018.png')
            .setFooter('Hope It\'s Katatonia 😬');
            
            return message.channel.send(songEmbed);
            }
        }
        else if(cmd === 'skip') SkipSong(message, serverQueue);
        else if(cmd === 'stop') StopSong(message, serverQueue);
    }

}

const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);
    
    if(!song){
        songQueue.textChannel.send('The party has been stopped 😒, IM OUT FROM HERE 😠');
        songQueue.voiceChannel.leave();
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

const SkipSong = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be in the Channel to execute this command');
    if(!serverQueue) return message.channel.send('There are no song in the queue');

        
    serverQueue.connection.dispatcher.destroy();
}

const StopSong = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be in the Channel to execute this command');

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.destroy();
}