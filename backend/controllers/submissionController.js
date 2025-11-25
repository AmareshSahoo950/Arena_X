const Submission = require("../models/submission");
const { getOrCreateTimerDoc, hasExpired } = require("./timerController");

async function isSubmissionWindowOpen() {
  const timer = await getOrCreateTimerDoc();

  if (!timer.isRunning) return false;
  if (!timer.endTime) return false;
  if (hasExpired(timer)) return false;

  return true;
}

async function getMySubmission(req, res) {
  try {
    const sub = await Submission.findOne({ user: req.user._id });
    return res.json(sub || null);
  } catch (err) {
    console.error("getMySubmission error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function saveSubmission(req, res) {
  try {
    const open = await isSubmissionWindowOpen();
    if (!open) {
      return res
        .status(403)
        .json({ message: "Submission time is over" });
    }
    const data = req.body;

    const existing = await Submission.findOne({ user: req.user._id });

    if (existing && existing.status === "submitted") {
      return res
        .status(400)
        .json({ message: "Submission already finalized" });
    }

    const payload = {
      user: req.user._id,
      userEmail: req.user.email,
      teamName: data.teamName,
      projectTitle: data.projectTitle,
      problem: data.problem,
      solution: data.solution,
      techStack: data.techStack || [],
      githubUrl: data.githubUrl || "",
      demoUrl: data.demoUrl || ""
    };

    let submission;
    if (existing) {
      submission = await Submission.findByIdAndUpdate(
        existing._id,
        { $set: payload },
        { new: true }
      );
    } else {
      submission = await Submission.create(payload);
    }

    res.json({ message: "Draft saved", submission });
  } catch (err) {
    console.error("saveSubmission error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function submitFinal(req, res) {
  try {
    const open = await isSubmissionWindowOpen();
    if (!open) {
      return res
        .status(403)
        .json({ message: "Submission time is over" });
    }
    
    const sub = await Submission.findOne({ user: req.user._id });

    if (!sub) {
      return res.status(400).json({ message: "No draft found" });
    }

    if (sub.status === "submitted") {
      return res.status(400).json({ message: "Already submitted" });
    }

    sub.status = "submitted";
    await sub.save();

    res.json({ message: "Final submission done", submission: sub });
  } catch (err) {
    console.error("submitFinal error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// Public list of all submitted projects (no scores)
async function getPublicSubmissions(req, res) {
  try {
    const subs = await Submission.find({ status: "submitted" }).select(
      "-score -user"
    );
    res.json(subs);
  } catch (err) {
    console.error("getPublicSubmissions error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getMySubmission,
  saveSubmission,
  submitFinal,
  getPublicSubmissions
};
