import express from "express";
import auth from "../middleware/auth";
import Order from "../models/Order";
import User from "../models/User";

const router = express.Router();

router.post("/checkout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = user.cart.reduce((sum, item) => {
      if (!item.productId) return sum;
      return sum + item.productId.price * item.quantity;
    }, 0);

    const order = await Order.create({
      userId: user._id,
      items: user.cart,
      totalPrice: total,
      status: "Processing",
    });

    user.cart = [];
    await user.save();

    res.status(200).json(order);
  } catch (err) {
    console.log("CHECKOUT ERROR:", err);
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
});