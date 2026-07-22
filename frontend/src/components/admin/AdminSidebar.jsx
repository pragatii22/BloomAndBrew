import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Package, ClipboardList, LogOut, ArrowLeft, Flower2 } from "lucide-react";
import { useAuth } from "../../context/useAuth";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
];

const AdminSidebar = ({ onNavigate }) => {
  const { logout } = useAuth();

  return (
    <div className="h-full w-64 bg-navy text-white flex flex-col justify-between shrink-0">
      <div>
        <Link to="/admin" onClick={onNavigate} className="flex items-center gap-2.5 px-6 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-primary text-navy flex items-center justify-center shrink-0">
            <Flower2 size={16} />
          </div>
          <span className="font-heading text-sm font-bold leading-tight">Floral Bloom &amp; Brew</span>
        </Link>

        <nav className="p-4 space-y-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-navy font-semibold" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <l.icon size={17} />
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeft size={17} /> Return to Store
        </Link>
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
