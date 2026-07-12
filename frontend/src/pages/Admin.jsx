import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../service/api";
import Button from "../components/Button";
import Input from "../components/Input";
import { Package, Trash2, LogOut, Plus, Image, ArrowLeft, BarChart3, Users, ClipboardList, LayoutDashboard } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products"); // dashboard, products

  // Add Product Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || res.data || []);
    } catch (err) {
      toast.error("Failed to load products 🌸");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !description || !image) {
      return toast.error("Please fill all fields and upload an image 🌸");
    }

    setSubmitLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      await api.post("/products/add", formData);
      toast.success("Flower Product Added Successfully! 🌸");
      
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
      
      fetchProducts();
    } catch (err) {
      toast.error("Couldn't add product");
    } finally {
      setSubmitLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flower? 🌼")) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Flower Deleted 🌸");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-pink-50/20 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-pink-100/30 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="p-6 space-y-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-gray-800">
              Floral <span className="text-primary font-sans text-xl">Bloom</span>
            </span>
          </Link>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide transition-all ${
                activeTab === "dashboard"
                  ? "bg-pink-550 text-white shadow-md shadow-pink-100"
                  : "text-gray-500 hover:bg-pink-50/50 hover:text-primary"
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>
            
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold tracking-wide transition-all ${
                activeTab === "products"
                  ? "bg-primary text-white shadow-md shadow-pink-100"
                  : "text-gray-500 hover:bg-pink-50/50 hover:text-primary"
              }`}
            >
              <Package size={18} />
              <span>Manage Flowers</span>
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-pink-50 flex flex-col gap-3">
          <Link to="/" className="w-full">
            <Button variant="outline" className="w-full text-xs py-2 flex items-center justify-center gap-1.5">
              <ArrowLeft size={14} />
              <span>Return to Store</span>
            </Button>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl text-sm font-semibold transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-xs mt-1 uppercase font-bold tracking-wider">
              Control Panel & CRUD Actions
            </p>
          </div>
        </header>

        {/* Dashboard Analytics View */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Stats Grid */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-[32px] border border-pink-100/25 p-8 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Flowers</span>
                  <h3 className="text-4xl font-bold text-gray-800">{products.length}</h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-pink-50 text-primary flex items-center justify-center border border-pink-100/40">
                  <Package size={24} />
                </div>
              </div>

              <div className="bg-white rounded-[32px] border border-pink-100/25 p-8 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Store Orders</span>
                  <h3 className="text-4xl font-bold text-sky-500">12</h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center border border-sky-100">
                  <ClipboardList size={24} />
                </div>
              </div>

              <div className="bg-white rounded-[32px] border border-pink-100/25 p-8 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Store Customers</span>
                  <h3 className="text-4xl font-bold text-green-500">4</h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center border border-green-100">
                  <Users size={24} />
                </div>
              </div>
            </div>

            {/* Sales Chart Mock Card */}
            <div className="bg-white rounded-[32px] border border-pink-100/25 p-8 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-bold text-gray-800">Performance Metrics</h3>
              <div className="h-64 rounded-2xl bg-pink-50/20 border border-dashed border-pink-100 flex items-center justify-center text-gray-400 text-sm gap-2">
                <BarChart3 size={18} />
                <span>Analytical metrics plotting simulation dashboard</span>
              </div>
            </div>
          </div>
        )}

        {/* Manage Products View */}
        {activeTab === "products" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Left side: Add Product Form */}
            <form
              onSubmit={addProduct}
              className="lg:col-span-4 bg-white rounded-[32px] border border-pink-100/25 p-6 md:p-8 shadow-sm space-y-6"
            >
              <h3 className="font-serif text-xl font-bold text-gray-800 pb-3 border-b border-pink-50">
                Add New Flower
              </h3>

              <Input
                label="Flower Name"
                type="text"
                placeholder="e.g., Pink Peony Bouquet"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Price (Rs.)"
                type="number"
                placeholder="e.g., 1850"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                  Product Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe the arrangement size, floral choices, and styling details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-pink-100 bg-white px-5 py-4 rounded-2xl text-gray-700 outline-none transition-all duration-350 shadow-sm focus:border-primary focus:ring-4 focus:ring-pink-50/50 resize-none text-sm"
                />
              </div>

              {/* Upload Image Section */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                  Flower Image
                </label>
                
                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-pink-100">
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Upload Preview" />
                    <button
                      type="button"
                      onClick={() => { setImage(null); setImagePreview(null); }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-pink-100 hover:border-primary/50 bg-pink-50/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Image size={24} className="text-gray-400" />
                    <span className="text-xs text-gray-500 font-semibold">Upload JPG/PNG File</span>
                  </label>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitLoading}
                className="w-full py-4 font-bold shadow-pink-100 mt-2"
              >
                <Plus size={16} />
                <span>{submitLoading ? "Adding..." : "Add Flower Product"}</span>
              </Button>
            </form>

            {/* Right side: Product List Table */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-[32px] border border-pink-100/25 p-6 md:p-8 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-6">
                  Flower Stock Catalogue ({products.length})
                </h3>

                {products.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">
                    No products added to the store catalog yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-pink-50 text-xs font-bold uppercase tracking-wider text-gray-400">
                          <th className="pb-3 pr-4">Item</th>
                          <th className="pb-3 pr-4">Name</th>
                          <th className="pb-3 pr-4">Price</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id} className="border-b border-pink-50/50 hover:bg-pink-50/10 transition-colors">
                            <td className="py-4 pr-4">
                              <div className="w-14 h-14 rounded-lg overflow-hidden border border-pink-50 shrink-0">
                                <img
                                  src={`http://localhost:5000/uploads/${p.image}`}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>
                            <td className="py-4 pr-4">
                              <div className="font-semibold text-gray-800 line-clamp-1 max-w-[200px]" title={p.name}>
                                {p.name}
                              </div>
                              <div className="text-xs text-gray-400 line-clamp-1 max-w-[200px] mt-0.5" title={p.description}>
                                {p.description || "Fresh cut arrangement."}
                              </div>
                            </td>
                            <td className="py-4 pr-4 font-semibold text-gray-700 font-sans">
                              Rs. {p.price}
                            </td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Delete Product"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

    </div>
  );
};

export default Admin;