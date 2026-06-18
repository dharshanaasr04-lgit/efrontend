import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Layout({ children }) {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const cartCount =
    cart?.reduce((t, i) => t + (i.quantity || 0), 0) ;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
        }}
      >
        {/* LOGO */}
        <h2
          style={{
            cursor: "pointer",
            margin: 0,
            color: "#ff9900",
          }}
          onClick={() => navigate("/")}
        >
          ShopZone
        </h2>

        {/* RIGHT SECTION (ALL LINKS MOVED HERE) */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "14px",
          }}
        >
          {/* LINKS */}
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
          >
            Products
          </Link>

          <Link
            to="/orders"
            style={{ color: "white", textDecoration: "none" }}
          >
            Orders
          </Link>

          {/* USER */}
          <div style={{ fontSize: "13px", marginLeft: "10px" }}>
            {user ? (
              <>
                <div>Hello</div>
                <strong>{user.name}</strong>
              </>
            ) : (
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
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
            }}
          >
            🛒 Cart ({cartCount})
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
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div>{children}</div>
    </>
  );
}