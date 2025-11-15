const AppError = require("../utils/AppError");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error.errors) {
      const messages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return next(new AppError(messages.join(", "), 400));
    }
    next(error);
  }
};

module.exports = validate;
