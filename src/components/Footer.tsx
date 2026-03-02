import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-primary-foreground/80 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <span className="font-display text-lg md:text-xl font-bold text-primary-foreground flex items-center gap-2">
              🧸 ToyBox Egypt
            </span>
            <p className="mt-2 md:mt-3 text-xs md:text-sm font-body leading-relaxed">
              {t("footerDesc")}
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-2 md:mb-3 text-sm md:text-base">{t("quickLinks")}</h4>
            <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm">
              <Link to="/" className="hover:text-accent transition-colors">{t("home")}</Link>
              <Link to="/products" className="hover:text-accent transition-colors">{t("shopAll")}</Link>
              <Link to="/about" className="hover:text-accent transition-colors">{t("about")}</Link>
              <Link to="/return-policy" className="hover:text-accent transition-colors">{t("returnPolicy")}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-2 md:mb-3 text-sm md:text-base">{t("contact")}</h4>
            <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm">
              <span>📧 hello@toyboxegypt.com</span>
              <span>📱 +20 100 123 4567</span>
              <span>📍 Cairo, Egypt</span>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-xs md:text-sm">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
