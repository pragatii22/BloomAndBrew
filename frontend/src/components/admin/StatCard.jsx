const TONES = {
  pink: "bg-soft-pink text-primary-dark",
  blue: "bg-soft-blue text-secondary-dark",
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-600",
};

const StatCard = ({ label, value, icon: Icon, tone = "pink" }) => (
  <div className="card rounded-xl p-5 flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-muted uppercase tracking-wide">{label}</p>
      <h3 className="text-2xl font-bold text-heading mt-1">{value}</h3>
    </div>
    <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${TONES[tone]}`}>
      <Icon size={20} />
    </div>
  </div>
);

export default StatCard;
