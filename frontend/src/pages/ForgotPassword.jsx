import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/auth/AuthLayout";
import AuthVisualPanel from "../components/auth/AuthVisualPanel";
import bouquetImage from "../assets/images/bouquet.png";

// The backend has no password-reset endpoint yet, so this page is an honest
// informational state rather than a fake "email sent" success message.
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthLayout
      visual={
        <AuthVisualPanel
          image={bouquetImage}
          tone="blue"
          title="Forgot your password?"
          subtitle="No worries — password reset is coming soon. For now, please reach out to support."
        />
      }
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-heading">Reset Password</h1>
        <p className="text-sm text-muted mt-1">Enter your account email address</p>
      </div>

      {submitted ? (
        <div className="rounded-lg border border-secondary/40 bg-soft-blue p-4 text-sm text-navy leading-relaxed">
          Password reset isn't set up on this server yet. Please contact
          <span className="font-semibold"> hello@floralbloom.com</span> and our team will help you
          regain access manually.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />
          <Button type="submit" size="lg" className="w-full">
            Send Reset Link
          </Button>
        </form>
      )}

      <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm text-muted hover:text-primary-dark mt-6 font-medium">
        <ArrowLeft size={14} /> Back to Login
      </Link>
    </AuthLayout>
  );
};

export default ForgotPassword;
