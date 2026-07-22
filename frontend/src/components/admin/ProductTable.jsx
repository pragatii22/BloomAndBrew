import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import ProductImage from "../store/ProductImage";
import AdminEmptyState from "./AdminEmptyState";

const ProductTable = ({ products, onDelete }) => {
  if (products.length === 0) {
    return <AdminEmptyState>No products in the catalogue yet.</AdminEmptyState>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs font-semibold uppercase tracking-wide text-muted">
            <th className="pb-3 pr-4">Item</th>
            <th className="pb-3 pr-4">Name</th>
            <th className="pb-3 pr-4">Price</th>
            <th className="pb-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-border/70 hover:bg-background transition-colors">
              <td className="py-3 pr-4">
                <div className="w-12 h-12 rounded-md overflow-hidden border border-border shrink-0">
                  <ProductImage image={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
              </td>
              <td className="py-3 pr-4">
                <div className="font-semibold text-heading line-clamp-1 max-w-[220px]" title={p.name}>{p.name}</div>
                <div className="text-xs text-muted line-clamp-1 max-w-[220px] mt-0.5" title={p.description}>
                  {p.description || "Fresh cut arrangement."}
                </div>
              </td>
              <td className="py-3 pr-4 font-semibold text-heading">Rs. {Number(p.price).toLocaleString()}</td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    to={`/admin/products/${p.id}/edit`}
                    className="p-2 text-muted hover:text-secondary-dark hover:bg-soft-blue rounded-md transition-colors"
                    title="Edit product"
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    onClick={() => onDelete(p)}
                    className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete product"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
