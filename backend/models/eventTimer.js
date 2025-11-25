const mongoose = require("mongoose");

const eventTimerSchema = new mongoose.Schema(
  {
    endTime: {
      type: Date,
      default: null,
    },
    isRunning: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // includes updatedAt
  }
);

// Ensure only one timer document is used
module.exports = mongoose.model("EventTimer", eventTimerSchema);
