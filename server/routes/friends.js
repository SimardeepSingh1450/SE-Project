const express = require('express');
const {addFriend,deleteFriend} = require('../controllers/friends');

const router = express.Router();

router.post("/addFriend",addFriend);
router.delete("/deleteFriend",deleteFriend);

module.exports = router;