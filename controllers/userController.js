const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { name, mobileNo, email } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ mobileNo }, { email }] });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with the provided mobile number or email.' });
    }

    // Create a new user
    const newUser = new User({ name, mobileNo, email });
    await newUser.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const login = async (req, res) => {
  const { mobileNo, email } = req.body;
  try {
    // Find the user based on mobile number or email
    const existingUserLogin = await User.findOne({ $or: [{ mobileNo }, { email }] });

    // Check if the user exists
    if (!existingUserLogin) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Redirect to profile page with userId
    res.redirect(`/profile/${existingUserLogin._id}`);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

const renderProfile = async (req, res) => {
  const userId = req.params.userId; // Get userId from URL params

  try {
    // Example: Fetch user data from MongoDB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found'); // Handle case where user isn't found
    }

    // Render profile.ejs with user data
    res.render('profile', { user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Error fetching user');
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, mobileNo, email } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check for unique mobileNo and email in other users
    const otherUser = await User.findOne({ _id: { $ne: userId }, $or: [{ mobileNo }, { email }] });
    if (otherUser) {
      return res.status(400).json({ message: 'Another user with the provided mobile number or email already exists.' });
    }

    // Update the user
    user.name = name || user.name;
    user.mobileNo = mobileNo || user.mobileNo;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
module.exports = {
  signup,
  login,
  renderProfile,
  updateUser,
  deleteUser,
  listUsers
};
