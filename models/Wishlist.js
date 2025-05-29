const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one wishlist per user
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
