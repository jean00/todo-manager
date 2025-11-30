const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const app = express();
const todoRouter = require("./Routes/TodoRoutes");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/AppError");
const User = require("./Models/UserModel");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

// JWT Secret
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

// CORS - Allow credentials (cookies)
app.use(
  cors({
    origin: true, // Allow all origins in development, configure for production
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Body parser, reading data from body into req.body with size limit
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Routes
app.use("/api/v1/todos", todoRouter);

// API for Google Authentication
app.post("/api/v1/auth/google", async (req, res) => {
  const { credential } = req.body;

  try {
    // Verify the ID token with Google's API
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { email, name } = payload;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if they don't exist
      user = await User.create({
        email,
        name: name || email.split("@")[0],
        authSource: "google",
      });
      console.log("New user created:", user);
    } else {
      console.log("Existing user found:", user);
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "1h", // Adjust expiration time as needed
      }
    );

    // Send the token as a cookie and response
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true in production when using HTTPS
        maxAge: 3600000, // 1 hour in milliseconds
      })
      .json({ message: "Authentication successful", user });
  } catch (err) {
    console.error("Error during Google Authentication:", err);
    res.status(400).json({ error: "Authentication failed", details: err });
  }
});

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
