const Input = ({ label, error, icon: Icon, className = "", ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-body">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <Icon size={16} />
          </span>
        )}
        <input
          className={`
            w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-heading outline-none
            transition-colors duration-150 placeholder:text-muted
            border-border focus:border-primary-dark focus:ring-2 focus:ring-primary/30
            ${Icon ? "pl-10" : ""}
            ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};

export default Input;
