const TONES = {
  pink: "bg-soft-pink text-primary-dark border-primary/40",
  blue: "bg-soft-blue text-secondary-dark border-secondary/40",
  green: "bg-green-50 text-green-700 border-green-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-600 border-red-200",
  gray: "bg-background text-body border-border",
  navy: "bg-navy text-white border-navy",
};

const Badge = ({ children, tone = "gray", className = "" }) => (
  <span
    className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border ${TONES[tone] || TONES.gray} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
