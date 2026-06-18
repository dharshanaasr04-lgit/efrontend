import axios from "axios";

const api = axios.create({
  baseURL: "https://e-backend-peach.vercel.app/api",
});

// attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// handle auth failures globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // force login reset
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;