const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["participant", "admin"]).default("participant")
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["participant", "admin"])
});

module.exports = { registerSchema, loginSchema };
