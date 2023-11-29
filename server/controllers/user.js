const userModel = require('../model/UserProfile');
const friendsModel = require('../model/FriendsList');
const playerStatsModel = require('../model/playerStats');
const uuid = require('uuid');
const {setUser} = require('../service/auth');
const bcrypt = require("bcrypt");

//GET-STREAM CODE BELOW
//key and secret for get-stream
const {StreamChat} = require("stream-chat");
const api_key = "jhw8xp9vt565";
const api_secret = "nmar5njkvyghnqmdmmgmzv2dv48gmsdscecgjac3cmcgjrns26nps2ykmrhnsmnb";

//GETSTREAM Client
const serverClient = StreamChat.getInstance(api_key,api_secret);


async function handleUserSignUp(req,res){
    const {username,email,password} = req.body;
    const newUserID = uuid.v4()
    const hashedPassword = await bcrypt.hash(password,10);
    console.log('NEW USERID IS : ',newUserID);
    const newUser = new userModel({
        username:username,
        email:email,
        password:hashedPassword,
        profilePhotoLink:"",
        PlayerID: newUserID
    });

    //check if the user already exists
    const present = await userModel.findOne({username:username,email:email});

    if(present){
        return res.json({msg:'User already exists'});
    }

    //Adding the user to userModel
    const user = await newUser.save();
    console.log('NEW USER IS :',user);
    //and also add this user to friendsModel
    const newFriendList = new friendsModel({
        username:username,
        playerID: newUserID,//putting the playerID as it's current mongoose model ID
        friendsList:[]
    });

    await newFriendList.save();

    //Adding user inside playerStatsDB
    const stats = new playerStatsModel({
        playerUsername:username,
        playerID:newUserID,
        wins:0,
        losses:0,
        gamesPlayed:0
    });

    await stats.save();

    //Saving the user to getstream
    const token = serverClient.createToken(newUserID);

    return res.status(201).json({hashedPassword:hashedPassword,token:token,userId:newUserID,user:user,msg:"User Registered Successfully"});
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email:email});
    if (!user) {
        return res.json({msg:'Email is incorrect'})
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.json({msg:'Password is incorrect'});
    }

    if(!user){
        return res.json({doesNotExist:true,msg:"User not found in database",user:user});
    }
    
    console.log('User in DB is :',user);

    //Creating Session ID
    const sessionId = uuid.v4();
    setUser(sessionId,user);    
    res.cookie('uid',sessionId,{ maxAge: 2 * 60 * 60 * 1000,secure:true});
    // console.log('Cookies are :',req.cookies);

    //GETSTREAM.io code below
    console.log('user.username :',user.username)
    const {users} = await serverClient.queryUsers({name:user.username});
    console.log('GETSTREAM USERS->',users);
    if(users.length == 0) return res.json({msg:"User not found in GETSTREAM.io"});

    const token = serverClient.createToken(users[0].id);
    return res.status(201).json({userId:users[0].id,token,user:user,msg:"User LoggedIn Successfully"});
}

const fetchUserInfo = async(req,res)=>{
    const {playerID} = req.body;
    const user = await userModel.findOne({PlayerID:playerID});

    return res.json({userInfo:user});
}


module.exports = {handleUserSignUp,handleUserLogin,fetchUserInfo};