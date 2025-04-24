const express = require("express");
const Admin = require("../models/Admin"); // Remove .js extension
const Product = require("../models/Product"); // Remove .js extension
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken"); // Remove .js extension

const router = express.Router();
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      res.status(400);
      throw new Error("Admin already exists");
    }

    try {
      // Create a new admin
      const admin = new Admin({
        name,
        email,
        password,
      });

      // Save admin to DB
      await admin.save();

      res.status(201).json({
        message: "Admin registered successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message || "Server Error" });
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
      res.status(401);
      throw new Error("Invalid credentials");
    }
  })
);

// Add a Product (Admin Only)
router.post(
  "/products",
  asyncHandler(async (req, res) => {
    const { title, description, price, image } = req.body;

    const product = new Product({
      title,
      description,
      price,
      image,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

// Delete a Product
router.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// Update Title/Description
router.put(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.description = description || product.description;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = router;
