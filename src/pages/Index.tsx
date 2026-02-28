import { HeroSection } from "@/components/HeroSection";
import { AgeCategories } from "@/components/AgeCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AIRecommendation } from "@/components/AIRecommendation";
import { CategorySearch } from "@/components/CategorySearch";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <AgeCategories />
      <CategorySearch />
      <AIRecommendation />
      <FeaturedProducts />
    </div>
  );
};

export default Index;
