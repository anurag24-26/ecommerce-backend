const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const { protectAdmin } = require("../middleware/adminProtect");

const router = express.Router();

// Get All Products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Create New Product (Admin Only)
router.post(
  "/",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  })
);

// Update Product (Admin Only)
router.put(
  "/:id",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  })
);

// Delete Product (Admin Only)
router.delete(
  "/:id",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: "Product removed successfully" });
  })
);

module.exports = router;
