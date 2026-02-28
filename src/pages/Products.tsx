import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, ageGroups, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Products() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get("category") || "All";
  });
  const [selectedAge, setSelectedAge] = useState<{ min: number; max: number } | null>(() => {
    const min = searchParams.get("ageMin");
    const max = searchParams.get("ageMax");
    return min && max ? { min: Number(min), max: Number(max) } : null;
  });
  const [showFilters, setShowFilters] = useState(() => {
    // Auto-show filters if category or age is pre-selected from URL
    return !!(searchParams.get("category") || searchParams.get("ageMin"));
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesAge = !selectedAge ||
        (p.ageRange[0] <= selectedAge.max && p.ageRange[1] >= selectedAge.min);
      return matchesSearch && matchesCategory && matchesAge;
    });
  }, [search, selectedCategory, selectedAge]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedAge(null);
  };

  const hasFilters = search || selectedCategory !== "All" || selectedAge;

  return (
    <div className="min-h-screen">
      {/* Search Bar */}
      <div className="bg-gradient-hero py-8 md:py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground text-center mb-4 md:mb-6">
            {t("findPerfectToy")}
          </h1>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute start-3 md:start-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full ps-10 md:ps-12 pe-3 md:pe-4 py-3 md:py-3.5 text-sm md:text-base rounded-xl bg-card text-foreground font-body border-0 outline-none ring-2 ring-transparent focus:ring-accent shadow-card transition-all"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <p className="text-muted-foreground font-body text-sm md:text-base">
            <span className="font-semibold text-foreground">{filtered.length}</span> {t("toysFound")}
          </p>
          <div className="flex items-center gap-2">
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs md:text-sm text-destructive font-semibold">
                <X className="w-3 md:w-4 h-3 md:h-4" /> {t("clear")}
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-muted font-display font-semibold text-xs md:text-sm hover:bg-muted/80"
            >
              <SlidersHorizontal className="w-3 md:w-4 h-3 md:h-4" /> {t("filters")}
            </button>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-card rounded-2xl p-4 md:p-5 shadow-card space-y-4 md:space-y-5">
                <div>
                  <h3 className="font-display font-semibold mb-3 text-sm md:text-base">{t("ageGroup")}</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedAge(null)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                        !selectedAge ? "bg-primary text-primary-foreground shadow-button" : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {t("allAges")}
                    </button>
                    {ageGroups.map((g) => (
                      <button
                        key={g.label}
                        onClick={() => setSelectedAge({ min: g.min, max: g.max })}
                        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                          selectedAge?.min === g.min ? "bg-primary text-primary-foreground shadow-button" : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {g.emoji} {t(g.label as any)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-3 text-sm md:text-base">{t("category")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                          selectedCategory === cat ? "bg-secondary text-secondary-foreground shadow-button" : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {t(cat as any)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20">
            <span className="text-4xl md:text-5xl block mb-3 md:mb-4">😢</span>
            <p className="font-display text-lg md:text-xl font-semibold">{t("noToysFound")}</p>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">{t("tryAdjusting")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
