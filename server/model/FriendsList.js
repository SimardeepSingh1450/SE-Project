const mongoose = require('mongoose');

const friendsListSchema = new mongoose.Schema({
    friendUsername:{type:String},
    friendID:{type:String},//GAME ID
    status:{type:String}//Send/Sent Request`
})

const friendsSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    playerID:{
        required:true,
        type: String
    },
    friendsList:[friendsListSchema]
});

module.exports = mongoose.model('friendsSchema',friendsSchema);