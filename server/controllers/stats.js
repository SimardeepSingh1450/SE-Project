const playerStatsModel = require('../model/playerStats');

const lossStatsUpdate = async(req,res) =>{
    const {playerID} = req.body;

    //searching this playerID inside stats-DB
    const statDoc = await playerStatsModel.findOne({playerID:playerID});

    //update the data as loss
    statDoc.losses = statDoc.losses + 1;
    statDoc.gamesPlayed = statDoc.gamesPlayed + 1;

    //now saving the Doc-Data
    await statDoc.save();

    return res.status(200).json({msg:'Player Stats updated succesfully',newStatDoc:statDoc});
}

const winStatsUpdate = async(req,res) =>{
    const {playerID} = req.body;

    //searching this playerID inside stats-DB
    const statDoc = await playerStatsModel.findOne({playerID:playerID});

    //update the data as win
    statDoc.wins = statDoc.wins + 1;
    statDoc.gamesPlayed = statDoc.gamesPlayed + 1;

    //now saving the Doc-Data
    await statDoc.save();

    return res.status(200).json({msg:'Player Stats updated succesfully',newStatDoc:statDoc});
}

const tieStatsUpdate = async(req,res) =>{
    const {playerID} = req.body;

    //searching this playerID inside stats-DB
    const statDoc = await playerStatsModel.findOne({playerID:playerID});

    //update the data as tie
    statDoc.gamesPlayed = statDoc.gamesPlayed + 1;

    //now saving the Doc-Data
    await statDoc.save();

    return res.status(200).json({msg:'Player Stats updated succesfully',newStatDoc:statDoc});
}

const fetchPlayerStats = async(req,res) =>{
    const {playerID} = req.body;

    //searching this playerID inside stats-DB
    const statDoc = await playerStatsModel.findOne({playerID:playerID});

    return res.status(200).json({playerStats:statDoc});
}

module.exports = {lossStatsUpdate,winStatsUpdate,tieStatsUpdate,fetchPlayerStats};