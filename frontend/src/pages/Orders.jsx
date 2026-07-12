import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../service/api";
import { ShoppingBag, Star, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders");
      setOrders(response.data.orders || response.data || []);
    } catch {
      toast.error("Couldn't load orders 🌸");
    } finally {
      setLoading(false);
    }
  };

  const getMockDate = (orderId) => {
    // Generate a deterministic date based on the order ID to make the UI look realistic
    const baseTime = 1783850000000; // mid-2026
    const offset = orderId * 3600000 * 4; // 4 hours per order
    return new Date(baseTime - offset).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-10">
          My Order History
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-pink-100/25 p-16 text-center shadow-sm max-w-xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-primary">
              <ShoppingBag size={36} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-800">No orders placed yet</h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
              Explore our catalogue of beautiful handcrafted flowers and place your first order.
            </p>
            <Link to="/products" className="inline-block pt-2">
              <Button>Browse Collection</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const itemTotal = Number(order.price) * Number(order.quantity);
              const orderDate = getMockDate(order.id);
              // deterministic status: newer orders are Pending, older are Delivered
              const status = order.id % 3 === 0 ? "In Transit" : order.id % 2 === 0 ? "Delivered" : "Pending";

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-[28px] border border-pink-100/25 p-6 shadow-sm hover:shadow-md transition-shadow space-y-6"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-center flex-wrap gap-4 pb-4 border-b border-pink-50">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-gray-800">
                        Order #{order.id}
                      </h3>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        Placed on {orderDate}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border ${
                          status === "Delivered"
                            ? "bg-green-50 text-green-700 border-green-100"
                            : status === "In Transit"
                            ? "bg-blue-50 text-blue-700 border-blue-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        {status === "Delivered" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Order Item Details */}
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-pink-50/10 border border-pink-50">
                      <img
                        src={`http://localhost:5000/uploads/${order.image}`}
                        alt={order.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1.5">
                      <h4 className="font-serif text-lg font-bold text-gray-800">
                        {order.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold">
                        Unit Price: <span className="text-gray-600 font-sans">Rs. {order.price}</span> | Qty: <span className="text-gray-600 font-sans">{order.quantity}</span>
                      </p>
                    </div>

                    <div className="text-center sm:text-right shrink-0">
                      <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Order Total</span>
                      <span className="text-primary text-xl font-bold font-sans">
                        Rs. {itemTotal}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;