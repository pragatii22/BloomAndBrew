const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  type = "button",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizes = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm",
  };

  const variants = {
    primary: "bg-primary text-navy hover:bg-primary-hover shadow-sm",
    secondary: "bg-secondary text-navy hover:bg-secondary-hover shadow-sm",
    outline: "border border-primary text-primary-dark bg-white hover:bg-soft-pink",
    "outline-secondary": "border border-secondary text-secondary-dark bg-white hover:bg-soft-blue",
    white: "bg-white text-heading border border-border hover:bg-background shadow-sm",
    ghost: "text-body hover:bg-background",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  };

  return (
    <button
      type={type}
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
