const {getUser}= require('../service/auth');

async function restrictToLoggedInUserOnly(req,res,next){
    const userUID = req.cookies.uid;

    if(!userUID){
        res.json({msg:"User is not logged in"});
    }

    const user = getUser(userUID);

    if(!userUID){
        res.json({msg:"User is not logged in"});
    }

    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUserOnly};