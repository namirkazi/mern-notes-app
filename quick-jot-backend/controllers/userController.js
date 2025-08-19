const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- Import JWT

// Helper function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    // ... your existing registerUser function is here ...
    // No changes needed inside this function
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Please include all fields' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // <-- Also generate token on register
          });
        } else {
          res.status(400).json({ message: 'Invalid user data' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
};

// @desc    Authenticate a user (login)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });

    // 2. If no user is found, send an error
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. If user is found, THEN compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Passwords match, send back data and token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Passwords do not match
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    // This will catch any other unexpected errors
    console.error(error); // Log the actual error to the console for debugging
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update your exports to include the new login function
module.exports = {
  registerUser,
  loginUser, // <-- Export loginUser
};