const express = require("express");
const router = express.Router();

const { getAllSubmissions, setScore } = require("../controllers/adminController");
const validateRequest = require("../middleware/validateRequest");
const { scoreSchema } = require("../validation/submissionSchemas");
const { authMiddleware, requireRole } = require("../middleware/auth");

// Protect all admin routes
router.use(authMiddleware, requireRole("admin"));

// GET /api/admin/submissions
router.get("/submissions", getAllSubmissions);

// PATCH /api/admin/submissions/:id/score
router.patch(
  "/submissions/:id/score",
  validateRequest(scoreSchema),
  setScore
);

module.exports = router;
