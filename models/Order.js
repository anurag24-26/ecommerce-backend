const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: String,
    totalPrice: Number,
    discountApplied: { type: Number, default: 0 }, // ✅ Tracks discount amount applied to order
    finalPrice: Number, // ✅ Stores final amount after discount
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing", // ✅ Adds order tracking status
    },
    transactionId: { type: String, default: "" }, // ✅ Stores transaction details
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
