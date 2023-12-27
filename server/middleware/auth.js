// middleware/auth.js
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Check if the user has successfully authenticated
  const token = req.headers.authorization;

  if (token) {
    const tokenParts = token.split(" ", 2);

    try {
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        throw new Error("Invalid token format");
      }

      const decoded = jwt.verify(tokenParts[1], "UserSecretKey");
      // Attach the decoded user information to the request object
      req.user = decoded;
      // Call next to pass control to the next middleware
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        login: false,
        error: "Unauthorized. Token verification failed.",
      });
    }
  } else {
    // No token provided
    req.user = null;
    next();
  }
};

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const tokenParts = token.split(" ");

    try {
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        throw new Error("Invalid token format");
      }

      const decoded = jwt.verify(tokenParts[1], "AdminSecretKey");
      req.user = decoded;

      if (req.user.role === 'admin') {
        next();
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        login: false,
        error: "Unauthorized. Token verification failed.",
      });
    }
  } else {
    // No token provided
    req.user = null;
    next();
  }
};

module.exports = { authenticateUser, authenticateAdmin };
