import Card from "../ui/Card";

const DELIVERY_CHARGE = 0;

const OrderSummary = ({ items = [], title = "Order Summary", children, className = "" }) => {
  const subtotal = items.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0);
  const total = subtotal + DELIVERY_CHARGE;

  return (
    <Card className={`space-y-5 ${className}`} padding="p-6">
      <h2 className="text-base font-bold text-heading pb-3 border-b border-border">{title}</h2>

      <div className="space-y-3 text-sm text-body">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-heading font-semibold">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charge</span>
          <span className="text-green-600 font-semibold uppercase text-xs tracking-wide">Free</span>
        </div>
        <hr className="border-border" />
        <div className="flex justify-between text-base font-bold text-heading">
          <span>Total</span>
          <span className="text-primary-dark text-lg">Rs. {total.toLocaleString()}</span>
        </div>
      </div>

      {children}
    </Card>
  );
};

export default OrderSummary;
