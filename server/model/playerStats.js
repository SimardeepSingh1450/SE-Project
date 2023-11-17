const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objId = Schema.ObjectId;

const playerStatsSchema = new mongoose.Schema({
    playerID:{
        required:true,
        type:objId
    },
    wins:{
        type:Number
    },
    losses:{
        type:Number
    },
    gamesPlayed:{
        type:Number
    }
});

module.exports = mongoose.model('playerStatsSchema',playerStatsSchema);