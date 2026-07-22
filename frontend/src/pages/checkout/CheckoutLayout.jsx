import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import StepIndicator from "../../components/ui/StepIndicator";
import { getCart } from "../../service/api";
import { ShoppingBag } from "lucide-react";

const STEPS = [
  { key: "address", label: "Address" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
];

const CheckoutLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [notes, setNotes] = useState("");

  const currentKey = STEPS.find((s) => location.pathname.endsWith(s.key))?.key || "address";

  useEffect(() => {
    getCart()
      .then((res) => setCart(res.data.cart || res.data || []))
      .catch(() => toast.error("Unable to load cart"))
      .finally(() => setLoading(false));
  }, []);

  // Guard: can't jump ahead to payment/review before address details exist
  useEffect(() => {
    if (loading) return;
    if ((currentKey === "payment" || currentKey === "review") && (!address.trim() || !phone.trim())) {
      navigate("/checkout/address", { replace: true });
    }
  }, [currentKey, address, phone, loading, navigate]);

  if (loading) return <Loader fullscreen text="Preparing checkout…" />;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some flowers to your cart before checking out."
          action={<Link to="/products"><Button>Browse Flowers</Button></Link>}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary-dark mb-6 transition-colors">
        <ChevronLeft size={15} /> Back to Cart
      </Link>

      <div className="mb-8">
        <StepIndicator steps={STEPS} currentKey={currentKey} />
      </div>

      <Outlet
        context={{
          cart, address, setAddress, phone, setPhone,
          paymentMethod, setPaymentMethod, notes, setNotes,
        }}
      />
    </div>
  );
};

export default CheckoutLayout;
