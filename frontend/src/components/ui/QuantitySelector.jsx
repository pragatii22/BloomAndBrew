import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ value, onDecrease, onIncrease, min = 1, size = "md" }) => {
  const isSm = size === "sm";
  return (
    <div className={`inline-flex items-center gap-1 bg-background border border-border rounded-md ${isSm ? "px-1 py-0.5" : "px-1.5 py-1"}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= min}
        className={`${isSm ? "w-6 h-6" : "w-7 h-7"} rounded flex items-center justify-center hover:bg-white text-body hover:text-primary-dark transition-colors disabled:opacity-40`}
      >
        <Minus size={13} />
      </button>
      <span className={`font-semibold text-heading text-center ${isSm ? "min-w-[18px] text-xs" : "min-w-[22px] text-sm"}`}>
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className={`${isSm ? "w-6 h-6" : "w-7 h-7"} rounded flex items-center justify-center hover:bg-white text-body hover:text-primary-dark transition-colors`}
      >
        <Plus size={13} />
      </button>
    </div>
  );
};

export default QuantitySelector;
