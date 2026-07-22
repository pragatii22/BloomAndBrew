import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import AdminHeader from "../../components/admin/AdminHeader";
import ProductForm from "../../components/admin/ProductForm";
import { addProduct } from "../../service/api";

const AdminAddProduct = () => {
  const { onMenuClick } = useOutletContext();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await addProduct(formData);
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader title="Add Product" subtitle="Create a new flower listing" onMenuClick={onMenuClick} />
      <ProductForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Add Product" />
    </>
  );
};

export default AdminAddProduct;
