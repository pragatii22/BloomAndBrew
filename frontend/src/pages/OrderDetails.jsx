import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, MapPin, Phone, Wallet, Navigation } from "lucide-react";
import Loader from "../components/ui/Loader";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ProductImage from "../components/store/ProductImage";
import { getOrders } from "../service/api";
import { STATUS_META } from "../lib/orderStatus";

const PAYMENT_LABELS = { cod: "Cash on Delivery", stripe: "Online Payment" };

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((res) => setOrder((res.data.orders || []).find((o) => String(o.id) === String(id)) || null))
      .catch(() => toast.error("Couldn't load order"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullscreen text="Loading order…" />;

  if (!order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold text-heading">Order Not Found</h1>
        <Link to="/orders"><Button>Back to Orders</Button></Link>
      </div>
    );
  }

  const status = STATUS_META[order.status] || STATUS_META.pending;
  const date = new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <Link to="/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary-dark mb-6">
        <ArrowLeft size={15} /> Back to Orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-heading">Order #{order.id}</h1>
          <p className="text-xs text-muted mt-1">Placed on {date}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone={status.tone}>{status.label}</Badge>
          <Link to={`/orders/${order.id}/tracking`}>
            <Button variant="outline-secondary" size="sm" className="flex items-center gap-1.5">
              <Navigation size={13} /> Track Order
            </Button>
          </Link>
        </div>
      </div>

      <Card padding="p-6" className="space-y-5 mb-6">
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-primary-dark shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">Address</p>
              <p className="text-heading">{order.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone size={16} className="text-primary-dark shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">Phone</p>
              <p className="text-heading">{order.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Wallet size={16} className="text-primary-dark shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">Payment</p>
              <p className="text-heading">{PAYMENT_LABELS[order.payment_method] || order.payment_method}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card padding="p-6" className="space-y-1">
        <h2 className="text-sm font-bold text-heading pb-3 border-b border-border mb-3">Items</h2>
        <div className="divide-y divide-border">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-3">
              <div className="w-12 h-12 rounded-md overflow-hidden border border-border shrink-0">
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
      </Card>
    </div>
  );
};

export default OrderDetails;
