const friendsModel = require('../model/FriendsList');
const usersModel = require('../model/UserProfile');

const addFriend = async(req,res)=>{
    const {friendID,friendUsername,playerID,status} = req.body;

    //finding the player's friends array
    const result = await friendsModel.findOne({playerID:playerID});
    console.log(result);

    result.friendsList.push({friendUsername,friendID,status});

    await result.save();

    return res.json({msg:`Added a NEW Friend with FriendID: ${friendID} and ${status}`});
}

const deleteFriend = async(req,res)=>{
    const {friendID,playerID} = req.body;
    
    //finding the player and deleting the friend from its friend array
    const result = await friendsModel.findOne({playerID:playerID});
    const newArray = [];
    
    //iterating inside the friends and skipping the delete one
    for(let i=0;i<result.friendsID.length;i++){
        if(result.friendsID[i]!=friendID){
            newArray.push(item);
        }
    }

    result.friendsID = newArray;
    //clear the newArray
    newArray.length = 0;

    //save the newArray
    await result.save();

    res.json({msg:`Deleted the friend with ID: ${friendID}`});
}

const fetchFriends = async(req,res)=>{
    const {playerID} = req.body;
    const arrayOfFriends = await friendsModel.find({playerID:playerID,'friendsList.status':"friend"});

    console.log(`fetching friends for ${playerID}`);

    if(!arrayOfFriends[0]){
        return res.json({friendsList:[]});
    }

    return res.json({friendsList:arrayOfFriends[0].friendsList});
}

const fetchNotFriends = async(req,res)=>{
    const {playerID} = req.body;
    const friends = await friendsModel.findOne({playerID:playerID});
    const allPeople = await usersModel.find({});

    if(!friends) return res.json({result:allPeople});

    const currFriendsList = friends.friendsList; 

    //map for storing friends
    const frnds = new Map();
    frnds.set(playerID,"1");

    for(let i=0;i<currFriendsList.length;i++){
        frnds.set(currFriendsList[i].friendID,"1");
    }

    const result=[];
    //storing not marked ones inside the result
    for(let i=0;i<allPeople.length;i++){
        if(!frnds.get(allPeople[i].PlayerID)){
            result.push(allPeople[i]);
        }
    }

    return res.json({result:result});
}

module.exports = {addFriend,deleteFriend,fetchFriends,fetchNotFriends};