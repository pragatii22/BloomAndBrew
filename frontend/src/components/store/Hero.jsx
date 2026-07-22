import { Link } from "react-router-dom";
import { Flower2 } from "lucide-react";
import heroImage from "../../assets/images/bouquet.png";

const Hero = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
    <div className="relative overflow-hidden rounded-2xl bg-gradient-pink grid md:grid-cols-2 items-center gap-6 px-6 py-10 md:px-12 md:py-14">
      <Flower2 size={140} strokeWidth={1} className="absolute -top-8 -left-8 text-white/40 pointer-events-none" />
      <Flower2 size={90} strokeWidth={1} className="absolute bottom-4 right-[42%] text-white/30 pointer-events-none hidden md:block" />

      <div className="relative space-y-4 text-center md:text-left">
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight">
          Fresh Flowers,<br />Brewed Happiness
        </h1>
        <p className="text-sm sm:text-base text-navy/70 max-w-md mx-auto md:mx-0">
          Handcrafted bouquets sourced from local growers, delivered fresh across Kathmandu Valley.
        </p>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1">
          <Link to="/products" className="bg-primary-dark text-white text-sm font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm">
            Shop Now
          </Link>
          <Link to="/products" className="bg-white text-navy text-sm font-semibold px-6 py-3 rounded-lg border border-white hover:bg-white/80 transition-colors">
            View Collections
          </Link>
        </div>
      </div>

      <div className="relative flex justify-center md:justify-end">
        <img
          src={heroImage}
          alt="Fresh flower bouquet"
          className="w-56 sm:w-72 md:w-80 aspect-square object-cover rounded-2xl border border-white shadow-lg"
        />
      </div>
    </div>
  </section>
);

export default Hero;
