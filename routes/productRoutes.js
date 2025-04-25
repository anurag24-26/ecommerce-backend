const express = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controllers/productController");
const { protectAdmin } = require("../middleware/adminProtect");

const router = express.Router();

router.get("/", getAllProducts); // Get all products
router.post("/", protectAdmin, createProduct); // Create a product (Admin Only)

module.exports = router;
