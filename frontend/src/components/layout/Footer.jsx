import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-white border-t border-border mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div className="space-y-2.5">
        <span className="font-heading text-base font-bold text-heading">
          Floral Bloom <span className="text-primary-dark">&amp; Brew</span>
        </span>
        <p className="text-body text-xs leading-relaxed">
          Fresh, handcrafted floral arrangements delivered across Kathmandu Valley.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-heading text-xs uppercase tracking-wide mb-3">Quick Links</h3>
        <div className="flex flex-col gap-2 text-xs text-body">
          {[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/products" },
            { label: "Cart", to: "/cart" },
            { label: "My Orders", to: "/orders" },
            { label: "Contact Us", to: "/contact" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-primary-dark transition-colors w-fit">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-heading text-xs uppercase tracking-wide mb-3">Contact</h3>
        <div className="flex flex-col gap-2.5 text-xs text-body">
          <div className="flex items-start gap-2">
            <MapPin size={13} className="text-primary-dark mt-0.5 shrink-0" />
            <span>Gairidhara, Kathmandu, Nepal</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={13} className="text-primary-dark shrink-0" />
            <span>hello@floralbloom.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={13} className="text-primary-dark shrink-0" />
            <span>+977 9801234567</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-heading text-xs uppercase tracking-wide mb-3">Hours</h3>
        <p className="text-xs text-body">Sun – Fri: 9:00 AM – 7:00 PM</p>
        <p className="text-xs text-muted">Saturday: Closed</p>
      </div>
    </div>

    <div className="border-t border-border py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2 text-[11px] text-muted">
      <span>© {new Date().getFullYear()} Floral Bloom &amp; Brew. All rights reserved.</span>
      <span>Made with care in Kathmandu</span>
    </div>
  </footer>
);

export default Footer;
