import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, CreditCard, Smartphone, ArrowLeft, ShoppingBag, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitted, setSubmitted] = useState(false);

  const shippingFee = totalPrice >= 500 ? 0 : 50;
  const grandTotal = totalPrice + shippingFee;

  if (items.length === 0 && !submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🛒</span>
        <h1 className="font-display text-2xl font-bold mb-2">{t("cartEmpty")}</h1>
        <p className="text-muted-foreground mb-6">{t("addToysFirst")}</p>
        <Button onClick={() => navigate("/products")} className="bg-gradient-hero text-primary-foreground font-display font-bold shadow-button">
          {t("browseToys")}
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-20 text-center max-w-lg"
      >
        <CheckCircle2 className="w-20 h-20 text-secondary mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">{t("orderPlaced")}</h1>
        <p className="text-muted-foreground mb-6">{t("orderThanks")}</p>
        <Button onClick={() => navigate("/")} className="bg-gradient-hero text-primary-foreground font-display font-bold shadow-button">
          {t("backToHome")}
        </Button>
      </motion.div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground mb-4 md:mb-6 transition-colors">
        <ArrowLeft className="w-3.5 md:w-4 h-3.5 md:h-4 rtl:rotate-180" /> {t("back")}
      </button>

      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
        <ShoppingBag className="w-6 md:w-8 h-6 md:h-8 text-primary" /> {t("checkoutTitle")}
      </h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-4 md:gap-6">
        {/* Left: Form */}
        <div className="md:col-span-3 space-y-4 md:space-y-6">
          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base md:text-lg">{t("shippingInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("firstName")}</Label>
                  <Input id="firstName" required placeholder={t("firstName")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("lastName")}</Label>
                  <Input id="lastName" required placeholder={t("lastName")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("phoneNumber")}</Label>
                <Input id="phone" type="tel" required placeholder="01xxxxxxxxx" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("emailOptional")}</Label>
                <Input id="email" type="email" placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t("fullAddress")}</Label>
                <Input id="address" required placeholder={t("fullAddress")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{t("city")}</Label>
                  <Input id="city" required placeholder={t("city")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gov">{t("governorate")}</Label>
                  <Input id="gov" required placeholder={t("governorate")} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base md:text-lg">{t("paymentMethod")}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2 md:space-y-3">
                <label
                  htmlFor="cod"
                  className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <RadioGroupItem value="cod" id="cod" />
                  <Banknote className="w-5 md:w-6 h-5 md:h-6 text-secondary" />
                  <div>
                    <p className="font-display font-semibold text-sm md:text-base">{t("cod")}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{t("codDesc")}</p>
                  </div>
                </label>

                <label
                  htmlFor="instapay"
                  className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "instapay" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <RadioGroupItem value="instapay" id="instapay" />
                  <Smartphone className="w-5 md:w-6 h-5 md:h-6 text-toy-purple" />
                  <div>
                    <p className="font-display font-semibold text-sm md:text-base">{t("instapay")}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{t("instapayDesc")}</p>
                  </div>
                </label>

                <label
                  htmlFor="card"
                  className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                  <div>
                    <p className="font-display font-semibold text-sm md:text-base">{t("creditDebit")}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{t("creditDebitDesc")}</p>
                  </div>
                </label>
              </RadioGroup>

              {paymentMethod === "instapay" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 md:mt-4 p-3 md:p-4 rounded-xl bg-muted">
                  <p className="font-display font-semibold text-xs md:text-sm mb-2">{t("instapayInstructions")}</p>
                  <ol className="text-xs md:text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>{t("instapayStep1")}</li>
                    <li>{t("instapayStep2Send")} <span className="font-bold text-foreground">{grandTotal} {t("egp")}</span> {t("instapayStep2To")} <span className="font-bold text-primary">toybox@instapay</span></li>
                    <li>{t("instapayStep3")}</li>
                    <li>{t("instapayStep4")}</li>
                  </ol>
                </motion.div>
              )}

              {paymentMethod === "card" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 md:mt-4 space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">{t("cardNumber")}</Label>
                    <Input id="cardNumber" required placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">{t("expiryDate")}</Label>
                      <Input id="expiry" required placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">{t("cvv")}</Label>
                      <Input id="cvv" required placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">{t("nameOnCard")}</Label>
                    <Input id="cardName" required placeholder="AHMED MOHAMED" />
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div className="md:col-span-2">
          <Card className="md:sticky md:top-24">
            <CardHeader>
              <CardTitle className="font-display text-base md:text-lg">{t("orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="space-y-2 md:space-y-3 max-h-48 md:max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-2 md:gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 md:w-14 h-12 md:h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-semibold truncate">{item.product.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">x{item.quantity}</p>
                    </div>
                    <p className="text-xs md:text-sm font-bold whitespace-nowrap">{item.product.price * item.quantity} {t("egp")}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-2 md:pt-3 space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("subtotal")}</span>
                  <span className="font-semibold">{totalPrice} {t("egp")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("shipping")}</span>
                  <span className="font-semibold">{shippingFee === 0 ? t("freeShipping") : `${shippingFee} ${t("egp")}`}</span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-[10px] md:text-xs text-muted-foreground">{t("freeShippingNote")}</p>
                )}
              </div>

              <div className="border-t border-border pt-2 md:pt-3 flex justify-between">
                <span className="font-display font-bold text-base md:text-lg">{t("total")}</span>
                <span className="font-display font-bold text-lg md:text-xl text-primary">{grandTotal} {t("egp")}</span>
              </div>

              <Button type="submit" className="w-full py-5 md:py-6 bg-gradient-hero text-primary-foreground font-display font-bold text-base md:text-lg shadow-button hover:brightness-110 transition-all rounded-xl">
                {t("placeOrder")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
