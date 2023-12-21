const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
          return res.status(401).json({ message: 'User is deactivated. Cannot log in.' });
        }
        // Check user password
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          // Generate JWT token for user
          const token = jwt.sign({ userId: user.id, username: user.username }, 'UserSecretKey', {
            expiresIn: '1h', // Set your preferred expiration time
          });
          return res.status(200).json({ token, role: 'user' });
        }
      }
  
      if (admin) {
        // Check admin password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
  
        if (isPasswordValid) {
          // Generate JWT token for admin
          const token = jwt.sign({ adminId: admin.id, username: admin.username }, 'AdminSecretKey', {
            expiresIn: '1h', // Set your preferred expiration time
          });
          return res.status(200).json({ token, role: 'admin' });
        }
      }
  
      // If no user or admin found, return unauthorized
      return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
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
      return res.status(400).json({ message: 'Username is already taken' });
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
    const token = jwt.sign({ userId: newUser.id, username: newUser.username }, 'UserSecretKey', {
      expiresIn: '1h', // Set your preferred expiration time
    });

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// controllers/userController.js
const selfDeactivateUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is the correct attribute for the user's ID

    // Check if the user is deactivated
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.is_active == 0) {
      return res.status(401).json({ message: 'User is already deactivated.' });
    }

    // Deactivate the user
    await db.User.update({ is_active: 0 }, { where: { id: userId } });

    return res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { userLogin, userRegister, selfDeactivateUser };
