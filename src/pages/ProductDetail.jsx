import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { addToCart } from "../api/cart";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="detail">
      <img src={product.image} />

      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>₹{product.price}</h2>

        <button
          className="btn"
          onClick={() => {
            addToCart(product._id);
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;