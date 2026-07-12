import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../service/api";
import { ShoppingCart, Star } from "lucide-react";
import Button from "./Button";

const ProductCard = ({ product }) => {
  const token = localStorage.getItem("token");

  const addToCart = async (e) => {
    e.preventDefault(); // prevent navigation if clicked inside link
    e.stopPropagation();

    if (!token) {
      toast.error("Please login to add items to cart 🌸");
      return;
    }

    try {
      await api.post("/cart/add", {
        product_id: product.id,
        quantity: 1
      });
      toast.success("Added to Cart 🌸");
      // dispatch custom event to notify Navbar of cart update
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      toast.error("Failed to add item");
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

  const getRating = (id) => {
    const score = 4.0 + ((id * 3) % 11) / 10;
    return score.toFixed(1);
  };

  const category = getCategory(product.name);
  const rating = getRating(product.id);

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 duration-300 group border border-pink-100/20 flex flex-col"
    >
      <div className="h-64 w-full overflow-hidden relative bg-pink-50/20">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-yellow-400">
            <Star size={12} className="fill-current" />
          </div>
          <span className="text-xs font-bold text-gray-500">
            {rating}
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold text-gray-800 leading-snug group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed flex-1">
          {product.description || "Freshly arranged floral set handpicked for your special day."}
        </p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-pink-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Price</span>
            <span className="text-primary text-xl font-bold font-sans">
              Rs. {product.price}
            </span>
          </div>

          <Button
            onClick={addToCart}
            variant="primary"
            className="w-10 h-10 !p-0 rounded-full flex items-center justify-center shadow-md shadow-pink-100"
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;