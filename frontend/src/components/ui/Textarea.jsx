const Textarea = ({ label, error, className = "", ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-body">{label}</label>
      )}
      <textarea
        className={`
          w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-heading outline-none
          transition-colors duration-150 placeholder:text-muted resize-none
          border-border focus:border-primary-dark focus:ring-2 focus:ring-primary/30
          ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};

export default Textarea;
