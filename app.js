// app.js
import express from "express";
import bookRoutes from "./routes/route.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  mongoSanitize({
    replaceWith: "_", // Or false to remove keys
    onSanitize: ({ req, key }) => {
      console.warn(`Sanitized ${key} in request`);
    },
  })
);
app.use(morgan("dev")); // You can use a custom stream if you set up Winston
// app.js
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
});
app.use("/api", limiter, bookRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Welcome to the Book API");
});

export default app;
