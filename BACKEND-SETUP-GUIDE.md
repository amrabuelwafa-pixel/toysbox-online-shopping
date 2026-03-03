# 🔧 Backend Setup Guide - ToyBox Egypt

## Overview

This guide will help you add a complete backend to your ToyBox Egypt project.

---

## 📋 Table of Contents

1. [Technology Stack Options](#technology-stack-options)
2. [Recommended Stack](#recommended-stack)
3. [Backend Structure](#backend-structure)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Frontend Changes](#frontend-changes)
8. [Deployment](#deployment)

---

## Technology Stack Options

### Option 1: Node.js + Express (Recommended)
- **Backend**: Node.js with Express
- **Database**: PostgreSQL or MongoDB
- **ORM**: Prisma (PostgreSQL) or Mongoose (MongoDB)
- **Auth**: JWT tokens + bcrypt
- **Payments**: Stripe
- **Hosting**: Vercel (frontend) + Railway/Render (backend)

### Option 2: Python + FastAPI
- **Backend**: Python with FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Auth**: JWT tokens + passlib
- **Payments**: Stripe
- **Hosting**: Vercel (frontend) + Railway/Render (backend)

### Option 3: Serverless (Easiest)
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Hosting**: All on Vercel

---

## Recommended Stack

**Node.js + Express + PostgreSQL + Prisma**

Why?
- Same language as frontend (JavaScript/TypeScript)
- Easy to learn and maintain
- Great ecosystem
- Free hosting options
- Prisma makes database work easy

---

## Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # Database connection
│   │   └── env.ts                # Environment variables
│   ├── controllers/
│   │   ├── auth.controller.ts    # Login, signup, logout
│   │   ├── products.controller.ts # Product CRUD
│   │   ├── orders.controller.ts   # Order management
│   │   ├── cart.controller.ts     # Cart operations
│   │   └── users.controller.ts    # User profile
│   ├── models/
│   │   └── schema.prisma         # Database schema
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── products.routes.ts
│   │   ├── orders.routes.ts
│   │   ├── cart.routes.ts
│   │   └── users.routes.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts    # JWT verification
│   │   ├── error.middleware.ts   # Error handling
│   │   └── validation.middleware.ts
│   ├── services/
│   │   ├── email.service.ts      # Send emails
│   │   ├── payment.service.ts    # Stripe integration
│   │   └── ai.service.ts         # OpenAI integration
│   ├── utils/
│   │   ├── jwt.ts                # Token generation
│   │   ├── password.ts           # Hashing
│   │   └── validators.ts         # Input validation
│   └── server.ts                 # Main server file
├── prisma/
│   └── schema.prisma             # Database schema
├── .env                          # Environment variables
├── .env.example                  # Example env file
├── package.json
└── tsconfig.json
```

---

## Step-by-Step Implementation

### Step 1: Initialize Backend Project

```bash
# Create backend folder
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors dotenv bcryptjs jsonwebtoken
npm install @prisma/client stripe nodemailer openai

# Install dev dependencies
npm install -D typescript @types/node @types/express @types/cors
npm install -D @types/bcryptjs @types/jsonwebtoken ts-node nodemon prisma

# Initialize TypeScript
npx tsc --init

# Initialize Prisma
npx prisma init
```

### Step 2: Create Database Schema

**File: `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  orders    Order[]
  cart      CartItem[]
}

model Product {
  id            String   @id @default(uuid())
  name          String
  nameAr        String?
  description   String
  price         Float
  originalPrice Float?
  image         String
  ageMin        Int
  ageMax        Int
  category      String
  inStock       Boolean  @default(true)
  stock         Int      @default(0)
  rating        Float    @default(0)
  badge         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  orderItems    OrderItem[]
  cartItems     CartItem[]
}

model Order {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])
  status        OrderStatus @default(PENDING)
  total         Float
  shippingInfo  Json
  paymentMethod String
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  items         OrderItem[]
}

model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Float
}

model CartItem {
  id        String  @id @default(uuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  createdAt DateTime @default(now())
  
  @@unique([userId, productId])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}
```

### Step 3: Create Main Server File

**File: `src/server.ts`**

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products.routes';
import orderRoutes from './routes/orders.routes';
import cartRoutes from './routes/cart.routes';
import userRoutes from './routes/users.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ToyBox API is running' });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### Step 4: Create Auth Controller

**File: `src/controllers/auth.controller.ts`**

```typescript
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone
      }
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

### Step 5: Create JWT Utility

**File: `src/utils/jwt.ts`**

```typescript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
```

### Step 6: Create Auth Middleware

**File: `src/middleware/auth.middleware.ts`**

```typescript
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Step 7: Create Environment Variables

**File: `.env.example`**

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/toybox"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email (SendGrid or similar)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
EMAIL_FROM=noreply@toyboxegypt.com

# OpenAI (for AI recommendations)
OPENAI_API_KEY=sk-your-openai-key
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Change password

---

## Frontend Changes

### 1. Create API Service

**File: `src/services/api.ts`**

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const api = {
  // Auth
  signup: async (data: any) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  login: async (data: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Products
  getProducts: async (filters?: any) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_URL}/products?${params}`);
    return res.json();
  },

  // Cart
  getCart: async () => {
    const res = await fetch(`${API_URL}/cart`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  addToCart: async (productId: string, quantity: number) => {
    const res = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    return res.json();
  },

  // Orders
  createOrder: async (data: any) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getOrders: async () => {
    const res = await fetch(`${API_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  }
};
```

### 2. Update AuthContext

Replace localStorage logic with API calls:

```typescript
const signup = async (email: string, password: string, name: string) => {
  const data = await api.signup({ email, password, name });
  if (data.token) {
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setIsAuthenticated(true);
  }
};
```

### 3. Add Environment Variable

**File: `.env`**

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Deployment

### Backend Deployment (Railway)

1. Create account on [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL database
4. Deploy from GitHub
5. Add environment variables
6. Get deployment URL

### Frontend Update

Update `.env.production`:

```env
VITE_API_URL=https://your-backend.railway.app/api
```

---

## Cost Estimate

### Free Tier (Good for testing)
- **Railway**: Free $5/month credit
- **Supabase**: Free PostgreSQL database
- **Vercel**: Free frontend hosting
- **Total**: $0/month (with limits)

### Production (Paid)
- **Railway**: ~$10-20/month
- **Database**: ~$10/month
- **Stripe**: 2.9% + $0.30 per transaction
- **SendGrid**: $15/month (40k emails)
- **Total**: ~$35-45/month + transaction fees

---

## Next Steps

1. Choose your stack
2. Set up database
3. Implement authentication
4. Add product management
5. Integrate payments
6. Add email notifications
7. Test thoroughly
8. Deploy to production

---

## Need Help?

This is a complex project. Consider:
- Hiring a backend developer
- Using a backend-as-a-service (Supabase, Firebase)
- Starting with serverless functions (easier)

Would you like me to help you implement any specific part?
