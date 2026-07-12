import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginUser } from "../service/api";
import Input from "../components/Input";
import Button from "../components/Button";
import { Flower } from "lucide-react";
import loginImage from "../assets/images/login.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields 🌸");
    }

    setLoading(true);
    try {
      const data = { email, password };
      const response = await LoginUser(data);

      // Handle token splitting to prevent Bearer Bearer issue
      const fullToken = response.data.token;
      const rawToken = fullToken.startsWith("Bearer ") 
        ? fullToken.split(" ")[1] 
        : fullToken;

      localStorage.setItem("token", rawToken);
      localStorage.setItem("role", response.data.user.role);

      toast.success(response.data.message || "Logged in successfully! 🌸");

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed. Please check your credentials."
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
            src={loginImage}
            alt="Beautiful e-commerce flower backdrop"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-black/10" />
          <div className="absolute bottom-12 left-12 right-12 text-white space-y-3">
            <h2 className="font-serif text-4xl font-bold leading-tight drop-shadow-md">
              Fresh Blooms, <br />
              Delivered Daily.
            </h2>
            <p className="text-white/90 text-sm max-w-sm drop-shadow">
              Step into a world of curated luxury floral arrangements handpicked for your special celebrations.
            </p>
          </div>
        </div>

        {/* Right side: Modern Login Card */}
        <div className="col-span-12 lg:col-span-6 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-8">
            
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
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm">
                Login to access your orders, cart, and exclusive floral member offers.
              </p>
            </div>

            <div className="space-y-5 pt-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()}
                />
                <div className="flex justify-end pt-1">
                  <Link
                    to="/forgot-password"
                    onClick={(e) => { e.preventDefault(); toast.success("Feature coming soon! 🌸"); }}
                    className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <Button
                onClick={login}
                disabled={loading}
                className="w-full py-4 mt-4 font-bold shadow-pink-100"
              >
                {loading ? "Logging in..." : "Sign In"}
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500 pt-6">
              Don't have an account?
              <Link
                to="/register"
                className="text-primary hover:text-primary-hover font-semibold ml-1.5 underline underline-offset-4 decoration-pink-200"
              >
                Register Account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;