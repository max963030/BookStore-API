import joi from "joi";

const bookSchema = joi.object({
  title: joi.string().min(1).max(255).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character",
    "string.max": "Title cannot exceed 255 characters",
    "any.required": "Title is required",
  }),

  price: joi.string().min(1).max(10).required().messages({
    "string.base": "Price must be a string",
    "string.empty": "Price cannot be empty",
    "string.min": "Price must be at least 1 character",
    "string.max": "Price cannot exceed 10 characters",
    "any.required": "Price is required",
  }),

  author: joi.string().min(1).max(100).required().messages({
    "string.base": "Author must be a string",
    "string.empty": "Author cannot be empty",
    "string.min": "Author must be at least 1 character",
    "string.max": "Author cannot exceed 100 characters",
    "any.required": "Author is required",
  }),

  publishedAt: joi.date().less("now").required().messages({
    "date.base": "Published date must be a valid date",
    "date.less": "Published date cannot be in the future",
    "any.required": "Published date is required",
  }),
});

export default bookSchema;
