const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../Models/UserModel");

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

/**
 * Optional authentication middleware
 * Extracts user from JWT token if present, but doesn't require it
 * Sets req.user if authenticated, leaves it undefined if not
 */
exports.optionalAuth = catchAsync(async (req, res, next) => {
  let token;

  // Check for token in cookie or Authorization header
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from database
      const user = await User.findById(decoded.userId);

      if (user) {
        req.user = user;
      }
    } catch (error) {
      // Token is invalid, just continue without user
      console.log("Invalid token, continuing as guest");
    }
  }

  next();
});

/**
 * Required authentication middleware
 * User must be authenticated to proceed
 */
exports.requireAuth = catchAsync(async (req, res, next) => {
  let token;

  // Check for token in cookie or Authorization header
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "You are not logged in. Please log in to access this resource.",
        401
      )
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401)
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Invalid token. Please log in again.", 401));
  }
});
