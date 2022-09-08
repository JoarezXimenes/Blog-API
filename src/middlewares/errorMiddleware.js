const errorMiddleware = (err, _req, res, _next) => {
  const { name, message, status } = err;
  switch (name) {
    case 'Error400': res.status(status).json({ message }); break;
    case 'UnauthorizedError': res.status(status).json({ message }); break;
    case 'Conflict': res.status(status).json({ message }); break;
    case 'BadRequest': res.status(status).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
};

module.exports = errorMiddleware;