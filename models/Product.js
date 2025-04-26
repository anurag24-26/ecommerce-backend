const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: true,
    default: "https://via.placeholder.com/150",
  }, // ✅ Default image
  brand: { type: String, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
