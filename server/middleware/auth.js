// middleware/auth.js
const authenticateUser = (req, res, next) => {
  // Check if the user has successfully authenticated
  if (req.user) {
      next();
  } else {
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
};

const authenticateAdmin = (req, res, next) => {
  // Check if the user has successfully authenticated as an admin
  if (req.user && req.user.isAdmin) {
      next();
  } else {
      return res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = { authenticateUser, authenticateAdmin };