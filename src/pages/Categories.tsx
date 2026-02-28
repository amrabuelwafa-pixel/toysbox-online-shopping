import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/products";
import { motion } from "framer-motion";
import { Blocks, GraduationCap, Heart, Car, Palette, Puzzle, Baby, Home, Atom, Music, Users, TreePine, Grid3x3 } from "lucide-react";

const categoryIcons: Record<string, any> = {
  "All": Grid3x3, "Building": Blocks, "Educational": GraduationCap, "Plush": Heart, "Vehicles": Car, "Creative": Palette,
  "Puzzles": Puzzle, "Baby": Baby, "Pretend Play": Home, "STEM": Atom, "Musical": Music, "Dolls": Users, "Outdoor": TreePine,
};

export default function Categories() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            {t("categories")}
          </h1>
          <p className="text-primary-foreground/90 text-base md:text-lg max-w-2xl mx-auto">
            {t("categoriesPageDesc")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.filter(cat => cat !== "All").map((category, index) => {
            const Icon = categoryIcons[category] || Grid3x3;
            return (
              <motion.div key={category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Link to={`/products?category=${encodeURIComponent(category)}`} className="group block bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-button transition-all hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <span className="font-display font-semibold text-sm md:text-base">{t(category as any)}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
