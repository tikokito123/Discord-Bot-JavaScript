const mongoose = require('mongoose');

const favoriteSong = mongoose.Schema({
    _id: String,
    song: { title: String, url: String }
});

module.exports = mongoose.model('DiscordBotCollection', favoriteSong);
