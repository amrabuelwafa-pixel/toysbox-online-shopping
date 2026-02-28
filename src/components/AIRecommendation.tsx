import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";

export function AIRecommendation() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="py-8 md:py-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4">
            <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-purple-600 dark:text-purple-400" />
            <span className="font-display font-semibold text-sm md:text-base text-purple-600 dark:text-purple-400">
              {t("aiPowered")}
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 px-4">
            {t("aiRecommendationTitle")}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 mb-6 md:mb-8">
            {t("aiChatDesc")}
          </p>
          <Button
            onClick={() => navigate("/recommendations")}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-display font-semibold shadow-lg text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
          >
            <Sparkles className="w-5 h-5 me-2" />
            {t("getToyRecommendations")}
          </Button>
        </div>
      </div>
    </div>
  );
}
