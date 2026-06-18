import { Router } from "express";
import auth from "../middleware/auth";
import User from "../models/User";
import Order from "../models/Order";
const router = Router();

router.post("/checkout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(user.cart) || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    const items = user.cart
      .filter(item => item.productId)
      .map(item => {
        const price = item.productId.price || 0;
        total += price * item.quantity;

        return {
          productId: item.productId._id,
          quantity: item.quantity,
          price,
        };
      });

    if (items.length === 0) {
      return res.status(400).json({ message: "Invalid cart items" });
    }

    const order = await Order.create({
      userId: user._id,
      items,
      totalPrice: total,
      status: "Processing",
    });

    user.cart = [];
    await user.save();

    return res.status(200).json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    console.log("CHECKOUT ERROR:", err);
    return res.status(500).json({
      message: "Checkout failed",
      error: err.message,
    });
  }
});
export default CheckoutPage;