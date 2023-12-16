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
      // You might want to attach the decoded user information to the request object
      // req.user = decoded;
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
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
};

const authenticateAdmin = (req, res, next) => {
  // Check if the user has successfully authenticated as an admin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
