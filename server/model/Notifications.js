const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    senderID:{
        required:true,
        type: String
    },
    senderUsername:{
        required:true,
        type: String
    },
    receiverID:{
        required:true,
        type: String
    },
    status:{
        type:String
    }
});

module.exports = mongoose.model('notificationsSchema',notificationsSchema);