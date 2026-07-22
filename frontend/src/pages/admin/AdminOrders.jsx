import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import AdminHeader from "../../components/admin/AdminHeader";
import OrderTable from "../../components/admin/OrderTable";
import Loader from "../../components/ui/Loader";
import Card from "../../components/ui/Card";
import { getAllOrdersAdmin } from "../../service/api";

const ORDER_STATUSES = ["pending", "confirmed", "processing", "delivered", "cancelled"];

const AdminOrders = () => {
  const { onMenuClick } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    getAllOrdersAdmin()
      .then((res) => setOrders(res.data.orders || []))
      .catch(() => toast.error("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <>
      <AdminHeader title="Manage Orders" subtitle={`${filtered.length} order${filtered.length !== 1 ? "s" : ""}`} onMenuClick={onMenuClick} />

      <Card padding="p-5 sm:p-6" className="space-y-5">
        <div className="flex gap-2 flex-wrap">
          {["all", ...ORDER_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold border capitalize transition-colors ${
                statusFilter === s ? "bg-primary text-navy border-primary" : "bg-white text-body border-border hover:border-primary-dark"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? <Loader text="Loading orders…" /> : <OrderTable orders={filtered} />}
      </Card>
    </>
  );
};

export default AdminOrders;
