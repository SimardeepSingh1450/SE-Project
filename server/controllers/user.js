const userModel = require('../model/UserProfile');
const uuid = require('uuid');
const {getUser,setUser} = require('../service/auth');

async function handleUserSignUp(req,res){
    const {username,email,password} = req.body;
    const newUserID = uuid.v4()
    console.log('NEW USERID IS : ',newUserID);
    const newUser = new userModel({
        username:username,
        email:email,
        password:password,
        profilePhotoLink:"",
        PlayerID: newUserID
    });

    const result = await newUser.save();

    res.status(201).json({data:result,msg:"User Registered Successfully"});
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email:email,password:password});
    if(!user){
        res.json({msg:"User not found in database"});
    }
    
    console.log('User in DB is :',user);

    //Creating Session ID
    const sessionId = uuid.v4();
    setUser(sessionId,user);    
    res.cookie("uid",sessionId);
    res.status(201).json({user:user,msg:"User LoggedIn Successfully"});
}


module.exports = {handleUserSignUp,handleUserLogin};