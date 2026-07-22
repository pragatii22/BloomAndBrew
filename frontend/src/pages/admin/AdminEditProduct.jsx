import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import AdminHeader from "../../components/admin/AdminHeader";
import ProductForm from "../../components/admin/ProductForm";
import Loader from "../../components/ui/Loader";
import { getProductById, updateProduct } from "../../service/api";

const AdminEditProduct = () => {
  const { onMenuClick } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await updateProduct(id, formData);
      toast.success("Product updated");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullscreen text="Loading product…" />;
  if (!product) return null;

  return (
    <>
      <AdminHeader title="Edit Product" subtitle={product.name} onMenuClick={onMenuClick} />
      <ProductForm
        initial={product}
        existingImage={product.image}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Save Changes"
      />
    </>
  );
};

export default AdminEditProduct;
