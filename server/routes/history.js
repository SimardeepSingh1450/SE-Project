const express = require('express');
const {fetchGamingHistory, updateGamingHistory} = require('../controllers/gamingHistory');

const router = express.Router();

router.post("/fetchHistory",fetchGamingHistory);
router.post("/updateHistory",updateGamingHistory);

module.exports = router;