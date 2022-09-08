const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'NotFoundError': res.status(404).json({ message }); break;
    case 'Error400': res.status(400).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
};

module.exports = errorMiddleware;