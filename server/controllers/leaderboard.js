const statsModel = require('../model/playerStats');

const fetchAllPlayerStats = async(req,res) => {
    let allStatsDocs = await statsModel.find();

    //sorting the allStatsDocs
    allStatsDocs.sort(function(a,b){
        if(a.wins > b.wins) return -1;
        if(a.wins == b.wins && a.gamesPlayed < b.gamesPlayed) return -1;
        if(a.wins == b.wins && a.gamesPlayed > b.gamesPlayed) return 1;
        if(a.wins < b.wins) return 1;
        if(a.losses == b.losses && a.gamesPlayed > b.gamesPlayed) return -1;
        if(a.losses == b.losses && a.gamesPlayed < b.gamesPlayed) return 1;
            
        return 0;
    });

    return res.json({arrayOfPlayers:allStatsDocs});
}

module.exports = {fetchAllPlayerStats};