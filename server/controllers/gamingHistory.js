const gamingHistoryModel = require('../model/GamingHistory');
const userModel = require('../model/UserProfile');

const fetchGamingHistory = async(req,res)=>{
    const {playerID} = req.body;

    //return the gaming-history json
    const history = await gamingHistoryModel.find({playerID:playerID});

    //new map for mapping id to username
    let idMap = new Map();

    //fetching the respective usernames of opponents
    for(let i=0;i<history.length;i++){
        let loserID = history[i].loserID;
        let winnerID = history[i].winnerID;

        //now finding both these username inside userModel
        let loserUser = await userModel.findOne({PlayerID:loserID});
        let loserUsername = loserUser.username;

        let winnerUser = await userModel.findOne({PlayerID:winnerID});
        let winnerUsername = winnerUser.username;

        //now putting inside map if not present
        if(!idMap.get(loserID)){
            idMap[loserID] = loserUsername;
        }

        if(!idMap.get(winnerID)){
            idMap[winnerID] = winnerUsername;
        }
    }

    //reverse the array in order to get latest one on top
    history.reverse();

    return res.json({history:history,idMap:idMap});
}

const updateGamingHistory = async(req,res)=>{
    const {loserID,playerID,winnerID,winType} = req.body;
    let d = Date(Date.now());
    // Converting the number of millisecond
    // in date string
    let dateInString = d.toString()

    //add win or loss
    if(winType==="loss"){
        const newHistoryDoc = new gamingHistoryModel({
            loserID:loserID,
            playerID:playerID,
            winnerID:winnerID,
            gameStatus:"loss",
            date:dateInString
        });

        //save this doc inside the game history DB
        await newHistoryDoc.save();
        console.log('New history Doc is:',newHistoryDoc);

        return res.json({HistoryDoc:newHistoryDoc});
    }else if(winType==="win"){//it is a win
        const newHistoryDoc = new gamingHistoryModel({
            loserID:loserID,
            playerID:playerID,
            winnerID:winnerID,
            gameStatus:"win",
            date:dateInString
        });

        //save this doc inside the game history DB
        await newHistoryDoc.save();
        console.log('New history Doc is:',newHistoryDoc);

        return res.json({HistoryDoc:newHistoryDoc});
    }else{//it is a tie
        const newHistoryDoc = new gamingHistoryModel({
            loserID:loserID,
            playerID:playerID,
            winnerID:winnerID,
            gameStatus:"tie",
            date:dateInString
        });

        //save this doc inside the game history DB
        await newHistoryDoc.save();
        console.log('New history Doc of player-1 is:',newHistoryDoc);

        return res.json({HistoryDoc1:newHistoryDoc});
    }
}

module.exports = {fetchGamingHistory,updateGamingHistory};