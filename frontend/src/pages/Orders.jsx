import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import OrderCard from "../components/store/OrderCard";
import { getOrders } from "../service/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data.orders || []))
      .catch(() => toast.error("Couldn't load your order history"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <h1 className="text-2xl font-bold text-heading mb-6">My Orders</h1>

      {loading ? (
        <Loader text="Retrieving your order history…" />
      ) : orders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders placed yet"
          description="Place your first order today and track it here."
          action={<Link to="/products"><Button>Explore Collection</Button></Link>}
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </div>
  );
};

export default Orders;
