import fs from "fs";
import path from "path";
import { Product, products as seedProducts } from "@/data/products";
import { Category, categories as seedCategories } from "@/data/categories";
import { Testimonial, testimonials as seedTestimonials } from "@/data/testimonials";
import { FAQItem, faqs as seedFaqs } from "@/data/faqs";
import { ProcessStep, processStorySteps as seedProcessSteps } from "@/data/process";
import { StoryReel, storyReels as seedStoryReels } from "@/data/stories";
import { ExhibitionItem, exhibitions as seedExhibitions } from "@/data/exhibitions";
import { ProductStoryItem, productStories as seedProductStories } from "@/data/productStory";

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  role: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  discount_amount: number;
  coupon_code?: string;
  total_amount: number;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed";
  order_status: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minOrderValue: number;
}

export interface HeroCampaign {
  id: string;
  eyebrow: string;
  title1: string;
  title2: string;
  description: string;
  bullets: string[];
  price: number;
  originalPrice: number;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface AnnouncementItem {
  id: string;
  text: string;
  cta: string;
  link: string;
}

export interface BrandSettings {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  currency: string;
  freeShippingThreshold: number;
  supportEmail: string;
  supportPhone: string;
  whatsappNumber: string;
  address: string;
}

export interface DBData {
  users: User[];
  orders: Order[];
  products: Product[];
  coupons: Coupon[];
  categories: Category[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  heroCampaigns: HeroCampaign[];
  announcementItems: AnnouncementItem[];
  processSteps: ProcessStep[];
  brandSettings: BrandSettings;
  productStories: ProductStoryItem[];
  storyReels: StoryReel[];
  exhibitions: ExhibitionItem[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const initialHeroCampaigns: HeroCampaign[] = [
  {
    id: "hero-1",
    eyebrow: "AURA BIO-BOTANICAL CELLULAR RADIANCE",
    title1: "ONE RITUAL.",
    title2: "TOTAL RADIANCE.",
    description: "Clinically formulated with Grade-A Kashmiri Saffron, Swiss Tri-Peptides & Cold-Pressed Botanicals for unshakeable glass-skin glow.",
    bullets: ["Clinically proven cell membrane repair", "Dermatologically tested for Indian climate"],
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
    ctaText: "SHOP RADIANCE ELIXIR",
    ctaLink: "/category/facial-serums-elixirs",
  },
  {
    id: "hero-2",
    eyebrow: "SALON MASTERCLASS HAIR RANGE",
    title1: "UNSHAKEABLE HOLD.",
    title2: "WEIGHTLESS BOUNCE.",
    description: "Hydrolyzed micro-keratin and argan silk mist that locks intricate bridal updos with 85% humidity resistance and zero stiffness.",
    bullets: ["Zero white flaky residue guarantee", "85% Monsoon humidity proofing"],
    price: 999,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    ctaText: "EXPLORE SALON HAIR MIST",
    ctaLink: "/category/salon-hair-formulations",
  },
];

const initialAnnouncementItems: AnnouncementItem[] = [
  { id: "ann-1", text: "🌿 100% DERMATOLOGICALLY TESTED • CRUELTY-FREE", cta: "LEARN MORE →", link: "/about" },
  { id: "ann-2", text: "🚚 FREE EXPRESS DELIVERY ACROSS INDIA ON ORDERS ABOVE ₹999", cta: "SHOP NOW →", link: "/category/facial-serums-elixirs" },
  { id: "ann-3", text: "💎 USE CODE AURA15 FOR FLAT 15% OFF YOUR FIRST ORDER", cta: "CLAIM →", link: "/products/aura-24k-gold-saffron-radiance-elixir" },
  { id: "ann-4", text: "⭐ RATED 4.9/5 BY 25,000+ SALONS & BEAUTY EXPERTS PAN-INDIA", cta: "DISCOVER →", link: "/about" },
];

const initialBrandSettings: BrandSettings = {
  name: "AURA BEAUTY",
  legalName: "Aura Beauty Laboratories Pvt Ltd",
  tagline: "CLINICALLY PROVEN • DERMA TESTED • SALON GRADE",
  description: "Luxury dermatologically formulated skincare and salon hair finishing essentials.",
  currency: "₹",
  freeShippingThreshold: 999,
  supportEmail: "care@aurabeauty.in",
  supportPhone: "+91 98200 12345",
  whatsappNumber: "919820012345",
  address: "Aura House, Level 4, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
};

const initialData: DBData = {
  users: [],
  orders: [],
  products: seedProducts,
  coupons: [
    { code: "AURA15", discountType: "percentage", discountValue: 15, minOrderValue: 799 },
    { code: "FIRSTGLOW", discountType: "flat", discountValue: 200, minOrderValue: 999 },
    { code: "FREESHIP", discountType: "flat", discountValue: 70, minOrderValue: 0 },
    { code: "SALON25", discountType: "percentage", discountValue: 25, minOrderValue: 2499 },
  ],
  categories: seedCategories,
  testimonials: seedTestimonials,
  faqs: seedFaqs,
  heroCampaigns: initialHeroCampaigns,
  announcementItems: initialAnnouncementItems,
  processSteps: seedProcessSteps,
  brandSettings: initialBrandSettings,
  productStories: seedProductStories,
  storyReels: seedStoryReels,
  exhibitions: seedExhibitions,
};

let globalMemoryDb: DBData | null = null;

function sanitizeDb(parsed: any): DBData {
  return {
    users: Array.isArray(parsed?.users) ? parsed.users : [],
    orders: Array.isArray(parsed?.orders) ? parsed.orders : [],
    products: Array.isArray(parsed?.products) ? parsed.products : seedProducts,
    coupons: Array.isArray(parsed?.coupons) ? parsed.coupons : initialData.coupons,
    categories: Array.isArray(parsed?.categories) ? parsed.categories : seedCategories,
    testimonials: Array.isArray(parsed?.testimonials) ? parsed.testimonials : seedTestimonials,
    faqs: Array.isArray(parsed?.faqs) ? parsed.faqs : seedFaqs,
    heroCampaigns: Array.isArray(parsed?.heroCampaigns) ? parsed.heroCampaigns : initialHeroCampaigns,
    announcementItems: Array.isArray(parsed?.announcementItems) ? parsed.announcementItems : initialAnnouncementItems,
    processSteps: Array.isArray(parsed?.processSteps) ? parsed.processSteps : seedProcessSteps,
    brandSettings: parsed?.brandSettings || initialBrandSettings,
    productStories: Array.isArray(parsed?.productStories) ? parsed.productStories : seedProductStories,
    storyReels: Array.isArray(parsed?.storyReels) ? parsed.storyReels : seedStoryReels,
    exhibitions: Array.isArray(parsed?.exhibitions) ? parsed.exhibitions : seedExhibitions,
  };
}

async function getD1Binding() {
  try {
    // @ts-ignore
    if (typeof DB !== "undefined") return DB;
    if (typeof (globalThis as any).DB !== "undefined") return (globalThis as any).DB;
    if (typeof process !== "undefined" && (process as any).env && (process as any).env.DB) {
      return (process as any).env.DB;
    }
  } catch {}
  return null;
}

function readDbFromFs(): DBData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return sanitizeDb(JSON.parse(raw));
  } catch {
    return initialData;
  }
}

function writeDbToFs(data: DBData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}
}

async function readDbAsync(): Promise<DBData> {
  const d1 = await getD1Binding();
  if (d1) {
    try {
      const res = await d1.prepare("SELECT value FROM store_kv WHERE key = 'store_data' LIMIT 1").first();
      if (res && res.value) {
        globalMemoryDb = sanitizeDb(JSON.parse(res.value));
        return globalMemoryDb;
      }
    } catch (err) {
      console.error("D1 read error:", err);
    }
  }
  if (!globalMemoryDb) {
    globalMemoryDb = readDbFromFs();
  }
  return globalMemoryDb;
}

async function writeDbAsync(data: DBData): Promise<void> {
  globalMemoryDb = data;
  writeDbToFs(data);
  const d1 = await getD1Binding();
  if (d1) {
    try {
      await d1
        .prepare(
          "INSERT INTO store_kv (key, value) VALUES ('store_data', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
        )
        .bind(JSON.stringify(data))
        .run();
    } catch (err) {
      console.error("D1 write error:", err);
    }
  }
}

export const store = {
  // Users
  findUserByEmail: async (email: string): Promise<User | null> => {
    const db = await readDbAsync();
    return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  findUserById: async (id: string): Promise<User | null> => {
    const db = await readDbAsync();
    return db.users.find((u) => u.id === id) || null;
  },

  createUser: async (user: Omit<User, "created_at">): Promise<User> => {
    const db = await readDbAsync();
    const newUser: User = { ...user, created_at: new Date().toISOString() };
    db.users.push(newUser);
    await writeDbAsync(db);
    return newUser;
  },

  updateUserProfile: async (id: string, updates: Partial<User>): Promise<User | null> => {
    const db = await readDbAsync();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    db.users[idx] = { ...db.users[idx], ...updates };
    await writeDbAsync(db);
    return db.users[idx];
  },

  getAllUsers: async (): Promise<User[]> => {
    const db = await readDbAsync();
    return db.users;
  },

  // Products
  getAllProducts: async (): Promise<Product[]> => {
    const db = await readDbAsync();
    return db.products || seedProducts;
  },

  createProduct: async (productData: Omit<Product, "id">): Promise<Product> => {
    const db = await readDbAsync();
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.products.unshift(newProduct);
    await writeDbAsync(db);
    return newProduct;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    const db = await readDbAsync();
    const idx = db.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    db.products[idx] = { ...db.products[idx], ...updates };
    await writeDbAsync(db);
    return db.products[idx];
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prevLen = db.products.length;
    db.products = db.products.filter((p) => p.id !== id);
    if (db.products.length !== prevLen) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // Categories
  getAllCategories: async (): Promise<Category[]> => {
    const db = await readDbAsync();
    return db.categories || seedCategories;
  },

  createCategory: async (categoryData: Omit<Category, "id">): Promise<Category> => {
    const db = await readDbAsync();
    const newCat: Category = {
      ...categoryData,
      id: `cat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.categories.push(newCat);
    await writeDbAsync(db);
    return newCat;
  },

  updateCategory: async (id: string, updates: Partial<Category>): Promise<Category | null> => {
    const db = await readDbAsync();
    const idx = db.categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    db.categories[idx] = { ...db.categories[idx], ...updates };
    await writeDbAsync(db);
    return db.categories[idx];
  },

  deleteCategory: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.categories.length;
    db.categories = db.categories.filter((c) => c.id !== id);
    if (db.categories.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // Testimonials
  getAllTestimonials: async (): Promise<Testimonial[]> => {
    const db = await readDbAsync();
    return db.testimonials || seedTestimonials;
  },

  createTestimonial: async (testData: Omit<Testimonial, "id">): Promise<Testimonial> => {
    const db = await readDbAsync();
    const newTest: Testimonial = {
      ...testData,
      id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.testimonials.unshift(newTest);
    await writeDbAsync(db);
    return newTest;
  },

  updateTestimonial: async (id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> => {
    const db = await readDbAsync();
    const idx = db.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    db.testimonials[idx] = { ...db.testimonials[idx], ...updates };
    await writeDbAsync(db);
    return db.testimonials[idx];
  },

  deleteTestimonial: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.testimonials.length;
    db.testimonials = db.testimonials.filter((t) => t.id !== id);
    if (db.testimonials.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // FAQs
  getAllFaqs: async (): Promise<FAQItem[]> => {
    const db = await readDbAsync();
    return db.faqs || seedFaqs;
  },

  createFaq: async (faqData: Omit<FAQItem, "id">): Promise<FAQItem> => {
    const db = await readDbAsync();
    const newFaq: FAQItem = {
      ...faqData,
      id: `faq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.faqs.push(newFaq);
    await writeDbAsync(db);
    return newFaq;
  },

  updateFaq: async (id: string, updates: Partial<FAQItem>): Promise<FAQItem | null> => {
    const db = await readDbAsync();
    const idx = db.faqs.findIndex((f) => f.id === id);
    if (idx === -1) return null;
    db.faqs[idx] = { ...db.faqs[idx], ...updates };
    await writeDbAsync(db);
    return db.faqs[idx];
  },

  deleteFaq: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.faqs.length;
    db.faqs = db.faqs.filter((f) => f.id !== id);
    if (db.faqs.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // Hero Campaigns
  getAllHeroCampaigns: async (): Promise<HeroCampaign[]> => {
    const db = await readDbAsync();
    return db.heroCampaigns || initialHeroCampaigns;
  },

  createHeroCampaign: async (heroData: Omit<HeroCampaign, "id">): Promise<HeroCampaign> => {
    const db = await readDbAsync();
    const newHero: HeroCampaign = {
      ...heroData,
      id: `hero_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.heroCampaigns.unshift(newHero);
    await writeDbAsync(db);
    return newHero;
  },

  updateHeroCampaign: async (id: string, updates: Partial<HeroCampaign>): Promise<HeroCampaign | null> => {
    const db = await readDbAsync();
    const idx = db.heroCampaigns.findIndex((h) => h.id === id);
    if (idx === -1) return null;
    db.heroCampaigns[idx] = { ...db.heroCampaigns[idx], ...updates };
    await writeDbAsync(db);
    return db.heroCampaigns[idx];
  },

  deleteHeroCampaign: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.heroCampaigns.length;
    db.heroCampaigns = db.heroCampaigns.filter((h) => h.id !== id);
    if (db.heroCampaigns.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // Announcement Items
  getAnnouncementItems: async (): Promise<AnnouncementItem[]> => {
    const db = await readDbAsync();
    return db.announcementItems || initialAnnouncementItems;
  },

  updateAnnouncementItems: async (items: AnnouncementItem[]): Promise<AnnouncementItem[]> => {
    const db = await readDbAsync();
    db.announcementItems = items;
    await writeDbAsync(db);
    return db.announcementItems;
  },

  addAnnouncementItem: async (itemData: Omit<AnnouncementItem, "id">): Promise<AnnouncementItem> => {
    const db = await readDbAsync();
    const newItem: AnnouncementItem = {
      ...itemData,
      id: `ann_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.announcementItems.push(newItem);
    await writeDbAsync(db);
    return newItem;
  },

  updateAnnouncementItem: async (id: string, updates: Partial<AnnouncementItem>): Promise<AnnouncementItem | null> => {
    const db = await readDbAsync();
    const idx = db.announcementItems.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    db.announcementItems[idx] = { ...db.announcementItems[idx], ...updates };
    await writeDbAsync(db);
    return db.announcementItems[idx];
  },

  deleteAnnouncementItem: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.announcementItems.length;
    db.announcementItems = db.announcementItems.filter((item) => item.id !== id);
    if (db.announcementItems.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // OUR PROCESS Steps
  getProcessSteps: async (): Promise<ProcessStep[]> => {
    const db = await readDbAsync();
    return db.processSteps || seedProcessSteps;
  },

  updateProcessSteps: async (steps: ProcessStep[]): Promise<ProcessStep[]> => {
    const db = await readDbAsync();
    db.processSteps = steps;
    await writeDbAsync(db);
    return db.processSteps;
  },

  createProcessStep: async (stepData: ProcessStep): Promise<ProcessStep> => {
    const db = await readDbAsync();
    db.processSteps.push(stepData);
    await writeDbAsync(db);
    return stepData;
  },

  updateProcessStep: async (step: string | number, updates: Partial<ProcessStep>): Promise<ProcessStep | null> => {
    const db = await readDbAsync();
    const stepStr = String(step).padStart(2, "0");
    const idx = db.processSteps.findIndex((s, i) => s.step === stepStr || i === Number(step) || String(s.step) === String(step));
    if (idx === -1) return null;
    db.processSteps[idx] = { ...db.processSteps[idx], ...updates };
    await writeDbAsync(db);
    return db.processSteps[idx];
  },

  deleteProcessStep: async (step: string | number): Promise<boolean> => {
    const db = await readDbAsync();
    const stepStr = String(step).padStart(2, "0");
    const prev = db.processSteps.length;
    db.processSteps = db.processSteps.filter((s, i) => s.step !== stepStr && i !== Number(step) && String(s.step) !== String(step));
    if (db.processSteps.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // PRODUCT STORY
  getAllProductStories: async (): Promise<ProductStoryItem[]> => {
    const db = await readDbAsync();
    return db.productStories || seedProductStories;
  },

  createProductStory: async (storyData: Omit<ProductStoryItem, "id">): Promise<ProductStoryItem> => {
    const db = await readDbAsync();
    const newStory: ProductStoryItem = {
      ...storyData,
      id: `pstory_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.productStories.unshift(newStory);
    await writeDbAsync(db);
    return newStory;
  },

  updateProductStory: async (id: string, updates: Partial<ProductStoryItem>): Promise<ProductStoryItem | null> => {
    const db = await readDbAsync();
    const idx = db.productStories.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    db.productStories[idx] = { ...db.productStories[idx], ...updates };
    await writeDbAsync(db);
    return db.productStories[idx];
  },

  deleteProductStory: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.productStories.length;
    db.productStories = db.productStories.filter((s) => s.id !== id);
    if (db.productStories.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // SHOP THE STORIES (Video Reels)
  getAllStoryReels: async (): Promise<StoryReel[]> => {
    const db = await readDbAsync();
    return db.storyReels || seedStoryReels;
  },

  createStoryReel: async (reelData: Omit<StoryReel, "id">): Promise<StoryReel> => {
    const db = await readDbAsync();
    const newReel: StoryReel = {
      ...reelData,
      id: `reel_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.storyReels.unshift(newReel);
    await writeDbAsync(db);
    return newReel;
  },

  updateStoryReel: async (id: string, updates: Partial<StoryReel>): Promise<StoryReel | null> => {
    const db = await readDbAsync();
    const idx = db.storyReels.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    db.storyReels[idx] = { ...db.storyReels[idx], ...updates };
    await writeDbAsync(db);
    return db.storyReels[idx];
  },

  deleteStoryReel: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.storyReels.length;
    db.storyReels = db.storyReels.filter((r) => r.id !== id);
    if (db.storyReels.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // EXHIBITIONS
  getAllExhibitions: async (): Promise<ExhibitionItem[]> => {
    const db = await readDbAsync();
    return db.exhibitions || seedExhibitions;
  },

  createExhibition: async (exData: Omit<ExhibitionItem, "id">): Promise<ExhibitionItem> => {
    const db = await readDbAsync();
    const newEx: ExhibitionItem = {
      ...exData,
      id: `ex_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    db.exhibitions.unshift(newEx);
    await writeDbAsync(db);
    return newEx;
  },

  updateExhibition: async (id: string, updates: Partial<ExhibitionItem>): Promise<ExhibitionItem | null> => {
    const db = await readDbAsync();
    const idx = db.exhibitions.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    db.exhibitions[idx] = { ...db.exhibitions[idx], ...updates };
    await writeDbAsync(db);
    return db.exhibitions[idx];
  },

  deleteExhibition: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.exhibitions.length;
    db.exhibitions = db.exhibitions.filter((e) => e.id !== id);
    if (db.exhibitions.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // Brand Settings
  getBrandSettings: async (): Promise<BrandSettings> => {
    const db = await readDbAsync();
    return db.brandSettings || initialBrandSettings;
  },

  updateBrandSettings: async (settings: Partial<BrandSettings>): Promise<BrandSettings> => {
    const db = await readDbAsync();
    db.brandSettings = { ...db.brandSettings, ...settings };
    await writeDbAsync(db);
    return db.brandSettings;
  },

  // Orders
  createOrder: async (orderData: Omit<Order, "id" | "order_number" | "created_at">): Promise<Order> => {
    const db = await readDbAsync();
    const timestamp = Date.now().toString().slice(-6);
    const order_number = `AURA-${timestamp}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      order_number,
      created_at: new Date().toISOString(),
    };
    db.orders.unshift(newOrder);
    await writeDbAsync(db);
    return newOrder;
  },

  getUserOrders: async (userId: string): Promise<Order[]> => {
    const db = await readDbAsync();
    return db.orders.filter((o) => o.user_id === userId);
  },

  getOrdersByUser: async (userId: string): Promise<Order[]> => {
    const db = await readDbAsync();
    return db.orders.filter((o) => o.user_id === userId);
  },

  getOrderById: async (id: string): Promise<Order | null> => {
    const db = await readDbAsync();
    return db.orders.find((o) => o.id === id || o.order_number === id) || null;
  },

  getAllOrders: async (): Promise<Order[]> => {
    const db = await readDbAsync();
    return db.orders;
  },

  updateOrderStatus: async (orderId: string, status: Order["order_status"]): Promise<Order | null> => {
    const db = await readDbAsync();
    const idx = db.orders.findIndex((o) => o.id === orderId || o.order_number === orderId);
    if (idx === -1) return null;
    db.orders[idx].order_status = status;
    await writeDbAsync(db);
    return db.orders[idx];
  },

  deleteOrder: async (id: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.orders.length;
    db.orders = db.orders.filter((o) => o.id !== id && o.order_number !== id);
    if (db.orders.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  // Coupons
  getAllCoupons: async (): Promise<Coupon[]> => {
    const db = await readDbAsync();
    return db.coupons;
  },

  createCoupon: async (coupon: Coupon): Promise<Coupon> => {
    const db = await readDbAsync();
    db.coupons.push(coupon);
    await writeDbAsync(db);
    return coupon;
  },

  updateCoupon: async (code: string, updates: Partial<Coupon>): Promise<Coupon | null> => {
    const db = await readDbAsync();
    const idx = db.coupons.findIndex((c) => c.code.toUpperCase() === code.toUpperCase());
    if (idx === -1) return null;
    db.coupons[idx] = { ...db.coupons[idx], ...updates };
    if (updates.code) db.coupons[idx].code = updates.code.toUpperCase();
    await writeDbAsync(db);
    return db.coupons[idx];
  },

  deleteCoupon: async (code: string): Promise<boolean> => {
    const db = await readDbAsync();
    const prev = db.coupons.length;
    db.coupons = db.coupons.filter((c) => c.code.toUpperCase() !== code.toUpperCase());
    if (db.coupons.length !== prev) {
      await writeDbAsync(db);
      return true;
    }
    return false;
  },

  validateCoupon: async (code: string, cartTotal: number) => {
    const db = await readDbAsync();
    const coupon = db.coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { valid: false, message: "Invalid coupon code" };
    }
    if (cartTotal < coupon.minOrderValue) {
      return {
        valid: false,
        message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}`,
      };
    }
    const discount =
      coupon.discountType === "percentage"
        ? Math.round((cartTotal * coupon.discountValue) / 100)
        : coupon.discountValue;

    return {
      valid: true,
      code: coupon.code,
      discount,
      message: `Coupon ${coupon.code} applied! Saved ₹${discount}`,
    };
  },

  // Combined Landing Page Payload
  getLandingPageData: async () => {
    const db = await readDbAsync();
    return {
      heroCampaigns: db.heroCampaigns || initialHeroCampaigns,
      announcementItems: db.announcementItems || initialAnnouncementItems,
      categories: db.categories || seedCategories,
      testimonials: db.testimonials || seedTestimonials,
      faqs: db.faqs || seedFaqs,
      processSteps: db.processSteps || seedProcessSteps,
      brandSettings: db.brandSettings || initialBrandSettings,
      productStories: db.productStories || seedProductStories,
      storyReels: db.storyReels || seedStoryReels,
      exhibitions: db.exhibitions || seedExhibitions,
      products: db.products || seedProducts,
    };
  },

  // Analytics
  getStats: async () => {
    const db = await readDbAsync();
    const totalOrders = db.orders.length;
    const totalRevenue = db.orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    const totalProducts = (db.products || seedProducts).length;
    const totalCustomers = db.users.length;
    const totalCategories = (db.categories || seedCategories).length;

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
      totalCategories,
      recentOrders: db.orders.slice(0, 5),
    };
  },

  // Reset / Re-seed Data
  resetStoreData: async (mode: "seed" | "wipe" = "seed") => {
    let freshData: DBData;
    if (mode === "wipe") {
      freshData = {
        users: [],
        orders: [],
        products: [],
        coupons: [],
        categories: [],
        testimonials: [],
        faqs: [],
        heroCampaigns: [],
        announcementItems: [],
        processSteps: [],
        brandSettings: initialBrandSettings,
        productStories: [],
        storyReels: [],
        exhibitions: [],
      };
    } else {
      freshData = {
        users: [],
        orders: [],
        products: seedProducts,
        coupons: [
          { code: "AURA15", discountType: "percentage", discountValue: 15, minOrderValue: 799 },
          { code: "FIRSTGLOW", discountType: "flat", discountValue: 200, minOrderValue: 999 },
          { code: "FREESHIP", discountType: "flat", discountValue: 70, minOrderValue: 0 },
          { code: "SALON25", discountType: "percentage", discountValue: 25, minOrderValue: 2499 },
        ],
        categories: seedCategories,
        testimonials: seedTestimonials,
        faqs: seedFaqs,
        heroCampaigns: initialHeroCampaigns,
        announcementItems: initialAnnouncementItems,
        processSteps: seedProcessSteps,
        brandSettings: initialBrandSettings,
        productStories: seedProductStories,
        storyReels: seedStoryReels,
        exhibitions: seedExhibitions,
      };
    }
    await writeDbAsync(freshData);
    return freshData;
  },
};
