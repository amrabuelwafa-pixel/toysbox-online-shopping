import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
}

export default function ProductManagement() {
  const { admin, loading } = useAdmin();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!loading && !admin) {
      navigate("/admin/login");
    }
  }, [admin, loading, navigate]);

  useEffect(() => {
    if (admin) {
      loadProducts();
    }
  }, [admin]);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, image, category, in_stock")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== id));
      alert("Product deleted successfully!");
    } catch (error: any) {
      alert("Error deleting product: " + error.message);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || loadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/admin/dashboard"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-2xl font-bold">Product Management</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
              />
            </div>

            <Link
              to="/admin/products/new"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-hero text-primary-foreground font-display font-bold hover:brightness-110 transition-all whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-xl overflow-hidden shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display font-bold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-bold text-xl">{product.price} EGP</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      product.in_stock
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}>
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <span className="inline-block px-2 py-1 rounded bg-muted text-xs mb-4">
                    {product.category}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
