import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Flower2 } from "lucide-react";
import Hero from "../components/store/Hero";
import ProductCard from "../components/store/ProductCard";
import CategoryCard from "../components/store/CategoryCard";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import { getProducts } from "../service/api";

import bouquetImg from "../assets/images/bouquet.png";
import roseImg from "../assets/images/rose.png";
import birthdayImg from "../assets/images/birthday.png";
import anniversaryImg from "../assets/images/anniversary.png";
import lavenderImg from "../assets/images/lavender.png";
import weddingImg from "../assets/images/wedding.png";

const CATEGORIES = [
  { image: bouquetImg, name: "Bouquets", search: "bouquet" },
  { image: roseImg, name: "Roses", search: "rose" },
  { image: birthdayImg, name: "Birthday", search: "birthday" },
  { image: anniversaryImg, name: "Anniversary", search: "anniversary" },
  { image: lavenderImg, name: "Lavender", search: "lavender" },
  { image: weddingImg, name: "Wedding", search: "wedding" },
];

const PROMISES = [
  { icon: ShieldCheck, title: "Fresh Flowers", desc: "Handpicked blooms, guaranteed fresh on arrival." },
  { icon: Truck, title: "Same Day Delivery", desc: "Timely delivery across Kathmandu Valley." },
  { icon: Flower2, title: "Handcrafted Arrangements", desc: "Every bouquet styled by our florists." },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((r) => setProducts(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = products.slice(0, 8);

  return (
    <>
      <Hero />

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-heading mb-5">Shop By Category</h2>
        <div className="flex gap-5 sm:gap-8 overflow-x-auto pb-2 sm:justify-between sm:overflow-visible">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.name} {...c} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-heading">Featured Flowers</h2>
          <Link to="/products">
            <Button variant="outline" size="sm">
              View All <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        {loading ? (
          <Loader text="Loading flowers…" />
        ) : featured.length === 0 ? (
          <div className="text-center py-12 text-muted text-sm">
            No products yet. Add flowers from the Admin panel to see them here.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-12">
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {PROMISES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card rounded-xl p-6 text-center space-y-2.5">
              <div className="w-11 h-11 rounded-lg bg-soft-pink text-primary-dark flex items-center justify-center mx-auto">
                <Icon size={20} />
              </div>
              <h3 className="text-sm font-bold text-heading">{title}</h3>
              <p className="text-xs text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
