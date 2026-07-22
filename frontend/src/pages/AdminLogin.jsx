import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { LoginUser } from "../service/api";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/auth/AuthLayout";
import AuthVisualPanel from "../components/auth/AuthVisualPanel";
import { useAuth } from "../context/useAuth";
import roseImage from "../assets/images/rose.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Please fill all fields");

    setLoading(true);
    try {
      const res = await LoginUser(form);
      const { token, user } = res.data;

      if (user.role !== "admin") {
        toast.error("Administrator access required");
        return;
      }

      const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
      login(raw, user);
      toast.success(`Welcome back, ${user.name}!`);
      navigate("/admin");
    } catch (err) {
      logout({ silent: true, redirect: false });
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      visual={
        <AuthVisualPanel
          image={roseImage}
          tone="blue"
          title="Admin Panel"
          subtitle="Manage products, orders and store performance for Floral Bloom & Brew."
        />
      }
    >
      <div className="mb-6 flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-navy text-white flex items-center justify-center shrink-0">
          <ShieldCheck size={18} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-heading">Admin Panel</h1>
          <p className="text-sm text-muted">Restricted access</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="admin@floralbloom.com"
          value={form.email}
          onChange={set("email")}
          icon={Mail}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={set("password")}
          icon={Lock}
          required
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs font-semibold text-primary-dark hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" size="lg" loading={loading} className="w-full">
          Login
        </Button>
      </form>

      <p className="text-center text-xs text-muted mt-6">
        Not an admin?{" "}
        <Link to="/login" className="text-primary-dark font-semibold hover:underline">
          Go to customer login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default AdminLogin;
