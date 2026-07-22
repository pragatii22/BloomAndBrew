import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { Package, ClipboardList, Users, Wallet, Clock } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import StatCard from "../../components/admin/StatCard";
import OrderTable from "../../components/admin/OrderTable";
import Loader from "../../components/ui/Loader";
import Card from "../../components/ui/Card";
import { getAdminStats, getAllOrdersAdmin } from "../../service/api";

const AdminDashboard = () => {
  const { onMenuClick } = useOutletContext();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminStats(), getAllOrdersAdmin()])
      .then(([statsRes, ordersRes]) => {
        setStats(statsRes.data);
        setRecentOrders((ordersRes.data.orders || []).slice(0, 5));
      })
      .catch(() => toast.error("Failed to load dashboard stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullscreen text="Loading dashboard…" />;

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Store overview" onMenuClick={onMenuClick} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Orders" value={stats?.totalOrders ?? 0} icon={ClipboardList} tone="pink" />
        <StatCard label="Total Products" value={stats?.totalProducts ?? 0} icon={Package} tone="blue" />
        <StatCard label="Total Users" value={stats?.totalUsers ?? 0} icon={Users} tone="green" />
        <StatCard label="Revenue" value={`Rs. ${Number(stats?.revenue ?? 0).toLocaleString()}`} icon={Wallet} tone="amber" />
      </div>

      <Card padding="p-5" className="mb-6 flex items-center gap-4">
        <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Clock size={20} />
        </div>
        <div>
          <p className="text-2xl font-bold text-heading">{stats?.pendingOrders ?? 0}</p>
          <p className="text-xs text-muted">orders awaiting confirmation</p>
        </div>
      </Card>

      <Card padding="p-5 sm:p-6">
        <h3 className="text-sm font-bold text-heading mb-4">Recent Orders</h3>
        <OrderTable orders={recentOrders} />
      </Card>
    </>
  );
};

export default AdminDashboard;
