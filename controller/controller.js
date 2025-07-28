import bookModel from "../models/model.js";
import logger from "../utils/logger.js"; // Adjust path if needed

export async function addBooks(req, res) {
  try {
    const book = new bookModel(req.body);
    await book.save();
    logger.info(`Book added: ${book._id} - ${book.title}`);
    res.status(201).json(book);
  } catch (err) {
    logger.error(`Add book error: ${err.message}`, { stack: err.stack });
    res.status(400).json({ error: err.message });
  }
}

export async function getBooks(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const books = await bookModel.find().skip(skip).limit(Number(limit));
    const total = await bookModel.countDocuments();

    logger.info(`Fetched books page ${page} with limit ${limit}`);
    res.status(200).json({
      total,
      page: Number(page),
      pageSize: books.length,
      books,
    });
  } catch (err) {
    logger.error(`Fetch books error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Failed to fetch books" });
  }
}

export async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    if (!book) {
      logger.warn(`Book not found: ${id}`);
      return res.status(404).json({ error: "Book not found" });
    }
    logger.info(`Fetched book by ID: ${id}`);
    res.status(200).json(book);
  } catch (err) {
    logger.error(`Fetch book by ID error: ${err.message}`, {
      stack: err.stack,
    });
    res.status(500).json({ error: "Failed to fetch book" });
  }
}

// controllers/bookController.js
export const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Check if book exists
    const existingBook = await bookModel.findById(id);
    if (!existingBook) {
      console.log(`Book not found for update: ${id}`);
      return res.status(404).json({ error: "Book not found" });
    }

    // Step 2: Validate if needed (optional if using Mongoose validation)
    if (!req.body.title || !req.body.author || !req.body.price) {
      return res
        .status(400)
        .json({ error: "Title, Author, and Price are required" });
    }

    // Step 3: Update
    const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("Book updated:", updatedBook._id);
    res.json(updatedBook);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    const book = await bookModel.findByIdAndDelete(id);
    if (!book) {
      logger.warn(`Book not found for deletion: ${id}`);
      return res.status(404).json({ error: "Book not found" });
    }
    logger.info(`Book deleted: ${id}`);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    logger.error(`Delete book error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: "Failed to delete book" });
  }
}
