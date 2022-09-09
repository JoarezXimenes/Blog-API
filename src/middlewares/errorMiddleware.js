const errorMiddleware = (err, _req, res, _next) => {
  const { message, status } = err;
  if (status) return res.status(status).json({ message });
  console.warn(err); res.sendStatus(500);
};

module.exports = errorMiddleware;