const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objId = Schema.ObjectId;

const gameHistorySchema = new mongoose.Schema({
    playerID:{
        required:true,
        type: String
    },
    loserID:{
        required:true,
        type: String
    },
    winnerID:{
        required:true,
        type: String
    },
    gameStatus:{
        type:String
    },
    date:{
        type: String
    }
});

module.exports = mongoose.model('gameHistorySchema',gameHistorySchema);