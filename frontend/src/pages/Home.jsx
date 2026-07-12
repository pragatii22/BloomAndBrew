import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Button from "../components/Button";
import { ArrowRight, Star, Truck, CheckCircle2, ShieldCheck, Mail } from "lucide-react";

import rose from "../assets/images/rose.png";
import tulip from "../assets/images/tulip.png";
import bouquet from "../assets/images/bouquet.png";
import lavender from "../assets/images/lavender.png";

import birthday from "../assets/images/birthday.png";
import wedding from "../assets/images/wedding.png";
import anniversary from "../assets/images/anniversary.png";
import congrats from "../assets/images/congrats.png";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get("scroll");
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const flowers = [
    {
      image: rose,
      name: "Classic Red Rose Bouquet",
      price: "Rs. 1,499",
      rating: 5,
      tag: "Best Seller"
    },
    {
      image: tulip,
      name: "Blushing Pink Tulips",
      price: "Rs. 1,799",
      rating: 4.8,
      tag: "New Arrival"
    },
    {
      image: bouquet,
      name: "Enchanted Wedding Bouquet",
      price: "Rs. 2,499",
      rating: 5,
      tag: "Lux Collection"
    },
    {
      image: lavender,
      name: "Calming Lavender Basket",
      price: "Rs. 1,299",
      rating: 4.6,
      tag: "Trending"
    }
  ];

  const categories = [
    { image: birthday, name: "Birthday" },
    { image: wedding, name: "Wedding" },
    { image: anniversary, name: "Anniversary" },
    { image: congrats, name: "Congratulations" }
  ];

  const testimonials = [
    {
      stars: 5,
      text: "The flowers were absolutely stunning, fresh, and stayed vibrant for over a week! Delivery was right on time.",
      author: "Priya Sharma"
    },
    {
      stars: 5,
      text: "I ordered a bouquet for my mother's birthday. She was in tears! The packaging is very premium and elegant.",
      author: "Aayush Shrestha"
    },
    {
      stars: 5,
      text: "Affordable prices for such high quality. The Kathmandu valley delivery was extremely prompt. Highly recommend Bloom & Brew!",
      author: "Sita Khadka"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <Hero />

      {/* Occasions Section */}
      <section id="occasions" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-pink-50 border border-pink-100/50 px-4 py-1.5 rounded-full">
            Special Occasions
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-gray-800">
            Shop by Occasion
          </h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Find the perfect expression for life's most beautiful moments.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item, index) => (
            <Link
              to={`/products?search=${item.name}`}
              key={index}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-pink-100/30 flex flex-col hover:-translate-y-1.5"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="py-5 text-center flex-1 flex flex-col justify-center bg-white">
                <h3 className="font-serif text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Flowers Section */}
      <section className="bg-white py-24 border-y border-pink-100/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left max-w-xl">
              <span className="text-primary font-bold text-xs uppercase tracking-widest bg-pink-50 border border-pink-100/50 px-4 py-1.5 rounded-full">
                Handpicked Favorites
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-gray-800">
                Featured Flowers
              </h2>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Freshly gathered, beautifully styled arrangements picked with premium craftsmanship.
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="w-fit">
                <span>View Full Catalog</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flowers.map((flower, index) => (
              <div
                key={index}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-pink-100/30 flex flex-col hover:-translate-y-2"
              >
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {flower.tag && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {flower.tag}
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-gray-600">{flower.rating}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-800 leading-snug group-hover:text-primary transition-colors flex-1">
                    {flower.name}
                  </h3>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-pink-50">
                    <span className="text-primary font-bold text-lg">
                      {flower.price}
                    </span>
                    <Link to="/products">
                      <span className="text-xs font-semibold text-sky-500 hover:text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Shop Now <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-pink-50 border border-pink-100/50 px-4 py-1.5 rounded-full">
            Our Promise
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-gray-800">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Enjoy premium service and handcrafted floral beauty designed to inspire.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow border border-pink-100/20 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-pink-50 text-primary flex items-center justify-center mx-auto">
              <CheckCircle2 size={30} />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-800">
              100% Fresh Guarantee
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We handpick our blooms daily from organic family farms to ensure they arrive in stunning condition.
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow border border-pink-100/20 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-sky-50 text-secondary flex items-center justify-center mx-auto">
              <Truck size={30} />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-800">
              Express Local Delivery
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Timely same-day and scheduled shipping across Kathmandu Valley, safely protected.
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow border border-pink-100/20 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-pink-50 text-primary flex items-center justify-center mx-auto">
              <ShieldCheck size={30} />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-800">
              Premium Styling
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tailored designs designed by master florists at affordable student-friendly prices.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-pink-50/50 py-24 border-t border-pink-100/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-pink-50 border border-pink-100/50 px-4 py-1.5 rounded-full">
              Kind Words
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-gray-800">
              Happy Customers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-100/20 flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-yellow-400 mb-5">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>
                <h4 className="mt-6 font-semibold text-gray-800 text-sm border-t border-pink-50 pt-4">
                  — {item.author}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="relative bg-gradient-to-r from-pink-500 to-sky-400 rounded-[48px] overflow-hidden text-white p-8 md:p-16 text-center shadow-xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-16 -mb-16" />

          <div className="relative max-w-2xl mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto backdrop-blur-md">
              <Mail size={22} />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Join Our Floral Club
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Subscribe to receive styling updates, seasonal collections alerts, and a special 15% discount coupon!
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! 🌸"); }} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-4">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="bg-white text-gray-700 placeholder-gray-400 rounded-full px-6 py-4 text-sm w-full outline-none focus:ring-4 focus:ring-white/20 transition-all"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white rounded-full px-8 py-4 text-sm font-semibold hover:bg-gray-900 transition-colors shadow shadow-black/10 cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;