import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://e-backend-peach.vercel.app/api/products/${id}`
        );

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://e-backend-peach.vercel.app/api/admin/product/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Updated");

      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Product</h1>

      <form onSubmit={updateProduct}>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <br /><br />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="image"
          value={product.image}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;