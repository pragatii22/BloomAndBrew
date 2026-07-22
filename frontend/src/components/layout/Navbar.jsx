import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Menu, X, LogOut, Package, LayoutDashboard } from "lucide-react";
import { getCart } from "../../service/api";
import { useAuth } from "../../context/useAuth";
import logo from "../../assets/images/logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const userMenuRef = useRef(null);

  // cartCount is only ever rendered when isAuthenticated is true (see badge
  // below), so there's no need to reset it to 0 synchronously on logout.
  useEffect(() => {
    if (!isAuthenticated) return;
    getCart()
      .then((res) => {
        const items = res.data.cart || [];
        setCartCount(items.reduce((s, i) => s + (i.quantity || 1), 0));
      })
      .catch(() => {});
  }, [isAuthenticated]);

  useEffect(() => {
    const onCartUpdated = () => {
      if (!isAuthenticated) return;
      getCart()
        .then((res) => {
          const items = res.data.cart || [];
          setCartCount(items.reduce((s, i) => s + (i.quantity || 1), 0));
        })
        .catch(() => {});
    };
    window.addEventListener("cartUpdated", onCartUpdated);
    return () => window.removeEventListener("cartUpdated", onCartUpdated);
  }, [isAuthenticated]);

  useEffect(() => {
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    setUserMenuOpen(false);
    setMenuOpen(false);
    logout();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(search.trim() ? `/products?search=${encodeURIComponent(search.trim())}` : "/products");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-heading text-base font-bold text-heading tracking-tight leading-none">
            Floral Bloom <span className="text-primary-dark">&amp; Brew</span>
          </span>
        </Link>

        {/* Desktop center nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-body">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-primary-dark transition-colors">
              {l.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link to="/orders" className="hover:text-primary-dark transition-colors">My Orders</Link>
          )}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onBlur={() => !search && setSearchOpen(false)}
                  placeholder="Search flowers…"
                  className="w-40 md:w-56 border border-border rounded-md text-sm px-3 py-1.5 outline-none focus:border-primary-dark"
                />
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-body hover:text-primary-dark hover:bg-soft-pink rounded-md transition-colors"
                aria-label="Search"
              >
                <Search size={19} />
              </button>
            )}
          </div>

          <button className="p-2 text-body hover:text-primary-dark hover:bg-soft-pink rounded-md transition-colors hidden sm:inline-flex" aria-label="Wishlist">
            <Heart size={19} />
          </button>

          <Link to="/cart" className="relative p-2 text-body hover:text-primary-dark hover:bg-soft-pink rounded-md transition-colors" aria-label="Cart">
            <ShoppingCart size={19} />
            {isAuthenticated && cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-primary-dark text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          <div className="relative hidden sm:block" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="p-2 text-body hover:text-primary-dark hover:bg-soft-pink rounded-md transition-colors"
              aria-label="Account"
            >
              <User size={19} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 card rounded-lg py-2 animate-scale-in">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b border-border mb-1">
                      <p className="text-sm font-semibold text-heading truncate">{user?.name}</p>
                    </div>
                    <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-background">
                      <Package size={15} /> My Orders
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-background">
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                      <LogOut size={15} /> Logout
                    </button>
                  </>
                ) : (
                  <div className="px-3 py-1 flex flex-col gap-2">
                    <Link to="/login" onClick={() => setUserMenuOpen(false)} className="text-center text-sm font-semibold py-2 rounded-md border border-border hover:bg-background">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setUserMenuOpen(false)} className="text-center text-sm font-semibold py-2 rounded-md bg-primary text-navy hover:bg-primary-hover">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-body hover:bg-soft-pink rounded-md transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pb-5 pt-3 space-y-1 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flowers…"
              className="w-full border border-border rounded-md text-sm px-3 py-2 outline-none focus:border-primary-dark"
            />
          </form>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-2 rounded-md font-medium text-body hover:bg-background hover:text-primary-dark transition-colors"
            >
              {l.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="pt-2 space-y-1 border-t border-border mt-2">
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 rounded-md font-medium text-body hover:bg-background">
                My Orders
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="block py-2.5 px-2 rounded-md font-medium text-secondary-dark hover:bg-soft-blue">
                  Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="w-full text-left py-2.5 px-2 rounded-md font-medium text-red-500 hover:bg-red-50">
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 flex flex-col gap-2 border-t border-border mt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-center py-2.5 rounded-md border border-border font-semibold hover:bg-background">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block text-center py-2.5 rounded-md bg-primary text-navy font-semibold hover:bg-primary-hover">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
