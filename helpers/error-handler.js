const { error } = require("server/router");
const { path } = require("../app");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errMessage = "Server Error";

  if (err.name == "ValidationError") {
    const errors = Object.values(err.errors).map((el) => {
      return {
        path: el.path,
        message: el.message,
      };
    });
    errMessage = errors;
    statusCode = 400;
  }
  if (err.code == 11000) {
    const field = Object.keys(err.keyValue)[0];
    ((errMessage = `Duplicate key error: ${field} must be unique.`),
      (statusCode = 400));
  }

  if (process.env.NODE_ENV == "development") {
    res.status(statusCode).json({
      success: false,
      name: err.name,
      message: errMessage,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      error: errMessage,
    });
  }
};

module.exports = errorHandler;
