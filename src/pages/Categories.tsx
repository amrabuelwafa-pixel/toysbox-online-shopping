import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Heart, Globe, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-hero py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {t("aboutTitle")}
          </h1>
          <p className="text-primary-foreground/80 font-body text-lg max-w-2xl mx-auto">
            {t("aboutSubtitle")}
          </p>
        </motion.div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-bold mb-6">{t("ourStory")}</h2>
            <p className="text-foreground/80 font-body text-lg leading-relaxed mb-4">
              {t("ourStoryP1")}
            </p>
            <p className="text-foreground/80 font-body text-lg leading-relaxed">
              {t("ourStoryP2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-10">{t("whyToyBox")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Globe, title: t("uniqueSelection"), desc: t("uniqueSelectionDesc"), color: "bg-primary text-primary-foreground" },
              { icon: Heart, title: t("safeTrusted"), desc: t("safeTrustedDesc"), color: "bg-secondary text-secondary-foreground" },
              { icon: Truck, title: t("fastDelivery"), desc: t("fastDeliveryDesc"), color: "bg-accent text-accent-foreground" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-card"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold mb-4">{t("contactUs")}</h2>
          <p className="text-muted-foreground font-body text-lg mb-8">
            {t("contactDesc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://facebook.com/ToyBoxEgypt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[hsl(220,46%,48%)] text-primary-foreground font-display font-semibold hover:brightness-110 transition-all shadow-button w-full sm:w-auto justify-center"
            >
              <Facebook className="w-5 h-5" /> {t("facebook")}
            </a>
            <a
              href="https://instagram.com/ToyBoxEgypt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-toy-pink text-primary-foreground font-display font-semibold hover:brightness-110 transition-all shadow-button w-full sm:w-auto justify-center"
            >
              <Instagram className="w-5 h-5" /> {t("instagram")}
            </a>
            <a
              href="mailto:hello@toyboxegypt.com"
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:brightness-110 transition-all shadow-button w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5" /> {t("emailUs")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
