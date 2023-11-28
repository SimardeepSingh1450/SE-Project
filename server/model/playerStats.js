const mongoose = require('mongoose');

const playerStatsSchema = new mongoose.Schema({
    playerID:{
        required:true,
        type:String
    },
    wins:{
        type:Number
    },
    losses:{
        type:Number
    },
    gamesPlayed:{
        type:Number
    },
    playerUsername:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('playerStatsSchema',playerStatsSchema);