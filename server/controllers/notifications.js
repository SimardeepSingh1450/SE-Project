const notificationsModel = require('../model/Notifications');
const userModel = require('../model/UserProfile');
const friendsModel = require('../model/FriendsList');

const fetcNotifications = async(req,res) =>{
    const {playerID} = req.body;

    //finding inside the DB, as current user is the receiver
    const doc = await  notificationsModel.find({receiverID:playerID});

    return res.json({notificationsArray:doc});
}

const deleteNotificaion = async(req,res) =>{//Whenver accept or reject happens we delete the notification at receiver-end
    const {senderID,receiverID} = req.body;

    //as it is the receiver after accept or reject it should not be shown to him
    const doc = await notificationsModel.findOne({senderID:senderID,receiverID});

    const deletedDoc = await doc.deleteOne();

    return res.json({deletedDoc:deletedDoc});
}

const checkIfNotificationSent = async(req,res) =>{
    const {senderID,receiverID} = req.body;

    const doc = await notificationsModel.findOne({receiverID:receiverID,senderID:senderID,status:"sent"});

    if(doc){
        return res.json({alreadyExists:true});
    }

    return res.json({alreadyExists:false});
}

const sendNotification = async(req,res) =>{
    const {senderID,receiverID,senderUsername} = req.body;

    const newDoc = new notificationsModel({
        senderID:senderID,
        receiverID:receiverID,
        senderUsername:senderUsername,
        status:"sent"
    });

    await newDoc.save();

    return res.json({sentNotificationDoc:newDoc});
}

const notificationSendablePlayers = async(req,res) =>{//those who are not having status as sent
    const {currentPlayerID} = req.body;

    //fetch all players first
    let allPlayers = await userModel.find();

    //resultant array
    let result= [];

    allPlayers.map(async(item)=>{
        let doc = await notificationsModel.findOne({senderID:currentPlayerID,receiverID:item.PlayerID});

        if(!doc){
            result.push(item);
        }
    })

    let newResult = result;
    //set old result as null
    result=[];

    return res.json({result:newResult});
}

const acceptNotification =async(req,res)=>{
    //add this notification-sender to the friendList of the accepter playerID
    const {senderUsername,senderID,playerID,receiverUsername} = req.body;

    //delete the friend pending-status of the sender
    const usr = await friendsModel.findOne({playerID:senderID,'friendsList.friendID':playerID,'friendsList.status':"pending"});
    // console.log('FOUND:',usr);
    // console.log('Friends List:',usr.friendsList);
    
    //update the status from pending to friend
    usr.friendsList[0].status = "friend";
    await usr.save();

    //now adding the sender as friend of the currentPlayer who is accpeting the notification
    const usr2 = await friendsModel.findOne({playerID:playerID});
    usr2.friendsList.push({friendUsername:senderUsername,friendID:senderID,status:"friend"});

    await usr2.save();

    return res.json({usr1:usr,usr2:usr2});
}

module.exports = {fetcNotifications,deleteNotificaion,checkIfNotificationSent,sendNotification,notificationSendablePlayers,acceptNotification};