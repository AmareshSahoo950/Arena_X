const { z } = require("zod");

const baseSubmissionSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  projectTitle: z.string().min(1, "Project title is required"),
  problem: z.string().min(1, "Problem statement is required"),
  solution: z.string().min(1, "Solution is required"),
  // techStack will come as an array from frontend ideally
  techStack: z.array(z.string()).optional(),
  githubUrl: z
    .string()
    .url("Invalid GitHub URL")
    .optional()
    .or(z.literal("")),
  demoUrl: z
    .string()
    .url("Invalid Demo URL")
    .optional()
    .or(z.literal(""))
});

// For saving draft (still strict but simple)
const saveSubmissionSchema = baseSubmissionSchema;

// Final submit does not require body; it just flips status to "submitted"
const submitFinalSchema = z.object({});

// Admin score
const scoreSchema = z.object({
  score: z
    .coerce.number({ invalid_type_error: "Score must be a number" })
    .min(0, "Score cannot be negative")
    .max(100, "Score cannot be more than 100")
});

module.exports = { saveSubmissionSchema, submitFinalSchema, scoreSchema };
