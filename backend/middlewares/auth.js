const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new Error('Se requiere autorización');
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    const error = new Error('Se requiere autorización');
    error.statusCode = 401;
    return next(error);
  }

  req.user = payload;
  return next();
};
