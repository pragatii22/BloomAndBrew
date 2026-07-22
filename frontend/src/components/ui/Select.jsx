import { ChevronDown } from "lucide-react";

const Select = ({ label, className = "", children, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-body">{label}</label>
      )}
      <div className="relative">
        <select
          className={`
            w-full appearance-none rounded-md border bg-white px-3.5 py-2.5 pr-9 text-sm text-heading outline-none
            transition-colors duration-150 border-border focus:border-primary-dark focus:ring-2 focus:ring-primary/30
            cursor-pointer ${className}
          `}
          {...props}
        >
          {children}
        </select>
        <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      </div>
    </div>
  );
};

export default Select;
