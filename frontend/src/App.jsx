import { Routes, Route, Navigate } from "react-router-dom";

import StoreLayout from "./components/layout/StoreLayout";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminLogin from "./pages/AdminLogin";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import OrderTracking from "./pages/OrderTracking";
import Contact from "./pages/Contact";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

import CheckoutLayout from "./pages/checkout/CheckoutLayout";
import AddressStep from "./pages/checkout/AddressStep";
import PaymentStep from "./pages/checkout/PaymentStep";
import ReviewStep from "./pages/checkout/ReviewStep";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";

import ProtectedRoute from "./service/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Storefront (Navbar + Footer) */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="address" replace />} />
          <Route path="address" element={<AddressStep />} />
          <Route path="payment" element={<PaymentStep />} />
          <Route path="review" element={<ReviewStep />} />
        </Route>

        <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />

        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path="/orders/:id/tracking" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth (standalone, no store chrome) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<AdminAddProduct />} />
        <Route path="products/:id/edit" element={<AdminEditProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
