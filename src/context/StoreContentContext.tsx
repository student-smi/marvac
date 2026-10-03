"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { HeroCampaign, AnnouncementItem, BrandSettings } from "@/lib/store";
import { Category, categories as seedCategories } from "@/data/categories";
import { Testimonial, testimonials as seedTestimonials } from "@/data/testimonials";
import { FAQItem, faqs as seedFaqs } from "@/data/faqs";
import { ProcessStep, processStorySteps as seedProcessSteps } from "@/data/process";
import { Product, products as seedProducts } from "@/data/products";
import { StoryReel, storyReels as seedStoryReels } from "@/data/stories";
import { ExhibitionItem, exhibitions as seedExhibitions } from "@/data/exhibitions";
import { ProductStoryItem, productStories as seedProductStories } from "@/data/productStory";

interface ContentContextType {
  heroCampaigns: HeroCampaign[];
  announcements: AnnouncementItem[];
  categories: Category[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  processSteps: ProcessStep[];
  brandSettings: BrandSettings;
  products: Product[];
  productStories: ProductStoryItem[];
  storyReels: StoryReel[];
  exhibitions: ExhibitionItem[];
  refreshContent: () => Promise<void>;
  isLoading: boolean;
}

const defaultHeroCampaigns: HeroCampaign[] = [
  {
    id: "hero-1",
    eyebrow: "AURA LUXURY ESSENTIALS",
    title1: "ONE RITUAL.",
    title2: "TOTAL RADIANCE.",
    description:
      "Clinically developed skincare & salon-tested finishing essentials engineered for Indian weather. Formulated to deliver 24-hour unshakeable hold and natural gloss without stiffness.",
    bullets: ["Clinically proven efficacy", "Dermatologically tested formulations"],
    price: 1299,
    originalPrice: 1799,
    image: "/images/hero_podium.png",
    ctaText: "SHOP AURA COLLECTION",
    ctaLink: "/category/hair-styling-hold",
  },
  {
    id: "hero-2",
    eyebrow: "SALON MASTERCLASS RANGE",
    title1: "UNSHAKEABLE HOLD.",
    title2: "WEIGHTLESS BOUNCE.",
    description:
      "Micro-milled volumizer powder and ultra-fine spray mist that locks complex bridal updos and sleek bobs with zero flaking.",
    bullets: ["Zero white residue guarantee", "85% Monsoon humidity tested"],
    price: 1899,
    originalPrice: 2499,
    image: "/images/combo_podium_999.png",
    ctaText: "EXPLORE PROFESSIONAL COMBOS",
    ctaLink: "/category/curated-kits",
  },
];

const defaultAnnouncements: AnnouncementItem[] = [
  { id: "ann-1", text: "FREE SHIPPING ON ORDERS ABOVE ₹999", cta: "SHOP NOW →", link: "/category/hair-styling-hold" },
  { id: "ann-2", text: "NEW AURA COLLECTION NOW AVAILABLE", cta: "EXPLORE →", link: "/category/curated-kits" },
  { id: "ann-3", text: "AURA10 FOR FLAT 10% OFF YOUR FIRST ORDER", cta: "CLAIM →", link: "/products/aura-hair-styling-student-kit" },
  { id: "ann-4", text: "TRUSTED BY 15,000+ BEAUTY EXPERTS ACROSS INDIA", cta: "DISCOVER →", link: "/about" },
];

const defaultBrandSettings: BrandSettings = {
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
};

const ContentContext = createContext<ContentContextType>({
  heroCampaigns: defaultHeroCampaigns,
  announcements: defaultAnnouncements,
  categories: seedCategories,
  testimonials: seedTestimonials,
  faqs: seedFaqs,
  processSteps: seedProcessSteps,
  brandSettings: defaultBrandSettings,
  products: seedProducts,
  productStories: seedProductStories,
  storyReels: seedStoryReels,
  exhibitions: seedExhibitions,
  refreshContent: async () => {},
  isLoading: false,
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [heroCampaigns, setHeroCampaigns] = useState<HeroCampaign[]>(defaultHeroCampaigns);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(defaultAnnouncements);
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(seedTestimonials);
  const [faqs, setFaqs] = useState<FAQItem[]>(seedFaqs);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(seedProcessSteps);
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(defaultBrandSettings);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [productStories, setProductStories] = useState<ProductStoryItem[]>(seedProductStories);
  const [storyReels, setStoryReels] = useState<StoryReel[]>(seedStoryReels);
  const [exhibitions, setExhibitions] = useState<ExhibitionItem[]>(seedExhibitions);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/content");
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        if (d.heroCampaigns && d.heroCampaigns.length > 0) setHeroCampaigns(d.heroCampaigns);
        if (d.announcementItems && d.announcementItems.length > 0) setAnnouncements(d.announcementItems);
        if (d.categories && d.categories.length > 0) setCategories(d.categories);
        if (d.testimonials && d.testimonials.length > 0) setTestimonials(d.testimonials);
        if (d.faqs && d.faqs.length > 0) setFaqs(d.faqs);
        if (d.processSteps && d.processSteps.length > 0) setProcessSteps(d.processSteps);
        if (d.brandSettings) setBrandSettings(d.brandSettings);
        if (d.products && d.products.length > 0) setProducts(d.products);
        if (d.productStories && d.productStories.length > 0) setProductStories(d.productStories);
        if (d.storyReels && d.storyReels.length > 0) setStoryReels(d.storyReels);
        if (d.exhibitions && d.exhibitions.length > 0) setExhibitions(d.exhibitions);
      }
    } catch (e) {
      console.warn("Failed to fetch dynamic content, using defaults:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider
      value={{
        heroCampaigns,
        announcements,
        categories,
        testimonials,
        faqs,
        processSteps,
        brandSettings,
        products,
        productStories,
        storyReels,
        exhibitions,
        refreshContent: fetchContent,
        isLoading,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useStoreContent() {
  return useContext(ContentContext);
}
