import { Menu } from "lucide-react";

const AdminHeader = ({ title, subtitle, onMenuClick, action }) => (
  <header className="flex items-center justify-between gap-4 mb-6">
    <div className="flex items-center gap-3">
      <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-heading">
        <Menu size={20} />
      </button>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-heading">{title}</h1>
        {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {action}
  </header>
);

export default AdminHeader;
