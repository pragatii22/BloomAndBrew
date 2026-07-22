import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
import AdminEmptyState from "./AdminEmptyState";

const OrderTable = ({ orders }) => {
  if (orders.length === 0) {
    return <AdminEmptyState>No orders match this filter.</AdminEmptyState>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs font-semibold uppercase tracking-wide text-muted">
            <th className="pb-3 pr-4">Order</th>
            <th className="pb-3 pr-4">Customer</th>
            <th className="pb-3 pr-4">Date</th>
            <th className="pb-3 pr-4">Total</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-border/70 hover:bg-background transition-colors">
              <td className="py-3 pr-4 font-semibold text-heading">#{order.id}</td>
              <td className="py-3 pr-4">
                <div className="text-heading">{order.customer_name}</div>
                <div className="text-xs text-muted">{order.customer_email}</div>
              </td>
              <td className="py-3 pr-4 text-muted text-xs">
                {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </td>
              <td className="py-3 pr-4 font-semibold text-heading">Rs. {Number(order.total).toLocaleString()}</td>
              <td className="py-3 pr-4"><OrderStatusBadge status={order.status} /></td>
              <td className="py-3 text-right">
                <Link
                  to={`/admin/orders/${order.id}`}
                  className="text-xs font-semibold text-navy border border-border rounded-md px-3.5 py-1.5 hover:bg-background transition-colors"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
