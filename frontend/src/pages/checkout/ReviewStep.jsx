import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck, MapPin, Phone, Wallet } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import ProductImage from "../../components/store/ProductImage";
import OrderSummary from "../../components/store/OrderSummary";
import { placeOrder } from "../../service/api";

const PAYMENT_LABELS = { cod: "Cash on Delivery", stripe: "Online Payment" };

const ReviewStep = () => {
  const navigate = useNavigate();
  const { cart, address, phone, paymentMethod, notes, setNotes } = useOutletContext();
  const [submitting, setSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      const res = await placeOrder({ address, phone, payment_method: paymentMethod, notes });
      toast.success("Order placed successfully!");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/success", { state: { order: res.data.order } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 space-y-6">
        <Card padding="p-6 sm:p-8" className="space-y-5">
          <h2 className="text-lg font-bold text-heading pb-3 border-b border-border">Review Order</h2>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-primary-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Delivering To</p>
                <p className="text-heading">{address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone size={16} className="text-primary-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Contact</p>
                <p className="text-heading">{phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 sm:col-span-2">
              <Wallet size={16} className="text-primary-dark shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Payment Method</p>
                <p className="text-heading">{PAYMENT_LABELS[paymentMethod]}</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border border-t border-border pt-2">
            {cart.map((item) => (
              <div key={item.cart_id} className="flex items-center gap-3 py-3">
                <div className="w-12 h-12 rounded-md overflow-hidden border border-border shrink-0">
                  <ProductImage image={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="flex-1 text-sm font-medium text-heading truncate">{item.name}</span>
                <span className="text-xs text-muted">x{item.quantity}</span>
                <span className="text-sm font-semibold text-heading">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <Textarea
            label="Order Notes (optional)"
            rows={2}
            placeholder="Delivery instructions, gift message, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Card>
      </div>

      <div className="lg:col-span-4">
        <OrderSummary items={cart}>
          <Button onClick={handlePlaceOrder} loading={submitting} className="w-full flex items-center justify-center gap-2">
            Confirm &amp; Place Order
          </Button>
          <div className="flex items-center gap-1.5 justify-center text-[11px] text-muted font-medium">
            <ShieldCheck size={13} className="text-primary-dark" /> Secure checkout
          </div>
        </OrderSummary>
      </div>
    </div>
  );
};

export default ReviewStep;
