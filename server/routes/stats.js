const express = require('express');
const {tieStatsUpdate,winStatsUpdate,lossStatsUpdate,fetchPlayerStats} = require('../controllers/stats');

const router = express.Router();

router.post("/win",winStatsUpdate);
router.post("/loss",lossStatsUpdate);
router.post("/tie",tieStatsUpdate);
router.post("/fetchStats",fetchPlayerStats);

module.exports = router;