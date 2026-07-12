import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../service/api";
import Input from "../components/Input";
import Button from "../components/Button";
import { CreditCard, Banknote, ShieldCheck, ChevronLeft, ArrowRight } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cart");
      setCart(res.data.cart || res.data || []);
    } catch {
      toast.error("Unable to load cart 🌸");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const placeOrder = async () => {
    if (!address || !phone) {
      return toast.error("Please fill in all delivery details 🌸");
    }

    setSubmitLoading(true);
    try {
      await api.post("/orders/checkout", {
        address,
        phone,
        payment_method: payment
      });
      toast.success("Order Placed Successfully! 🌸");
      window.dispatchEvent(new Event("cartUpdated")); // reset navbar cart count
      navigate("/success");
    } catch {
      toast.error("Checkout Failed. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {/* Back Link */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary mb-8 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Cart
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-10">
          Checkout Shipping
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-pink-100/25 p-16 text-center shadow-sm max-w-lg mx-auto">
            <h2 className="font-serif text-2xl font-bold text-gray-800">Your cart is empty</h2>
            <Link to="/products" className="inline-block mt-6">
              <Button>Browse Flowers</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Forms Section */}
            <div className="lg:col-span-8 bg-white rounded-[32px] border border-pink-100/20 p-8 shadow-sm space-y-8">
              
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-gray-800 pb-3 border-b border-pink-50">
                  Delivery Details
                </h2>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                    Delivery Address
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Enter full home/office address for flower delivery..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-pink-100 bg-white px-5 py-4 rounded-2xl text-gray-700 outline-none transition-all duration-350 shadow-sm focus:border-primary focus:ring-4 focus:ring-pink-50/50 resize-none"
                  />
                </div>

                <Input
                  label="Contact Phone Number"
                  type="text"
                  placeholder="e.g., +977 9800000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-gray-800 pb-3 border-b border-pink-50">
                  Payment Method
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* COD Option */}
                  <label
                    onClick={() => setPayment("cod")}
                    className={`flex items-start gap-4 border p-5 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                      payment === "cod"
                        ? "border-primary bg-pink-50/20 ring-4 ring-pink-50/50"
                        : "border-pink-100 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      className="mt-1 accent-primary"
                    />
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-800 flex items-center gap-1.5">
                        <Banknote size={16} className="text-primary" />
                        <span>Cash on Delivery</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Pay with cash upon arrival. Kathmandu Valley only.
                      </p>
                    </div>
                  </label>

                  {/* Stripe Option */}
                  <label
                    onClick={() => setPayment("stripe")}
                    className={`flex items-start gap-4 border p-5 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                      payment === "stripe"
                        ? "border-primary bg-pink-50/20 ring-4 ring-pink-50/50"
                        : "border-pink-100 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={payment === "stripe"}
                      onChange={() => setPayment("stripe")}
                      className="mt-1 accent-primary"
                    />
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-800 flex items-center gap-1.5">
                        <CreditCard size={16} className="text-primary" />
                        <span>Card Payment (Stripe)</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Pay securely with your credit card (Simulation mode).
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Sticky Order Review Panel */}
            <div className="lg:col-span-4 bg-white rounded-[32px] border border-pink-100/20 p-8 shadow-sm space-y-6 sticky top-24">
              <h2 className="font-serif text-2xl font-bold text-gray-800 pb-4 border-b border-pink-50">
                Review Order
              </h2>

              <div className="max-h-48 overflow-y-auto pr-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.cart_id} className="flex justify-between items-center gap-4 text-sm">
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-pink-50">
                        <img
                          src={`http://localhost:5000/uploads/${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-gray-700 line-clamp-1 max-w-[120px]">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">
                      x{item.quantity}
                    </span>
                    <span className="font-bold text-gray-700 font-sans text-right shrink-0">
                      Rs. {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-pink-50 pt-6 space-y-3.5 text-sm text-gray-500 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-800">Rs. {total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <hr className="border-pink-50 my-1" />
                <div className="flex justify-between text-base font-bold text-gray-800">
                  <span>Total Due</span>
                  <span className="text-primary text-xl">Rs. {total}</span>
                </div>
              </div>

              <Button
                onClick={placeOrder}
                disabled={submitLoading}
                className="w-full py-4 font-bold shadow-pink-100 mt-4 inline-flex items-center justify-center gap-2"
              >
                <span>{submitLoading ? "Placing Order..." : "Confirm & Place Order"}</span>
                <ArrowRight size={18} />
              </Button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                <ShieldCheck size={12} className="text-primary" />
                <span>SSL Secured Transaction</span>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;