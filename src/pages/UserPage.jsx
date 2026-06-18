import { FaUserCircle } from "react-icons/fa";

export default function UserPage() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <FaUserCircle size={100} />

      <h1>User Profile</h1>

      <hr />

      <h3>Name</h3>
      <p>{user.name || "Guest User"}</p>

      <h3>Email</h3>
      <p>{user.email || "Not Available"}</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}