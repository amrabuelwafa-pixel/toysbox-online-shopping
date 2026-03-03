# 🚀 Serverless Backend Implementation - ToyBox Egypt

## Option 3: Vercel Serverless + Supabase

This is the **easiest and cheapest** way to add a backend to your project!

### Why This Option?
- ✅ No separate backend server needed
- ✅ Everything deploys on Vercel (frontend + backend)
- ✅ Supabase handles database + authentication
- ✅ Free tier is generous
- ✅ Automatic scaling
- ✅ Easy to maintain

---

## 📋 What You'll Get

- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth (built-in)
- **API**: Vercel Serverless Functions
- **Storage**: Supabase Storage (for images)
- **Real-time**: Supabase Realtime (optional)
- **Cost**: FREE for small projects!

---

## Step 1: Set Up Supabase (5 minutes)

### 1.1 Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Create new project:
   - **Name**: toybox-egypt
   - **Database Password**: (save this!)
   - **Region**: Choose closest to Egypt (Europe West recommended)
5. Wait 2 minutes for setup

### 1.2 Create Database Tables

In Supabase Dashboard → SQL Editor, run this:

```sql
-- Users table (Supabase Auth handles this automatically)
-- We'll add a profiles table for extra user data

CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image TEXT NOT NULL,
  age_min INTEGER NOT NULL,
  age_max INTEGER NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id UUID REFERENCES products NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  shipping_info JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders NOT NULL,
  product_id UUID REFERENCES products NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for cart_items
CREATE POLICY "Users can view own cart"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Products are public (anyone can read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 1.3 Insert Sample Products

```sql
INSERT INTO products (name, name_ar, description, price, original_price, image, age_min, age_max, category, in_stock, stock, rating, badge) VALUES
('Wooden Building Blocks Set', 'مجموعة مكعبات خشبية', '50-piece colorful wooden blocks for creative building', 450, 550, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400', 2, 5, 'Building', true, 50, 4.8, 'Best Seller'),
('Interactive Learning Tablet', 'جهاز تعليمي تفاعلي', 'Educational tablet with games, letters, numbers', 750, null, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 3, 7, 'Educational', true, 30, 4.5, null),
('Soft Plush Teddy Bear', 'دب قطيفة ناعم', 'Super soft and cuddly teddy bear', 320, null, 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=400', 2, 6, 'Plush', true, 100, 4.9, null);
-- Add more products as needed
```

### 1.4 Get API Keys

In Supabase Dashboard:
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)
   - **service_role key**: `eyJhbGc...` (keep secret!)

---

## Step 2: Install Supabase in Frontend

```bash
npm install @supabase/supabase-js
```

---

## Step 3: Create Supabase Client

**File: `src/lib/supabase.ts`**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Product = {
  id: string;
  name: string;
  name_ar?: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  age_min: number;
  age_max: number;
  category: string;
  in_stock: boolean;
  stock: number;
  rating: number;
  badge?: string;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shipping_info: any;
  payment_method: string;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
};
```

---

## Step 4: Update Environment Variables

**File: `.env`**

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
```

**File: `.env.example`**

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Step 5: Update AuthContext

**File: `src/contexts/AuthContext.tsx`**

Replace the entire file with:

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) throw error;
    setUser(data.user);
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    setUser(data.user);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

---

## Step 6: Update Products to Use Supabase

**File: `src/hooks/useProducts.ts`** (new file)

```typescript
import { useState, useEffect } from 'react';
import { supabase, Product } from '@/lib/supabase';

export function useProducts(filters?: {
  category?: string;
  ageMin?: number;
  ageMax?: number;
  search?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase.from('products').select('*').eq('in_stock', true);

        if (filters?.category && filters.category !== 'All') {
          query = query.eq('category', filters.category);
        }

        if (filters?.ageMin && filters?.ageMax) {
          query = query
            .lte('age_min', filters.ageMax)
            .gte('age_max', filters.ageMin);
        }

        if (filters?.search) {
          query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProducts(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters?.category, filters?.ageMin, filters?.ageMax, filters?.search]);

  return { products, loading, error };
}
```

---

## Step 7: Update CartContext to Use Supabase

**File: `src/contexts/CartContext.tsx`** (simplified version)

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, CartItem } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cart items
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', user.id);

    if (!error && data) {
      setItems(data);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: productId,
        quantity
      });

    if (!error) {
      await fetchCart();
    }
    setLoading(false);
  };

  const removeFromCart = async (itemId: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (!error) {
      await fetchCart();
    }
    setLoading(false);
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    setLoading(true);
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (!error) {
      await fetchCart();
    }
    setLoading(false);
  };

  const clearCart = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (!error) {
      setItems([]);
    }
    setLoading(false);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => 
    sum + (item.product?.price || 0) * item.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
```

---

## Step 8: Deploy to Vercel

### 8.1 Add Environment Variables to Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key

### 8.2 Redeploy

```bash
git add .
git commit -m "Add Supabase backend integration"
git push
```

Vercel will auto-deploy!

---

## Step 9: Test Everything

1. **Signup**: Create new account
2. **Login**: Login with credentials
3. **Products**: Should load from database
4. **Cart**: Add items (saved to database)
5. **Orders**: Create order (saved to database)
6. **Profile**: View/edit profile

---

## What You Get

✅ **Real Database** - PostgreSQL on Supabase  
✅ **Real Authentication** - Secure JWT tokens  
✅ **Persistent Cart** - Saved across devices  
✅ **Order History** - Real order tracking  
✅ **User Profiles** - Editable user data  
✅ **Scalable** - Handles thousands of users  
✅ **Free Tier** - Up to 500MB database, 50k monthly active users  

---

## Cost

### Free Tier (Perfect for your use case)
- 500MB database storage
- 50,000 monthly active users
- 2GB file storage
- 50GB bandwidth
- **Cost: $0/month**

### If You Outgrow Free Tier
- Pro Plan: $25/month
- Unlimited API requests
- 8GB database
- 100GB file storage

---

## Next Steps

1. Set up Supabase account
2. Create database tables
3. Install Supabase client
4. Update AuthContext
5. Update CartContext
6. Test locally
7. Deploy to Vercel
8. Test production

---

## Need Help?

This is much easier than Option 1 or 2! Everything is managed for you.

**Ready to start? Let me know which step you need help with!**
