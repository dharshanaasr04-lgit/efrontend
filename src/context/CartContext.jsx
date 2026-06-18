/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  // Load cart only when user is authenticated
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await api.get("/cart");
        setCart(res.data);
      } catch (err) {
        console.log("Cart load error:", err);
      }
    };

    if (user) {
      loadCart();
    }
  }, [user]);

  // ADD
  const addToCart = async (productId) => {
    try {
      const res = await api.post("/cart/add", { productId });
      setCart(res.data); // 🔥 instant sync
    } catch (err) {
      console.log(err);
    }
  };

  // DECREASE
  const decreaseQty = async (productId) => {
    try {
      const res = await api.post("/cart/decrease", { productId });
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // REMOVE
  const removeFromCart = async (productId) => {
    try {
      const res = await api.post("/cart/remove", { productId });
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        decreaseQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}