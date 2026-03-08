# 🔐 Admin Dashboard Implementation Guide

## Overview

This guide will help you build a complete admin dashboard to manage products without coding.

---

## What You'll Get

✅ Secure admin login (separate from customer accounts)
✅ Product management (add, edit, delete)
✅ Image upload for products
✅ Inventory management
✅ Order management
✅ Protected admin routes

---

## Prerequisites

Before starting, you need:
1. Supabase account (free tier works)
2. Supabase project created
3. Environment variables configured

---

## Implementation Steps

### Phase 1: Backend Setup (Supabase)

#### 1.1 Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Save your project URL and anon key

#### 1.2 Database Schema

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  video TEXT,
  age_min INTEGER NOT NULL,
  age_max INTEGER NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 4.5,
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table (for future use)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  governorate TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public can read products
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

-- Only authenticated admins can modify products
CREATE POLICY "Admins can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create first admin user (change password!)
INSERT INTO admin_users (email, password_hash, name)
VALUES ('admin@toyboxegypt.com', crypt('admin123', gen_salt('bf')), 'Admin');
```

#### 1.3 Enable Storage for Images

1. Go to Storage in Supabase dashboard
2. Create bucket named `product-images`
3. Make it public
4. Set policies:

```sql
-- Allow public to read images
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated can delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

### Phase 2: Frontend Setup

#### 2.1 Install Dependencies

```bash
npm install @supabase/supabase-js
```

#### 2.2 Environment Variables

Create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 2.3 Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Phase 3: Admin Components

#### 3.1 Admin Context

Create `src/contexts/AdminContext.tsx` for admin authentication.

#### 3.2 Admin Pages

Create these pages:
- `src/pages/admin/AdminLogin.tsx` - Admin login
- `src/pages/admin/AdminDashboard.tsx` - Main dashboard
- `src/pages/admin/ProductManagement.tsx` - Product CRUD
- `src/pages/admin/OrderManagement.tsx` - View orders

#### 3.3 Protected Routes

Update `src/App.tsx` to add admin routes with protection.

---

## Features

### Product Management
- ✅ Add new products with multiple images
- ✅ Edit existing products
- ✅ Delete products
- ✅ Upload images to Supabase Storage
- ✅ Manage stock status
- ✅ Set prices and discounts

### Order Management
- ✅ View all orders
- ✅ Update order status
- ✅ Filter by status
- ✅ Export orders

### Dashboard Stats
- ✅ Total products
- ✅ Total orders
- ✅ Revenue stats
- ✅ Low stock alerts

---

## Security

- Admin routes protected with authentication
- Separate admin login from customer accounts
- Row Level Security in Supabase
- Secure image uploads
- Password hashing with bcrypt

---

## Next Steps

Would you like me to:
1. ✅ Implement the complete admin dashboard now?
2. ⏸️ Set up Supabase first, then implement?
3. 📝 Create a simpler version without backend (JSON file based)?

For option 1, I'll create all the files and you'll just need to:
- Create Supabase project
- Run the SQL commands
- Add environment variables
- Deploy

Let me know and I'll start building!
