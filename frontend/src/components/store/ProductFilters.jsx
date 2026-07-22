import { CATEGORIES } from "../../lib/categorize";

const ProductFilters = ({ active, onCategoryChange, maxPrice, priceLimit, onPriceChange }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-bold text-heading mb-3">Categories</h3>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => onCategoryChange("All")}
          className={`text-left text-sm px-3 py-2 rounded-md transition-colors ${
            active === "All" ? "bg-primary text-navy font-semibold" : "text-body hover:bg-background"
          }`}
        >
          All Bouquets
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            className={`text-left text-sm px-3 py-2 rounded-md transition-colors ${
              active === c ? "bg-primary text-navy font-semibold" : "text-body hover:bg-background"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-sm font-bold text-heading mb-3">Price Range</h3>
      <input
        type="range"
        min={0}
        max={maxPrice}
        value={priceLimit}
        onChange={(e) => onPriceChange(Number(e.target.value))}
        className="w-full accent-[var(--color-primary-dark)]"
      />
      <div className="flex justify-between text-xs text-muted mt-1">
        <span>Rs. 0</span>
        <span>Rs. {priceLimit.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

export default ProductFilters;
