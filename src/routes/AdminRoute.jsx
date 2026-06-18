import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h3>Loading...</h3>;

  if (!user || user.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
}