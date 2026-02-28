# 🧸 ToyBox Egypt - Complete E-Commerce Platform

A modern, bilingual (English/Arabic) toy store with AI-powered recommendations, user accounts, and order management.

## ✨ Features

### 🛍️ E-Commerce
- Product catalog with filtering and search
- Shopping cart with persistent storage
- Checkout flow with multiple payment options
- Order tracking and history
- Guest and authenticated checkout

### 🤖 AI-Powered
- Conversational AI recommendations
- Natural language toy search
- Personalized product suggestions
- Smart filtering based on age and interests

### 👤 User Accounts
- User registration and login
- Profile management
- Order history
- Persistent cart across sessions
- Guest checkout option

### 🌍 Bilingual Support
- Full English and Arabic translations
- RTL support for Arabic
- Language switcher in header

### 📱 Mobile-First Design
- Fully responsive on all devices
- Touch-friendly interface
- Mobile navigation menu
- Optimized for performance

### 🔒 Private Deployment
- Password-protected access
- Session management
- Secure authentication

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:8080
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── ProductCard.tsx # Product display
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.tsx      # User authentication
│   ├── CartContext.tsx      # Shopping cart
│   └── LanguageContext.tsx  # i18n translations
├── pages/              # Route pages
│   ├── Index.tsx            # Homepage
│   ├── Products.tsx         # Product catalog
│   ├── ProductDetail.tsx    # Product details
│   ├── Recommendations.tsx  # AI recommendations
│   ├── Login.tsx            # User login
│   ├── Signup.tsx           # User registration
│   ├── Account.tsx          # User profile
│   ├── Checkout.tsx         # Checkout flow
│   └── About.tsx            # About page
├── data/               # Static data
│   └── products.ts     # Product catalog
└── App.tsx            # Main app component
```

## 🎯 Key Pages

- **`/`** - Homepage with hero, categories, AI recommendations
- **`/products`** - Product catalog with filters
- **`/product/:id`** - Product detail page
- **`/recommendations`** - AI-powered toy recommendations
- **`/login`** - User login
- **`/signup`** - User registration
- **`/account`** - User profile and order history
- **`/checkout`** - Checkout flow
- **`/about`** - About ToyBox Egypt

## 🔐 Authentication

The app includes a complete authentication system:

- **Local Storage Based**: Uses browser localStorage for demo
- **User Registration**: Email/password signup
- **User Login**: Session-based authentication
- **Profile Management**: Edit name, phone, view orders
- **Order History**: Track all past orders
- **Persistent Cart**: Cart saved per user

**Note**: For production, replace with a real backend API.

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - General deployment guide
- **[PRIVATE-DEPLOYMENT.md](PRIVATE-DEPLOYMENT.md)** - Private deployment options
- **[PRIVATE-SETUP.md](PRIVATE-SETUP.md)** - Quick private setup
- **[USER-ACCOUNTS-GUIDE.md](USER-ACCOUNTS-GUIDE.md)** - User accounts system
- **[PRODUCTION-READY.md](PRODUCTION-READY.md)** - Production checklist
- **[QUICK-START.md](QUICK-START.md)** - 5-minute deployment

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Context
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 🌐 Deployment

### Option 1: Vercel (Recommended)
```bash
# Push to GitHub
git push

# Import on vercel.com
# Auto-deploys on every push
```

### Option 2: Netlify
```bash
# Push to GitHub
git push

# Import on netlify.com
# Auto-deploys on every push
```

### Option 3: Local/Private
```bash
# Build and run locally
npm run build
npm run preview
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🔒 Private Deployment

The app includes password protection for private use:

1. Users must enter password at `/auth.html`
2. Session valid for 24 hours
3. Change password in `public/auth.html`

See [PRIVATE-SETUP.md](PRIVATE-SETUP.md) for setup instructions.

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts` to customize the color scheme.

### Add Products
Edit `src/data/products.ts` to add/modify products.

### Translations
Edit `src/contexts/LanguageContext.tsx` to add/modify translations.

### Branding
- Logo: Update emoji in `src/components/Header.tsx`
- Favicon: Replace `public/favicon.ico`
- Meta tags: Edit `index.html`

## 📊 Features Breakdown

### Implemented ✅
- [x] Product catalog
- [x] Shopping cart
- [x] Checkout flow
- [x] User authentication
- [x] Order history
- [x] AI recommendations
- [x] Bilingual support
- [x] Mobile responsive
- [x] Password protection
- [x] Persistent cart

### Future Enhancements 🚀
- [ ] Real backend API
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product reviews
- [ ] Wishlist
- [ ] Admin dashboard
- [ ] Real-time order tracking
- [ ] Social login
- [ ] Product search with Algolia

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## 📝 License

Private project for ToyBox Egypt.

## 🆘 Support

For questions or issues:
1. Check documentation files
2. Review [USER-ACCOUNTS-GUIDE.md](USER-ACCOUNTS-GUIDE.md)
3. See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help

---

**Built with ❤️ for ToyBox Egypt**

🧸 Making playtime magical for Egyptian kids aged 2-12
