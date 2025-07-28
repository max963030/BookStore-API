
# 📚 Book Store REST API

A simple REST API built with Node.js, Express, and MongoDB for managing a Book Store. This project was created as part of an internship assignment.

## 🚀 Live URL

**Base API URL:** [https://book-store-api-t8kf.onrender.com](https://book-store-api-t8kf.onrender.com)

---

## 📦 Features

- Add a new book
- Get all books
- Get a book by ID
- Update book details
- Delete a book

---

## 🧾 Book Schema

Each book has the following fields:

```json
{
  "title": "string",
  "author": "string",
  "price": "string",
  "publishedAt": "ISODate (string)"
}
```

---

## 📡 API Endpoints

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | `/api/books`          | Get all books           |
| GET    | `/api/books/:id`      | Get a book by ID        |
| POST   | `/api/books`          | Add a new book          |
| PUT    | `/api/books/:id`      | Update a book by ID     |
| DELETE | `/api/books/:id`      | Delete a book by ID     |

---

## 🧪 Postman Collection

A Postman collection is included to test all API endpoints easily.

### ➕ How to Use

1. Open Postman.
2. Click **Import** > **Upload Files**.
3. Select the file `BookStore.postman_collection.json` from this repo.
4. Use this base URL when testing:  
   `https://book-store-api-t8kf.onrender.com`

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Testing:** Jest, Supertest
- **Hosting:** Render

---

## 📁 Project Structure

```
book-store/
├── controller/
│   └── controller.js
├── models/
│   └── book.js
├── routes/
│   └── routes.js
├── test/
│   └── book.test.js
├── .env
├── app.js
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/book-store.git
   cd book-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB URI:
   ```
   MONGO_URI=your_mongodb_uri
   PORT=3000
   ```

4. Run the server:
   ```bash
   npm start
   ```

5. Run tests:
   ```bash
   npm test
   ```

---

## 👤 Author

**Yashapl Singh**  
📧 [LinkedIn](https://www.linkedin.com/in/yashpal-singh-bb120925a/)
💻 [GitHub](https://github.com/max963030)

---

## 📄 License

This project is for internship assignment purposes only.
