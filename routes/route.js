import express from "express";
import {
  addBooks,
  getBooks,
  getBookById,
  updateBookById,
  deleteBook,
} from "../controller/controller.js";
import { validateBooks } from "../middleware/validateBooks.js";

const router = express.Router();

router.post("/books", validateBooks, addBooks);
router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.put("/books/:id", validateBooks, updateBookById);
router.delete("/books/:id", deleteBook);

export default router;
