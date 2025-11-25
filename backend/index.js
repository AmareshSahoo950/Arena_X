const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const timerRoutes = require("./routes/timerRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/timer", timerRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hackathon backend running" });
});

// DB + Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
    process.exit(1);
  });
