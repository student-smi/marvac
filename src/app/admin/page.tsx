"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ShoppingCart,
  IndianRupee,
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  ExternalLink,
  Search,
  Tag,
  Database,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Megaphone,
  MessageSquare,
  HelpCircle,
  Settings,
  Star,
  Check,
  Edit,
  Save,
  Sliders,
  Play,
  Activity,
  BookOpen,
  Video,
  Landmark,
  RotateCcw,
  UploadCloud,
} from "lucide-react";
import AuraLogo from "@/components/AuraLogo";
import { Order, Coupon, HeroCampaign, AnnouncementItem, BrandSettings, TransitionBannerSettings } from "@/lib/store";
import { Product } from "@/data/products";
import { Category } from "@/data/categories";
import { Testimonial } from "@/data/testimonials";
import { FAQItem } from "@/data/faqs";
import { ProcessStep } from "@/data/process";
import { StoryReel } from "@/data/stories";
import { ExhibitionItem } from "@/data/exhibitions";
import { ProductStoryItem } from "@/data/productStory";
import { CustomizedKit } from "@/data/kits";
import { HairGoal } from "@/data/goals";

const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 1200;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/webp", 0.85);
          resolve(dataUrl);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

function ImageUploadField({
  label = "Upload Image",
  value,
  onChange,
  aspectHint,
}: {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  aspectHint?: string;
}) {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const dataUrl = await compressImageFile(file);
      onChange(dataUrl);
    } catch {
      alert("Error reading image file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const inputId = `file-input-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">
          {label} {aspectHint && <span className="text-[10px] text-slate-400 font-normal">({aspectHint})</span>}
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold underline"
        >
          {isUrlMode ? "Upload File from Device" : "or Paste Image URL"}
        </button>
      </div>

      {isUrlMode ? (
        <input
          type="text"
          placeholder="https://... or /images/..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
        />
      ) : (
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={inputId}
          />
          <label
            htmlFor={inputId}
            className="flex-1 cursor-pointer border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 rounded-xl p-3 text-center transition-colors group"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 group-hover:text-blue-600">
              <UploadCloud className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
              <span>{isUploading ? "Processing & Compressing Image..." : "Choose Image from Device"}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WEBP (Auto-optimized)</p>
          </label>
        </div>
      )}

      {/* Live Preview if value exists */}
      {value && (
        <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-700 truncate">Image Selected</p>
            <p className="text-[10px] text-slate-400 truncate">
              {value.startsWith("data:") ? "Uploaded from device" : value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove Image"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "products"
    | "hero"
    | "transitionBanner"
    | "kits"
    | "hairGoals"
    | "announcements"
    | "process"
    | "productStories"
    | "stories"
    | "exhibitions"
    | "categories"
    | "testimonials"
    | "faqs"
    | "orders"
    | "coupons"
    | "settings"
  >("overview");

  const [adminNavGroup, setAdminNavGroup] = useState<"all" | "catalog" | "branding" | "experience">("all");

  // State
  const [stats, setStats] = useState<any>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalCategories: 0,
    recentOrders: [],
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroCampaign[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [productStories, setProductStories] = useState<ProductStoryItem[]>([]);
  const [storyReels, setStoryReels] = useState<StoryReel[]>([]);
  const [exhibitions, setExhibitions] = useState<ExhibitionItem[]>([]);
  const [kits, setKits] = useState<CustomizedKit[]>([]);
  const [hairGoals, setHairGoals] = useState<HairGoal[]>([]);
  const [transitionBanner, setTransitionBanner] = useState<TransitionBannerSettings>({
    badge: "TRUSTED BY",
    headline: "35L + PEOPLE",
    subtitle: "Salons & stylists across India trust Aura for unshakeable hold and radiant finish.",
    mediaType: "image",
    mediaUrl: "/images/mosaic_filmstrip.jpg",
    ctaText: "SHOP WITH AI",
    ctaLink: "/category/hair-styling-hold",
  });
  const [isSavingBanner, setIsSavingBanner] = useState(false);

  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    name: "AURA BEAUTY",
    legalName: "Aura Beauty Laboratories Pvt Ltd",
    tagline: "CLINICALLY PROVEN • DERMA TESTED • SALON GRADE",
    description: "Luxury dermatologically formulated skincare and salon hair finishing essentials.",
    currency: "₹",
    freeShippingThreshold: 999,
    supportEmail: "care@aurabeauty.in",
    supportPhone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    address: "Aura House, Level 4, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
  });

  // Customized Kit Modal State
  const [isAddKitOpen, setIsAddKitOpen] = useState(false);
  const [editingKit, setEditingKit] = useState<CustomizedKit | null>(null);
  const [newKit, setNewKit] = useState({
    name: "",
    subtitle: "",
    itemCount: "3",
    price: "1299",
    originalPrice: "1799",
    image: "/images/kit_starter.jpg",
    badge: "MOST POPULAR",
    items: "Detangling Pro Brush, Hydra Mousse 180ml, Silk Hold Mist",
  });

  // Hair Goal Modal State
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<HairGoal | null>(null);
  const [newGoal, setNewGoal] = useState({
    name: "",
    title: "",
    tagline: "",
    badge: "HOLD",
    image: "/images/process_05_hspray.png",
    filterKey: "hold",
  });

  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    originalPrice: "",
    category: "Skin & Hair",
    image: "/images/hero_podium.png",
    description: "",
    badge: "NEW",
    isBestseller: false,
  });

  // Hero Slide Modal State
  const [isAddHeroOpen, setIsAddHeroOpen] = useState(false);
  const [newHero, setNewHero] = useState({
    eyebrow: "AURA EXCLUSIVE",
    title1: "UNSHAKEABLE RADIANCE.",
    title2: "CLINICAL PRECISION.",
    description: "Formulated for all-day luminous hold and instant revitalizing nourishment.",
    bullets: "Dermatologically tested, Zero white residue, 24h humidity lock",
    price: "1299",
    originalPrice: "1799",
    image: "/images/hero_podium.png",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "/category/hair-styling-hold",
  });

  // Announcement Modal State
  const [isAddAnnOpen, setIsAddAnnOpen] = useState(false);
  const [newAnn, setNewAnn] = useState({
    text: "FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹999",
    cta: "SHOP NOW →",
    link: "/category/hair-styling-hold",
  });

  // Category Modal State
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    name: "",
    itemCount: "12",
    image: "/images/cat_products.png",
    link: "",
  });

  // Process Step Modal State (OUR PROCESS)
  const [isAddProcessOpen, setIsAddProcessOpen] = useState(false);
  const [newProcess, setNewProcess] = useState({
    step: "04",
    title: "NOURISH & ILLUMINATE",
    category: "REPAIR PHASE",
    productName: "Aura Botanical Radiance Elixir 50ml",
    tagline: "Cellular rejuvenation with non-greasy gloss.",
    description: "Lightweight multi-peptide serum that reinforces cuticular tensile strength.",
    benefits: "Deep lipid barrier repair, 3x glossy mirror shine, Heat defense up to 230°C",
    howToUse: "Apply 2-3 drops into palms and work through mid-lengths to ends.",
    result: "Instant high-gloss luster · Silky touch",
    image: "/images/process_01_volumizer.png",
    badge: "STEP 04 — REPAIR",
  });

  // Product Story Modal State (PRODUCT STORY)
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);
  const [newProductStory, setNewProductStory] = useState({
    badge: "CLINICAL BREAKTHROUGH",
    title: "Engineered for 24-Hour Climate Defense.",
    description: "Formulated to withstand up to 90% humidity while preserving supple brushable texture.",
    benefits: "Resistant to intense Indian monsoon humidity, Zero white residue, Instant memory hold",
    image: "/images/combo_podium_1999.png",
    floatingBadgeTitle: "90% Humidity Tested",
    floatingBadgeDesc: "Zero flaking under direct studio lights.",
    ctaText: "LEARN MORE",
    ctaLink: "/category/hair-styling-hold",
  });

  // Story Reel Modal State (SHOP THE STORIES)
  const [isAddReelOpen, setIsAddReelOpen] = useState(false);
  const [newReel, setNewReel] = useState({
    title: "Editorial Glass Bun Tutorial",
    tag: "Bridal Masterclass",
    views: "2.4K views",
    image: "/images/story_card_1.jpg",
    productName: "Aura Pro Large Detangling Brush",
    productPrice: "625",
    productOriginalPrice: "695",
    handle: "aura-hair-styling-student-kit",
  });

  // Exhibition Modal State (EXHIBITIONS)
  const [isAddExOpen, setIsAddExOpen] = useState(false);
  const [newEx, setNewEx] = useState({
    title: "International Salon Expo 2026",
    location: "Jio World Centre, Mumbai",
    tag: "Grand Stage",
    attendees: "15,000+ Visitors",
    image: "/images/exhibition_1.jpg",
  });

  // Testimonial Modal State
  const [isAddTestOpen, setIsAddTestOpen] = useState(false);
  const [newTest, setNewTest] = useState({
    name: "",
    role: "Verified Stylist",
    rating: "5",
    review: "",
    avatar: "/images/person_vaishnavi.png",
    location: "Mumbai",
  });

  // FAQ Modal State
  const [isAddFaqOpen, setIsAddFaqOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
  });

  // Coupon Modal State
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "flat",
    discountValue: "10",
    minOrderValue: "499",
  });

  // Edit states for all sections (CRUD)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingHero, setEditingHero] = useState<HeroCampaign | null>(null);
  const [editingAnn, setEditingAnn] = useState<AnnouncementItem | null>(null);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [editingProcessIndex, setEditingProcessIndex] = useState<number | null>(null);
  const [editingProductStory, setEditingProductStory] = useState<ProductStoryItem | null>(null);
  const [editingReel, setEditingReel] = useState<StoryReel | null>(null);
  const [editingEx, setEditingEx] = useState<ExhibitionItem | null>(null);
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Open Add / Edit Helpers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({
      title: "",
      price: "",
      originalPrice: "",
      category: "Skin & Hair",
      image: "/images/hero_podium.png",
      description: "",
      badge: "NEW",
      isBestseller: false,
    });
    setIsAddProductOpen(true);
  };
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setNewProduct({
      title: prod.title || "",
      price: String(prod.price ?? ""),
      originalPrice: String(prod.originalPrice ?? prod.price ?? ""),
      category: prod.category || "Skin & Hair",
      image: prod.image || "/images/hero_podium.png",
      description: prod.description || "",
      badge: prod.badge || "",
      isBestseller: !!prod.isBestseller,
    });
    setIsAddProductOpen(true);
  };

  const handleOpenAddHero = () => {
    setEditingHero(null);
    setNewHero({
      eyebrow: "AURA EXCLUSIVE",
      title1: "",
      title2: "",
      description: "",
      bullets: "Dermatologically tested, Zero white residue, 24h humidity lock",
      price: "1299",
      originalPrice: "1799",
      image: "/images/hero_podium.png",
      ctaText: "EXPLORE COLLECTION",
      ctaLink: "/category/hair-styling-hold",
    });
    setIsAddHeroOpen(true);
  };
  const handleOpenEditHero = (slide: HeroCampaign) => {
    setEditingHero(slide);
    setNewHero({
      eyebrow: slide.eyebrow || "AURA EXCLUSIVE",
      title1: slide.title1 || "",
      title2: slide.title2 || "",
      description: slide.description || "",
      bullets: Array.isArray(slide.bullets) ? slide.bullets.join(", ") : (slide.bullets || ""),
      price: String(slide.price ?? 1299),
      originalPrice: String(slide.originalPrice ?? 1799),
      image: slide.image || "/images/hero_podium.png",
      ctaText: slide.ctaText || "SHOP NOW",
      ctaLink: slide.ctaLink || "/",
    });
    setIsAddHeroOpen(true);
  };

  const handleOpenAddAnn = () => {
    setEditingAnn(null);
    setNewAnn({
      text: "",
      cta: "SHOP NOW →",
      link: "/category/hair-styling-hold",
    });
    setIsAddAnnOpen(true);
  };
  const handleOpenEditAnn = (item: AnnouncementItem) => {
    setEditingAnn(item);
    setNewAnn({
      text: item.text || "",
      cta: item.cta || "SHOP NOW →",
      link: item.link || "/",
    });
    setIsAddAnnOpen(true);
  };

  const handleOpenAddCat = () => {
    setEditingCat(null);
    setNewCat({
      name: "",
      itemCount: "12",
      image: "/images/cat_products.png",
      link: "",
    });
    setIsAddCatOpen(true);
  };
  const handleOpenEditCat = (cat: Category) => {
    setEditingCat(cat);
    setNewCat({
      name: cat.name || cat.title || "",
      itemCount: String(cat.itemCount ?? 0),
      image: cat.image || "/images/cat_products.png",
      link: cat.link || "",
    });
    setIsAddCatOpen(true);
  };

  const handleOpenAddProcess = () => {
    setEditingProcessIndex(null);
    setNewProcess({
      step: String(processSteps.length + 1).padStart(2, "0"),
      title: "",
      category: "REPAIR PHASE",
      productName: "",
      tagline: "",
      description: "",
      benefits: "",
      howToUse: "",
      result: "",
      image: "/images/process_01_volumizer.png",
      badge: `STEP ${String(processSteps.length + 1).padStart(2, "0")}`,
    });
    setIsAddProcessOpen(true);
  };
  const handleOpenEditProcess = (step: ProcessStep, idx: number) => {
    setEditingProcessIndex(idx);
    setNewProcess({
      step: step.step || "",
      title: step.title || "",
      category: step.category || "",
      productName: step.productName || "",
      tagline: step.tagline || "",
      description: step.description || "",
      benefits: Array.isArray(step.benefits) ? step.benefits.join(", ") : (step.benefits || ""),
      howToUse: step.howToUse || "",
      result: step.result || "",
      image: step.image || "/images/process_01_volumizer.png",
      badge: step.badge || "",
    });
    setIsAddProcessOpen(true);
  };

  const handleOpenAddProductStory = () => {
    setEditingProductStory(null);
    setNewProductStory({
      badge: "CLINICAL BREAKTHROUGH",
      title: "",
      description: "",
      benefits: "",
      image: "/images/combo_podium_1999.png",
      floatingBadgeTitle: "90% Humidity Tested",
      floatingBadgeDesc: "Zero flaking under direct studio lights.",
      ctaText: "LEARN MORE",
      ctaLink: "/category/hair-styling-hold",
    });
    setIsAddStoryOpen(true);
  };
  const handleOpenEditProductStory = (story: ProductStoryItem) => {
    setEditingProductStory(story);
    setNewProductStory({
      badge: story.badge || "CLINICAL BREAKTHROUGH",
      title: story.title || "",
      description: story.description || "",
      benefits: Array.isArray(story.benefits) ? story.benefits.join(", ") : (story.benefits || ""),
      image: story.image || "/images/combo_podium_1999.png",
      floatingBadgeTitle: story.floatingBadgeTitle || "",
      floatingBadgeDesc: story.floatingBadgeDesc || "",
      ctaText: story.ctaText || "LEARN MORE",
      ctaLink: story.ctaLink || "/",
    });
    setIsAddStoryOpen(true);
  };

  const handleOpenAddReel = () => {
    setEditingReel(null);
    setNewReel({
      title: "",
      tag: "Salon Story",
      views: "1.5K views",
      image: "/images/story_card_1.jpg",
      productName: "",
      productPrice: "999",
      productOriginalPrice: "1499",
      handle: "aura-hair-styling",
    });
    setIsAddReelOpen(true);
  };
  const handleOpenEditReel = (reel: StoryReel) => {
    setEditingReel(reel);
    setNewReel({
      title: reel.title || "",
      tag: reel.tag || "Salon Story",
      views: reel.views || "1.5K views",
      image: reel.image || reel.coverImage || "/images/story_card_1.jpg",
      productName: reel.productName || reel.taggedProductTitle || "",
      productPrice: String(reel.productPrice ?? reel.taggedProductPrice ?? 999),
      productOriginalPrice: String(reel.productOriginalPrice ?? 1499),
      handle: reel.handle || reel.taggedProductId || "",
    });
    setIsAddReelOpen(true);
  };

  const handleOpenAddEx = () => {
    setEditingEx(null);
    setNewEx({
      title: "",
      location: "",
      tag: "Grand Stage",
      attendees: "10,000+ Visitors",
      image: "/images/exhibition_1.jpg",
    });
    setIsAddExOpen(true);
  };
  const handleOpenEditEx = (ex: ExhibitionItem) => {
    setEditingEx(ex);
    setNewEx({
      title: ex.title || "",
      location: ex.location || "",
      tag: ex.tag || "Grand Stage",
      attendees: ex.attendees || "",
      image: ex.image || "/images/exhibition_1.jpg",
    });
    setIsAddExOpen(true);
  };

  const handleOpenAddTest = () => {
    setEditingTest(null);
    setNewTest({
      name: "",
      role: "Verified Stylist",
      rating: "5",
      review: "",
      avatar: "/images/person_vaishnavi.png",
      location: "Mumbai",
    });
    setIsAddTestOpen(true);
  };
  const handleOpenEditTest = (t: Testimonial) => {
    setEditingTest(t);
    setNewTest({
      name: t.name || "",
      role: t.role || "Verified Stylist",
      rating: String(t.rating ?? 5),
      review: t.review || t.comment || "",
      avatar: t.avatar || "/images/person_vaishnavi.png",
      location: t.location || t.city || "Mumbai",
    });
    setIsAddTestOpen(true);
  };

  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setNewFaq({
      question: "",
      answer: "",
    });
    setIsAddFaqOpen(true);
  };
  const handleOpenEditFaq = (faq: FAQItem) => {
    setEditingFaq(faq);
    setNewFaq({
      question: faq.question || "",
      answer: faq.answer || "",
    });
    setIsAddFaqOpen(true);
  };

  const handleOpenAddCoupon = () => {
    setEditingCoupon(null);
    setNewCoupon({
      code: "",
      discountType: "percentage",
      discountValue: "10",
      minOrderValue: "499",
    });
    setIsAddCouponOpen(true);
  };
  const handleOpenEditCoupon = (cpn: Coupon) => {
    setEditingCoupon(cpn);
    setNewCoupon({
      code: cpn.code || "",
      discountType: cpn.discountType || "percentage",
      discountValue: String(cpn.discountValue ?? 10),
      minOrderValue: String(cpn.minOrderValue ?? 499),
    });
    setIsAddCouponOpen(true);
  };

  const handleOpenAddKit = () => {
    setEditingKit(null);
    setNewKit({
      name: "",
      subtitle: "",
      itemCount: "3",
      price: "1299",
      originalPrice: "1799",
      image: "/images/kit_starter.jpg",
      badge: "MOST POPULAR",
      items: "Detangling Pro Brush, Hydra Mousse 180ml, Silk Hold Mist",
    });
    setIsAddKitOpen(true);
  };

  const handleOpenEditKit = (kit: CustomizedKit) => {
    setEditingKit(kit);
    setNewKit({
      name: kit.name || "",
      subtitle: kit.subtitle || "",
      itemCount: String(kit.itemCount || (kit.items ? kit.items.length : 3)),
      price: String(kit.price || 1299),
      originalPrice: String(kit.originalPrice || 1799),
      image: kit.image || "/images/kit_starter.jpg",
      badge: kit.badge || "MOST POPULAR",
      items: Array.isArray(kit.items) ? kit.items.join(", ") : "",
    });
    setIsAddKitOpen(true);
  };

  const handleOpenAddGoal = () => {
    setEditingGoal(null);
    setNewGoal({
      name: "",
      title: "",
      tagline: "",
      badge: "HOLD",
      image: "/images/process_05_hspray.png",
      filterKey: "hold",
    });
    setIsAddGoalOpen(true);
  };

  const handleOpenEditGoal = (goal: HairGoal) => {
    setEditingGoal(goal);
    setNewGoal({
      name: goal.name || "",
      title: goal.title || goal.name || "",
      tagline: goal.tagline || "",
      badge: goal.badge || "HOLD",
      image: goal.image || "/images/process_05_hspray.png",
      filterKey: goal.filterKey || "hold",
    });
    setIsAddGoalOpen(true);
  };

  const showNotification = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  const fetchAllAdminData = async () => {
    setLoading(true);
    try {
      const [
        statsRes,
        prodRes,
        ordRes,
        cpnRes,
        contentRes,
        heroRes,
        catRes,
        testRes,
        faqRes,
        processRes,
        prodStoryRes,
        storiesRes,
        exRes,
        kitsRes,
        goalsRes,
        bannerRes,
      ] = await Promise.all([
        fetch("/api/admin/stats").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/products").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/orders").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/coupons").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/content").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/hero").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/categories").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/testimonials").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/faqs").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/process").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/product-stories").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/stories").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/exhibitions").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/kits").then((r) => r.json()).catch(() => []),
        fetch("/api/admin/hair-goals").then((r) => r.json()).catch(() => []),
        fetch("/api/admin/transition-banner").then((r) => r.json()).catch(() => null),
      ]);

      if (statsRes?.success) setStats(statsRes.stats);
      if (prodRes?.success) setProducts(prodRes.products);
      if (ordRes?.success) setOrders(ordRes.orders);
      if (cpnRes?.success) setCoupons(cpnRes.coupons);
      if (contentRes?.success && contentRes.data) {
        setAnnouncements(contentRes.data.announcementItems || []);
        if (contentRes.data.brandSettings) setBrandSettings(contentRes.data.brandSettings);
      }
      if (heroRes?.success) setHeroSlides(heroRes.heroCampaigns);
      if (catRes?.success) setCategories(catRes.categories);
      if (testRes?.success) setTestimonials(testRes.testimonials);
      if (faqRes?.success) setFaqs(faqRes.faqs);
      if (processRes?.success) setProcessSteps(processRes.processSteps);
      if (prodStoryRes?.success) setProductStories(prodStoryRes.productStories);
      if (storiesRes?.success) setStoryReels(storiesRes.storyReels);
      if (exRes?.success) setExhibitions(exRes.exhibitions);
      if (Array.isArray(kitsRes)) setKits(kitsRes);
      if (Array.isArray(goalsRes)) setHairGoals(goalsRes);
      if (bannerRes && bannerRes.headline) setTransitionBanner(bannerRes);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdminData();
  }, []);

  // Handlers for Products
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProduct.id, ...newProduct }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddProductOpen(false);
          setEditingProduct(null);
          showNotification("Product updated successfully!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddProductOpen(false);
          showNotification("Product added successfully!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Product deleted successfully");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete product");
    }
  };

  // Handlers for Process Steps
  const handleSaveProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProcessIndex !== null) {
        const res = await fetch("/api/admin/process", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ index: editingProcessIndex, ...newProcess }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddProcessOpen(false);
          setEditingProcessIndex(null);
          showNotification("Process step updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProcess),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddProcessOpen(false);
          showNotification("Process step added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save process step");
    }
  };

  const handleDeleteProcess = async (index: number) => {
    if (!confirm("Delete this process step?")) return;
    try {
      const res = await fetch(`/api/admin/process?index=${index}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Process step deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete process step");
    }
  };

  // Handlers for Product Stories
  const handleSaveProductStory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProductStory) {
        const res = await fetch("/api/admin/product-stories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProductStory.id, ...newProductStory }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddStoryOpen(false);
          setEditingProductStory(null);
          showNotification("Product Story updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/product-stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProductStory),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddStoryOpen(false);
          showNotification("Product Story added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save product story");
    }
  };

  const handleDeleteProductStory = async (id: string) => {
    if (!confirm("Delete this product story?")) return;
    try {
      const res = await fetch(`/api/admin/product-stories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Product story deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete product story");
    }
  };

  // Handlers for Story Reels
  const handleSaveStoryReel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingReel) {
        const res = await fetch("/api/admin/stories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingReel.id, ...newReel }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddReelOpen(false);
          setEditingReel(null);
          showNotification("Story Reel updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReel),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddReelOpen(false);
          showNotification("Story Reel video added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save story reel");
    }
  };

  const handleDeleteStoryReel = async (id: string) => {
    if (!confirm("Delete this story reel?")) return;
    try {
      const res = await fetch(`/api/admin/stories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Story reel deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete story reel");
    }
  };

  // Handlers for Exhibitions
  const handleSaveExhibition = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEx) {
        const res = await fetch("/api/admin/exhibitions", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingEx.id, ...newEx }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddExOpen(false);
          setEditingEx(null);
          showNotification("Exhibition updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/exhibitions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEx),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddExOpen(false);
          showNotification("Exhibition highlight added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save exhibition");
    }
  };

  const handleDeleteExhibition = async (id: string) => {
    if (!confirm("Delete this exhibition?")) return;
    try {
      const res = await fetch(`/api/admin/exhibitions?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Exhibition deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete exhibition");
    }
  };

  // Handlers for Hero Slides
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHero) {
        const res = await fetch("/api/admin/hero", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingHero.id, ...newHero }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddHeroOpen(false);
          setEditingHero(null);
          showNotification("Hero Banner updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/hero", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newHero),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddHeroOpen(false);
          showNotification("Hero Banner added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save hero slide");
    }
  };

  const handleDeleteHero = async (id: string) => {
    if (!confirm("Delete this hero slide?")) return;
    try {
      const res = await fetch(`/api/admin/hero?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Hero slide deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete hero slide");
    }
  };

  // Handlers for Announcements
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAnn) {
        const res = await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "updateAnnouncementItem", id: editingAnn.id, updates: newAnn }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddAnnOpen(false);
          setEditingAnn(null);
          showNotification("Announcement updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "addAnnouncementItem", newAnnouncementItem: newAnn }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddAnnOpen(false);
          showNotification("Announcement notice added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save announcement");
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteAnnouncementItem", deleteAnnouncementId: id }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Announcement removed");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete announcement");
    }
  };

  // Handlers for Categories
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCat) {
        const res = await fetch("/api/admin/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCat.id, ...newCat }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddCatOpen(false);
          setEditingCat(null);
          showNotification("Category updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCat),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddCatOpen(false);
          showNotification("Category created!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete category?")) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Category deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete category");
    }
  };

  // Handlers for Testimonials
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTest) {
        const res = await fetch("/api/admin/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingTest.id, ...newTest }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddTestOpen(false);
          setEditingTest(null);
          showNotification("Review updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTest),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddTestOpen(false);
          showNotification("Review added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save testimonial");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Delete review?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Review deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete testimonial");
    }
  };

  // Handlers for FAQs
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFaq) {
        const res = await fetch("/api/admin/faqs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingFaq.id, ...newFaq }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddFaqOpen(false);
          setEditingFaq(null);
          showNotification("FAQ updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFaq),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddFaqOpen(false);
          showNotification("FAQ added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save FAQ");
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm("Delete FAQ?")) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("FAQ deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete FAQ");
    }
  };

  // Order status & Delete
  const handleUpdateOrderStatus = async (orderId: string, status: Order["order_status"]) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Order status updated to ${status.toUpperCase()}`);
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to update status");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to permanently delete this order?")) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${orderId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Order deleted successfully");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete order");
    }
  };

  // Coupons
  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        const res = await fetch("/api/admin/coupons", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            originalCode: editingCoupon.code,
            code: newCoupon.code.toUpperCase(),
            discountType: newCoupon.discountType,
            discountValue: Number(newCoupon.discountValue),
            minOrderValue: Number(newCoupon.minOrderValue),
          }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddCouponOpen(false);
          setEditingCoupon(null);
          showNotification(`Coupon ${newCoupon.code.toUpperCase()} updated!`);
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/coupons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: newCoupon.code.toUpperCase(),
            discountType: newCoupon.discountType,
            discountValue: Number(newCoupon.discountValue),
            minOrderValue: Number(newCoupon.minOrderValue),
          }),
        });
        const data = await res.json();
        if (data.success) {
          setIsAddCouponOpen(false);
          showNotification(`Coupon ${newCoupon.code.toUpperCase()} created!`);
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save coupon");
    }
  };

  const handleDeleteCoupon = async (code: string) => {
    if (!confirm(`Delete coupon code ${code}?`)) return;
    try {
      const res = await fetch(`/api/admin/coupons?code=${encodeURIComponent(code)}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification(`Coupon ${code} deleted`);
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete coupon");
    }
  };

  // Settings
  const handleSaveBrandSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateBrandSettings", brandSettings }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("Brand settings saved!");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to save brand settings");
    }
  };

  // Customized Kits CRUD
  const handleSaveKit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: newKit.name,
        subtitle: newKit.subtitle,
        itemCount: Number(newKit.itemCount) || 3,
        price: Number(newKit.price) || 999,
        originalPrice: Number(newKit.originalPrice) || 1499,
        image: newKit.image,
        badge: newKit.badge,
        items: newKit.items.split(",").map((s) => s.trim()).filter(Boolean),
      };

      if (editingKit) {
        const res = await fetch("/api/admin/kits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingKit.id, ...payload }),
        });
        const data = await res.json();
        if (data.id) {
          setIsAddKitOpen(false);
          setEditingKit(null);
          showNotification("Customized Kit updated successfully!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/kits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.id) {
          setIsAddKitOpen(false);
          showNotification("New Customized Kit added!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save kit");
    }
  };

  const handleDeleteKit = async (id: string) => {
    if (!confirm("Are you sure you want to delete this kit?")) return;
    try {
      const res = await fetch(`/api/admin/kits?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Kit deleted successfully");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete kit");
    }
  };

  // Hair Goals CRUD
  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: newGoal.name,
        title: newGoal.title || newGoal.name,
        tagline: newGoal.tagline,
        badge: newGoal.badge,
        image: newGoal.image,
        filterKey: newGoal.filterKey || "hold",
      };

      if (editingGoal) {
        const res = await fetch("/api/admin/hair-goals", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingGoal.id, ...payload }),
        });
        const data = await res.json();
        if (data.id) {
          setIsAddGoalOpen(false);
          setEditingGoal(null);
          showNotification("Hair goal updated!");
          fetchAllAdminData();
        }
      } else {
        const res = await fetch("/api/admin/hair-goals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.id) {
          setIsAddGoalOpen(false);
          showNotification("Hair goal created!");
          fetchAllAdminData();
        }
      }
    } catch {
      alert("Failed to save hair goal");
    }
  };

  const handleDeleteGoal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hair goal?")) return;
    try {
      const res = await fetch(`/api/admin/hair-goals?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("Hair goal deleted");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to delete hair goal");
    }
  };

  // Transition Banner Video/Media Handler
  const handleSaveTransitionBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBanner(true);
    try {
      const res = await fetch("/api/admin/transition-banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transitionBanner),
      });
      const data = await res.json();
      if (data && data.headline) {
        showNotification("Video transition banner updated successfully!");
        fetchAllAdminData();
      }
    } catch {
      alert("Failed to save transition banner");
    } finally {
      setIsSavingBanner(false);
    }
  };

  const handleResetData = async (mode: "seed" | "wipe") => {
    const confirmMsg =
      mode === "wipe"
        ? "⚠️ WARNING: Are you sure you want to CLEAR ALL store data? (Products, categories, coupons, orders will be wiped)"
        : "⚡ Are you sure you want to reset all store sections to fresh Aura Beauty dummy data?";
    if (!confirm(confirmMsg)) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/reset-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      }).then((r) => r.json());

      if (res.success) {
        showNotification(res.message);
        await fetchAllAdminData();
      } else {
        alert("Error: " + res.error);
      }
    } catch (err: any) {
      alert("Failed to reset: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <AuraLogo className="h-7 w-auto" />
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#142B70] text-white rounded-md">
              Complete Website CMS & Control Center
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleResetData("seed")}
              disabled={loading}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              title="Reset to fresh Aura Beauty dummy data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">⚡ Reset Aura Data</span>
            </button>
            <button
              onClick={() => handleResetData("wipe")}
              disabled={loading}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              title="Wipe all store data clean"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Wipe Clean</span>
            </button>
            <button
              onClick={fetchAllAdminData}
              disabled={loading}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Store</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Success Notification Toast */}
      {actionSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{actionSuccess}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categorized Admin Navigation Bar */}
        <div className="space-y-3 mb-8">
          {/* Group Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "all", label: "All Sections" },
              { id: "catalog", label: "🛒 Store & Catalog" },
              { id: "branding", label: "🎨 Hero & Branding" },
              { id: "experience", label: "✨ Kits & Dynamic Content" },
            ].map((group) => (
              <button
                key={group.id}
                onClick={() => setAdminNavGroup(group.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  adminNavGroup === group.id
                    ? "bg-[#142B70] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-200 scrollbar-none">
            {[
              { id: "overview", label: "Overview", icon: Layers, group: "catalog" },
              { id: "products", label: `Products (${products.length})`, icon: Package, group: "catalog" },
              { id: "categories", label: `Categories (${categories.length})`, icon: Tag, group: "catalog" },
              { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingCart, group: "catalog" },
              { id: "coupons", label: `Coupons (${coupons.length})`, icon: Sparkles, group: "catalog" },

              { id: "hero", label: `Hero Banners (${heroSlides.length})`, icon: ImageIcon, group: "branding" },
              { id: "transitionBanner", label: "Video Banner (35L+)", icon: Video, group: "branding" },
              { id: "announcements", label: `Announcements (${announcements.length})`, icon: Megaphone, group: "branding" },
              { id: "settings", label: "Store Settings", icon: Settings, group: "branding" },

              { id: "kits", label: `Customized Kits (${kits.length})`, icon: Package, group: "experience" },
              { id: "hairGoals", label: `Hair Goals (${hairGoals.length})`, icon: Sliders, group: "experience" },
              { id: "process", label: `Our Process (${processSteps.length})`, icon: Activity, group: "experience" },
              { id: "productStories", label: `Product Story (${productStories.length})`, icon: BookOpen, group: "experience" },
              { id: "stories", label: `Video Reels (${storyReels.length})`, icon: Play, group: "experience" },
              { id: "exhibitions", label: `Exhibitions (${exhibitions.length})`, icon: Landmark, group: "experience" },
              { id: "testimonials", label: `Reviews (${testimonials.length})`, icon: MessageSquare, group: "experience" },
              { id: "faqs", label: `FAQs (${faqs.length})`, icon: HelpCircle, group: "experience" },
            ]
              .filter((tab) => adminNavGroup === "all" || tab.group === adminNavGroup)
              .map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "bg-[#142B70] text-white shadow-md shadow-blue-900/10 ring-2 ring-[#142B70]/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 bg-white border border-slate-100"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-sky-300" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">₹{stats.totalRevenue.toLocaleString("en-IN")}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Orders</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Products</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dynamic Sections</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">100% LIVE</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="bg-gradient-to-r from-[#142B70] to-[#1E3A8A] text-white p-6 rounded-2xl shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black tracking-wide">Quick Controls</h3>
                  <p className="text-sky-200 text-xs mt-1">Add items directly to Process, Stories, Exhibitions, or Hero.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab("process");
                      handleOpenAddProcess();
                    }}
                    className="px-3.5 py-2 bg-white text-[#142B70] rounded-xl text-xs font-bold hover:bg-sky-50 transition-colors flex items-center gap-1.5 shadow"
                  >
                    <Activity className="w-3.5 h-3.5" /> + Our Process
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("productStories");
                      handleOpenAddProductStory();
                    }}
                    className="px-3.5 py-2 bg-sky-500 text-white rounded-xl text-xs font-bold hover:bg-sky-400 transition-colors flex items-center gap-1.5 shadow"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> + Product Story
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("stories");
                      handleOpenAddReel();
                    }}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" /> + Video Reel
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("exhibitions");
                      handleOpenAddEx();
                    }}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Landmark className="w-3.5 h-3.5" /> + Exhibition
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Customer Orders</h3>
                  <p className="text-xs text-slate-500">Live order stream</p>
                </div>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View All Orders →
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No orders placed yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900">{order.order_number}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                            {order.order_status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {order.customer_name} • {order.city}, {order.state}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900">₹{order.total_amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: OUR PROCESS MANAGER */}
        {activeTab === "process" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">OUR PROCESS — Scroll-Driven Formulation Steps</h3>
                <p className="text-xs text-slate-500">The 3 sticky viewport steps with curved SVG path on the homepage.</p>
              </div>
              <button
                onClick={handleOpenAddProcess}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Process Step
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-[#142B70] text-white text-[11px] font-mono font-black rounded-md">
                        STEP {step.step}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditProcess(step, idx)}
                          className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                          title="Edit step"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProcess(idx)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Delete step"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-[#2445A8] uppercase tracking-wider">{step.category}</p>
                      <h4 className="text-base font-black text-slate-900 uppercase">{step.title}</h4>
                      <p className="text-xs font-semibold text-slate-700">{step.productName}</p>
                      <p className="text-xs text-slate-500 line-clamp-3 mt-2">{step.description}</p>
                    </div>

                    <div className="relative h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
                      <Image src={step.image} alt={step.title} fill className="object-contain p-2" />
                    </div>

                    <div className="space-y-1 pt-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Key Benefits</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {step.benefits?.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">Result:</span> {step.result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT STORY MANAGER */}
        {activeTab === "productStories" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">PRODUCT STORY — Behind The Formulation</h3>
                <p className="text-xs text-slate-500">Editorial stories featuring large product photography and clinical proof badges.</p>
              </div>
              <button
                onClick={handleOpenAddProductStory}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Product Story
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {productStories.map((story) => (
                <div key={story.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-sky-100 text-sky-800 text-[11px] font-bold rounded-md uppercase">
                        {story.badge}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditProductStory(story)}
                          className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                          title="Edit story"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProductStory(story.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Delete story"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-black text-slate-900">{story.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{story.description}</p>
                    </div>

                    <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-tr from-[#EAF3FF] to-white border border-slate-200">
                      <Image src={story.image} alt={story.title} fill className="object-contain p-4" />
                      <div className="absolute bottom-2 left-2 bg-white/95 rounded-lg px-2.5 py-1 border text-[11px] font-bold text-slate-800 shadow">
                        🛡️ {story.floatingBadgeTitle || "Clinical Bio-Tech Formula"}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Benefits</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {(story.benefits || []).map((b: string, bIdx: number) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">CTA: {story.ctaText}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{story.ctaLink}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SHOP THE STORIES MANAGER */}
        {activeTab === "stories" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">SHOP THE STORIES — Video Reels & Tutorials</h3>
                <p className="text-xs text-slate-500">Portrait video reel cards with quick cart add & view count badges.</p>
              </div>
              <button
                onClick={handleOpenAddReel}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Story Reel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {storyReels.map((reel) => (
                <div key={reel.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[9/14] bg-black">
                      <Image src={reel.image || reel.coverImage || "/images/hero_podium.png"} alt={reel.title} fill className="object-cover" />
                      <div className="absolute top-2.5 right-2.5 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        👁️ {reel.views || "1.5K"}
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-[#142B70] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        {reel.tag || "STORY"}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 text-[#142B70] flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-[#142B70] ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{reel.title}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{reel.productName || reel.taggedProductTitle || reel.title}</p>
                      <p className="text-xs font-black text-[#142B70]">
                        ₹{reel.productPrice ?? reel.taggedProductPrice ?? 999}{" "}
                        <span className="line-through text-slate-400 text-[10px]">₹{reel.productOriginalPrice ?? reel.taggedProductPrice ?? 1499}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[10px] truncate max-w-[90px]">{reel.handle || reel.taggedProductId || reel.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditReel(reel)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1"
                        title="Edit reel"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStoryReel(reel.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-xs flex items-center gap-1"
                        title="Delete reel"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EXHIBITION HIGHLIGHTS MANAGER */}
        {activeTab === "exhibitions" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">EXHIBITION HIGHLIGHTS — On Tour Across India</h3>
                <p className="text-xs text-slate-500">Trade shows, salon summits, and live convention showcases.</p>
              </div>
              <button
                onClick={handleOpenAddEx}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Exhibition
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {exhibitions.map((ex) => (
                <div key={ex.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-[3/4] bg-black">
                    <Image src={ex.image} alt={ex.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 bg-white/90 text-[#142B70] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      {ex.tag}
                    </div>
                    <div className="absolute bottom-3 inset-x-3 text-white space-y-0.5">
                      <h4 className="text-sm font-black leading-tight drop-shadow">{ex.title}</h4>
                      <p className="text-xs text-sky-200 truncate">{ex.location}</p>
                      <p className="text-[10px] text-slate-300">{ex.attendees}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">ID: {ex.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditEx(ex)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1"
                        title="Edit exhibition"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteExhibition(ex.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-xs flex items-center gap-1"
                        title="Delete exhibition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PRODUCTS MANAGER */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-600 shadow-sm"
                />
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="px-5 py-2.5 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-6 py-3.5">Product</th>
                      <th className="px-6 py-3.5">Category</th>
                      <th className="px-6 py-3.5">Price</th>
                      <th className="px-6 py-3.5">Badges</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                              <Image src={prod.image} alt={prod.title} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-snug line-clamp-1">{prod.title}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{prod.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">{prod.category}</td>
                        <td className="px-6 py-4">
                          <span className="font-black text-slate-900">₹{prod.price}</span>
                          {prod.originalPrice && prod.originalPrice > prod.price && (
                            <span className="text-slate-400 line-through ml-2 text-xs">₹{prod.originalPrice}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {prod.badge && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold">
                                {prod.badge}
                              </span>
                            )}
                            {prod.isBestseller && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
                                BESTSELLER
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                              title="Edit Product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: HERO BANNERS */}
        {activeTab === "hero" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Landing Page Hero Carousel</h3>
                <p className="text-xs text-slate-500">Manage headline sliders, campaign imagery, and CTA buttons.</p>
              </div>
              <button
                onClick={handleOpenAddHero}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Hero Slide
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {heroSlides.map((slide, idx) => (
                <div key={slide.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-sky-100 text-sky-800 text-[11px] font-bold rounded-md">
                        SLIDE #{idx + 1} • {slide.eyebrow}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditHero(slide)}
                          className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit Slide"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteHero(slide.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete Slide"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                        {slide.title1} {slide.title2}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{slide.description}</p>
                    </div>

                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <Image src={slide.image} alt={slide.title1} fill className="object-cover" />
                      <div className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white font-black text-xs">
                        ₹{slide.price} <span className="line-through text-slate-400 text-[10px] ml-1">₹{slide.originalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs flex items-center justify-between">
                    <span className="font-bold text-slate-700">CTA: {slide.ctaText || "SHOP NOW"}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{slide.ctaLink || "/"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: ANNOUNCEMENTS */}
        {activeTab === "announcements" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Top Announcement Bar Ticker</h3>
                <p className="text-xs text-slate-500">Live scrolling messages shown at the very top of the website.</p>
              </div>
              <button
                onClick={handleOpenAddAnn}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Notice
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {announcements.map((item, index) => (
                <div key={item.id || index} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">{item.text}</p>
                    <p className="text-xs text-slate-500">
                      Button: <span className="font-semibold text-blue-600">{item.cta}</span> • Link: <span className="font-mono text-[11px]">{item.link}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditAnn(item)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      title="Edit Notice"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: CATEGORIES */}
        {activeTab === "categories" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Store Categories</h3>
                <p className="text-xs text-slate-500">Categories shown on the homepage and catalog drawer.</p>
              </div>
              <button
                onClick={handleOpenAddCat}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-5 space-y-3">
                    <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-white font-bold text-[11px]">
                        {cat.itemCount} Items
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{cat.name}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{cat.link}</p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">ID: {cat.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditCat(cat)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                        title="Edit Category"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Salon & Customer Reviews</h3>
                <p className="text-xs text-slate-500">Real social proof displayed on the landing page.</p>
              </div>
              <button
                onClick={handleOpenAddTest}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full relative overflow-hidden bg-slate-100 border border-slate-200">
                          <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{t.name}</p>
                          <p className="text-[11px] text-slate-500">{t.role} • {t.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditTest(t)}
                          className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                          title="Edit review"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">&quot;{t.review}&quot;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 11: FAQS */}
        {activeTab === "faqs" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions (FAQs)</h3>
                <p className="text-xs text-slate-500">Accordion questions answered for customers on the landing page.</p>
              </div>
              <button
                onClick={handleOpenAddFaq}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEditFaq(faq)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 12: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Customer Orders ({orders.length})</h3>
                <p className="text-xs text-slate-500">Real-time order statuses and customer shipping addresses.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 text-sm">No orders placed yet.</div>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.id} className="p-6 space-y-4 hover:bg-slate-50/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-black text-slate-900">{ord.order_number}</span>
                            <span className="text-xs text-slate-400">• {new Date(ord.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700">
                            {ord.customer_name} ({ord.customer_phone}) • {ord.customer_email}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500">Status:</span>
                          <select
                            value={ord.order_status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-blue-600 shadow-sm"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleDeleteOrder(ord.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                        <div>
                          <p className="font-bold text-slate-700 mb-2 uppercase text-[10px] tracking-wider">Ordered Products</p>
                          <div className="space-y-1.5">
                            {ord.items?.map((it, idx) => (
                              <div key={idx} className="flex items-center justify-between text-slate-600">
                                <span className="line-clamp-1">{it.title} × {it.quantity}</span>
                                <span className="font-bold text-slate-900">₹{it.price * it.quantity}</span>
                              </div>
                            ))}
                            <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-black text-slate-900 text-sm">
                              <span>Total Paid:</span>
                              <span className="text-[#142B70]">₹{ord.total_amount}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="font-bold text-slate-700 mb-2 uppercase text-[10px] tracking-wider">Shipping Destination</p>
                          <p className="text-slate-600 leading-relaxed">
                            {ord.shipping_address}<br />
                            {ord.city}, {ord.state} - <span className="font-bold text-slate-800">{ord.pincode}</span>
                          </p>
                          <div className="mt-3">
                            <Link
                              href={`/order-success/${ord.id}`}
                              target="_blank"
                              className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1 text-xs"
                            >
                              Open Customer Invoice <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 13: COUPONS */}
        {activeTab === "coupons" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Discounts & Promo Coupons</h3>
                <p className="text-xs text-slate-500">Live codes redeemable by users during checkout.</p>
              </div>
              <button
                onClick={handleOpenAddCoupon}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Create Coupon
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {coupons.map((cpn, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md font-mono text-sm font-black tracking-wider">
                      {cpn.code}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">ACTIVE</span>
                  </div>

                  <div>
                    <p className="text-xl font-black text-slate-900">
                      {cpn.discountType === "percentage" ? `${cpn.discountValue}% OFF` : `₹${cpn.discountValue} OFF`}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Min. order: ₹{cpn.minOrderValue}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditCoupon(cpn)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Coupon"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCoupon(cpn.code)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 14: SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Store Settings & Contact Details</h3>
              <p className="text-xs text-slate-500">Brand contact information shown on the footer, contact page, and invoices.</p>
            </div>

            <form onSubmit={handleSaveBrandSettings} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Store / Brand Name</label>
                <input
                  type="text"
                  value={brandSettings.name}
                  onChange={(e) => setBrandSettings({ ...brandSettings, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={brandSettings.tagline}
                  onChange={(e) => setBrandSettings({ ...brandSettings, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Support Email</label>
                  <input
                    type="email"
                    value={brandSettings.supportEmail}
                    onChange={(e) => setBrandSettings({ ...brandSettings, supportEmail: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Support Phone</label>
                  <input
                    type="text"
                    value={brandSettings.supportPhone}
                    onChange={(e) => setBrandSettings({ ...brandSettings, supportPhone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">WhatsApp Order Support</label>
                  <input
                    type="text"
                    value={brandSettings.whatsappNumber}
                    onChange={(e) => setBrandSettings({ ...brandSettings, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Free Shipping Min Order (₹)</label>
                  <input
                    type="number"
                    value={brandSettings.freeShippingThreshold}
                    onChange={(e) => setBrandSettings({ ...brandSettings, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Headquarters / Warehouse Address</label>
                <textarea
                  rows={3}
                  value={brandSettings.address}
                  onChange={(e) => setBrandSettings({ ...brandSettings, address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#142B70] text-white rounded-xl text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" /> Save Brand Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: VIDEO / TRANSITION BANNER (Trusted by 35L+) */}
        {activeTab === "transitionBanner" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Cinematic Video & Transition Banner ("Trusted by 35L+ People")</h3>
              <p className="text-xs text-slate-500">
                Control the high-impact media section displayed on the homepage with custom video or background image, badge, and AI button.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Controls */}
              <form
                onSubmit={handleSaveTransitionBanner}
                className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Accent Badge Text
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="TRUSTED BY"
                      value={transitionBanner.badge}
                      onChange={(e) => setTransitionBanner({ ...transitionBanner, badge: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Main Headline
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="35L + PEOPLE"
                      value={transitionBanner.headline}
                      onChange={(e) => setTransitionBanner({ ...transitionBanner, headline: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Description / Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="Salons & stylists across India trust Aura..."
                    value={transitionBanner.subtitle || ""}
                    onChange={(e) => setTransitionBanner({ ...transitionBanner, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Media Type
                    </label>
                    <select
                      value={transitionBanner.mediaType}
                      onChange={(e) =>
                        setTransitionBanner({ ...transitionBanner, mediaType: e.target.value as "image" | "video" })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 bg-white"
                    >
                      <option value="image">Image (Background Filmstrip / Mosaic)</option>
                      <option value="video">Video (MP4 / Direct Stream)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Media URL (or use uploader below)
                    </label>
                    <input
                      type="text"
                      placeholder="https://... or /images/mosaic_filmstrip.jpg"
                      value={transitionBanner.mediaUrl}
                      onChange={(e) => setTransitionBanner({ ...transitionBanner, mediaUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Device Upload Field */}
                <div>
                  <ImageUploadField
                    label="Or Upload Media File from Device (Auto-optimized)"
                    value={transitionBanner.mediaUrl}
                    onChange={(url) => setTransitionBanner({ ...transitionBanner, mediaUrl: url })}
                    aspectHint="Filmstrip / Banner ~16:9 ratio"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      placeholder="SHOP WITH AI"
                      value={transitionBanner.ctaText || ""}
                      onChange={(e) => setTransitionBanner({ ...transitionBanner, ctaText: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Button Link
                    </label>
                    <input
                      type="text"
                      placeholder="/category/hair-styling-hold"
                      value={transitionBanner.ctaLink || ""}
                      onChange={(e) => setTransitionBanner({ ...transitionBanner, ctaLink: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSavingBanner}
                    className="w-full sm:w-auto px-7 py-3 bg-[#142B70] text-white rounded-xl text-sm font-bold hover:bg-[#1E3A8A] transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-900/10"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingBanner ? "Saving Changes..." : "Save Transition Banner"}</span>
                  </button>
                </div>
              </form>

              {/* Live Preview Card */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                  Live Visual Preview
                </span>
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950 aspect-[16/10] flex items-center justify-center p-6 text-center">
                  {/* Background Media */}
                  {transitionBanner.mediaType === "video" || transitionBanner.mediaUrl?.endsWith(".mp4") ? (
                    <video
                      src={transitionBanner.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={transitionBanner.mediaUrl || "/images/mosaic_filmstrip.jpg"}
                      alt="Banner Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px]" />

                  {/* Foreground Content */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3.5 bg-black/70 backdrop-blur-md px-5 py-4 rounded-xl border border-white/20 shadow-2xl text-left">
                      <div className="w-2.5 h-12 bg-[#34d399] rounded-full shrink-0 shadow-sm" />
                      <div>
                        <div className="text-xs font-extrabold uppercase tracking-widest text-[#34d399]">
                          {transitionBanner.badge || "TRUSTED BY"}
                        </div>
                        <div className="text-2xl font-black text-white font-serif tracking-tight">
                          {transitionBanner.headline || "35L + PEOPLE"}
                        </div>
                      </div>
                    </div>

                    {transitionBanner.ctaText && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a8a]/90 text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                        <span>{transitionBanner.ctaText}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  Preview mirrors the exact layout seen by customers on the homepage.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CUSTOMIZED KITS */}
        {activeTab === "kits" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">CUSTOMIZED KITS — Discipline Bundles ({kits.length})</h3>
                <p className="text-xs text-slate-500">
                  Manage the curated styling kits shown on the homepage with customized products and pricing.
                </p>
              </div>
              <button
                onClick={handleOpenAddKit}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add New Kit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {kits.map((kit) => (
                <div
                  key={kit.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-gradient-to-b from-sky-50 to-white p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={kit.image} alt={kit.name} className="w-full h-full object-contain" />
                      <span className="absolute top-2.5 right-2.5 bg-[#142B70] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {kit.badge}
                      </span>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-slate-900 line-clamp-1">{kit.name}</h4>
                        <span className="text-[11px] font-bold text-blue-600">{kit.itemCount || (kit.items ? kit.items.length : 3)} Products</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{kit.subtitle}</p>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-base font-black text-slate-900">₹{kit.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{kit.originalPrice}</span>
                      </div>

                      {kit.items && kit.items.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1">
                          {kit.items.slice(0, 3).map((it, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                              {it}
                            </span>
                          ))}
                          {kit.items.length > 3 && (
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">
                              +{kit.items.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">ID: {kit.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditKit(kit)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1"
                        title="Edit kit"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteKit(kit.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-xs flex items-center gap-1"
                        title="Delete kit"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SHOP BY HAIR GOALS */}
        {activeTab === "hairGoals" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">SHOP BY HAIR GOALS ({hairGoals.length})</h3>
                <p className="text-xs text-slate-500">
                  Targeted routine goals featured on the homepage marquee rail and routine recommender.
                </p>
              </div>
              <button
                onClick={handleOpenAddGoal}
                className="px-4 py-2 bg-[#142B70] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Hair Goal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hairGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={goal.image} alt={goal.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 right-2.5 bg-[#142B70] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                        {goal.badge}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-md">
                        Filter: {goal.filterKey}
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{goal.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{goal.tagline}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">ID: {goal.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditGoal(goal)}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1"
                        title="Edit goal"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-xs flex items-center gap-1"
                        title="Delete goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT OUR PROCESS STEP */}
      {isAddProcessOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingProcessIndex !== null ? "Edit Formulation Process Step" : "Add Formulation Process Step"}
              </h3>
              <button onClick={() => { setIsAddProcessOpen(false); setEditingProcessIndex(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveProcess} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Step Number</label>
                  <input
                    type="text"
                    required
                    placeholder="04"
                    value={newProcess.step}
                    onChange={(e) => setNewProcess({ ...newProcess, step: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phase / Category</label>
                  <input
                    type="text"
                    required
                    placeholder="FOUNDATION PHASE"
                    value={newProcess.category}
                    onChange={(e) => setNewProcess({ ...newProcess, category: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Step Title</label>
                <input
                  type="text"
                  required
                  placeholder="PREP & ROOT LIFT"
                  value={newProcess.title}
                  onChange={(e) => setNewProcess({ ...newProcess, title: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Featured Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="Aura Root Lift & Texture Volumizer"
                  value={newProcess.productName}
                  onChange={(e) => setNewProcess({ ...newProcess, productName: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProcess.description}
                  onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Benefits (comma separated)</label>
                <input
                  type="text"
                  value={newProcess.benefits}
                  onChange={(e) => setNewProcess({ ...newProcess, benefits: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Result Summary</label>
                <input
                  type="text"
                  value={newProcess.result}
                  onChange={(e) => setNewProcess({ ...newProcess, result: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <ImageUploadField
                label="Step Product Image"
                value={newProcess.image}
                onChange={(val) => setNewProcess({ ...newProcess, image: val })}
              />

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddProcessOpen(false); setEditingProcessIndex(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingProcessIndex !== null ? "Update Process Step" : "Save Process Step"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT STORY */}
      {isAddStoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingProductStory ? "Edit Product Story" : "Add Product Story"}
              </h3>
              <button onClick={() => { setIsAddStoryOpen(false); setEditingProductStory(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveProductStory} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                <input
                  type="text"
                  required
                  value={newProductStory.badge}
                  onChange={(e) => setNewProductStory({ ...newProductStory, badge: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <ImageUploadField
                label="Story Cover Image"
                value={newProductStory.image}
                onChange={(val) => setNewProductStory({ ...newProductStory, image: val })}
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Story Headline</label>
                <input
                  type="text"
                  required
                  value={newProductStory.title}
                  onChange={(e) => setNewProductStory({ ...newProductStory, title: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newProductStory.description}
                  onChange={(e) => setNewProductStory({ ...newProductStory, description: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Benefits (comma separated)</label>
                <input
                  type="text"
                  value={newProductStory.benefits}
                  onChange={(e) => setNewProductStory({ ...newProductStory, benefits: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Floating Badge Title</label>
                  <input
                    type="text"
                    value={newProductStory.floatingBadgeTitle}
                    onChange={(e) => setNewProductStory({ ...newProductStory, floatingBadgeTitle: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Floating Badge Note</label>
                  <input
                    type="text"
                    value={newProductStory.floatingBadgeDesc}
                    onChange={(e) => setNewProductStory({ ...newProductStory, floatingBadgeDesc: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddStoryOpen(false); setEditingProductStory(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingProductStory ? "Update Product Story" : "Save Product Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT STORY REEL */}
      {isAddReelOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingReel ? "Edit Video Reel" : "Add Video Reel"}
              </h3>
              <button onClick={() => { setIsAddReelOpen(false); setEditingReel(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveStoryReel} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reel Title</label>
                <input
                  type="text"
                  required
                  value={newReel.title}
                  onChange={(e) => setNewReel({ ...newReel, title: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tag</label>
                  <input
                    type="text"
                    value={newReel.tag}
                    onChange={(e) => setNewReel({ ...newReel, tag: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Views Count</label>
                  <input
                    type="text"
                    value={newReel.views}
                    onChange={(e) => setNewReel({ ...newReel, views: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={newReel.productName}
                    onChange={(e) => setNewReel({ ...newReel, productName: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newReel.productPrice}
                    onChange={(e) => setNewReel({ ...newReel, productPrice: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Reel Thumbnail Image"
                value={newReel.image}
                onChange={(val) => setNewReel({ ...newReel, image: val })}
              />

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddReelOpen(false); setEditingReel(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingReel ? "Update Reel" : "Save Reel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT EXHIBITION */}
      {isAddExOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingEx ? "Edit Exhibition Highlight" : "Add Exhibition Highlight"}
              </h3>
              <button onClick={() => { setIsAddExOpen(false); setEditingEx(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveExhibition} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Exhibition Title</label>
                <input
                  type="text"
                  required
                  value={newEx.title}
                  onChange={(e) => setNewEx({ ...newEx, title: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location / Venue</label>
                <input
                  type="text"
                  required
                  value={newEx.location}
                  onChange={(e) => setNewEx({ ...newEx, location: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stage Tag</label>
                  <input
                    type="text"
                    value={newEx.tag}
                    onChange={(e) => setNewEx({ ...newEx, tag: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Attendees Tag</label>
                  <input
                    type="text"
                    value={newEx.attendees}
                    onChange={(e) => setNewEx({ ...newEx, attendees: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Exhibition Banner Image"
                value={newEx.image}
                onChange={(val) => setNewEx({ ...newEx, image: val })}
              />

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddExOpen(false); setEditingEx(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingEx ? "Update Exhibition" : "Save Exhibition"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => { setIsAddProductOpen(false); setEditingProduct(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none bg-white"
                  >
                    <option value="Skin & Hair">Skin & Hair</option>
                    <option value="SERUMS & TREATMENTS">SERUMS & TREATMENTS</option>
                    <option value="HAIR STYLING & HOLD">HAIR STYLING & HOLD</option>
                    <option value="PINS, CLIPS & ACCESSORIES">PINS, CLIPS & ACCESSORIES</option>
                    <option value="CURATED BEAUTY KITS">CURATED BEAUTY KITS</option>
                    <option value="PROFESSIONAL COMBOS">PROFESSIONAL COMBOS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Offer Badge</label>
                  <input
                    type="text"
                    value={newProduct.badge}
                    onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Product Image"
                value={newProduct.image}
                onChange={(val) => setNewProduct({ ...newProduct, image: val })}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="prod-bestseller"
                  checked={newProduct.isBestseller}
                  onChange={(e) => setNewProduct({ ...newProduct, isBestseller: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="prod-bestseller" className="text-xs font-bold text-slate-700">
                  Feature on Homepage as Bestseller
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddProductOpen(false); setEditingProduct(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT HERO SLIDE */}
      {isAddHeroOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingHero ? "Edit Hero Banner Slide" : "Add Hero Banner Slide"}
              </h3>
              <button onClick={() => { setIsAddHeroOpen(false); setEditingHero(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveHero} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Headline 1</label>
                  <input
                    type="text"
                    required
                    value={newHero.title1}
                    onChange={(e) => setNewHero({ ...newHero, title1: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Headline 2</label>
                  <input
                    type="text"
                    required
                    value={newHero.title2}
                    onChange={(e) => setNewHero({ ...newHero, title2: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newHero.description}
                  onChange={(e) => setNewHero({ ...newHero, description: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <ImageUploadField
                label="Hero Banner Image"
                value={newHero.image}
                onChange={(val) => setNewHero({ ...newHero, image: val })}
                aspectHint="Recommended 16:9 or 1920x1080"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge / Eyebrow</label>
                  <input
                    type="text"
                    value={newHero.eyebrow}
                    onChange={(e) => setNewHero({ ...newHero, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Offer Price (₹)</label>
                  <input
                    type="number"
                    value={newHero.price}
                    onChange={(e) => setNewHero({ ...newHero, price: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={newHero.ctaText}
                    onChange={(e) => setNewHero({ ...newHero, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={newHero.ctaLink}
                    onChange={(e) => setNewHero({ ...newHero, ctaLink: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddHeroOpen(false); setEditingHero(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingHero ? "Update Hero Slide" : "Save Hero Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT ANNOUNCEMENT */}
      {isAddAnnOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingAnn ? "Edit Announcement Notice" : "Add Announcement Notice"}
              </h3>
              <button onClick={() => { setIsAddAnnOpen(false); setEditingAnn(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveAnnouncement} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Text</label>
                <input
                  type="text"
                  required
                  value={newAnn.text}
                  onChange={(e) => setNewAnn({ ...newAnn, text: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    required
                    value={newAnn.cta}
                    onChange={(e) => setNewAnn({ ...newAnn, cta: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Link</label>
                  <input
                    type="text"
                    required
                    value={newAnn.link}
                    onChange={(e) => setNewAnn({ ...newAnn, link: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddAnnOpen(false); setEditingAnn(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingAnn ? "Update Notice" : "Save Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CATEGORY */}
      {isAddCatOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingCat ? "Edit Store Category" : "Add Store Category"}
              </h3>
              <button onClick={() => { setIsAddCatOpen(false); setEditingCat(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Item Count</label>
                <input
                  type="number"
                  value={newCat.itemCount}
                  onChange={(e) => setNewCat({ ...newCat, itemCount: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <ImageUploadField
                label="Category Cover Image"
                value={newCat.image}
                onChange={(val) => setNewCat({ ...newCat, image: val })}
              />

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddCatOpen(false); setEditingCat(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingCat ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT TESTIMONIAL */}
      {isAddTestOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingTest ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={() => { setIsAddTestOpen(false); setEditingTest(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={newTest.name}
                  onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Role / Salon</label>
                <input
                  type="text"
                  value={newTest.role}
                  onChange={(e) => setNewTest({ ...newTest, role: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <ImageUploadField
                label="Client Photo / Avatar"
                value={newTest.avatar}
                onChange={(val) => setNewTest({ ...newTest, avatar: val })}
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Review</label>
                <textarea
                  rows={2}
                  required
                  value={newTest.review}
                  onChange={(e) => setNewTest({ ...newTest, review: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddTestOpen(false); setEditingTest(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingTest ? "Update Review" : "Save Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT FAQ */}
      {isAddFaqOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingFaq ? "Edit FAQ Item" : "Add FAQ Item"}
              </h3>
              <button onClick={() => { setIsAddFaqOpen(false); setEditingFaq(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Answer</label>
                <textarea
                  rows={3}
                  required
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddFaqOpen(false); setEditingFaq(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingFaq ? "Update FAQ" : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT COUPON */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingCoupon ? "Edit Discount Coupon" : "Create Discount Coupon"}
              </h3>
              <button onClick={() => { setIsAddCouponOpen(false); setEditingCoupon(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Coupon Promo Code</label>
                <input
                  type="text"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none bg-white"
                  >
                    <option value="percentage">% Percentage</option>
                    <option value="flat">₹ Flat Off</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Value</label>
                  <input
                    type="number"
                    required
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddCouponOpen(false); setEditingCoupon(null); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingCoupon ? "Update Coupon" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CUSTOMIZED KIT */}
      {isAddKitOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl animate-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingKit ? "Edit Customized Kit" : "Add Customized Kit"}
              </h3>
              <button
                onClick={() => {
                  setIsAddKitOpen(false);
                  setEditingKit(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveKit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kit Title / Name</label>
                <input
                  type="text"
                  required
                  placeholder="Aura Starter Kit"
                  value={newKit.name}
                  onChange={(e) => setNewKit({ ...newKit, name: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Summary</label>
                <input
                  type="text"
                  required
                  placeholder="Detangling brush + styling mousse + weightless hold spray"
                  value={newKit.subtitle}
                  onChange={(e) => setNewKit({ ...newKit, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Number of Items</label>
                  <input
                    type="number"
                    required
                    value={newKit.itemCount}
                    onChange={(e) => setNewKit({ ...newKit, itemCount: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    required
                    placeholder="MOST POPULAR"
                    value={newKit.badge}
                    onChange={(e) => setNewKit({ ...newKit, badge: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newKit.price}
                    onChange={(e) => setNewKit({ ...newKit, price: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newKit.originalPrice}
                    onChange={(e) => setNewKit({ ...newKit, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <ImageUploadField
                  label="Kit Cover Image"
                  value={newKit.image}
                  onChange={(url) => setNewKit({ ...newKit, image: url })}
                  aspectHint="Square or 4:3 ratio"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Products in Kit (Comma separated)
                </label>
                <textarea
                  rows={2}
                  placeholder="Detangling Pro Brush, Hydra Mousse 180ml, Silk Hold Mist"
                  value={newKit.items}
                  onChange={(e) => setNewKit({ ...newKit, items: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddKitOpen(false);
                    setEditingKit(null);
                  }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingKit ? "Update Kit" : "Save Kit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT HAIR GOAL */}
      {isAddGoalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl animate-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingGoal ? "Edit Hair Goal" : "Add Hair Goal"}
              </h3>
              <button
                onClick={() => {
                  setIsAddGoalOpen(false);
                  setEditingGoal(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGoal} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Goal Name / Title</label>
                <input
                  type="text"
                  required
                  placeholder="ROOT LIFT & VOLUME"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value, title: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none uppercase font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline / Description</label>
                <input
                  type="text"
                  required
                  placeholder="Instant density and matte texture at the crown"
                  value={newGoal.tagline}
                  onChange={(e) => setNewGoal({ ...newGoal, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="VOLUME"
                    value={newGoal.badge}
                    onChange={(e) => setNewGoal({ ...newGoal, badge: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Filter Key</label>
                  <input
                    type="text"
                    required
                    placeholder="volume (matches product hairGoals)"
                    value={newGoal.filterKey}
                    onChange={(e) => setNewGoal({ ...newGoal, filterKey: e.target.value })}
                    className="w-full px-3.5 py-2 border rounded-xl text-xs sm:text-sm outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <ImageUploadField
                  label="Goal Showcase Image"
                  value={newGoal.image}
                  onChange={(url) => setNewGoal({ ...newGoal, image: url })}
                  aspectHint="16:9 or 4:3 landscape ratio"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddGoalOpen(false);
                    setEditingGoal(null);
                  }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#142B70] text-white rounded-xl text-xs font-bold hover:bg-[#1E3A8A]"
                >
                  {editingGoal ? "Update Goal" : "Save Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
