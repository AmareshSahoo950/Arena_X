// Wraps a Zod schema to validate req.body
function validateRequest(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }));
      return res
        .status(400)
        .json({ message: "Validation error", errors });
    }

    // Replace body with parsed data
    req.body = result.data;
    next();
  };
}

module.exports = validateRequest;
