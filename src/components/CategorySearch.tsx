import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/products";
import { motion } from "framer-motion";
import { 
  Blocks, 
  GraduationCap, 
  Heart, 
  Car, 
  Palette, 
  Puzzle, 
  Baby, 
  Home, 
  Atom, 
  Music, 
  Users, 
  TreePine,
  Grid3x3
} from "lucide-react";

const categoryIcons: Record<string, any> = {
  "All": Grid3x3,
  "Building": Blocks,
  "Educational": GraduationCap,
  "Plush": Heart,
  "Vehicles": Car,
  "Creative": Palette,
  "Puzzles": Puzzle,
  "Baby": Baby,
  "Pretend Play": Home,
  "STEM": Atom,
  "Musical": Music,
  "Dolls": Users,
  "Outdoor": TreePine,
};

export function CategorySearch() {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            {t("searchByCategory")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            {t("searchByCategoryDesc")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.filter(cat => cat !== "All").map((category, index) => {
            const Icon = categoryIcons[category] || Grid3x3;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="group block bg-card rounded-2xl p-4 md:p-5 shadow-card hover:shadow-button transition-all hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <span className="font-display font-semibold text-xs md:text-sm">
                      {t(category as any)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-6 md:mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:brightness-110 transition-all shadow-button"
          >
            <Grid3x3 className="w-5 h-5" />
            {t("viewAllProducts")}
          </Link>
        </div>
      </div>
    </section>
  );
}
