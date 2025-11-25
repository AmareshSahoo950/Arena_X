const EventTimer = require("../models/eventTimer");

async function getOrCreateTimerDoc() {
  let timer = await EventTimer.findOne();
  if (!timer) {
    timer = await EventTimer.create({
      endTime: null,
      isRunning: false,
    });
  }
  return timer;
}

function hasExpired(timer) {
  if (!timer.endTime) return false;
  return timer.endTime.getTime() <= Date.now();
}

// GET /api/timer
async function getTimer(req, res) {
  try {
    const timer = await getOrCreateTimerDoc();

    // auto-stop if expired
    if (timer.isRunning && hasExpired(timer)) {
      timer.isRunning = false;
      await timer.save();
    }

    res.json({
      endTime: timer.endTime,
      isRunning: timer.isRunning,
    });
  } catch (err) {
    console.error("getTimer error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /api/timer/start  { durationMinutes }
async function startTimer(req, res) {
  try {
    const { durationMinutes } = req.body;
    if (!durationMinutes || durationMinutes <= 0) {
      return res
        .status(400)
        .json({ message: "durationMinutes must be > 0" });
    }

    const timer = await getOrCreateTimerDoc();
    const end = new Date(Date.now() + durationMinutes * 60 * 1000);

    timer.endTime = end;
    timer.isRunning = true;
    await timer.save();

    res.json({
      message: "Timer started",
      endTime: timer.endTime,
      isRunning: timer.isRunning,
    });
  } catch (err) {
    console.error("startTimer error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /api/timer/stop
async function stopTimer(req, res) {
  try {
    const timer = await getOrCreateTimerDoc();
    timer.isRunning = false;
    await timer.save();

    res.json({
      message: "Timer stopped",
      endTime: timer.endTime,
      isRunning: timer.isRunning,
    });
  } catch (err) {
    console.error("stopTimer error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /api/timer/set { endTime }
async function setTimer(req, res) {
  try {
    const { endTime } = req.body;
    if (!endTime) {
      return res.status(400).json({ message: "endTime is required" });
    }

    const date = new Date(endTime);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid endTime" });
    }

    const timer = await getOrCreateTimerDoc();
    timer.endTime = date;
    await timer.save();

    res.json({
      message: "Timer endTime updated",
      endTime: timer.endTime,
      isRunning: timer.isRunning,
    });
  } catch (err) {
    console.error("setTimer error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getTimer,
  startTimer,
  stopTimer,
  setTimer,
  hasExpired,
  getOrCreateTimerDoc,
};
