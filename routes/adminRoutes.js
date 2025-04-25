const express = require("express");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const generateToken = require("../utils/generateToken");
const { protectAdmin } = require("../middleware/adminProtect"); // Correct middleware file

const router = express.Router();

// ====================== ADMIN AUTH ======================

// Register Admin
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    const admin = await Admin.create({ name, email, password });

    if (admin) {
      res.status(201).json({ message: "Admin registered successfully" });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  })
);

// Admin Login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  })
);

// ====================== PRODUCT MANAGEMENT ======================

// Get All Products (Admin Only)
router.get(
  "/products",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Create New Product (Admin Only)
router.post(
  "/products",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const { name, description, price, image, brand, category, countInStock } =
      req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      brand,
      category,
      countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

// Update Product (Admin Only)
router.put(
  "/products/:id",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const { name, description, price, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  })
);

// Delete Product (Admin Only)
router.delete(
  "/products/:id",
  protectAdmin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await product.remove();
    res.json({ message: "Product removed" });
  })
);

module.exports = router;
