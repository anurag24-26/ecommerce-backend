const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  brand: { type: String },
  category: { type: String },
  countInStock: { type: Number, required: true, default: 0 },
  reviews: [reviewSchema], // ✅ Add reviews array here
});

module.exports = mongoose.model("Product", productSchema);
