import { Trash2 } from "lucide-react";
import ProductImage from "./ProductImage";
import QuantitySelector from "../ui/QuantitySelector";

const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <div className="card rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
    <div className="w-20 h-20 rounded-md overflow-hidden bg-soft-pink border border-border shrink-0">
      <ProductImage image={item.image} alt={item.name} className="w-full h-full object-cover" />
    </div>

    <div className="flex-1 text-center sm:text-left space-y-0.5 min-w-0">
      <h3 className="text-sm font-semibold text-heading truncate">{item.name}</h3>
      <p className="text-sm text-primary-dark font-bold">Rs. {Number(item.price).toLocaleString()}</p>
    </div>

    <QuantitySelector
      value={item.quantity}
      min={1}
      onDecrease={() => onQuantityChange(item, -1)}
      onIncrease={() => onQuantityChange(item, 1)}
    />

    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
      <div className="text-right">
        <span className="text-[10px] text-muted font-semibold uppercase tracking-wide block">Subtotal</span>
        <span className="font-bold text-heading text-sm">
          Rs. {(Number(item.price) * item.quantity).toLocaleString()}
        </span>
      </div>
      <button
        onClick={() => onRemove(item.cart_id)}
        className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
        title="Remove item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

export default CartItem;
