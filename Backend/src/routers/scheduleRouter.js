const express = require('express')
const router = express.Router();

const scheduleController = require("../controllers/scheduleController");

router.post("/api/schedule", scheduleController.createSchedule);
router.get("/api/schedule/:id", scheduleController.getSingleSchedule);
router.put("/api/schedule/:id", scheduleController.updateSchedule);
router.get("/api/schedule", scheduleController.getAllSchedule);
router.delete("/api/schedule/:id", scheduleController.deleteSchedule);

module.exports = router;