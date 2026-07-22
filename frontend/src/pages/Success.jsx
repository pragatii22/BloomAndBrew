import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ArrowRight, Flower2 } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const Success = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-page px-4 py-10">
      <Card padding="p-8 sm:p-10" className="relative overflow-hidden text-center max-w-md w-full space-y-6 animate-fade-up">
        <Flower2 size={110} strokeWidth={1} className="absolute -bottom-6 -right-6 text-primary/15 pointer-events-none" />

        <div className="relative w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-200">
          <CheckCircle2 size={32} />
        </div>

        <div className="relative space-y-2">
          <h2 className="text-2xl font-bold text-heading">Thank You!</h2>
          <p className="text-sm text-muted leading-relaxed">
            Your order has been placed and is being carefully assembled by our florists.
          </p>
        </div>

        {order && (
          <div className="relative flex items-center justify-between bg-background border border-border rounded-lg p-4 text-left">
            <div>
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wide">Order ID</p>
              <p className="text-sm font-bold text-heading">#{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wide">Total</p>
              <p className="text-sm font-bold text-primary-dark">Rs. {Number(order.total).toLocaleString()}</p>
            </div>
          </div>
        )}

        <p className="relative text-xs text-muted">Estimated delivery: same-day within Kathmandu Valley.</p>

        <div className="relative flex flex-col sm:flex-row gap-3 pt-1">
          <Link to={order ? `/orders/${order.id}/tracking` : "/orders"} className="flex-1">
            <Button className="w-full flex items-center justify-center gap-1.5">
              Track Order <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/products" className="flex-1">
            <Button variant="white" className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Success;
