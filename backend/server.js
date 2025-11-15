const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

// Validate required environment variables
if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error(
    "ERROR: DATABASE and DATABASE_PASSWORD environment variables are required"
  );
  process.exit(1);
}

const db = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

// Database connection with options
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    // Retry connection after 5 seconds
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

// Handle MongoDB connection errors after initial connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Attempting to reconnect...");
});

// Connect to database
connectDB();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
