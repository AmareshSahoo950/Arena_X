const express = require("express");
const router = express.Router();

const { register, login, me } = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");
const { registerSchema, loginSchema } = require("../validation/authSchemas");
const { authMiddleware } = require("../middleware/auth");

// POST /api/auth/register
router.post("/register", validateRequest(registerSchema), register);

// POST /api/auth/login
router.post("/login", validateRequest(loginSchema), login);

// GET /api/auth/me
router.get("/me", authMiddleware, me);

module.exports = router;
