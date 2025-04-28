const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user._id,
      items: cart.items,
      totalPrice,
    });

    await order.save();
    await Cart.findOneAndDelete({ user: req.user._id }); // Clear cart after order

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

module.exports = { createOrder };
