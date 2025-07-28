import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import bookModel from "../models/model.js";

describe("Books API", () => {
  beforeAll(async () => {
    const mongoUri =
      process.env.MONGODB_TEST_URI ||
      "mongodb+srv://chandanedujha:bookstoreconfig@cluster0.1dbqe.mongodb.net/";
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await bookModel.deleteMany({});
  });

  test("POST /api/books - should create a new book", async () => {
    const newBook = {
      title: "Test Book",
      author: "John Doe",
      price: "15.99",
      publishedAt: "2020-01-01",
    };

    const res = await request(app).post("/api/books").send(newBook);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe(newBook.title);
    expect(res.body.author).toBe(newBook.author);
    expect(res.body.price).toBe(newBook.price);
    expect(new Date(res.body.publishedAt)).toEqual(
      new Date(newBook.publishedAt)
    );
  });

  test("GET /api/books - should return all books", async () => {
    await bookModel.create({
      title: "Sample Book",
      author: "Author 1",
      price: "10",
      publishedAt: "2019-05-10",
    });

    const res = await request(app).get("/api/books");

    expect(res.statusCode).toBe(200);
    expect(res.body.books.length).toBe(1);
    expect(res.body.books[0].title).toBe("Sample Book");
  });

  test("GET /api/books/:id - should return a single book by id", async () => {
    const book = await bookModel.create({
      title: "Single Book",
      author: "Author 2",
      price: "20",
      publishedAt: "2018-02-02",
    });

    const res = await request(app).get(`/api/books/${book._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(book.title);
  });

  test("GET /api/books/:id - should return 404 for non-existing book", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/books/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Book not found");
  });

  test("PUT /api/books/:id - should update a book", async () => {
    const book = await bookModel.create({
      title: "Old Title",
      author: "Old Author",
      price: "5",
      publishedAt: "2017-01-01",
    });

    const updates = {
      title: "New Title",
      author: "New Author",
      price: "10",
      publishedAt: "2019-01-01",
    };

    const res = await request(app).put(`/api/books/${book._id}`).send(updates);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(updates.title);
    expect(res.body.author).toBe(updates.author);
    expect(res.body.price).toBe(updates.price);
  });

  test("PUT /api/books/:id - should return 404 for non-existing book", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/books/${fakeId}`)
      .send({
        title: "Test",
        author: "Test Author",
        price: "10",
        publishedAt: "2020-01-01",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Book not found");
  });

  test("DELETE /api/books/:id - should delete a book", async () => {
    const book = await bookModel.create({
      title: "Delete Me",
      author: "Author X",
      price: "8",
      publishedAt: "2016-06-06",
    });

    const res = await request(app).delete(`/api/books/${book._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Book deleted successfully");

    // Confirm book deleted
    const found = await bookModel.findById(book._id);
    expect(found).toBeNull();
  });

  test("DELETE /api/books/:id - should return 404 for non-existing book", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/books/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Book not found");
  });
});
