import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Package } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  total: number;
  status: string;
  created_at: string;
  items: any[];
}

export default function OrderManagement() {
  const { admin, loading } = useAdmin();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!loading && !admin) {
      navigate("/admin/login");
    }
  }, [admin, loading, navigate]);

  useEffect(() => {
    if (admin) {
      loadOrders();
    }
  }, [admin]);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error: any) {
      alert("Error updating order: " + error.message);
    }
  };

  const filteredOrders = filter === "all"
    ? orders
    : orders.filter(order => order.status === filter);

  if (loading || loadingOrders) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading orders...</p>
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
            <h1 className="font-display text-2xl font-bold">Order Management</h1>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {["all", "pending", "confirmed", "shipped", "delivered", "cancelled"].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  filter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg">{order.customer_name}</h3>
                    <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-primary">{order.total} EGP</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg font-medium ${
                        order.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                        order.status === "confirmed" ? "bg-blue-500/10 text-blue-500" :
                        order.status === "shipped" ? "bg-purple-500/10 text-purple-500" :
                        order.status === "delivered" ? "bg-green-500/10 text-green-500" :
                        "bg-red-500/10 text-red-500"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span className="font-medium">{item.price * item.quantity} EGP</span>
                      </div>
                    ))}
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
