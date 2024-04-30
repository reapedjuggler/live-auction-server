const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('x-auth-token');
  // If no token
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token, not logged in' }] });
  }
  // Verify token
  try {
    const verifiedToken = jwt.verify(token, "secret")
    req.user = verifiedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
};
