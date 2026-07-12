import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../service/api";
import Button from "../components/Button";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await api.get("/cart");
      setCart(response.data.cart || response.data || []);
    } catch (err) {
      toast.error("Couldn't load cart 🌸");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, delta, currentQty, cartId) => {
    if (currentQty + delta <= 0) {
      return removeItem(cartId);
    }

    try {
      await api.post("/cart/add", {
        product_id: productId,
        quantity: delta
      });
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {
      toast.error("Couldn't update quantity");
    }
  };

  const removeItem = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);
      toast.success("Removed from cart 🌸");
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {
      toast.error("Couldn't remove item");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-10">
          Your Shopping Cart
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-pink-100/25 p-16 md:p-24 text-center shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-primary">
              <ShoppingBag size={36} />
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
              Add some of our fresh handcrafted bouquets to make your day special.
            </p>
            <Link to="/products" className="inline-block pt-2">
              <Button className="font-semibold shadow-md">
                Browse Flowers
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.cart_id}
                  className="bg-white rounded-[28px] border border-pink-100/20 p-5 md:p-6 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow items-center"
                >
                  <div className="w-28 h-28 rounded-2xl overflow-hidden bg-pink-50/10 shrink-0">
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <h3 className="font-serif text-xl font-bold text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-primary font-bold">
                      Rs. {item.price}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center border border-pink-50 rounded-full p-1 bg-pink-50/30">
                    <button
                      onClick={() => updateQuantity(item.product_id, -1, item.quantity, item.cart_id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-500 hover:text-primary transition-all active:scale-90"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product_id, 1, item.quantity, item.cart_id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-500 hover:text-primary transition-all active:scale-90"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.cart_id)}
                    className="p-3 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-[28px] border border-pink-100/20 p-8 shadow-sm space-y-6 sticky top-24">
              <h2 className="font-serif text-2xl font-bold text-gray-800 pb-4 border-b border-pink-50">
                Order Summary
              </h2>
              
              <div className="space-y-3.5 text-sm text-gray-500 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-800">Rs. {total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kathmandu Delivery</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <hr className="border-pink-50 my-2" />
                <div className="flex justify-between text-base font-bold text-gray-800">
                  <span>Total Amount</span>
                  <span className="text-primary text-xl">Rs. {total}</span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 font-bold shadow-pink-100 mt-4 inline-flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </Button>

              <div className="text-center text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                🔒 Secure E-commerce Checkout
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;