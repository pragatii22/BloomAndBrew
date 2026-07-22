import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import QuantitySelector from "../components/ui/QuantitySelector";
import ProductCard from "../components/store/ProductCard";
import ProductImage from "../components/store/ProductImage";
import { getProductById, getProducts, addToCart } from "../service/api";
import { getRating, getCategory } from "../lib/categorize";
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, Sparkles } from "lucide-react";

const TABS = ["Description", "Care Instructions", "Reviews"];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [adding, setAdding] = useState(false);
  const [tab, setTab] = useState("Description");

  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setNotFound(false);
      setQty(1);

      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }

      try {
        const r = await getProducts();
        setRelated((r.data || []).filter((p) => String(p.id) !== String(id)).slice(0, 4));
      } catch {
        // related products are non-critical
      }
    })();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      return navigate("/login");
    }
    setAdding(true);
    try {
      await addToCart({ product_id: product.id, quantity: qty });
      toast.success(`${product.name} added to cart`);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <Loader fullscreen text="Loading product…" />;

  if (notFound || !product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold text-heading">Product Not Found</h1>
        <p className="text-muted text-sm">This flower may have been removed from our catalogue.</p>
        <Link to="/products"><Button>Back to Collection</Button></Link>
      </div>
    );
  }

  const rating = getRating(product.id);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary-dark mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Back to Collection
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-14">
        <div className="card rounded-xl overflow-hidden aspect-square">
          <ProductImage image={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-5">
          <span className="text-xs font-semibold text-primary-dark bg-soft-pink px-2.5 py-1 rounded-md border border-primary/30">
            {getCategory(product)}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-heading leading-tight">{product.name}</h1>

          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-current" : "text-border fill-border"} />
              ))}
            </div>
            <span className="text-sm font-medium text-muted">{rating} rating</span>
          </div>

          <p className="text-sm text-body leading-relaxed">
            {product.description || "A handcrafted floral arrangement, sourced and assembled by our florists."}
          </p>

          <div className="text-3xl font-bold text-primary-dark">
            Rs. {Number(product.price).toLocaleString()}
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: ShieldCheck, text: "Fresh Flowers" },
              { icon: Truck, text: "Same-Day Delivery" },
              { icon: Sparkles, text: "Secure Payment" },
            ].map((b) => (
              <span key={b.text} className="flex items-center gap-1.5 text-xs font-medium text-body bg-background px-3 py-1.5 rounded-md border border-border">
                <b.icon size={13} className="text-primary-dark" /> {b.text}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-heading">Quantity</span>
            <QuantitySelector value={qty} onDecrease={() => setQty((q) => Math.max(1, q - 1))} onIncrease={() => setQty((q) => q + 1)} />
          </div>

          <div className="flex gap-3 flex-wrap pt-1">
            <Button size="lg" loading={adding} onClick={handleAddToCart} className="flex-1">
              <ShoppingCart size={17} />
              {adding ? "Adding…" : "Add to Cart"}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={async () => { await handleAddToCart(); if (token) navigate("/cart"); }}
              className="flex-1"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-14">
        <div className="flex gap-1 border-b border-border mb-5">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                tab === t ? "border-primary-dark text-primary-dark" : "border-transparent text-muted hover:text-heading"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Description" && (
          <p className="text-sm text-body leading-relaxed max-w-3xl">
            {product.description || "A premium handcrafted floral arrangement, carefully sourced and assembled by our master florists. Perfect for every special occasion."}
          </p>
        )}
        {tab === "Care Instructions" && (
          <ul className="text-sm text-body leading-relaxed max-w-3xl list-disc pl-5 space-y-1.5">
            <li>Trim stems at an angle every 2–3 days.</li>
            <li>Change vase water regularly and keep away from direct sunlight.</li>
            <li>Keep away from ripening fruit and heat sources.</li>
          </ul>
        )}
        {tab === "Reviews" && (
          <p className="text-sm text-muted">No written reviews yet for this arrangement.</p>
        )}
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-heading mb-5">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
