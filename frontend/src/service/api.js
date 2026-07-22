// ── Axios instance + named API helpers ──
// Token stored as raw JWT; this interceptor adds "Bearer " prefix automatically.
// Backend login returns: { token: "Bearer <jwt>", user: {...} }
// We strip the "Bearer " prefix before storing in localStorage.

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Expired/invalid tokens get a clean, centralized logout instead of every
// page having to detect and handle 401s on its own.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Uploaded product images are served from the backend's /uploads path —
// centralized here so no page hardcodes the server URL. Missing filenames
// resolve to "" so <ProductImage>'s onError fallback takes over instead of
// requesting a placeholder route that doesn't exist on this server.
export const getImageUrl = (filename) =>
  filename ? `${API_BASE_URL}/uploads/${filename}` : "";

// ── Auth ──
export const LoginUser    = (data) => api.post("/users/login",    data);
export const RegisterUser = (data) => api.post("/users/register", data);

// ── Products ──
export const getProducts    = ()     => api.get("/products");
export const getProductById = (id)   => api.get(`/products/${id}`);
export const addProduct     = (data) => api.post("/products/add",   data); // FormData
export const updateProduct  = (id, data) => api.put(`/products/${id}`, data); // FormData
export const deleteProduct  = (id)   => api.delete(`/products/${id}`);

// ── Cart ──
export const getCart       = ()     => api.get("/cart");
export const addToCart     = (data) => api.post("/cart/add",   data); // { product_id, quantity }
export const removeFromCart = (cartId) => api.delete(`/cart/${cartId}`);

// ── Orders ──
export const placeOrder = (data) => api.post("/orders/checkout", data);
export const getOrders  = ()     => api.get("/orders");
export const getAllOrdersAdmin = () => api.get("/orders/admin/all");
export const updateOrderStatus = (id, status) => api.patch(`/orders/admin/${id}/status`, { status });

// ── Admin ──
export const getAdminStats = () => api.get("/admin/stats");

// ── Contact ──
export const sendContactMessage = (data) => api.post("/contact", data);

export default api;
