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
        type: String
    },
    friendsID:[{
        required: true,
        type: String
    }]
});

module.exports = mongoose.model('friendsSchema',friendsSchema);