const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // ✅ Store multiple image URLs
  brand: { type: String, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
