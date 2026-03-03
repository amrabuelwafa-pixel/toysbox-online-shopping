import { Link } from "react-router-dom";
import { ShoppingCart, Search, Globe, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { t, lang, setLang } = useLanguage();

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🧸</span>
          <span className="font-display text-xl font-bold text-gradient-hero">
            ToyBox Egypt
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-body font-semibold text-foreground/80 hover:text-primary transition-colors">
            {t("home")}
          </Link>
          <Link to="/products" className="font-body font-semibold text-foreground/80 hover:text-primary transition-colors">
            {t("shop")}
          </Link>
          <Link to="/recommendations" className="font-body font-semibold text-foreground/80 hover:text-primary transition-colors">
            {t("recommendations")}
          </Link>
          <Link to="/about" className="font-body font-semibold text-foreground/80 hover:text-primary transition-colors">
            {t("about")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/products" className="p-2 rounded-lg hover:bg-muted transition-colors hidden md:flex">
            <Search className="w-5 h-5 text-foreground/70" />
          </Link>
          
          {isAuthenticated ? (
            <Link to="/account" className="p-2 rounded-lg hover:bg-muted transition-colors" title={user?.name}>
              <User className="w-5 h-5 text-foreground/70" />
            </Link>
          ) : (
            <Link to="/login" className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:brightness-110 transition-all">
              {t("login")}
            </Link>
          )}
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground/70" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
          <button
            onClick={toggleLang}
            className="p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-1"
            title={lang === "en" ? "العربية" : "English"}
          >
            <Globe className="w-5 h-5 text-foreground/70" />
            <span className="text-xs font-bold text-foreground/70 hidden sm:inline">
              {lang === "en" ? "AR" : "EN"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
