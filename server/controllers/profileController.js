import User from '../models/Users.js';

// Controller to get the current user's profile
export const getUserProfile = async (req, res) => {
  try {
    // Fetch the user details from the database using the user ID stored in the JWT
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to update the current user's profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, department, currentStatus } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.studentDetails.department = department || user.studentDetails.department;
    user.studentDetails.currentStatus = currentStatus || user.studentDetails.currentStatus;

    // Save the updated user
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
