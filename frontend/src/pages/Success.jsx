import { Link } from "react-router-dom";
import Button from "../components/Button";
import { CheckCircle, Calendar, ArrowRight, Flower } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50/50 via-white to-sky-50/30 p-6 font-sans">
      <div className="bg-white rounded-[32px] border border-pink-100/20 shadow-xl p-8 md:p-12 text-center max-w-lg w-full space-y-6 md:space-y-8">
        
        {/* Animated Checkmark Circle */}
        <div className="relative w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-primary border border-pink-100">
          <CheckCircle size={44} className="stroke-[1.5]" />
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping opacity-75" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-pink-50 px-3 py-1 rounded-full border border-pink-100/50">
            Success
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">
            Order Placed!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
            Thank you for shopping with <span className="font-semibold text-gray-700">Floral Bloom & Brew</span>. Your handcrafted arrangement is being carefully assembled.
          </p>
        </div>

        {/* Info card */}
        <div className="bg-pink-50/30 border border-pink-100/30 rounded-2xl p-5 text-left flex gap-4 items-center">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary border border-pink-100/40">
            <Calendar size={18} />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Estimated Delivery</h4>
            <p className="text-xs text-gray-500 font-medium">Same-day delivery (within Kathmandu Valley) or custom schedule.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Link to="/orders" className="flex-1">
            <Button className="w-full font-bold shadow-md shadow-pink-100 flex justify-center items-center gap-1.5 py-4">
              <span>View My Orders</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/products" className="flex-1">
            <Button variant="outline" className="w-full font-bold py-4">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Mini Logo footer */}
        <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-400 font-bold uppercase tracking-wider pt-2">
          <Flower size={12} />
          <span>Floral Bloom & Brew</span>
        </div>

      </div>
    </div>
  );
};

export default Success;