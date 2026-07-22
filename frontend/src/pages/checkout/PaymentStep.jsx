import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { Banknote, CreditCard, ArrowRight, Info } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import OrderSummary from "../../components/store/OrderSummary";

const PaymentStep = () => {
  const navigate = useNavigate();
  const { cart, paymentMethod, setPaymentMethod } = useOutletContext();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    if (paymentMethod === "stripe" && (!cardName.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim())) {
      toast.error("Please complete the online payment details");
      return;
    }
    navigate("/checkout/review");
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={handleContinue} className="lg:col-span-8">
        <Card padding="p-6 sm:p-8" className="space-y-6">
          <h2 className="text-lg font-bold text-heading pb-3 border-b border-border">Payment Method</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <label
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-start gap-3 border p-4 rounded-lg cursor-pointer transition-colors ${
                paymentMethod === "cod" ? "border-primary-dark bg-soft-pink" : "border-border hover:border-primary/50"
              }`}
            >
              <input type="radio" name="payment_method" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="mt-1 accent-[var(--color-primary-dark)]" />
              <div>
                <div className="font-semibold text-heading text-sm flex items-center gap-1.5">
                  <Banknote size={15} className="text-primary-dark" /> Cash on Delivery
                </div>
                <p className="text-xs text-muted mt-1 leading-relaxed">Pay with cash upon arrival, within Kathmandu Valley.</p>
              </div>
            </label>

            <label
              onClick={() => setPaymentMethod("stripe")}
              className={`flex items-start gap-3 border p-4 rounded-lg cursor-pointer transition-colors ${
                paymentMethod === "stripe" ? "border-secondary-dark bg-soft-blue" : "border-border hover:border-secondary/50"
              }`}
            >
              <input type="radio" name="payment_method" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} className="mt-1 accent-[var(--color-secondary-dark)]" />
              <div>
                <div className="font-semibold text-heading text-sm flex items-center gap-1.5">
                  <CreditCard size={15} className="text-secondary-dark" /> Online Payment
                </div>
                <p className="text-xs text-muted mt-1 leading-relaxed">Card / UPI / Wallet — demo simulation, no real charge.</p>
              </div>
            </label>
          </div>

          {paymentMethod === "stripe" && (
            <div className="border-t border-border pt-5 space-y-4 animate-scale-in">
              <div className="flex items-start gap-2 bg-soft-blue border border-secondary/30 rounded-md px-3.5 py-2.5 text-xs text-navy">
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>This is a demo payment form for coursework purposes. No real transaction is processed.</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Cardholder Name" placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
                <Input label="Card Number" placeholder="4242 4242 4242 4242" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Expiration Date" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} required />
                <Input label="CVC / CVV" type="password" placeholder="•••" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} required />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2">
            Continue to Review <ArrowRight size={16} />
          </Button>
        </Card>
      </form>

      <div className="lg:col-span-4">
        <OrderSummary items={cart} />
      </div>
    </div>
  );
};

export default PaymentStep;
