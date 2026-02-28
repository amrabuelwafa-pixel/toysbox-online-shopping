import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ageGroups } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

const colors = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-accent-foreground",
  "bg-toy-pink text-primary-foreground",
];

export function AgeCategories() {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">{t("shopByAge")}</h2>
        <p className="text-muted-foreground text-center mb-8 md:mb-10 font-body text-sm md:text-base">{t("shopByAgeDesc")}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ageGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/products?ageMin=${group.min}&ageMax=${group.max}`}
                className={`block rounded-xl md:rounded-2xl p-4 md:p-6 text-center ${colors[i]} hover:scale-105 transition-transform shadow-card`}
              >
                <span className="text-3xl md:text-4xl mb-2 md:mb-3 block">{group.emoji}</span>
                <span className="font-display font-bold text-sm md:text-lg">{t(group.label as "2-3 years" | "4-6 years" | "7-9 years" | "10-12 years")}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
