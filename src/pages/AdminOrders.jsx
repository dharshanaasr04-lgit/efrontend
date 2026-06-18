import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customer Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "15px",
            }}
          >
            <h3>Order ID</h3>
            <p>{order._id}</p>

            <h4>Total Amount</h4>
            <p>₹{order.totalAmount}</p>

            <h4>Status</h4>
            <p>{order.status}</p>

            <h4>Customer</h4>
            <p>
              {order.user?.name ||
                "Unknown User"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;