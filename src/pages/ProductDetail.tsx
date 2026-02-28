import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();
  const { t } = useLanguage();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-4">🤔</span>
          <p className="font-display text-xl font-semibold">{t("productNotFound")}</p>
          <Link to="/products" className="text-primary underline mt-2 inline-block">{t("backToShop")}</Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground font-body font-semibold mb-4 md:mb-6">
          <ArrowLeft className="w-3.5 md:w-4 h-3.5 md:h-4 rtl:rotate-180" /> {t("backToShop")}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-muted"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {product.badge && (
              <span className="inline-flex self-start px-2.5 md:px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold font-display mb-2 md:mb-3">
                {t(product.badge as any)}
              </span>
            )}

            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2 md:mt-3 text-sm md:text-base">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 md:w-4 h-3.5 md:h-4 fill-accent text-accent" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground font-body">{t("ages")} {product.ageRange[0]}–{product.ageRange[1]}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground font-body">{t(product.category as any)}</span>
            </div>

            <div className="flex items-baseline gap-2 md:gap-3 mt-4 md:mt-6">
              <span className="font-display font-bold text-2xl md:text-3xl text-primary">{product.price} {t("egp")}</span>
              {product.originalPrice && (
                <span className="text-lg md:text-xl text-muted-foreground line-through">{product.originalPrice} {t("egp")}</span>
              )}
            </div>

            <p className="text-foreground/80 font-body text-sm md:text-base lg:text-lg mt-3 md:mt-4 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                <Truck className="w-3.5 md:w-4 h-3.5 md:h-4 text-secondary" /> {t("freeDelivery")}
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                <Shield className="w-3.5 md:w-4 h-3.5 md:h-4 text-secondary" /> {t("safeNonToxic")}
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                <RotateCcw className="w-3.5 md:w-4 h-3.5 md:h-4 text-secondary" /> {t("returnPolicy")}
              </div>
            </div>

            <div className="mt-6 md:mt-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-hero text-primary-foreground font-display font-bold text-base md:text-lg shadow-button hover:brightness-110 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 md:w-5 h-4 md:h-5" />
                {product.inStock ? t("addToCart") : t("outOfStock")}
              </button>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6">{t("youMightLike")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
