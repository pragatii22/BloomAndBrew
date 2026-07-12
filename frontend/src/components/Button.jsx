const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "px-6 py-3 font-semibold rounded-full transition-all duration-300 transform active:scale-95 inline-flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer shadow-sm hover:shadow-md";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover hover:-translate-y-0.5",
    secondary: "bg-secondary text-white hover:bg-secondary-hover hover:-translate-y-0.5",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5",
    white: "bg-white text-primary border border-pink-100 hover:bg-pink-50 hover:-translate-y-0.5",
    danger: "bg-red-550 text-white hover:bg-red-600 hover:-translate-y-0.5",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

