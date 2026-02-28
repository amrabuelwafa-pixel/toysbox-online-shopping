import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-toys.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Colorful kids toys" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent rtl:bg-gradient-to-l" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground font-display font-semibold text-sm mb-4"
          >
            {t("heroTag")}
          </motion.span>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-3 md:mb-4">
            {t("heroTitle1")}{" "}
            <span className="text-accent">{t("heroTitle2")}</span>
          </h1>

          <p className="text-primary-foreground/80 font-body text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-md">
            {t("heroDesc")}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold shadow-button hover:brightness-110 transition-all text-center"
            >
              {t("shopNow")}
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-foreground/20 backdrop-blur text-primary-foreground font-display font-semibold border border-primary-foreground/30 hover:bg-primary-foreground/30 transition-all text-center"
            >
              {t("browseByAge")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
