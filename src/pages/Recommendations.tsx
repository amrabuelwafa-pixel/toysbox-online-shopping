import { useState } from "react";
import { Sparkles, Loader2, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Recommendations() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [recommendations, setRecommendations] = useState<typeof products>([]);

  const analyzeUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Extract age from input
    const ageMatch = lowerInput.match(/(\d+)\s*(year|سنة|سنوات)/);
    const age = ageMatch ? parseInt(ageMatch[1]) : null;
    
    // Detect interests and categories
    const interests = {
      building: /build|construct|lego|block|بناء|مكعبات/i.test(input),
      educational: /learn|educat|smart|ذكي|تعليم/i.test(input),
      creative: /art|draw|paint|color|فن|رسم|تلوين/i.test(input),
      stem: /science|robot|engineer|stem|علوم|روبوت/i.test(input),
      music: /music|instrument|sound|موسيقى/i.test(input),
      outdoor: /outdoor|sport|ball|خارجي|رياضة/i.test(input),
      pretend: /pretend|kitchen|doctor|تخيل|مطبخ/i.test(input),
      vehicles: /car|truck|train|سيارة|قطار/i.test(input),
      puzzles: /puzzle|jigsaw|ألغاز/i.test(input),
      plush: /soft|teddy|plush|دمية|قطيفة/i.test(input),
    };

    return { age, interests };
  };

  const getRecommendations = (input: string) => {
    setLoading(true);
    
    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setUserInput("");

    // Simulate AI processing
    setTimeout(() => {
      const analysis = analyzeUserInput(input);
      
      // Filter products based on analysis
      let filtered = products.filter(p => p.inStock);
      
      // Filter by age if detected
      if (analysis.age) {
        filtered = filtered.filter(p => 
          p.ageRange[0] <= analysis.age! && p.ageRange[1] >= analysis.age!
        );
      }

      // Sort by matching interests
      filtered = filtered.sort((a, b) => {
        let aScore = 0;
        let bScore = 0;

        // Check category matches
        if (analysis.interests.building && (a.category === "Building" || b.category === "Building")) {
          if (a.category === "Building") aScore += 3;
          if (b.category === "Building") bScore += 3;
        }
        if (analysis.interests.educational && (a.category === "Educational" || b.category === "Educational")) {
          if (a.category === "Educational") aScore += 3;
          if (b.category === "Educational") bScore += 3;
        }
        if (analysis.interests.creative && (a.category === "Creative" || b.category === "Creative")) {
          if (a.category === "Creative") aScore += 3;
          if (b.category === "Creative") bScore += 3;
        }
        if (analysis.interests.stem && (a.category === "STEM" || b.category === "STEM")) {
          if (a.category === "STEM") aScore += 3;
          if (b.category === "STEM") bScore += 3;
        }
        if (analysis.interests.music && (a.category === "Musical" || b.category === "Musical")) {
          if (a.category === "Musical") aScore += 3;
          if (b.category === "Musical") bScore += 3;
        }
        if (analysis.interests.outdoor && (a.category === "Outdoor" || b.category === "Outdoor")) {
          if (a.category === "Outdoor") aScore += 3;
          if (b.category === "Outdoor") bScore += 3;
        }
        if (analysis.interests.pretend && (a.category === "Pretend Play" || b.category === "Pretend Play")) {
          if (a.category === "Pretend Play") aScore += 3;
          if (b.category === "Pretend Play") bScore += 3;
        }
        if (analysis.interests.vehicles && (a.category === "Vehicles" || b.category === "Vehicles")) {
          if (a.category === "Vehicles") aScore += 3;
          if (b.category === "Vehicles") bScore += 3;
        }
        if (analysis.interests.puzzles && (a.category === "Puzzles" || b.category === "Puzzles")) {
          if (a.category === "Puzzles") aScore += 3;
          if (b.category === "Puzzles") bScore += 3;
        }
        if (analysis.interests.plush && (a.category === "Plush" || b.category === "Plush")) {
          if (a.category === "Plush") aScore += 3;
          if (b.category === "Plush") bScore += 3;
        }

        // Check description matches
        Object.entries(analysis.interests).forEach(([key, value]) => {
          if (value) {
            if (a.description.toLowerCase().includes(key)) aScore += 1;
            if (b.description.toLowerCase().includes(key)) bScore += 1;
          }
        });

        // Add rating as tiebreaker
        aScore += a.rating * 0.1;
        bScore += b.rating * 0.1;

        return bScore - aScore;
      });

      const topRecommendations = filtered.slice(0, 8);
      setRecommendations(topRecommendations);

      // Generate AI response
      let responseText = "";
      if (topRecommendations.length > 0) {
        if (analysis.age) {
          responseText = t("aiResponseWithAge").replace("{age}", analysis.age.toString()).replace("{count}", topRecommendations.length.toString());
        } else {
          responseText = t("aiResponseNoAge").replace("{count}", topRecommendations.length.toString());
        }
      } else {
        responseText = t("aiResponseNoResults");
      }

      setMessages([...newMessages, { role: "assistant", content: responseText }]);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && !loading) {
      getRecommendations(userInput);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 md:px-5 py-2 md:py-2.5 rounded-full mb-4 md:mb-6">
            <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-purple-600 dark:text-purple-400" />
            <span className="font-display font-semibold text-sm md:text-base text-purple-600 dark:text-purple-400">
              {t("aiPowered")}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            {t("aiRecommendationTitle")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("aiChatDesc")}
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {/* Messages */}
            <div className="h-[400px] md:h-[500px] overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageCircle className="w-12 md:w-16 h-12 md:h-16 text-purple-400 mb-4" />
                  <p className="font-display font-semibold text-lg md:text-xl mb-2">
                    {t("startConversation")}
                  </p>
                  <p className="text-muted-foreground text-sm md:text-base max-w-md">
                    {t("conversationExamples")}
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 md:px-5 py-3 md:py-4 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                    </div>
                  </motion.div>
                ))
              )}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-2xl px-5 py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-border p-4 md:p-6">
              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t("chatPlaceholder")}
                  disabled={loading}
                  className="flex-1 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base rounded-xl bg-background border-2 border-border focus:border-primary outline-none transition-colors disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={!userInput.trim() || loading}
                  className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Send className="w-4 md:w-5 h-4 md:h-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-6 md:mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  {t("recommendedForYou")} ✨
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  {recommendations.length} {t("toysFound")}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {recommendations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
