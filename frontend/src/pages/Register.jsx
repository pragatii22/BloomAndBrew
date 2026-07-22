import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, Lock } from "lucide-react";
import { RegisterUser } from "../service/api";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/auth/AuthLayout";
import AuthVisualPanel from "../components/auth/AuthVisualPanel";
import registerImage from "../assets/images/register.png";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword)
      return toast.error("Please fill all fields");
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await RegisterUser({ name: form.name, email: form.email, password: form.password });
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      visual={
        <AuthVisualPanel
          image={registerImage}
          tone="pink"
          title="Join our floral family"
          subtitle="Create an account to unlock same-day delivery, saved addresses and order tracking."
        />
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-heading">Create Account</h1>
        <p className="text-sm text-muted mt-1">Start your floral journey today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Your full name"
          value={form.name}
          onChange={set("name")}
          icon={User}
          required
        />
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
          placeholder="Minimum 6 characters"
          value={form.password}
          onChange={set("password")}
          icon={Lock}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={set("confirmPassword")}
          icon={Lock}
          required
        />

        <Button type="submit" size="lg" loading={loading} className="w-full mt-1">
          Register
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary-dark font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
