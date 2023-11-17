const express = require('express');
const { fetchAllPlayerStats } = require('../controllers/leaderboard');

const router = express.Router();

router.get("/fetchLeaderBoard",fetchAllPlayerStats);

module.exports = router;