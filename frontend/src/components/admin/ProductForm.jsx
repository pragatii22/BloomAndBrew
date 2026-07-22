import { useState } from "react";
import { Image, Trash2 } from "lucide-react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { getImageUrl } from "../../service/api";

const ProductForm = ({ initial = {}, existingImage, onSubmit, submitLabel = "Save Product", submitting = false }) => {
  const [name, setName] = useState(initial.name || "");
  const [description, setDescription] = useState(initial.description || "");
  const [price, setPrice] = useState(initial.price || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(existingImage ? getImageUrl(existingImage) : null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price.toString().trim() || !description.trim()) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);
    onSubmit(formData);
  };

  return (
    <Card padding="p-6 sm:p-8" as="form" onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <Input label="Product Name" type="text" placeholder="e.g., Pink Peony Bouquet" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Price (Rs.)" type="number" min="1" step="0.01" placeholder="e.g., 1850" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <Textarea label="Description" rows={4} placeholder="Describe sizes, styling options…" value={description} onChange={(e) => setDescription(e.target.value)} required />

      <div className="space-y-2">
        <label className="text-xs font-semibold text-body">Product Image</label>
        {preview ? (
          <div className="relative rounded-lg overflow-hidden aspect-[4/3] border border-border max-w-xs">
            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
            <button
              type="button"
              onClick={() => { setImage(null); setPreview(null); }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-border hover:border-primary/60 bg-background rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors max-w-xs">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" required={!existingImage} />
            <Image size={22} className="text-muted" />
            <span className="text-xs text-muted font-medium">Upload Image File</span>
          </label>
        )}
      </div>

      <Button type="submit" loading={submitting} className="w-full sm:w-auto">
        {submitLabel}
      </Button>
    </Card>
  );
};

export default ProductForm;
