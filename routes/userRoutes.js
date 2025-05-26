const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
  updatePhoneNumber, // ✅ Added phone number update function
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/update-phone", protect, updatePhoneNumber); // ✅ New route for updating phone number

module.exports = router;
