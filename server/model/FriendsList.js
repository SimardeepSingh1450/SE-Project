const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objId = Schema.ObjectId;

const friendsSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    playerID:{
        required:true,
        type: objId
    },
    friendsID:[{
        required: true,
        type: objId
    }]
});

module.exports = mongoose.model('friendsSchema',friendsSchema);