const userModel = require('../model/UserProfile');
const uuid = require('uuid');
const {setUser} = require('../service/auth');

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

    const user = await newUser.save();

    return res.status(201).json({user:user,msg:"User Registered Successfully"});
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email:email,password:password});
    if(!user){
        return res.json({doesNotExist:true,msg:"User not found in database",user:user});
    }
    
    console.log('User in DB is :',user);

    //Creating Session ID
    const sessionId = uuid.v4();
    setUser(sessionId,user);    
    res.cookie('uid',sessionId,{ maxAge: 2 * 60 * 60 * 1000,secure:true});
    // console.log('Cookies are :',req.cookies);
    return res.status(201).json({user:user,msg:"User LoggedIn Successfully"});
}


module.exports = {handleUserSignUp,handleUserLogin};