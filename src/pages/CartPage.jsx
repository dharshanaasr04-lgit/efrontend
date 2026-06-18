import { useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  decreaseQty,
  removeFromCart,
} from "../api/cart";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.log("Cart load error:", err);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await getCart();
        if (mounted) setCart(res.data);
      } catch (err) {
        console.log("Cart load error:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/orders/checkout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully");

      setCart([]);
      navigate("/orders");
    } catch (err) {
      console.log("Checkout error:", err.response?.data || err.message);
      alert("Checkout failed");
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.productId._id}
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
              }}
            >
              <img src={item.productId.image} width="80" />

              <div style={{ flex: 1 }}>
                <h3>{item.productId.name}</h3>
                <p>₹{item.productId.price}</p>

                <div>
                  <button
                    onClick={async () => {
                      await decreaseQty(item.productId._id);
                      loadCart();
                    }}
                  >
                    -
                  </button>

                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={async () => {
                      await addToCart(item.productId._id);
                      loadCart();
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={async () => {
                  await removeFromCart(item.productId._id);
                  loadCart();
                }}
                style={{ color: "red" }}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <h2>Total: ₹{total}</h2>

            <button
              onClick={handleCheckout}
              style={{
                padding: "10px",
                background: "green",
                color: "white",
                width: "100%",
                border: "none",
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;