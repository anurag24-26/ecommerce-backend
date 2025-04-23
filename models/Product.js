const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  description: String,
  image: String,
  brand: String,
  category: String,
  countInStock: Number,
});

module.exports = mongoose.model('Product', productSchema);
