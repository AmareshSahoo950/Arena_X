const Submission = require("../models/submission");

async function getAllSubmissions(req, res) {
  try {
    const subs = await Submission.find().populate("user", "name email role");
    res.json(subs);
  } catch (err) {
    console.error("getAllSubmissions error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function setScore(req, res) {
  try {
    const { id } = req.params;
    const { score } = req.body;

    const sub = await Submission.findById(id);
    if (!sub) {
      return res.status(404).json({ message: "Submission not found" });
    }

    sub.score = score;
    await sub.save();

    res.json({ message: "Score updated", submission: sub });
  } catch (err) {
    console.error("setScore error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getAllSubmissions, setScore };
