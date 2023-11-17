const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objId = Schema.ObjectId;

const notificationsSchema = new mongoose.Schema({
    senderID:{
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