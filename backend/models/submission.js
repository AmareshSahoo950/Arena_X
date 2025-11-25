const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userEmail: { type: String, required: true },

    teamName: { type: String, required: true },
    projectTitle: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },

    techStack: [{ type: String }],
    githubUrl: { type: String, default: "" },
    demoUrl: { type: String, default: "" },

    status: {
      type: String,
      enum: ["draft", "submitted"],
      default: "draft"
    },

    score: { type: Number, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
