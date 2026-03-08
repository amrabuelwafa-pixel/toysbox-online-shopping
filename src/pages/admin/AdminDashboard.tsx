import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/lib/supabase";
import { Package, ShoppingCart, DollarSign, AlertTriangle, LogOut, Plus } from "lucide-react";

export default function AdminDashboard() {
  const { admin, logout, loading } = useAdmin();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    lowStock: 0,
  });

  useEffect(() => {
    if (!loading && !admin) {
      navigate("/admin/login");
    }
  }, [admin, loading, navigate]);

  useEffect(() => {
    if (admin) {
      loadStats();
    }
  }, [admin]);

  const loadStats = async () => {
    try {
      const { count: productCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      const { count: orderCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

      const { data: orders } = await supabase
        .from("orders")
        .select("total");

      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

      const { count: lowStockCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("in_stock", false);

      setStats({
        totalProducts: productCount || 0,
        totalOrders: orderCount || 0,
        revenue: totalRevenue,
        lowStock: lowStockCount || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
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
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">ToyBox Admin</h1>
            <p className="text-sm text-muted-foreground">Welcome, {admin.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold">{stats.totalProducts}</span>
            </div>
            <p className="text-muted-foreground">Total Products</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold">{stats.totalOrders}</span>
            </div>
            <p className="text-muted-foreground">Total Orders</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold">{stats.revenue.toFixed(0)}</span>
            </div>
            <p className="text-muted-foreground">Revenue (EGP)</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <span className="text-3xl font-bold">{stats.lowStock}</span>
            </div>
            <p className="text-muted-foreground">Out of Stock</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold">Manage Products</h2>
            </div>
            <p className="text-muted-foreground">
              Add, edit, or remove products from your catalog
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="font-display text-2xl font-bold">View Orders</h2>
            </div>
            <p className="text-muted-foreground">
              Manage customer orders and update status
            </p>
          </Link>
        </div>

        {/* Quick Add Product */}
        <div className="mt-8">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-hero text-primary-foreground font-display font-bold hover:brightness-110 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  );
}
