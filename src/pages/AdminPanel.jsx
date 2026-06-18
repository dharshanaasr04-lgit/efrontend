import { Link } from "react-router-dom";

function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>

      <Link to="/admin">Dashboard</Link>
      <br />

      <Link to="/admin/products">
        Products
      </Link>
      <br />

      <Link to="/admin/add-product">
        Add Product
      </Link>
      <br />

      <Link to="/admin/orders">
        Orders
      </Link>
    </div>
  );
}

export default AdminPanel;