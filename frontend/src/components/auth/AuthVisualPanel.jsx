import { Flower2 } from "lucide-react";

const AuthVisualPanel = ({ image, title, subtitle, tone = "blue" }) => (
  <div className={`relative hidden lg:flex flex-col justify-end overflow-hidden ${tone === "pink" ? "bg-gradient-pink" : "bg-gradient-blue"}`}>
    <Flower2 size={130} className="absolute -top-6 -right-8 text-white/40 rotate-12" strokeWidth={1} />
    <Flower2 size={90} className="absolute bottom-24 -left-6 text-white/30 -rotate-12" strokeWidth={1} />

    <img
      src={image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
    />
    <div className={`absolute inset-0 ${tone === "pink" ? "bg-gradient-pink" : "bg-gradient-blue"} opacity-40`} />

    <div className="relative p-8 text-navy space-y-1.5">
      <h2 className="font-heading text-2xl font-bold">{title}</h2>
      <p className="text-sm text-navy/70 max-w-xs leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

export default AuthVisualPanel;
