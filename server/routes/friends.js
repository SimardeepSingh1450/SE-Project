const express = require('express');
const {addFriend,deleteFriend,fetchFriends,fetchNotFriends} = require('../controllers/friends');

const router = express.Router();

router.post("/fetchFriends",fetchFriends);
router.post("/fetchNotFriends",fetchNotFriends);
router.post("/addFriend",addFriend);
router.delete("/deleteFriend",deleteFriend);

module.exports = router;