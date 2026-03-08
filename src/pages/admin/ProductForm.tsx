import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Upload, X } from "lucide-react";
import { categories } from "@/data/products";

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const { admin, loading } = useAdmin();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    description: "",
    price: "",
    original_price: "",
    age_min: "2",
    age_max: "5",
    category: "Building",
    in_stock: true,
    rating: "4.5",
    badge: "",
    video: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !admin) {
      navigate("/admin/login");
    }
  }, [admin, loading, navigate]);

  useEffect(() => {
    if (isEdit && admin) {
      loadProduct();
    }
  }, [isEdit, admin]);

  const loadProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setFormData({
        name: data.name,
        name_ar: data.name_ar || "",
        description: data.description,
        price: data.price.toString(),
        original_price: data.original_price?.toString() || "",
        age_min: data.age_min.toString(),
        age_max: data.age_max.toString(),
        category: data.category,
        in_stock: data.in_stock,
        rating: data.rating.toString(),
        badge: data.badge || "",
        video: data.video || "",
      });

      setImages(data.images || [data.image]);
    } catch (error) {
      console.error("Error loading product:", error);
      alert("Error loading product");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles([...imageFiles, ...files]);
    
    // Preview images
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Upload new images
      let finalImages = images.filter(img => img.startsWith("http"));
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImages();
        finalImages = [...finalImages, ...uploadedUrls];
      }

      if (finalImages.length === 0) {
        alert("Please add at least one image");
        setSubmitting(false);
        return;
      }

      const productData = {
        name: formData.name,
        name_ar: formData.name_ar || null,
        description: formData.description,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        image: finalImages[0],
        images: finalImages,
        video: formData.video || null,
        age_min: parseInt(formData.age_min),
        age_max: parseInt(formData.age_max),
        category: formData.category,
        in_stock: formData.in_stock,
        rating: parseFloat(formData.rating),
        badge: formData.badge || null,
        updated_at: new Date().toISOString(),
      };

      if (isEdit) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", id);

        if (error) throw error;
        alert("Product updated successfully!");
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData]);

        if (error) throw error;
        alert("Product added successfully!");
      }

      navigate("/admin/products");
    } catch (error: any) {
      console.error("Error saving product:", error);
      alert("Error saving product: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/products"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-2xl font-bold">
              {isEdit ? "Edit Product" : "Add New Product"}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 space-y-6">
          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Images</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-border">
                  <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">Add at least 3 images. First image will be the main image.</p>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name (English)</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Name (Arabic)</label>
              <input
                type="text"
                value={formData.name_ar}
                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              rows={3}
              required
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price (EGP)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Original Price (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={formData.original_price}
                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              />
            </div>
          </div>

          {/* Age Range & Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Min Age</label>
              <input
                type="number"
                value={formData.age_min}
                onChange={(e) => setFormData({ ...formData, age_min: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Age</label>
              <input
                type="number"
                value={formData.age_max}
                onChange={(e) => setFormData({ ...formData, age_max: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                required
              >
                {categories.filter(c => c !== "All").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Badge (Optional)</label>
              <select
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="">None</option>
                <option value="Best Seller">Best Seller</option>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Popular">Popular</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock Status</label>
              <select
                value={formData.in_stock.toString()}
                onChange={(e) => setFormData({ ...formData, in_stock: e.target.value === "true" })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Video */}
          <div>
            <label className="block text-sm font-medium mb-2">Video URL (Optional)</label>
            <input
              type="url"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              placeholder="https://www.youtube.com/embed/..."
            />
            <p className="text-sm text-muted-foreground mt-1">YouTube or Vimeo embed URL</p>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 rounded-lg bg-gradient-hero text-primary-foreground font-display font-bold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {submitting ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
            </button>
            <Link
              to="/admin/products"
              className="px-6 py-3 rounded-lg border border-input hover:bg-muted transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
