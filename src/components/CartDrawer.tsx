import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, totalPrice, updateQuantity, removeFromCart } = useCart();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-foreground/40 z-50"
          />
          <motion.div
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className={`fixed ${isRTL ? "left-0" : "right-0"} top-0 h-full w-full max-w-sm md:max-w-md bg-card z-50 shadow-2xl flex flex-col`}
          >
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-border">
              <h2 className="font-display text-lg md:text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-4 md:w-5 h-4 md:h-5 text-primary" /> {t("cart")}
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 md:p-2 rounded-lg hover:bg-muted">
                <X className="w-4 md:w-5 h-4 md:h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 md:p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-4xl md:text-5xl mb-3 md:mb-4">🛒</span>
                  <p className="font-display font-semibold text-base md:text-lg text-foreground/60">{t("yourCartEmpty")}</p>
                  <p className="text-muted-foreground text-xs md:text-sm mt-1">{t("addSomeFun")}</p>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-2 md:gap-3 bg-muted/50 rounded-xl p-2 md:p-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 md:w-20 h-16 md:h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-xs md:text-sm truncate">{item.product.name}</h4>
                        <p className="text-primary font-bold text-xs md:text-sm">{item.product.price} {t("egp")}</p>
                        <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-0.5 md:p-1 rounded-md bg-card hover:bg-border transition-colors"
                          >
                            <Minus className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          </button>
                          <span className="font-semibold text-xs md:text-sm w-5 md:w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-0.5 md:p-1 rounded-md bg-card hover:bg-border transition-colors"
                          >
                            <Plus className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ms-auto p-0.5 md:p-1 text-destructive hover:bg-destructive/10 rounded-md"
                          >
                            <Trash2 className="w-3 md:w-3.5 h-3 md:h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-3 md:p-4 border-t border-border">
                <div className="flex justify-between mb-3 md:mb-4">
                  <span className="font-display font-semibold text-sm md:text-base">{t("total")}</span>
                  <span className="font-display font-bold text-lg md:text-xl text-primary">{totalPrice} {t("egp")}</span>
                </div>
                <button
                  onClick={() => { setIsCartOpen(false); navigate("/checkout"); }}
                  className="w-full py-2.5 md:py-3 rounded-xl bg-gradient-hero text-primary-foreground font-display font-bold text-base md:text-lg shadow-button hover:brightness-110 transition-all"
                >
                  {t("checkout")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
