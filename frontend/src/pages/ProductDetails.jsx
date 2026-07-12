import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import api from "../service/api";
import { Star, Plus, Minus, ShoppingCart, ArrowLeft, ShieldCheck, Heart, Sparkles } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProductDetails();
    setQuantity(1);
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products");
      const list = response.data.products || response.data || [];
      const found = list.find((p) => String(p.id) === String(id));
      
      if (!found) {
        toast.error("Product not found 🌼");
        navigate("/products");
        return;
      }
      
      setProduct(found);

      // Determine related products (same category, excluding current)
      const currentCategory = getCategory(found.name);
      const related = list
        .filter((p) => p.id !== found.id && getCategory(p.name) === currentCategory)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (error) {
      toast.error("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  const getCategory = (name) => {
    const n = name.toLowerCase();
    if (n.includes("rose")) return "Roses";
    if (n.includes("tulip")) return "Tulips";
    if (n.includes("lavender")) return "Lavender";
    if (n.includes("lily")) return "Lilies";
    return "Bouquets";
  };

  const getRating = (pid) => {
    const score = 4.0 + ((pid * 3) % 11) / 10;
    return score.toFixed(1);
  };

  const addToCart = async () => {
    if (!token) {
      toast.error("Please login to add items to cart 🌸");
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart/add", {
        product_id: product.id,
        quantity: quantity
      });
      toast.success(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart 🌸`);
      // dispatch custom event to notify Navbar of cart update
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      toast.error("Failed to add items to cart");
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  const category = getCategory(product.name);
  const rating = getRating(product.id);

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Catalogue
        </Link>

        {/* Product Summary Grid */}
        <div className="grid lg:grid-cols-12 gap-12 bg-white rounded-[32px] p-6 md:p-12 shadow-sm border border-pink-100/25 mb-16">
          
          {/* Gallery Column */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-[24px] overflow-hidden border border-pink-100/40 bg-pink-50/20 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary text-xs uppercase font-extrabold tracking-wider px-4 py-1.5 rounded-full shadow-sm">
              {category}
            </span>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold border border-yellow-100">
                  <Star size={14} className="fill-current" />
                  <span>{rating} Rating</span>
                </div>
                <div className="flex items-center gap-1 bg-pink-50 text-primary px-3 py-1 rounded-full text-xs font-bold border border-pink-100/50">
                  <Sparkles size={14} className="fill-current" />
                  <span>Premium Handcrafted</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                {product.name}
              </h1>

              <div className="text-2xl md:text-3xl font-bold text-primary font-sans">
                Rs. {product.price}
              </div>

              <div className="border-t border-pink-50 pt-4">
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-2">Description</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {product.description || "A breathtaking floral layout crafted by our professional local florists. Sourced daily and constructed with fresh premium materials."}
                </p>
              </div>
            </div>

            {/* Actions Block */}
            <div className="border-t border-pink-50 pt-6 space-y-6">
              <div className="flex flex-wrap items-center gap-6">
                {/* Quantity Controls */}
                <div className="flex items-center border border-pink-100 rounded-full p-1.5 bg-background shadow-inner">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white text-gray-500 hover:text-primary transition-all active:scale-90"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white text-gray-500 hover:text-primary transition-all active:scale-90"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={addToCart}
                  className="flex-1 py-4 font-bold shadow-pink-100 shadow-md inline-flex items-center justify-center gap-2.5"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </Button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 font-semibold border-t border-pink-50 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary" />
                  <span> Kathmandu Valley Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-primary fill-current" />
                  <span>100% Freshness Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-8 pb-10">
            <div className="text-left border-b border-pink-100/50 pb-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800">
                Related Arrangements
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                You might also appreciate these curated choices from our {category} catalog.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
