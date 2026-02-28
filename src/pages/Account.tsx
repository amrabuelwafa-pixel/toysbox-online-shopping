import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, LogOut, Edit2, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Account() {
  const { t } = useLanguage();
  const { user, logout, updateProfile, orders } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    updateProfile({ name, phone });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "confirmed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {t("myAccount")}
          </h1>
          <p className="text-muted-foreground">
            {t("manageAccountAndOrders")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t("profile")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="name">{t("fullName")}</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      className="flex-1"
                      size="sm"
                    >
                      <Save className="w-4 h-4 me-2" />
                      {t("save")}
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("fullName")}</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("email")}</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground">{t("phone")}</p>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                  )}
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4 me-2" />
                    {t("editProfile")}
                  </Button>
                </>
              )}

              <div className="pt-4 border-t">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full"
                  size="sm"
                >
                  <LogOut className="w-4 h-4 me-2" />
                  {t("logout")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Orders */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  {t("orderHistory")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="font-display font-semibold text-lg mb-2">
                      {t("noOrders")}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {t("startShopping")}
                    </p>
                    <Button onClick={() => navigate("/products")}>
                      {t("shopNow")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-display font-semibold">
                              {t("order")} #{order.id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {t(order.status)}
                          </span>
                        </div>

                        <div className="space-y-2 mb-3">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.productName} x{item.quantity}
                              </span>
                              <span className="font-semibold">
                                {item.price * item.quantity} {t("egp")}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t">
                          <span className="font-display font-semibold">
                            {t("total")}
                          </span>
                          <span className="font-display font-bold text-lg text-primary">
                            {order.total} {t("egp")}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
