import { useEffect, useState } from "react";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
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
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id}>
          <h4>Order ID: {order._id}</h4>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;