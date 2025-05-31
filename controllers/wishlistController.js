const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("items.product");
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    const products = wishlist.items.map((item) => item.product);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

// Add multiple products to wishlist
const addToWishlist = async (req, res) => {
  const { productIds } = req.body;

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ message: "Please provide a list of product IDs" });
  }

  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) wishlist = new Wishlist({ user: req.user._id, items: [] });

    // Filter out invalid products
    const validProducts = await Product.find({ _id: { $in: productIds } });
    const validProductIds = validProducts.map((product) => product._id.toString());

    const existingProductIds = wishlist.items.map((item) => item.product.toString());
    const newItems = validProductIds
      .filter((id) => !existingProductIds.includes(id))
      .map((id) => ({ product: id, addedAt: new Date() }));

    if (newItems.length === 0) {
      return res.status(400).json({ message: "All products are already in wishlist or invalid" });
    }

    wishlist.items.push(...newItems);
    await wishlist.save();

    res.json({ message: "Products added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await wishlist.save();
    res.json({ message: "Removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};

// Clear wishlist
const clearWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing wishlist", error });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};
