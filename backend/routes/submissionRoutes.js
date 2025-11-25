const express = require("express");
const router = express.Router();

const {
  getMySubmission,
  saveSubmission,
  submitFinal,
  getPublicSubmissions
} = require("../controllers/submissionController");

const validateRequest = require("../middleware/validateRequest");
const {
  saveSubmissionSchema,
  submitFinalSchema
} = require("../validation/submissionSchemas");
const { authMiddleware } = require("../middleware/auth");

// Public: GET /api/submissions/public
router.get("/public", getPublicSubmissions);

// Participant: GET /api/submissions/me
router.get("/me", authMiddleware, getMySubmission);

// Participant: POST /api/submissions  (save draft)
router.post(
  "/",
  authMiddleware,
  validateRequest(saveSubmissionSchema),
  saveSubmission
);

// Participant: POST /api/submissions/submit  (final submit)
router.post(
  "/submit",
  authMiddleware,
  validateRequest(submitFinalSchema),
  submitFinal
);

module.exports = router;
