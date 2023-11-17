const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objId = Schema.ObjectId;

const gameHistorySchema = new mongoose.Schema({
    playerID:{
        required:true,
        type: objId
    },
    loserID:{
        required:true,
        type: objId
    },
    winnerID:{
        required:true,
        type: objId
    },
    gameStatus:{
        type:String
    },
    date:{
        type: String
    }
});

module.exports = mongoose.model('gameHistorySchema',gameHistorySchema);