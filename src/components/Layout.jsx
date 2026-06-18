import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaBox,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function Layout({ children }) {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const cartCount =
    cart?.reduce((t, i) => t + (i?.quantity || 0), 0) || 0;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#ff9900" : "white",
    textDecoration: "none",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  });

  return (
    <>
      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 20px",
          background: "#131921",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {/* LOGO */}
        <h2
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            margin: 0,
            color: "#ff9900",
            letterSpacing: "1px",
          }}
        >
          ShopZone
        </h2>

        {/* NAV LINKS */}
        <div
          style={{
            marginLeft: "40px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <NavLink to="/" style={linkStyle}>
            <FaBox /> Products
          </NavLink>

          <NavLink to="/orders" style={linkStyle}>
            <FaBox /> Orders
          </NavLink>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {/* USER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
            }}
          >
            <FaUser />
            {user ? (
              <div>
                <div style={{ fontSize: "11px", opacity: 0.7 }}>
                  Hello
                </div>
                <strong>{user.name}</strong>
              </div>
            ) : (
              <NavLink to="/login" style={linkStyle}>
                Login
              </NavLink>
            )}
          </div>

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            style={{
              cursor: "pointer",
              background: "#ff9900",
              color: "black",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FaShoppingCart />
            Cart ({cartCount})
          </div>

          {/* LOGOUT */}
          {user && (
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "1px solid #ff9900",
                color: "#ff9900",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>

      {/* PAGE */}
      <div>{children}</div>
    </>
  );
}