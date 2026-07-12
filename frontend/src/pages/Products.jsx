import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import api from "../service/api";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const querySearch = params.get("search");
    if (querySearch) {
      setSearch(querySearch);
    }
  }, [location]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products || response.data || []);
    } catch (error) {
      toast.error("Couldn't load products 🌸");
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

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          (product.description && product.description.toLowerCase().includes(search.toLowerCase()));
    
    const category = getCategory(product.name);
    const matchesCategory = selectedCategory === "All" || category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLowHigh") {
      return a.price - b.price;
    }
    if (sortBy === "priceHighLow") {
      return b.price - a.price;
    }
    if (sortBy === "nameAsc") {
      return a.name.localeCompare(b.name);
    }
    return 0; // default order
  });

  const categories = ["All", "Roses", "Tulips", "Lavender", "Lilies", "Bouquets"];

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />

      <div className="flex-1">
        {/* Editorial Header */}
        <div className="bg-gradient-to-br from-pink-50 via-white to-sky-50 py-16 md:py-20 text-center border-b border-pink-100/30">
          <div className="max-w-3xl mx-auto px-6 space-y-4">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-pink-50 border border-pink-100/50 px-4 py-1.5 rounded-full">
              Full Catalogue
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 tracking-tight leading-tight">
              Our Curated Collections
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Explore custom floral arrangements handcrafted by master designers. Sourced daily, designed with artistry.
            </p>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center bg-white p-6 rounded-[28px] shadow-sm border border-pink-100/25">
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search flowers or arrangements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-pink-100/80 rounded-full pl-11 pr-5 py-3.5 text-sm bg-background/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-pink-50/50 transition-all duration-350"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <ArrowUpDown size={14} /> Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-pink-100/80 rounded-full px-5 py-3.5 text-sm bg-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                <option value="default">Default Catalog</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="nameAsc">Alphabetical: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 pb-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary shadow-sm hover:shadow"
                    : "bg-white text-gray-600 border-pink-100/40 hover:bg-pink-50/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="pb-20">
            {sortedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border border-pink-100/25 p-20 text-center shadow-sm">
                <span className="text-5xl block mb-4">🌼</span>
                <h3 className="font-serif text-2xl font-bold text-gray-800">
                  No Flowers Found
                </h3>
                <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
                  We couldn't find matches for "{search}" in {selectedCategory}. Try adjusting your keywords or category filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;