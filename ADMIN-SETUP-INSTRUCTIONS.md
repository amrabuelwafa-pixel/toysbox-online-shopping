# 🚀 Admin Dashboard Setup Instructions

## What You Have Now

✅ Complete admin dashboard UI
✅ Product management (add/edit/delete)
✅ Order management
✅ Image upload capability
✅ Secure authentication
✅ All code ready to use

## What You Need To Do

Follow these steps to activate the admin dashboard:

---

## Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new organization (free)

---

## Step 2: Create New Project

1. Click "New Project"
2. Fill in:
   - **Name**: toybox-egypt
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to Egypt (Europe West recommended)
   - **Pricing Plan**: Free tier is perfect to start
3. Click "Create new project"
4. Wait 2-3 minutes for setup

---

## Step 3: Get Your API Keys

1. In your Supabase project, click "Settings" (gear icon)
2. Click "API" in the sidebar
3. Copy these two values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** key (long string starting with eyJ...)

---

## Step 4: Configure Environment Variables

1. In your project root, create file `.env.local`
2. Add these lines (replace with your actual values):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Save the file
4. **IMPORTANT**: Never commit this file to GitHub!

---

## Step 5: Set Up Database

1. In Supabase, click "SQL Editor" in sidebar
2. Click "New query"
3. Copy and paste this SQL code:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

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

-- Orders table
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
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public can read products
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

-- Authenticated users can manage products
CREATE POLICY "Authenticated can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Authenticated users can manage orders
CREATE POLICY "Authenticated can view orders" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update orders" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');
```

4. Click "Run" button
5. You should see "Success. No rows returned"

---

## Step 6: Set Up Storage for Images

1. In Supabase, click "Storage" in sidebar
2. Click "Create a new bucket"
3. Name it: `product-images`
4. Make it **Public**
5. Click "Create bucket"

6. Click on the `product-images` bucket
7. Click "Policies" tab
8. Click "New Policy"
9. Choose "For full customization"
10. Add these policies:

**Policy 1: Public Read**
- Name: Public can view images
- Target roles: public
- Policy command: SELECT
- USING expression: `true`

**Policy 2: Authenticated Upload**
- Name: Authenticated can upload
- Target roles: authenticated
- Policy command: INSERT
- WITH CHECK expression: `bucket_id = 'product-images'`

**Policy 3: Authenticated Delete**
- Name: Authenticated can delete
- Target roles: authenticated
- Policy command: DELETE
- USING expression: `bucket_id = 'product-images'`

---

## Step 7: Create Admin User

1. In Supabase, click "Authentication" in sidebar
2. Click "Users" tab
3. Click "Add user" → "Create new user"
4. Fill in:
   - **Email**: admin@toyboxegypt.com (or your email)
   - **Password**: (create a strong password)
   - **Auto Confirm User**: YES (check this box)
5. Click "Create user"

---

## Step 8: Test the Admin Dashboard

1. Start your development server:
```bash
npm run dev
```

2. Go to: http://localhost:5173/admin/login

3. Login with:
   - Email: admin@toyboxegypt.com
   - Password: (the password you created)

4. You should see the admin dashboard!

---

## Step 9: Add Your First Product

1. Click "Manage Products"
2. Click "Add Product"
3. Fill in the form:
   - Upload at least 3 images
   - Fill in all required fields
   - Set price, age range, category
4. Click "Add Product"
5. Product should appear in your store!

---

## Step 10: Deploy to Vercel

1. Add environment variables in Vercel:
   - Go to your project settings
   - Click "Environment Variables"
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your anon key

2. Push your code to GitHub:
```bash
git add .
git commit -m "Add admin dashboard"
git push origin main
```

3. Vercel will auto-deploy with admin dashboard!

---

## Admin Dashboard URLs

- **Local**: http://localhost:5173/admin/login
- **Production**: https://your-site.vercel.app/admin/login

---

## Features You Can Use Now

### Product Management
✅ Add new products with multiple images
✅ Edit existing products
✅ Delete products
✅ Upload images directly
✅ Manage stock status
✅ Set prices and discounts
✅ Add product videos

### Order Management
✅ View all orders
✅ Update order status
✅ Filter by status
✅ See customer details

### Dashboard
✅ View total products
✅ View total orders
✅ See revenue stats
✅ Track low stock items

---

## Security Notes

🔒 Admin routes are protected
🔒 Only authenticated users can access admin panel
🔒 Row Level Security enabled in database
🔒 Images stored securely in Supabase Storage
🔒 Environment variables never exposed to client

---

## Troubleshooting

### "Backend Not Configured" Error
- Make sure `.env.local` file exists
- Check that environment variables are correct
- Restart dev server after adding env variables

### Can't Login
- Make sure you created the admin user in Supabase
- Check email and password are correct
- Verify user is confirmed in Supabase Auth

### Images Not Uploading
- Check Storage bucket is created and public
- Verify storage policies are set correctly
- Check file size (max 50MB)

### Products Not Showing
- Make sure database tables are created
- Check RLS policies are set
- Verify products table has data

---

## Need Help?

Check these files for more details:
- `ADMIN-DASHBOARD-GUIDE.md` - Complete technical guide
- `SERVERLESS-BACKEND-GUIDE.md` - Backend architecture
- Supabase docs: https://supabase.com/docs

---

## What's Next?

After setup, you can:
1. Import your existing products from `src/data/products.ts`
2. Customize the admin dashboard design
3. Add more admin features (analytics, reports, etc.)
4. Set up email notifications for orders
5. Add more admin users

---

## Summary

You now have a complete admin dashboard that lets you:
- Manage products without coding
- Upload images easily
- Track orders
- Update inventory
- All through a beautiful UI

Just follow the steps above to activate it! 🎉
