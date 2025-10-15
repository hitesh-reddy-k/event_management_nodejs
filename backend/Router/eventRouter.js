const express = require("express");
const router = express.Router();
const eventController = require("../Controllers/eventController");

router.post("/create", eventController.createEvent);

router.get("/getevent/:id", eventController.getEventDetails);

router.post("/register",  eventController.registerUser);

router.post("/cancel",  eventController.cancelRegistration);

router.get("/upcommingevents", eventController.listUpcomingEvents);

router.get("/:id/stats", eventController.getEventStats);

module.exports = router;
