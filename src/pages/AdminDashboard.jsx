import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://e-backend-peach.vercel.app/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#131921",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>ShopZone Admin</h2>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Link
  to="/admin"
  style={{
    color: "#ff9900",
    textDecoration: "none",
    fontWeight: "bold",
  }}
>
  Dashboard
</Link>

<Link
  to="/admin/products"
  style={{
    color: "#ff9900",
    textDecoration: "none",
    fontWeight: "bold",
  }}
>
  Products
</Link>

<Link
  to="/admin/orders"
  style={{
    color: "#ff9900",
    textDecoration: "none",
    fontWeight: "bold",
  }}
>
  Orders
</Link>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f4f4f4",
        }}
      >
        <h1>Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "25px",
            flexWrap: "wrap",
          }}
        >
          <div style={cardStyle}>
            <h3>Total Products</h3>
            <h1>{stats.totalProducts}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Orders</h3>
            <h1>{stats.totalOrders}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Revenue</h3>
            <h1>₹{stats.totalRevenue}</h1>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Quick Actions</h2>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              gap: "10px",
            }}
          >
            <Link to="/admin/products">
              <button
  style={{
    background: "#ff9900",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Manage Products
</button>
  
            </Link>

            <Link to="/admin/orders">
              <button
  style={{
    background: "#ff9900",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  View Orders
</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  width: "250px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

export default AdminDashboard;