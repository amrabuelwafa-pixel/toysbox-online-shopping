import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ar";

const translations = {
  en: {
    // Header
    home: "Home",
    shop: "Shop",
    about: "About",
    recommendations: "Recommendations",

    // Hero
    heroTag: "🎉 Unique Toys from Around the World",
    heroTitle1: "Make Playtime",
    heroTitle2: "Magical",
    heroDesc: "Discover unique, imported toys for kids aged 2–12. Fun, learning, and joy — delivered to your door in Egypt! 🇪🇬",
    shopNow: "Shop Now ✨",
    browseByAge: "Browse by Age",

    // Age Categories
    shopByAge: "Shop by Age 🎂",
    shopByAgeDesc: "Find the perfect toy for every stage",

    // Featured
    featuredToys: "Featured Toys ⭐",
    popularPicks: "Our most popular picks",
    viewAll: "View All",
    viewAllToys: "View All Toys",

    // Product Card
    ages: "Ages",
    outOfStock: "Out of Stock",
    addToCart: "Add to Cart",

    // Products Page
    findPerfectToy: "Find the Perfect Toy 🔍",
    searchPlaceholder: "Search toys...",
    toysFound: "toys found",
    clear: "Clear",
    filters: "Filters",
    ageGroup: "Age Group",
    allAges: "All Ages",
    category: "Category",
    noToysFound: "No toys found",
    tryAdjusting: "Try adjusting your filters",

    // Product Detail
    backToShop: "Back to Shop",
    freeDelivery: "Free delivery on orders over 500 EGP",
    safeNonToxic: "Safe & non-toxic materials",
    returnPolicy: "14-day return policy",
    youMightLike: "You Might Also Like 💡",
    productNotFound: "Product not found",

    // Cart
    cart: "Cart",
    yourCartEmpty: "Your cart is empty",
    addSomeFun: "Add some fun toys!",
    total: "Total",
    checkout: "Checkout 🎉",

    // Checkout
    checkoutTitle: "Checkout",
    cartEmpty: "Your cart is empty",
    addToysFirst: "Add some toys before checking out!",
    browseToys: "Browse Toys",
    orderPlaced: "Order Placed! 🎉",
    orderThanks: "Thank you for your order. We'll contact you soon to confirm delivery details.",
    backToHome: "Back to Home",
    back: "Back",
    shippingInfo: "Shipping Information",
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    emailOptional: "Email (optional)",
    fullAddress: "Full Address",
    city: "City",
    governorate: "Governorate",
    paymentMethod: "Payment Method",
    cod: "Cash on Delivery",
    codDesc: "Pay when you receive your order",
    instapay: "InstaPay",
    instapayDesc: "Transfer via InstaPay to our account",
    creditDebit: "Credit / Debit Card",
    creditDebitDesc: "Visa, Mastercard, Meeza",
    instapayInstructions: "InstaPay Instructions:",
    instapayStep1: "Open your banking app and go to InstaPay",
    instapayStep2Send: "Send",
    instapayStep2To: "to:",
    instapayStep3: "Take a screenshot of the transfer confirmation",
    instapayStep4: "We'll confirm your order via WhatsApp",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    nameOnCard: "Name on Card",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    freeShipping: "Free ✨",
    freeShippingNote: "Free shipping on orders over 500 EGP",
    placeOrder: "Place Order 🎉",

    // About
    aboutTitle: "About ToyBox Egypt 🧸",
    aboutSubtitle: "Bringing joy to every Egyptian home, one toy at a time.",
    ourStory: "Our Story 💡",
    ourStoryP1: "We started ToyBox Egypt because we noticed something: Egyptian kids deserve access to the same amazing, creative, and educational toys available worldwide. But finding unique, high-quality toys locally was a challenge.",
    ourStoryP2: "So we set out on a mission — to import the best toys from around the globe and deliver them straight to your doorstep. From building blocks that spark creativity to STEM kits that inspire future engineers, every toy in our collection is hand-picked with love for kids aged 2–12. 🎉",
    whyToyBox: "Why ToyBox? ✨",
    uniqueSelection: "Unique Selection",
    uniqueSelectionDesc: "Toys imported from top brands worldwide that you won't find elsewhere in Egypt.",
    safeTrusted: "Safe & Trusted",
    safeTrustedDesc: "Every toy is non-toxic, age-appropriate, and meets international safety standards.",
    fastDelivery: "Fast Delivery",
    fastDeliveryDesc: "We deliver across Egypt with free shipping on orders over 500 EGP.",
    contactUs: "Contact Us 💬",
    contactDesc: "Have a question or suggestion? We'd love to hear from you!",
    facebook: "Facebook",
    instagram: "Instagram",
    emailUs: "Email Us",

    // Footer
    footerDesc: "Bringing unique, high-quality toys from around the world to Egyptian kids aged 2–12. Fun and learning, delivered! 🇪🇬",
    quickLinks: "Quick Links",
    shopAll: "Shop All",
    contact: "Contact",
    rights: "© 2026 ToyBox Egypt. All rights reserved.",

    // Age groups
    "2-3 years": "2-3 years",
    "4-6 years": "4-6 years",
    "7-9 years": "7-9 years",
    "10-12 years": "10-12 years",

    // Categories
    All: "All",
    Building: "Building",
    Educational: "Educational",
    Plush: "Plush",
    Vehicles: "Vehicles",
    Creative: "Creative",
    Puzzles: "Puzzles",
    Baby: "Baby",
    "Pretend Play": "Pretend Play",
    STEM: "STEM",
    Musical: "Musical",
    Dolls: "Dolls",
    Outdoor: "Outdoor",
    searchByCategory: "Search by Category",
    searchByCategoryDesc: "Browse our collection by toy category",
    viewAllProducts: "View All Products",
    categoriesPageDesc: "Browse all toy categories and find the perfect match for your child",
    categoriesAndAge: "Categories & Age",
    categoriesAndAgeDesc: "Browse toys by category or age group to find the perfect match",
    searchByAge: "Search by Age",

    // Return Policy
    returnPolicy: "Return Policy",
    returnPolicySubtitle: "Your satisfaction is our priority",
    returnPeriod: "14-Day Return Period",
    returnPeriodDesc: "You have 14 days from the date of delivery to return eligible items for a full refund or exchange.",
    allowedProducts: "Products Eligible for Return",
    allowedProduct1: "Unopened toys in original sealed packaging",
    allowedProduct2: "Educational games and puzzles (unopened)",
    allowedProduct3: "Building sets and construction toys (sealed)",
    allowedProduct4: "Board games and card games (shrink-wrapped)",
    returnConditions: "Return Conditions",
    returnCondition1: "Item must be unused and in original condition",
    returnCondition2: "Original packaging and tags must be intact",
    returnCondition3: "Proof of purchase (receipt or order number) required",
    returnCondition4: "Item must not show signs of wear or damage",
    returnProcess: "How to Return",
    returnStep1: "Contact us at returns@toyboxegypt.com with your order number",
    returnStep2: "We'll provide you with return instructions and shipping label",
    returnStep3: "Pack the item securely in original packaging",
    returnStep4: "Ship the item back - refund processed within 5-7 business days",
    nonReturnableItems: "Non-Returnable Items",
    nonReturnable1: "Items marked as final sale or clearance",
    nonReturnable2: "Opened or used hygiene products (for safety reasons)",
    nonReturnable3: "Personalized or custom-made items",
    questionsAboutReturns: "Questions About Returns?",
    contactUsForReturns: "Our customer service team is here to help",

    // Badges
    "Best Seller": "Best Seller",
    New: "New",
    Sale: "Sale",
    Popular: "Popular",

    egp: "EGP",

    // Authentication
    welcomeBack: "Welcome Back",
    loginToAccount: "Login to your account",
    email: "Email",
    enterEmail: "Enter your email",
    password: "Password",
    enterPassword: "Enter your password",
    login: "Login",
    loggingIn: "Logging in...",
    loginError: "Invalid email or password",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign Up",
    continueAsGuest: "Continue as guest",
    or: "or",
    createAccount: "Create Account",
    signupToStart: "Sign up to start shopping",
    fullName: "Full Name",
    enterName: "Enter your name",
    confirmPassword: "Confirm Password",
    passwordMinLength: "Minimum 6 characters",
    passwordsDontMatch: "Passwords don't match",
    passwordTooShort: "Password must be at least 6 characters",
    signupError: "Email already exists",
    creatingAccount: "Creating account...",
    alreadyHaveAccount: "Already have an account?",
    
    // Account
    myAccount: "My Account",
    manageAccountAndOrders: "Manage your account and view orders",
    profile: "Profile",
    phone: "Phone",
    editProfile: "Edit Profile",
    save: "Save",
    logout: "Logout",
    orderHistory: "Order History",
    noOrders: "No Orders Yet",
    startShopping: "Start shopping to see your orders here",
    order: "Order",
    pending: "Pending",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",

    // AI Recommendations
    aiPowered: "AI Powered",
    aiRecommendationTitle: "Get Personalized Toy Recommendations",
    aiRecommendationDesc: "Tell us about your child and we'll recommend the perfect toys using AI",
    aiChatDesc: "Chat with our AI assistant to find the perfect toys for your child",
    getToyRecommendations: "Get Toy Recommendations",
    childAge: "Child's Age",
    enterAge: "Enter age (2-12)",
    childInterests: "Child's Interests (Optional)",
    interestsPlaceholder: "e.g., building, art, science, music, outdoor activities...",
    analyzing: "Analyzing...",
    getRecommendations: "Get Recommendations",
    recommendedForYou: "Recommended For You",
    startConversation: "Start a Conversation",
    conversationExamples: "Try: 'I need a toy for my 5-year-old who loves building' or 'Looking for educational toys for a 7-year-old'",
    chatPlaceholder: "Describe what you're looking for...",
    aiResponseWithAge: "Great! I found {count} perfect toys for a {age}-year-old based on your description. Check them out below!",
    aiResponseNoAge: "I found {count} amazing toys that match what you're looking for. Take a look!",
    aiResponseNoResults: "I couldn't find toys matching your exact criteria, but let me know more details and I'll help you find the perfect toy!",
  },
  ar: {
    // Header
    home: "الرئيسية",
    shop: "المتجر",
    about: "من نحن",
    recommendations: "التوصيات",

    // Hero
    heroTag: "🎉 ألعاب مميزة من حول العالم",
    heroTitle1: "اجعل وقت اللعب",
    heroTitle2: "سحرياً",
    heroDesc: "اكتشف ألعاباً مميزة ومستوردة للأطفال من سن ٢ إلى ١٢. مرح وتعلم وفرحة — توصيل لباب بيتك في مصر! 🇪🇬",
    shopNow: "تسوق الآن ✨",
    browseByAge: "تصفح حسب العمر",

    // Age Categories
    shopByAge: "تسوق حسب العمر 🎂",
    shopByAgeDesc: "اعثر على اللعبة المثالية لكل مرحلة",

    // Featured
    featuredToys: "ألعاب مميزة ⭐",
    popularPicks: "أكثر اختياراتنا شعبية",
    viewAll: "عرض الكل",
    viewAllToys: "عرض كل الألعاب",

    // Product Card
    ages: "الأعمار",
    outOfStock: "نفدت الكمية",
    addToCart: "أضف للسلة",

    // Products Page
    findPerfectToy: "ابحث عن اللعبة المثالية 🔍",
    searchPlaceholder: "ابحث عن ألعاب...",
    toysFound: "لعبة",
    clear: "مسح",
    filters: "تصفية",
    ageGroup: "الفئة العمرية",
    allAges: "كل الأعمار",
    category: "الفئة",
    noToysFound: "لم يتم العثور على ألعاب",
    tryAdjusting: "جرب تعديل عوامل التصفية",

    // Product Detail
    backToShop: "العودة للمتجر",
    freeDelivery: "توصيل مجاني للطلبات فوق ٥٠٠ جنيه",
    safeNonToxic: "مواد آمنة وغير سامة",
    returnPolicy: "سياسة إرجاع خلال ١٤ يوم",
    youMightLike: "قد يعجبك أيضاً 💡",
    productNotFound: "المنتج غير موجود",

    // Cart
    cart: "السلة",
    yourCartEmpty: "سلتك فارغة",
    addSomeFun: "أضف بعض الألعاب الممتعة!",
    total: "المجموع",
    checkout: "إتمام الشراء 🎉",

    // Checkout
    checkoutTitle: "إتمام الشراء",
    cartEmpty: "سلتك فارغة",
    addToysFirst: "أضف بعض الألعاب قبل إتمام الشراء!",
    browseToys: "تصفح الألعاب",
    orderPlaced: "تم تأكيد الطلب! 🎉",
    orderThanks: "شكراً لطلبك. سنتواصل معك قريباً لتأكيد تفاصيل التوصيل.",
    backToHome: "العودة للرئيسية",
    back: "رجوع",
    shippingInfo: "معلومات الشحن",
    firstName: "الاسم الأول",
    lastName: "الاسم الأخير",
    phoneNumber: "رقم الهاتف",
    emailOptional: "البريد الإلكتروني (اختياري)",
    fullAddress: "العنوان الكامل",
    city: "المدينة",
    governorate: "المحافظة",
    paymentMethod: "طريقة الدفع",
    cod: "الدفع عند الاستلام",
    codDesc: "ادفع عند استلام طلبك",
    instapay: "انستاباي",
    instapayDesc: "حوّل عبر انستاباي لحسابنا",
    creditDebit: "بطاقة ائتمان / خصم",
    creditDebitDesc: "فيزا، ماستركارد، ميزة",
    instapayInstructions: "تعليمات انستاباي:",
    instapayStep1: "افتح تطبيق البنك واذهب إلى انستاباي",
    instapayStep2Send: "أرسل",
    instapayStep2To: "إلى:",
    instapayStep3: "خذ لقطة شاشة لتأكيد التحويل",
    instapayStep4: "سنؤكد طلبك عبر واتساب",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "CVV",
    nameOnCard: "الاسم على البطاقة",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    freeShipping: "مجاني ✨",
    freeShippingNote: "شحن مجاني للطلبات فوق ٥٠٠ جنيه",
    placeOrder: "تأكيد الطلب 🎉",

    // About
    aboutTitle: "عن تويبوكس مصر 🧸",
    aboutSubtitle: "نجلب الفرحة لكل بيت مصري، لعبة تلو الأخرى.",
    ourStory: "قصتنا 💡",
    ourStoryP1: "بدأنا تويبوكس مصر لأننا لاحظنا شيئاً: الأطفال المصريون يستحقون الوصول لنفس الألعاب المذهلة والإبداعية والتعليمية المتاحة عالمياً. لكن إيجاد ألعاب مميزة وعالية الجودة محلياً كان تحدياً.",
    ourStoryP2: "فانطلقنا في مهمة — لاستيراد أفضل الألعاب من حول العالم وتوصيلها لباب بيتك. من مكعبات البناء التي تشعل الإبداع إلى أدوات العلوم التي تلهم المهندسين المستقبليين، كل لعبة في مجموعتنا مختارة بحب للأطفال من سن ٢-١٢. 🎉",
    whyToyBox: "لماذا تويبوكس؟ ✨",
    uniqueSelection: "تشكيلة مميزة",
    uniqueSelectionDesc: "ألعاب مستوردة من أفضل العلامات التجارية العالمية لن تجدها في أي مكان آخر في مصر.",
    safeTrusted: "آمنة وموثوقة",
    safeTrustedDesc: "كل لعبة غير سامة ومناسبة للعمر وتلتزم بمعايير السلامة الدولية.",
    fastDelivery: "توصيل سريع",
    fastDeliveryDesc: "نوصل لكل أنحاء مصر مع شحن مجاني للطلبات فوق ٥٠٠ جنيه.",
    contactUs: "تواصل معنا 💬",
    contactDesc: "عندك سؤال أو اقتراح؟ يسعدنا سماعك!",
    facebook: "فيسبوك",
    instagram: "انستجرام",
    emailUs: "راسلنا",

    // Footer
    footerDesc: "نجلب ألعاباً مميزة وعالية الجودة من حول العالم للأطفال المصريين من سن ٢-١٢. مرح وتعلم، يوصلك لباب البيت! 🇪🇬",
    quickLinks: "روابط سريعة",
    shopAll: "تسوق الكل",
    contact: "التواصل",
    rights: "© ٢٠٢٦ تويبوكس مصر. جميع الحقوق محفوظة.",

    // Age groups
    "2-3 years": "٢-٣ سنوات",
    "4-6 years": "٤-٦ سنوات",
    "7-9 years": "٧-٩ سنوات",
    "10-12 years": "١٠-١٢ سنة",

    // Categories
    All: "الكل",
    Building: "بناء",
    Educational: "تعليمي",
    Plush: "دمى قطيفة",
    Vehicles: "مركبات",
    Creative: "إبداعي",
    Puzzles: "ألغاز",
    Baby: "أطفال",
    "Pretend Play": "لعب تخيلي",
    STEM: "علوم وتكنولوجيا",
    Musical: "موسيقي",
    Dolls: "دمى",
    Outdoor: "خارجي",
    searchByCategory: "البحث حسب الفئة",
    searchByCategoryDesc: "تصفح مجموعتنا حسب فئة الألعاب",
    viewAllProducts: "عرض جميع المنتجات",
    categoriesPageDesc: "تصفح جميع فئات الألعاب واعثر على المناسب لطفلك",
    categoriesAndAge: "الفئات والأعمار",
    categoriesAndAgeDesc: "تصفح الألعاب حسب الفئة أو الفئة العمرية للعثور على المناسب",
    searchByAge: "البحث حسب العمر",

    // Return Policy
    returnPolicy: "سياسة الإرجاع",
    returnPolicySubtitle: "رضاك هو أولويتنا",
    returnPeriod: "فترة إرجاع 14 يوماً",
    returnPeriodDesc: "لديك 14 يوماً من تاريخ التسليم لإرجاع المنتجات المؤهلة واسترداد المبلغ كاملاً أو استبدالها.",
    allowedProducts: "المنتجات المؤهلة للإرجاع",
    allowedProduct1: "الألعاب غير المفتوحة في العبوة الأصلية المختومة",
    allowedProduct2: "الألعاب التعليمية والألغاز (غير مفتوحة)",
    allowedProduct3: "مجموعات البناء والألعاب الإنشائية (مختومة)",
    allowedProduct4: "ألعاب الطاولة وألعاب الورق (مغلفة بالبلاستيك)",
    returnConditions: "شروط الإرجاع",
    returnCondition1: "يجب أن يكون المنتج غير مستخدم وفي حالته الأصلية",
    returnCondition2: "يجب أن تكون العبوة الأصلية والملصقات سليمة",
    returnCondition3: "مطلوب إثبات الشراء (الإيصال أو رقم الطلب)",
    returnCondition4: "يجب ألا يظهر على المنتج علامات استخدام أو تلف",
    returnProcess: "كيفية الإرجاع",
    returnStep1: "تواصل معنا على returns@toyboxegypt.com مع رقم طلبك",
    returnStep2: "سنزودك بتعليمات الإرجاع وملصق الشحن",
    returnStep3: "قم بتغليف المنتج بشكل آمن في العبوة الأصلية",
    returnStep4: "أرسل المنتج - يتم معالجة الاسترداد خلال 5-7 أيام عمل",
    nonReturnableItems: "منتجات غير قابلة للإرجاع",
    nonReturnable1: "المنتجات المحددة كتخفيضات نهائية",
    nonReturnable2: "منتجات النظافة المفتوحة أو المستخدمة (لأسباب صحية)",
    nonReturnable3: "المنتجات المخصصة أو المصنوعة حسب الطلب",
    questionsAboutReturns: "أسئلة حول الإرجاع؟",
    contactUsForReturns: "فريق خدمة العملاء لدينا هنا للمساعدة",

    // Badges
    "Best Seller": "الأكثر مبيعاً",
    New: "جديد",
    Sale: "عرض",
    Popular: "رائج",

    egp: "ج.م",

    // Authentication
    welcomeBack: "مرحباً بعودتك",
    loginToAccount: "تسجيل الدخول إلى حسابك",
    email: "البريد الإلكتروني",
    enterEmail: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    enterPassword: "أدخل كلمة المرور",
    login: "تسجيل الدخول",
    loggingIn: "جاري تسجيل الدخول...",
    loginError: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    dontHaveAccount: "ليس لديك حساب؟",
    signUp: "إنشاء حساب",
    continueAsGuest: "المتابعة كزائر",
    or: "أو",
    createAccount: "إنشاء حساب",
    signupToStart: "سجل للبدء في التسوق",
    fullName: "الاسم الكامل",
    enterName: "أدخل اسمك",
    confirmPassword: "تأكيد كلمة المرور",
    passwordMinLength: "6 أحرف على الأقل",
    passwordsDontMatch: "كلمات المرور غير متطابقة",
    passwordTooShort: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
    signupError: "البريد الإلكتروني مستخدم بالفعل",
    creatingAccount: "جاري إنشاء الحساب...",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    
    // Account
    myAccount: "حسابي",
    manageAccountAndOrders: "إدارة حسابك وعرض الطلبات",
    profile: "الملف الشخصي",
    phone: "الهاتف",
    editProfile: "تعديل الملف الشخصي",
    save: "حفظ",
    logout: "تسجيل الخروج",
    orderHistory: "سجل الطلبات",
    noOrders: "لا توجد طلبات بعد",
    startShopping: "ابدأ التسوق لرؤية طلباتك هنا",
    order: "طلب",
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    shipped: "تم الشحن",
    delivered: "تم التوصيل",
    cancelled: "ملغي",

    // AI Recommendations
    aiPowered: "مدعوم بالذكاء الاصطناعي",
    aiRecommendationTitle: "احصل على توصيات ألعاب مخصصة",
    aiRecommendationDesc: "أخبرنا عن طفلك وسنوصي بالألعاب المثالية باستخدام الذكاء الاصطناعي",
    aiChatDesc: "تحدث مع مساعدنا الذكي للعثور على الألعاب المثالية لطفلك",
    getToyRecommendations: "احصل على توصيات الألعاب",
    childAge: "عمر الطفل",
    enterAge: "أدخل العمر (٢-١٢)",
    childInterests: "اهتمامات الطفل (اختياري)",
    interestsPlaceholder: "مثال: البناء، الفن، العلوم، الموسيقى، الأنشطة الخارجية...",
    analyzing: "جاري التحليل...",
    getRecommendations: "احصل على التوصيات",
    recommendedForYou: "موصى به لك",
    startConversation: "ابدأ محادثة",
    conversationExamples: "جرب: 'أحتاج لعبة لطفلي البالغ من العمر ٥ سنوات ويحب البناء' أو 'أبحث عن ألعاب تعليمية لطفل عمره ٧ سنوات'",
    chatPlaceholder: "صف ما تبحث عنه...",
    aiResponseWithAge: "رائع! وجدت {count} لعبة مثالية لطفل عمره {age} سنوات بناءً على وصفك. تحقق منها أدناه!",
    aiResponseNoAge: "وجدت {count} لعبة رائعة تطابق ما تبحث عنه. ألق نظرة!",
    aiResponseNoResults: "لم أتمكن من العثور على ألعاب تطابق معاييرك بالضبط، لكن أخبرني بمزيد من التفاصيل وسأساعدك في العثور على اللعبة المثالية!",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("toybox-lang");
    return (saved === "ar" ? "ar" : "en") as Lang;
  });

  const isRTL = lang === "ar";

  useEffect(() => {
    localStorage.setItem("toybox-lang", lang);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
