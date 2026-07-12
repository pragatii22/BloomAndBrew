import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// AUTH
export const LoginUser = (data) => api.post("/users/login", data);
export const RegisterUser = (data) => api.post("/users/register", data);

// PRODUCTS
export const getProducts = () => api.get("/products");

// CART
export const addToCart = (data) => api.post("/cart/add", data);
export const getCart = () => api.get("/cart");
export const removeFromCart = (id) => api.delete(`/cart/${id}`);

// ORDERS
export const checkout = (data) => api.post("/orders/checkout", data);
export const getOrders = () => api.get("/orders");

export default api;