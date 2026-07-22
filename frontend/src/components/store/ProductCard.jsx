import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { addToCart } from "../../service/api";
import { getCategory } from "../../lib/categorize";
import ProductImage from "./ProductImage";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const token = localStorage.getItem("token");
  const category = getCategory(product);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      toast.error("Please login to add to cart");
      return navigate("/login");
    }
    setAdding(true);
    try {
      await addToCart({ product_id: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart`);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="card card-hover rounded-lg overflow-hidden flex flex-col group"
    >
      <div className="relative aspect-square bg-soft-pink overflow-hidden">
        <ProductImage
          image={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <span className="absolute top-2.5 left-2.5 bg-white/90 text-primary-dark text-[10px] font-semibold px-2 py-1 rounded-md border border-border">
          {category}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted((v) => !v); }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center border border-border hover:scale-105 transition-transform"
        >
          <Heart size={13} className={wishlisted ? "fill-red-400 text-red-400" : "text-muted"} />
        </button>
      </div>

      <div className="p-3.5 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-semibold text-heading leading-snug line-clamp-2 group-hover:text-primary-dark transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-primary-dark font-bold text-sm">
            Rs. {Number(product.price).toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="flex items-center gap-1 bg-primary text-navy text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-primary-hover transition-colors disabled:opacity-60"
          >
            {adding ? (
              <span className="w-3 h-3 border-2 border-navy border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart size={12} />
            )}
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
