const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-2xl border border-pink-100 bg-white px-5 py-4 text-gray-700 outline-none transition-all duration-350 shadow-sm focus:border-primary focus:ring-4 focus:ring-pink-50/50 ${
          error ? "border-red-400 focus:border-red-500 focus:ring-red-50" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;

