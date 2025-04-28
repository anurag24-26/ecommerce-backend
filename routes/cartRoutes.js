const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.route("/").get(protect, getCart);
router.route("/add").post(protect, addToCart);
router.route("/remove/:productId").delete(protect, removeFromCart);
router.route("/clear").delete(protect, clearCart);

module.exports = router;
