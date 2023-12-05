// middleware/auth.js
const authenticateAdmin = (req, res, next) => {
    // Check if the user has successfully authenticated as an admin
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
  
  module.exports = { authenticateAdmin };
  