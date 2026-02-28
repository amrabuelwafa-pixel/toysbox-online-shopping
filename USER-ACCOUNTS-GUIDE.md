# 👤 User Accounts System - Complete Guide

## 🎉 What's Been Added

Your ToyBox Egypt now has a complete user authentication system with:

### ✅ Features Implemented

1. **User Registration (Sign Up)**
   - Email and password authentication
   - Name collection
   - Account creation

2. **User Login**
   - Email/password login
   - Session management
   - Remember user

3. **User Profile/Account Page**
   - View profile information
   - Edit name and phone
   - View order history
   - Logout functionality

4. **Persistent Cart**
   - Cart saved per user
   - Cart persists across sessions
   - Guest cart also saved

5. **Order History**
   - All orders saved per user
   - Order status tracking
   - Order details view

### 📁 New Files Created

1. `src/contexts/AuthContext.tsx` - Authentication state management
2. `src/pages/Login.tsx` - Login page
3. `src/pages/Signup.tsx` - Registration page
4. `src/pages/Account.tsx` - User profile and order history
5. Updated `src/contexts/CartContext.tsx` - Persistent cart
6. Updated `src/components/Header.tsx` - Account link
7. Updated `src/App.tsx` - Auth routes

### 🔐 How It Works

#### Data Storage (LocalStorage)
```javascript
// Users database
toybox_users: [{ id, email, password, name, phone, createdAt }]

// Current logged-in user
toybox_user: { id, email, name, phone, createdAt }

// User's cart
toybox_cart_{userId}: [{ product, quantity }]

// User's orders
toybox_orders_{userId}: [{ id, items, total, status, ... }]

// Guest cart (not logged in)
toybox_guest_cart: [{ product, quantity }]
```

### 🚀 User Flow

1. **New User**:
   - Visits site → Can browse as guest
   - Clicks "Login" → Sees login page
   - Clicks "Sign Up" → Creates account
   - Redirected to homepage (logged in)

2. **Returning User**:
   - Visits site → Clicks "Login"
   - Enters credentials → Logged in
   - Cart and orders restored

3. **Shopping**:
   - Add items to cart (saved automatically)
   - Go to checkout
   - Complete order → Saved to order history
   - View in Account page

### 📱 Pages & Routes

- `/login` - Login page
- `/signup` - Registration page
- `/account` - User profile & order history
- All other pages work for both guests and logged-in users

### 🎨 UI Features

- Beautiful gradient login/signup pages
- Profile editing
- Order status badges (pending, confirmed, shipped, delivered, cancelled)
- Responsive mobile design
- Smooth animations

### 🔄 Integration with Checkout

To save orders when user completes checkout, update `src/pages/Checkout.tsx`:

```typescript
import { useAuth } from "@/contexts/AuthContext";

// In your component
const { isAuthenticated, addOrder } = useAuth();

// In handleSubmit function, after form submission:
if (isAuthenticated) {
  addOrder({
    items: items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    })),
    total: grandTotal,
    status: "pending",
    shippingInfo: {
      firstName, lastName, phone, email,
      address, city, governorate
    },
    paymentMethod,
  });
}
```

### 🌍 Translations Needed

Add these to `src/contexts/LanguageContext.tsx`:

```typescript
// English
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

// Arabic
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
```

### ⚠️ Important Notes

1. **Security**: This uses localStorage for demo purposes. For production:
   - Use a real backend API
   - Hash passwords on server
   - Use JWT tokens
   - Implement proper session management

2. **Data Persistence**: All data is stored in browser localStorage:
   - Cleared if user clears browser data
   - Not synced across devices
   - For production, use a database

3. **Guest Checkout**: Users can still checkout without account

### 🧪 Testing

1. **Sign Up**:
   - Go to `/signup`
   - Create account with email/password
   - Should redirect to homepage

2. **Login**:
   - Go to `/login`
   - Login with credentials
   - Should see user icon in header

3. **Profile**:
   - Click user icon → Go to `/account`
   - Edit profile
   - View orders (empty initially)

4. **Cart Persistence**:
   - Add items to cart
   - Logout and login again
   - Cart should be restored

5. **Orders**:
   - Complete a checkout
   - Go to account page
   - Should see order in history

### 🚀 Next Steps

1. Add translations to LanguageContext
2. Update Checkout page to save orders
3. Test all flows
4. Deploy!

### 📚 Additional Features (Future)

- Password reset
- Email verification
- Social login (Google, Facebook)
- Address book
- Wishlist
- Order tracking
- Email notifications

---

**Your ToyBox Egypt now has a complete user account system!** 🎉
