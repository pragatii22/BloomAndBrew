import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Check, MapPin, XCircle } from "lucide-react";
import Loader from "../components/ui/Loader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getOrders } from "../service/api";
import { TRACKING_STEPS, trackingIndex } from "../lib/orderStatus";

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((res) => setOrder((res.data.orders || []).find((o) => String(o.id) === String(id)) || null))
      .catch(() => toast.error("Couldn't load order"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullscreen text="Loading tracking…" />;

  if (!order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold text-heading">Order Not Found</h1>
        <Link to="/orders"><Button>Back to Orders</Button></Link>
      </div>
    );
  }

  const cancelled = order.status === "cancelled";
  const activeIndex = trackingIndex(order.status);

  return (
    <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <Link to={`/orders/${order.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary-dark mb-6">
        <ArrowLeft size={15} /> Back to Order
      </Link>

      <h1 className="text-2xl font-bold text-heading mb-1">Track Order #{order.id}</h1>
      <p className="text-sm text-muted mb-6">Delivering to {order.address}</p>

      <Card padding="p-6 sm:p-8">
        {cancelled ? (
          <div className="flex items-center gap-3 text-red-600">
            <XCircle size={22} />
            <div>
              <p className="font-bold text-sm">Order Cancelled</p>
              <p className="text-xs text-muted mt-0.5">This order was cancelled and is no longer being processed.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {TRACKING_STEPS.map((step, i) => {
              const done = i <= activeIndex;
              const isLast = i === TRACKING_STEPS.length - 1;
              return (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${
                      done ? "bg-primary border-primary text-navy" : "bg-white border-border text-muted"
                    }`}>
                      {done ? <Check size={15} /> : <span className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                    {!isLast && <div className={`w-0.5 flex-1 min-h-8 ${i < activeIndex ? "bg-primary" : "bg-border"}`} />}
                  </div>
                  <div className="pb-8">
                    <p className={`text-sm font-semibold ${done ? "text-heading" : "text-muted"}`}>{step.label}</p>
                    {done && i === activeIndex && (
                      <p className="text-xs text-muted mt-0.5">Current status</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Decorative delivery-progress panel — not a real GPS map */}
      <Card padding="p-5" className="mt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-soft-blue text-secondary-dark flex items-center justify-center shrink-0">
          <MapPin size={18} />
        </div>
        <p className="text-xs text-muted leading-relaxed">
          Delivery progress shown above is based on order status updates, not live GPS tracking.
        </p>
      </Card>
    </div>
  );
};

export default OrderTracking;
