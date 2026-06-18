import api from "./axios";

// GET CART
export const getCart = () => api.get("/cart");

// ADD ITEM
export const addToCart = (productId) =>
  api.post("/cart/add", { productId });

// DECREASE QTY
export const decreaseQty = (productId) =>
  api.post("/cart/decrease", { productId });

// REMOVE ITEM
export const removeFromCart = (productId) =>
  api.post("/cart/remove", { productId });