const express = require('express');
const { fetcNotifications, deleteNotificaion,checkIfNotificationSent,sendNotification, notificationSendablePlayers,acceptNotification } = require("../controllers/notifications");

const router = express.Router();

router.post("/acceptNotification",acceptNotification);
router.post("/fetchNotifications",fetcNotifications);
router.post("/deleteNotification",deleteNotificaion);
router.post("/checkIfNotificationSent",checkIfNotificationSent);
router.post("/sendNotification",sendNotification);
router.get("/notificationSendablePlayers",notificationSendablePlayers)

module.exports = router;