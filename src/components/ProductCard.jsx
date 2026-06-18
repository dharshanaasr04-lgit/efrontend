import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "220px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() =>
          navigate(`/product/${product._id}`)
        }
      />

      {/* NAME */}
      <h4 style={{ margin: "10px 0 5px" }}>
        {product.name}
      </h4>

      {/* PRICE */}
      <p style={{ margin: "0 0 10px" }}>
        ₹{product.price}
      </p>

      {/* BUTTONS */}
      <button
        onClick={() => addToCart(product._id)}
        style={{
          width: "100%",
          padding: "8px",
          background: "#ff9900",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}