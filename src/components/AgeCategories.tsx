import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingBag } from "lucide-react";

export function AgeCategories() {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            {t("shopByAgeAndCategory")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8">
            {t("shopByAgeAndCategoryDesc")}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-hero text-primary-foreground font-display font-semibold text-base md:text-lg hover:brightness-110 transition-all shadow-button"
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {t("browseAllToys")}
          </Link>
        </div>
      </div>
    </section>
  );
}
