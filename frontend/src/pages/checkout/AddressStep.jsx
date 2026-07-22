import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import OrderSummary from "../../components/store/OrderSummary";

const AddressStep = () => {
  const navigate = useNavigate();
  const { cart, address, setAddress, phone, setPhone } = useOutletContext();

  const handleContinue = (e) => {
    e.preventDefault();
    if (!address.trim() || !phone.trim()) {
      toast.error("Please fill in your delivery details");
      return;
    }
    navigate("/checkout/payment");
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={handleContinue} className="lg:col-span-8">
        <Card padding="p-6 sm:p-8" className="space-y-5">
          <h2 className="text-lg font-bold text-heading pb-3 border-b border-border">Delivery Address</h2>

          <Textarea
            label="Delivery Address"
            rows={3}
            placeholder="Enter full home/office address for flower delivery…"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <Input
            label="Contact Phone Number"
            type="text"
            placeholder="e.g., +977 9800000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2">
            Continue to Payment <ArrowRight size={16} />
          </Button>
        </Card>
      </form>

      <div className="lg:col-span-4">
        <OrderSummary items={cart} />
      </div>
    </div>
  );
};

export default AddressStep;
