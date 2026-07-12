import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Flower, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../service/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      api.get("/cart")
        .then((res) => {
          const cartItems = res.data.cart || res.data || [];
          const count = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
          setCartCount(count);
        })
        .catch(() => {});
    }
  }, [token]);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-pink-100/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform duration-300">
            <Flower size={22} className="fill-current" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-gray-800">
              Floral <span className="text-primary font-sans">Bloom</span>
            </span>
            <span className="text-[10px] block uppercase tracking-widest text-gray-400 font-semibold -mt-1">
              & Brew
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-600 font-medium">
          <Link
            to="/"
            className="hover:text-primary transition-colors duration-300 text-sm tracking-wide relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-primary transition-colors duration-300 text-sm tracking-wide relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Flowers
          </Link>
          <a
            href="#occasions"
            onClick={(e) => {
              if (window.location.pathname !== "/") {
                e.preventDefault();
                navigate("/?scroll=occasions");
              }
            }}
            className="hover:text-primary transition-colors duration-300 text-sm tracking-wide relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Occasions
          </a>
          <Link
            to="/contact"
            className="hover:text-primary transition-colors duration-300 text-sm tracking-wide relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link>
          {token && (
            <Link
              to="/orders"
              className="hover:text-primary transition-colors duration-300 text-sm tracking-wide relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Orders
            </Link>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          {token && (
            <Link to="/cart" className="relative group p-2 rounded-full hover:bg-pink-50 transition-colors duration-300">
              <ShoppingCart size={22} className="text-gray-700 group-hover:text-primary transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {!token ? (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors duration-300">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-primary-hover shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-sky-50 text-sky-600 border border-sky-100 text-xs uppercase font-extrabold px-3.5 py-1.5 rounded-full hover:bg-sky-100 transition-colors duration-300 shadow-sm"
                >
                  Admin Portal
                </Link>
              )}
              
              <div className="flex items-center gap-2 border-l pl-4 border-pink-100">
                <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-primary">
                  <User size={18} />
                </div>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all duration-300"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-gray-700 hover:bg-pink-50 rounded-xl transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-t border-pink-100 shadow-xl z-40 transition-all duration-300">
          <div className="flex flex-col p-6 gap-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-semibold text-base py-2 border-b border-pink-50 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-semibold text-base py-2 border-b border-pink-50 hover:text-primary transition-colors"
            >
              Flowers
            </Link>
            <a
              href="#occasions"
              onClick={(e) => {
                setMenuOpen(false);
                if (window.location.pathname !== "/") {
                  e.preventDefault();
                  navigate("/?scroll=occasions");
                }
              }}
              className="text-gray-700 font-semibold text-base py-2 border-b border-pink-50 hover:text-primary transition-colors"
            >
              Occasions
            </a>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-semibold text-base py-2 border-b border-pink-50 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            {token && (
              <>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-semibold text-base py-2 border-b border-pink-50 hover:text-primary transition-colors"
                >
                  My Orders
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-semibold text-base py-2 border-b border-pink-50 hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Shopping Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-primary text-white text-xs font-bold rounded-full px-2.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {!token ? (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="border border-pink-200 text-gray-700 rounded-full py-3 font-semibold text-center hover:bg-pink-50 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary text-white rounded-full py-3 font-semibold text-center hover:bg-primary-hover transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                {role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="bg-sky-50 text-sky-600 border border-sky-100 rounded-full py-3 font-semibold text-center hover:bg-sky-100 transition-colors duration-300"
                  >
                    Admin Portal
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="bg-red-500 text-white rounded-full py-3 font-semibold hover:bg-red-600 transition-colors duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;