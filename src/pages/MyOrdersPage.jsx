import { useEffect, useState } from "react";
import axios from "axios";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://e-backend-peach.vercel.app/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.log("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <h2>Loading orders...</h2>;

  if (orders.length === 0) return <h2>No orders found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "20px",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Order ID: {order._id}</h3>
          <p>Status: {order.status || "Placed"}</p>
          <p>Total: ₹{order.total}</p>

          <h4>Products:</h4>

          {order.items.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "10px", marginTop: "10px" }}
            >
              <img
                src={item.productId.image}
                width="50"
                height="50"
                alt=""
              />

              <div>
                <p>{item.productId.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.productId.price}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrdersPage;