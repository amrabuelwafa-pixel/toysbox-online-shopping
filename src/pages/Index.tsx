import { HeroSection } from "@/components/HeroSection";
import { AgeCategories } from "@/components/AgeCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AIRecommendation } from "@/components/AIRecommendation";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <AgeCategories />
      <AIRecommendation />
      <FeaturedProducts />
    </div>
  );
};

export default Index;
