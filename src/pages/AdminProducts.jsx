import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Deleted");
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchProducts();
    };

    init();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Products</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin/add-product">
          <button>Add New Product</button>
        </Link>
      </div>

      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  width="70"
                  height="70"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </td>

              <td>{product.name}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <Link
                  to={`/admin/edit-product/${product._id}`}
                >
                  <button>Edit</button>
                </Link>
              </td>

              <td>
                <button
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;