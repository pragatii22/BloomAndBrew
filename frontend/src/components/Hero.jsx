import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero.png";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50/70 via-white to-sky-50/50 py-16 md:py-24">
      {/* Abstract decorative backgrounds */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-sky-100/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:space-y-8 text-left">
          <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={12} className="fill-current" />
            <span>Fresh Flowers Hand-Delivered Daily</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-800 leading-tight">
            Flowers that <br />
            <span className="text-primary italic font-normal">Speak</span> <br />
            from the Heart
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl">
            Surprise your loved ones with breathtaking, handcrafted bouquets sourced directly from the finest local growers. Delivered fresh, with love.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/products"
              className="bg-primary text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-pink-100 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-primary/20 text-primary font-semibold px-8 py-4 rounded-full hover:border-primary hover:bg-pink-50/30 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative group">
          {/* Decorative frame overlay */}
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-pink-200 to-sky-200 opacity-30 blur-lg group-hover:opacity-40 transition-all duration-500" />
          <div className="relative rounded-[40px] overflow-hidden border border-pink-100/50 shadow-2xl bg-white">
            <img
              src={heroImage}
              alt="Handcrafted luxury flower bouquet"
              className="w-full object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;