const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protectAdmin } = require("../middleware/adminProtect");

const router = express.Router();

router.get("/", getAllProducts); // Get all products
router.post("/", protectAdmin, createProduct); // Create a product (Admin Only)

// Add update product route
router.put("/:id", protectAdmin, updateProduct); // Update a product (Admin Only)

// Add delete product route
router.delete("/:id", protectAdmin, deleteProduct); // Delete a product (Admin Only)

module.exports = router;
