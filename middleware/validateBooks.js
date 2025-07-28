import bookSchema from "../schemas/book.schema.js";
import logger from "../utils/logger.js";

export const validateBooks = (req, res, next) => {
  try {
    const { error } = bookSchema.validate(req.body);

    if (error) {
      logger.error(`Validation error: ${error.details[0].message}`); // Log validation errors
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  } catch (err) {
    console.error("Validation Middleware Error:", err.stack);
    next(err);
  }
};
