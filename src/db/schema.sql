-- Cloudflare D1 Database Schema for MARVAC E-Commerce

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  role TEXT DEFAULT 'customer',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  items_json TEXT NOT NULL,
  subtotal REAL NOT NULL,
  shipping_fee REAL NOT NULL,
  discount_amount REAL DEFAULT 0,
  coupon_code TEXT,
  total_amount REAL NOT NULL,
  payment_method TEXT DEFAULT 'COD',
  payment_status TEXT DEFAULT 'pending',
  order_status TEXT DEFAULT 'confirmed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Order Items Table (Detailed breakdown)
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  product_image TEXT,
  unit_price REAL NOT NULL,
  quantity INTEGER NOT NULL,
  total_price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 4. Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL, -- 'percentage' or 'flat'
  discount_value REAL NOT NULL,
  min_order_value REAL DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Coupons
INSERT OR IGNORE INTO coupons (id, code, discount_type, discount_value, min_order_value, is_active)
VALUES 
  ('cpn_1', 'PRO10', 'percentage', 10, 499, 1),
  ('cpn_2', 'FREESHIP', 'flat', 70, 0, 1),
  ('cpn_3', 'SALON20', 'percentage', 20, 1999, 1);
