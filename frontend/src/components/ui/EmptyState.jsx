const EmptyState = ({ icon: Icon, title, description, action, className = "" }) => (
  <div className={`card rounded-xl p-12 text-center max-w-lg mx-auto space-y-4 ${className}`}>
    {Icon && (
      <div className="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto text-primary-dark border border-primary/30">
        <Icon size={30} className="stroke-[1.5]" />
      </div>
    )}
    <h2 className="text-lg font-bold text-heading">{title}</h2>
    {description && (
      <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">{description}</p>
    )}
    {action && <div className="pt-1">{action}</div>}
  </div>
);

export default EmptyState;
