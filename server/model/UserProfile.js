const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objId = Schema.ObjectId;

const userSchema = new mongoose.Schema({
    username:{
        required: true,
        type: String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    profilePhotoLink:{
        type:String
    },
    PlayerID:{
        type: String
    }
});

module.exports = mongoose.model('UserSchema',userSchema);