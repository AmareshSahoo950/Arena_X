const express = require("express");
const router = express.Router();

const {
  getTimer,
  startTimer,
  stopTimer,
  setTimer,
} = require("../controllers/timerController");
const { authMiddleware, requireRole } = require("../middleware/auth");

// Public: everyone can see the timer
router.get("/", getTimer);

// Admin-only: control the timer
router.post("/start", authMiddleware, requireRole("admin"), startTimer);
router.post("/stop", authMiddleware, requireRole("admin"), stopTimer);
router.post("/set", authMiddleware, requireRole("admin"), setTimer);

module.exports = router;
