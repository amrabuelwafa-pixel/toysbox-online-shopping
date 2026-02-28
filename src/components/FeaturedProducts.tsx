import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturedProducts() {
  const { t } = useLanguage();
  const featured = products.filter((p) => p.badge).slice(0, 8);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">{t("featuredToys")}</h2>
            <p className="text-muted-foreground font-body mt-1 text-sm md:text-base">{t("popularPicks")}</p>
          </div>
          <Link
            to="/products"
            className="hidden md:inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 rounded-xl border-2 border-primary text-primary font-display font-semibold text-sm md:text-base hover:bg-primary hover:text-primary-foreground transition-all"
          >
            {t("viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center md:hidden">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold shadow-button text-sm"
          >
            {t("viewAllToys")}
          </Link>
        </div>
      </div>
    </section>
  );
}
