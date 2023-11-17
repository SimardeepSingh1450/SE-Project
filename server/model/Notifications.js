const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objId = Schema.ObjectId;

const notificationsSchema = new mongoose.Schema({
    senderID:{
        required:true,
        type: objId
    },
    receiverID:{
        required:true,
        type: objId
    },
    status:{
        type:String
    }
});

module.exports = mongoose.model('notificationsSchema',notificationsSchema);