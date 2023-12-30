const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the credentials match a user
    const user = await db.User.findOne({
      where: { username: username },
    });

    // Check if the credentials match an admin
    const admin = await db.Admin.findOne({
      where: { username: username },
    });

    if (user) {
      // Check if the user is deactivated
      if (user.is_active == 0) {
        return res
          .status(401)
          .json({ message: "User is deactivated. Cannot log in." });
      }
      // Check user password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Generate JWT token for user
        const token = jwt.sign(
          { userId: user.id, username: user.username, role: "user" },
          "UserSecretKey",
          {
            expiresIn: "1h", // Set your preferred expiration time
          }
        );
        return res.status(200).json({ token, role: "user" });
      }
    }

    if (admin) {
      // Check admin password
      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (isPasswordValid) {
        // Generate JWT token for admin
        const token = jwt.sign(
          { adminId: admin.id, username: admin.username, role: "admin" },
          "AdminSecretKey",
          {
            expiresIn: "1h", // Set your preferred expiration time
          }
        );
        return res.status(200).json({ token, role: "admin" });
      }
    }

    // If no user or admin found, return unauthorized
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const userRegister = async (req, res) => {
  try {
    const { username, password, name, phone_number, address } = req.body;

    // Check if username is already taken
    const existingUser = await db.User.findOne({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await db.User.create({
      username,
      password: hashedPassword,
      name,
      phone_number,
      address,
    });

    // Generate JWT token for newly registered user
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username, role: "user" }, // Use newUser.id instead of user.id
      "UserSecretKey",
      {
        expiresIn: "1h", // Set your preferred expiration time
      }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const selfDeactivateUser = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      // If there is no token, return unauthorized
      return res
        .status(401)
        .json({ error: "Unauthorized. Please log in to comment." });
    }

    if (token) {
      const tokenParts = token.split(" ", 2);

      try {
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
          throw new Error("Invalid token format");
        }

        const decoded = jwt.verify(tokenParts[1], "UserSecretKey");
        // Attach the decoded user information to the request object
        req.user = decoded;
      } catch (error) {
        // Handle token verification errors
        console.error("Token verification error:", error);
      }
    }

    const userId = req.user.userId;

    // Check if the user is deactivated
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.is_active == 0) {
      return res.status(401).json({ message: "User is already deactivated." });
    }

    // Deactivate the user
    await db.User.update({ is_active: 0 }, { where: { id: userId } });

    return res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAdminAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username is already taken
    const existingAdmin = await db.Admin.findOne({
      where: { username },
    });

    if (existingAdmin) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await db.Admin.create({
      username,
      password: hashedPassword,
    });

    // Generate JWT token for newly registered admin
    const token = jwt.sign(
      { adminId: newAdmin.id, username: newAdmin.username },
      "AdminSecretKey",
      {
        expiresIn: "1h", // Set your preferred expiration time
      }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      // If there is no token, return unauthorized
      return res
        .status(401)
        .json({ error: "Unauthorized. Please log in to comment." });
    }

    if (token) {
      const tokenParts = token.split(" ", 2);

      try {
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
          throw new Error("Invalid token format");
        }

        const decoded = jwt.verify(tokenParts[1], "UserSecretKey");
        // Attach the decoded user information to the request object
        req.user = decoded;
      } catch (error) {
        // Handle token verification errors
        console.error("Token verification error:", error);
      }
    }

    const userId = req.user.userId;

    // Retrieve user information
    const user = await db.User.findByPk(userId, {
      attributes: ["name", "phone_number", "address"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user information:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      // If there is no token, return unauthorized
      return res
        .status(401)
        .json({ error: "Unauthorized. Please log in to comment." });
    }

    if (token) {
      const tokenParts = token.split(" ", 2);

      try {
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
          throw new Error("Invalid token format");
        }

        const decoded = jwt.verify(tokenParts[1], "UserSecretKey");
        // Attach the decoded user information to the request object
        req.user = decoded;
      } catch (error) {
        // Handle token verification errors
        console.error("Token verification error:", error);
      }
    }

    const userId = req.user.userId;

    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Retrieve user information
    const user = await db.User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the old password is valid
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "Invalid old password." });
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match." });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await db.User.update(
      { password: hashedNewPassword },
      { where: { id: userId } }
    );

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    // Get the user ID from the request or token, assuming it's stored in req.user.userId
    const userId = req.user.userId;

    // Get the user's orders with associated information
    const userOrders = await db.Order.findAll({
      attributes: [
        "id",
        "is_confirm",
        "total_amount",
        "createdAt",
        "dateConfirmed",
        "dateRejected",
      ],
      include: [
        {
          model: db.User,
          attributes: ["username", "name", "phone_number", "address"],
          where: { id: userId }, // Filter by the user ID
        },
      ],
      order: [["createdAt", "DESC"]], // Order by creation date in descending order
    });

    // Map the result to the desired format
    const formattedUserOrders = userOrders.map((order) => {
      let status, date;

      switch (order.is_confirm) {
        case 0:
          status = "Not updated";
          dateCreated = order.createdAt;
          return {
            orderId: order.id,
            name: order.User.name,
            totalAmount: order.total_amount,
            status,
            dateCreated: dateCreated ? dateCreated.toLocaleDateString("en-GB") : null,
          };
        case 1:
          status = "Confirmed";
          dateConfirmed = order.dateConfirmed;
          dateCreated = order.createdAt;
          return {
            orderId: order.id,
            name: order.User.name,
            totalAmount: order.total_amount,
            status,
            dateConfirmed: dateConfirmed ? dateConfirmed.toLocaleDateString("en-GB") : null,
            dateCreated: dateCreated ? dateCreated.toLocaleDateString("en-GB") : null,
          };
        case 2:
          status = "Rejected";
          dateRejected = order.dateRejected;
          dateCreated = order.createdAt;
          return {
            orderId: order.id,
            name: order.User.name,
            totalAmount: order.total_amount,
            status,
            dateRejected: dateRejected ? dateRejected.toLocaleDateString("en-GB") : null,
            dateCreated: dateCreated ? dateCreated.toLocaleDateString("en-GB") : null,
          };
        default:
          status = "Invalid status";
          date = null;
      }
    });

    return res.status(200).json({ userOrders: formattedUserOrders });
  } catch (error) {
    console.error("Error getting user orders: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  userLogin,
  userRegister,
  selfDeactivateUser,
  createAdminAccount,
  getUserInfo,
  changePassword,
  getUserOrders,
};
