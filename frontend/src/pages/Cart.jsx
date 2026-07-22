import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import CartItem from "../components/store/CartItem";
import OrderSummary from "../components/store/OrderSummary";
import { getCart, addToCart, removeFromCart } from "../service/api";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const res = await getCart();
      setCart(res.data.cart || res.data || []);
    } catch {
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { await fetchCartItems(); })();
  }, []);

  const updateQuantity = async (item, delta) => {
    if (item.quantity + delta < 1) return;
    try {
      // POST /api/cart/add accepts positive or negative deltas to adjust quantity in place
      await addToCart({ product_id: item.product_id, quantity: delta });
      window.dispatchEvent(new Event("cartUpdated"));
      fetchCartItems();
    } catch {
      toast.error("Could not update item quantity");
    }
  };

  const removeProduct = async (cartId) => {
    try {
      await removeFromCart(cartId);
      toast.success("Item removed from cart");
      window.dispatchEvent(new Event("cartUpdated"));
      fetchCartItems();
    } catch {
      toast.error("Could not remove item");
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <h1 className="text-2xl font-bold text-heading mb-6">Shopping Cart</h1>

      {loading ? (
        <Loader text="Loading your cart…" />
      ) : cart.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Explore our collections of fresh flowers and hand-crafted bouquets to fill it up."
          action={<Link to="/products"><Button>Browse Flowers</Button></Link>}
        />
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <CartItem key={item.cart_id} item={item} onQuantityChange={updateQuantity} onRemove={removeProduct} />
            ))}
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <OrderSummary items={cart}>
              <Button onClick={() => navigate("/checkout/address")} className="w-full flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={16} />
              </Button>
              <Link to="/products" className="block text-center text-sm text-muted hover:text-primary-dark font-medium">
                Continue Shopping
              </Link>
            </OrderSummary>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
