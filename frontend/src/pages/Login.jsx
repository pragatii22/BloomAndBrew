import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { LoginUser } from "../service/api";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/auth/AuthLayout";
import AuthVisualPanel from "../components/auth/AuthVisualPanel";
import { useAuth } from "../context/useAuth";
import lilyImage from "../assets/images/lily.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
      login(raw, user);

      toast.success(`Welcome back, ${user.name}!`);
      navigate(user.role === "admin" ? "/admin" : "/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      visual={
        <AuthVisualPanel
          image={lilyImage}
          tone="blue"
          title="Welcome back to Bloom & Brew"
          subtitle="Sign in to pick up where you left off, track orders and reorder your favourite arrangements."
        />
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-heading">Welcome Back!</h1>
        <p className="text-sm text-muted mt-1">Login to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
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

      <p className="text-center text-sm text-muted mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary-dark font-semibold hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
