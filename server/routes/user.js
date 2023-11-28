const express = require('express');
const {handleUserSignUp,handleUserLogin, fetchUserInfo} = require('../controllers/user');

const router = express.Router();

router.post("/signup",handleUserSignUp);
router.post("/login",handleUserLogin);
router.post("/fetchUserInfo",fetchUserInfo);

module.exports = router;