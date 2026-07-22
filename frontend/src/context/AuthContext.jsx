import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "./authContextInstance";

const readUser = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  if (!token) return null;
  return { token, role, name };
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(readUser);

  const login = useCallback((token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("name", userData.name);
    setUser({ token, role: userData.role, name: userData.name });
  }, []);

  const logout = useCallback(({ silent = false, redirect = true } = {}) => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setUser(null);
    window.dispatchEvent(new Event("cartUpdated"));
    if (!silent) toast.success("Logged out successfully");
    if (redirect) navigate("/login");
  }, [navigate]);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
