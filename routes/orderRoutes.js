const express = require("express");
const { createOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createOrder);

module.exports = router;
