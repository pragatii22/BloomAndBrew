import Badge from "../ui/Badge";
import { STATUS_META } from "../../lib/orderStatus";

const OrderStatusBadge = ({ status }) => {
  const meta = STATUS_META[status] || STATUS_META.pending;
  const Icon = meta.icon;
  return (
    <Badge tone={meta.tone}>
      <Icon size={11} /> {meta.label}
    </Badge>
  );
};

export default OrderStatusBadge;
