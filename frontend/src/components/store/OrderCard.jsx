import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import Badge from "../ui/Badge";
import ProductImage from "./ProductImage";
import { STATUS_META } from "../../lib/orderStatus";

const OrderCard = ({ order }) => {
  const status = STATUS_META[order.status] || STATUS_META.pending;
  const StatusIcon = status.icon;
  const date = new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const thumb = order.items?.[0]?.image;

  return (
    <div className="card rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
      <div className="w-16 h-16 rounded-md overflow-hidden border border-border shrink-0 bg-soft-pink">
        {thumb ? (
          <ProductImage image={thumb} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-dark"><Package size={20} /></div>
        )}
      </div>

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <p className="text-sm font-bold text-heading">Order #{order.id}</p>
        <p className="text-xs text-muted">{date} · {order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}</p>
      </div>

      <Badge tone={status.tone} className="shrink-0">
        <StatusIcon size={11} /> {status.label}
      </Badge>

      <div className="text-center sm:text-right shrink-0">
        <p className="text-[10px] font-semibold text-muted uppercase tracking-wide">Amount</p>
        <p className="text-sm font-bold text-primary-dark">Rs. {Number(order.total).toLocaleString()}</p>
      </div>

      <Link
        to={`/orders/${order.id}`}
        className="shrink-0 text-xs font-semibold text-navy border border-border rounded-md px-4 py-2 hover:bg-background transition-colors"
      >
        View Details
      </Link>
    </div>
  );
};

export default OrderCard;
