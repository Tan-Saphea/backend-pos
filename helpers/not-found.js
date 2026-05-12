const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Can't find ${req.originalUrl} on this server`,
  });
};


module.exports = notFound;