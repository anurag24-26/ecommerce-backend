const User = require("../models/User");
const Product = require("../models/Product");

// Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

// Add item to wishlist
const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );
    await user.save();

    res.json({ message: "Product removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};

// Clear wishlist (optional)
const clearWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = [];
    await user.save();

    res.json({ message: "Wishlist cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing wishlist", error });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist, clearWishlist };
