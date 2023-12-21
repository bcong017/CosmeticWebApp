// controllers/adminController.js
const db = require("../models");

const getAllUserAccounts = async (req, res) => {
    try {
      // Check if the user is an admin
      if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      // Get all user accounts
      const users = await db.User.findAll({
        attributes: ['id', 'username', 'name', 'phone_number', 'address', 'is_active'],
      });
  
      return res.status(200).json({ users });
    } catch (error) {
      console.error('Error getting user accounts: ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const adminDeactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user is already deactivated
    if (user.is_deactivate) {
      return res.status(400).json({ message: 'User is already deactivated.' });
    }

    // Deactivate the user
    user.is_deactivate = true;
    await user.save();

    return res.status(200).json({ message: 'User deactivated by admin successfully' });
  } catch (error) {
    console.error('Error deactivating user by admin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { getAllUserAccounts, adminDeactivateUser };
