const friendsModel = require('../model/FriendsList');

const addFriend = async(req,res)=>{
    const {friendID,playerID} = req.body;

    //finding the player's friends array
    const result = await friendsModel.findOne({playerID:playerID});
    console.log(result);

    //adding new friend to the players friends array
    if(result.friendsID.length == 0){
        result.friendsID = [];
    }

    result.friendsID.push(friendID);

    await result.save();

    return res.json({msg:`Added a NEW Friend with FriendID: ${friendID}`});
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

module.exports = {addFriend,deleteFriend};