const gamingHistoryModel = require('../model/GamingHistory');

const fetchGamingHistory = async(req,res)=>{
    const {playerID} = req.body;

    //return the gaming-history json
    const history = await gamingHistoryModel.find({playerID:playerID});

    return res.json({history:history});
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