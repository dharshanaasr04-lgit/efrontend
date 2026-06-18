import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

import MyOrdersPage from "./pages/MyOrdersPage";
import AdminPanel from "./pages/AddProduct";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import ProductDetail from "./pages/ProductDetail";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminEditProduct from "./pages/AdminEditProduct";
import RegisterPage from "./pages/RegisterPage";
import "./styles/App.css";




function App() {
  return (
    <Layout>
      <Routes>

        <Route path="/" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/add-product" element={<AddProduct />} />
<Route path="/admin/orders" element={<AdminOrders />} />
<Route path="/register" element={<RegisterPage/>} />
        
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
  path="/admin/edit-product/:id"
  element={
    <AdminRoute>
      <AdminEditProduct />
    </AdminRoute>
  }
/>

      </Routes>
    </Layout>
  );
}

export default App;