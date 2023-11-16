const {getUser}= require('../service/auth');

async function restrictToLoggedInUserOnly(req,res,next){
    const userUID = req.cookies.uid;

    if(!userUID){
        return res.json({loggedIn:false,msg:"User is not logged in,number-1"});
    }

    const user = getUser(userUID);

    if(!user){
        return res.json({loggedIn:false,msg:"User is not logged in,number-2"});
    }

    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUserOnly};