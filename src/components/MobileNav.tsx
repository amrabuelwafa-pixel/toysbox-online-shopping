import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Sparkles, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MobileNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, label: t("home") },
    { path: "/products", icon: ShoppingBag, label: t("shop") },
    { path: "/recommendations", icon: Sparkles, label: t("recommendations") },
    { path: "/about", icon: Info, label: t("about") },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
