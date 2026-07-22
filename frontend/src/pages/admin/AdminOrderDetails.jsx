import { useEffect, useState } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, MapPin, Phone, Mail, Wallet } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import OrderStatusBadge from "../../components/admin/OrderStatusBadge";
import Loader from "../../components/ui/Loader";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import ProductImage from "../../components/store/ProductImage";
import { getAllOrdersAdmin, updateOrderStatus } from "../../service/api";

const ORDER_STATUSES = ["pending", "confirmed", "processing", "delivered", "cancelled"];
const PAYMENT_LABELS = { cod: "Cash on Delivery", stripe: "Online Payment" };

const AdminOrderDetails = () => {
  const { onMenuClick } = useOutletContext();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getAllOrdersAdmin()
      .then((res) => setOrder((res.data.orders || []).find((o) => String(o.id) === String(id)) || null))
      .catch(() => toast.error("Failed to load order"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status) => {
    setUpdating(true);
    try {
      await updateOrderStatus(order.id, status);
      setOrder((prev) => ({ ...prev, status }));
      toast.success(`Order #${order.id} marked as ${status}`);
    } catch {
      toast.error("Could not update order status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader fullscreen text="Loading order…" />;

  if (!order) {
    return (
      <>
        <AdminHeader title="Order Not Found" onMenuClick={onMenuClick} />
        <Link to="/admin/orders" className="text-primary-dark font-semibold text-sm">Back to Orders</Link>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title={`Order #${order.id}`}
        subtitle={new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        onMenuClick={onMenuClick}
        action={<OrderStatusBadge status={order.status} />}
      />

      <Link to="/admin/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary-dark mb-5">
        <ArrowLeft size={15} /> Back to Orders
      </Link>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card padding="p-6" className="lg:col-span-2 space-y-5">
          <h2 className="text-sm font-bold text-heading pb-3 border-b border-border">Customer &amp; Delivery</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">Customer</p>
              <p className="text-heading">{order.customer_name}</p>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={14} className="text-primary-dark shrink-0 mt-0.5" />
              <p className="text-heading">{order.customer_email}</p>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={14} className="text-primary-dark shrink-0 mt-0.5" />
              <p className="text-heading">{order.phone}</p>
            </div>
            <div className="flex items-start gap-2">
              <Wallet size={14} className="text-primary-dark shrink-0 mt-0.5" />
              <p className="text-heading">{PAYMENT_LABELS[order.payment_method] || order.payment_method}</p>
            </div>
            <div className="flex items-start gap-2 sm:col-span-2">
              <MapPin size={14} className="text-primary-dark shrink-0 mt-0.5" />
              <p className="text-heading">{order.address}</p>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-bold text-heading pb-3 border-b border-border mb-3">Items</h3>
            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <div className="w-11 h-11 rounded-md overflow-hidden border border-border shrink-0">
                    <ProductImage image={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-heading truncate">{item.name}</span>
                  <span className="text-xs text-muted">Rs. {Number(item.price).toLocaleString()} × {item.quantity}</span>
                  <span className="text-sm font-semibold text-heading w-24 text-right">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4 border-t border-border mt-2">
              <span className="text-sm font-bold text-heading">Order Total</span>
              <span className="text-lg font-bold text-primary-dark">Rs. {Number(order.total).toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card padding="p-6" className="space-y-3 h-fit">
          <h2 className="text-sm font-bold text-heading pb-3 border-b border-border">Update Status</h2>
          <Select value={order.status} onChange={(e) => handleStatusChange(e.target.value)} disabled={updating}>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </Select>
          <p className="text-xs text-muted">Updating status notifies nothing automatically — it's reflected here and in the customer's order history.</p>
        </Card>
      </div>
    </>
  );
};

export default AdminOrderDetails;
