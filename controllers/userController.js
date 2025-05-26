const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register User (Updated)
const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, phoneNumber });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber, // ✅ Added phone number in response
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Authenticate User (Updated)
const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber, // ✅ Added phone number in response
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Get Profile (Updated)
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber, // ✅ Added phone number in response
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Update Phone Number
const updatePhoneNumber = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    await user.save();
    res.json({ message: "Phone number updated successfully!" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updatePhoneNumber, // ✅ New function added to update phone number
};
