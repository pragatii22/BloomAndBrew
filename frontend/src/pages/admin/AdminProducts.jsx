import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import AdminHeader from "../../components/admin/AdminHeader";
import ProductTable from "../../components/admin/ProductTable";
import Loader from "../../components/ui/Loader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { getProducts, deleteProduct } from "../../service/api";

const AdminProducts = () => {
  const { onMenuClick } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);

  const fetchProducts = () => {
    getProducts()
      .then((res) => setProducts(res.data.products || res.data || []))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteProduct(pendingDelete.id);
      toast.success("Product removed");
      setProducts((prev) => prev.filter((p) => p.id !== pendingDelete.id));
    } catch {
      toast.error("Delete failed");
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <>
      <AdminHeader
        title="Manage Products"
        subtitle={`${products.length} product${products.length !== 1 ? "s" : ""} in catalogue`}
        onMenuClick={onMenuClick}
        action={
          <Link to="/admin/products/add">
            <Button size="sm" className="flex items-center gap-1.5"><Plus size={14} /> Add Product</Button>
          </Link>
        }
      />

      <Card padding="p-5 sm:p-6">
        {loading ? <Loader text="Loading products…" /> : (
          <ProductTable products={products} onDelete={setPendingDelete} />
        )}
      </Card>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Remove this product?"
        description={pendingDelete ? `"${pendingDelete.name}" will be permanently removed from the catalogue.` : ""}
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
};

export default AdminProducts;
