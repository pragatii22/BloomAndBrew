import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-pink-100/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-800">
            Floral <span className="text-primary font-sans">Bloom</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Crafting premium, fresh, and beautiful floral arrangements for all your special moments. Handpicked with care and delivered with love.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 text-base mb-5 uppercase tracking-wider text-xs">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link>
            <Link to="/products" className="hover:text-primary transition-colors duration-300">Flowers & Bouquets</Link>
            <Link to="/cart" className="hover:text-primary transition-colors duration-300">Shopping Cart</Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-300">Get In Touch</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 text-base mb-5 uppercase tracking-wider text-xs">
            Contact Details
          </h3>
          <div className="flex flex-col gap-3.5 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-primary" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-primary" />
              <span>hello@floralbloom.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-primary" />
              <span>+977 9801234567</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-base mb-2 uppercase tracking-wider text-xs">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
              <Twitter size={18} />
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4 leading-normal">
            Subscribe for exclusive offers and fresh news on floral designs!
          </p>
        </div>
      </div>

      <div className="border-t border-pink-50 py-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-2">
        <span>© {new Date().getFullYear()} Floral Bloom & Brew. All rights reserved.</span>
        <span className="flex items-center gap-1.5 justify-center">
          Designed with <Heart size={12} className="text-primary fill-current animate-pulse" /> for special occasions
        </span>
      </div>
    </footer>
  );
};

export default Footer;