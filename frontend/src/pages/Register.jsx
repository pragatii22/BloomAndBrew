import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RegisterUser } from "../service/api";
import Input from "../components/Input";
import Button from "../components/Button";
import { Flower } from "lucide-react";
import registerImage from "../assets/images/register.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields 🌸");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match 🌸");
    }

    setLoading(true);
    try {
      const data = {
        name,
        email,
        password,
      };

      const response = await RegisterUser(data);
      toast.success(response.data.message || "Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/30 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-[32px] shadow-xl overflow-hidden grid lg:grid-cols-12 border border-pink-100/30">
        
        {/* Left side: Premium Floral Image */}
        <div className="hidden lg:block lg:col-span-6 relative bg-pink-50 overflow-hidden">
          <img
            src={registerImage}
            alt="Beautiful e-commerce flower backdrop"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-black/10" />
          <div className="absolute bottom-12 left-12 right-12 text-white space-y-3">
            <h2 className="font-serif text-4xl font-bold leading-tight drop-shadow-md">
              Join Our <br />
              Floral Community.
            </h2>
            <p className="text-white/90 text-sm max-w-sm drop-shadow">
              Create an account to track your orders, manage your cart, and enjoy members-only promotions.
            </p>
          </div>
        </div>

        {/* Right side: Modern Register Card */}
        <div className="col-span-12 lg:col-span-6 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform duration-300">
                <Flower size={18} className="fill-current" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-gray-800">
                Floral <span className="text-primary font-sans text-lg">Bloom</span>
              </span>
            </Link>

            <div className="space-y-2">
              <h1 className="font-serif text-4xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">
                Register today and bloom your gifting experience.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && register()}
              />

              <Button
                onClick={register}
                disabled={loading}
                className="w-full py-4 mt-4 font-bold shadow-pink-100 animate-fade-in"
              >
                {loading ? "Registering..." : "Create Account"}
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500 pt-4">
              Already have an account?
              <Link
                to="/login"
                className="text-primary hover:text-primary-hover font-semibold ml-1.5 underline underline-offset-4 decoration-pink-200"
              >
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;