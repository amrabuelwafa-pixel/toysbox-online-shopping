import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-secondary text-secondary-foreground",
  "New": "bg-primary text-primary-foreground",
  "Sale": "bg-destructive text-destructive-foreground",
  "Popular": "bg-accent text-accent-foreground",
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-2 md:top-3 start-2 md:start-3 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold font-display ${badgeColors[product.badge] || "bg-muted text-muted-foreground"}`}>
            {t(product.badge as any)}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="bg-card px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-display font-bold text-xs md:text-sm text-foreground">{t("outOfStock")}</span>
          </div>
        )}
      </Link>

      <div className="p-3 md:p-4">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 md:w-3.5 h-3 md:h-3.5 fill-accent text-accent" />
          <span className="text-xs md:text-sm font-semibold text-foreground/70">{product.rating}</span>
          <span className="text-[10px] md:text-xs text-muted-foreground ms-1">{t("ages")} {product.ageRange[0]}–{product.ageRange[1]}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-sm md:text-base text-foreground line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-1 font-body">{product.description}</p>

        <div className="flex items-center justify-between mt-2 md:mt-3">
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="font-display font-bold text-base md:text-lg text-primary">{product.price} {t("egp")}</span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-muted-foreground line-through">{product.originalPrice}</span>
            )}
          </div>

          <button
            onClick={() => product.inStock && addToCart(product)}
            disabled={!product.inStock}
            className="p-2 md:p-2.5 rounded-xl bg-primary text-primary-foreground hover:brightness-110 transition-all shadow-button disabled:opacity-40 disabled:shadow-none"
          >
            <ShoppingCart className="w-3.5 md:w-4 h-3.5 md:h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
