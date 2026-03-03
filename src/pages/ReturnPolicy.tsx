import { useLanguage } from "@/contexts/LanguageContext";
import { Package, Clock, RefreshCw, AlertCircle } from "lucide-react";

export default function ReturnPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            {t("returnPolicy")}
          </h1>
          <p className="text-primary-foreground/90 text-base md:text-lg max-w-2xl mx-auto">
            {t("returnPolicySubtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="space-y-8">
          {/* 14-Day Return */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
                  {t("returnPeriod")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("returnPeriodDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Allowed Products for Return */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border-2 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
                  {t("allowedProducts")}
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{t("allowedProduct1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{t("allowedProduct2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{t("allowedProduct3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{t("allowedProduct4")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Conditions */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
                  {t("returnConditions")}
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{t("returnCondition1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{t("returnCondition2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{t("returnCondition3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{t("returnCondition4")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
                  {t("returnProcess")}
                </h2>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary">1.</span>
                    <span>{t("returnStep1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary">2.</span>
                    <span>{t("returnStep2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary">3.</span>
                    <span>{t("returnStep3")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-primary">4.</span>
                    <span>{t("returnStep4")}</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border-2 border-destructive/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
                  {t("nonReturnableItems")}
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span>{t("nonReturnable1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span>{t("nonReturnable2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span>{t("nonReturnable3")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-hero rounded-2xl p-6 md:p-8 text-center text-primary-foreground">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-3">
              {t("questionsAboutReturns")}
            </h3>
            <p className="mb-4 opacity-90">{t("contactUsForReturns")}</p>
            <a 
              href="mailto:returns@toyboxegypt.com" 
              className="inline-block px-6 py-3 bg-white text-primary font-display font-semibold rounded-xl hover:brightness-110 transition-all"
            >
              returns@toyboxegypt.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
