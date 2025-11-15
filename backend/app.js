const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const app = express();
const todoRouter = require("./Routes/TodoRoutes");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/AppError");

// Security middleware - Set security HTTP headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  max: 100, // Max 100 requests
  windowMs: 15 * 60 * 1000, // Per 15 minutes
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// CORS
app.use(cors());

// Body parser, reading data from body into req.body with size limit
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Routes
app.use("/api/v1/todos", todoRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
