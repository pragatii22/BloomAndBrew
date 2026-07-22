import { useState } from "react";
import { Outlet } from "react-router-dom";
import { X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 animate-fade-in">
            <div className="relative h-full">
              <button
                onClick={() => setDrawerOpen(false)}
                className="absolute -right-10 top-4 text-white p-2"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
              <AdminSidebar onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 p-5 sm:p-8">
        <Outlet context={{ onMenuClick: () => setDrawerOpen(true) }} />
      </div>
    </div>
  );
};

export default AdminLayout;
