export interface StoryReel {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  avatar: string;
  videoUrl?: string;
  coverImage: string;
  image?: string;
  tag?: string;
  views?: string;
  handle?: string;
  taggedProductId: string;
  taggedProductTitle: string;
  productName?: string;
  taggedProductPrice: number;
  productPrice?: number;
  productOriginalPrice?: number;
  taggedProductImage: string;
}

export const storyReels: StoryReel[] = [
  {
    id: "reel-1",
    title: "The 30-Second Morning Glass Skin Routine",
    author: "Dr. Ananya Sharma",
    authorRole: "Dermatologist, Mumbai",
    avatar: "https://images.unsplash.com/photo-1594824813571-24a69c100417?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    tag: "TUTORIAL",
    views: "18.4K",
    handle: "aura-24k-gold-saffron-radiance-elixir",
    taggedProductId: "aura-prod-1",
    taggedProductTitle: "Aura 24K Gold Saffron Radiance Facial Elixir",
    productName: "Aura 24K Gold Saffron Radiance Facial Elixir",
    taggedProductPrice: 1499,
    productPrice: 1499,
    productOriginalPrice: 1999,
    taggedProductImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "reel-2",
    title: "Bridal Updo with Zero Flyaways in 40°C Heat",
    author: "Rohan Verma",
    authorRole: "Celebrity Hair Stylist, Delhi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    tag: "BRIDAL STYLING",
    views: "24.1K",
    handle: "aura-salon-keratin-infusion-thermal-shield-mist",
    taggedProductId: "aura-prod-5",
    taggedProductTitle: "Aura Salon Keratin Infusion Thermal Shield Mist",
    productName: "Aura Salon Keratin Infusion Thermal Shield Mist",
    taggedProductPrice: 999,
    productPrice: 999,
    productOriginalPrice: 1299,
    taggedProductImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "reel-3",
    title: "Before & After: 14 Days with 10% Niacinamide",
    author: "Meera Kapoor",
    authorRole: "Skincare Creator, Bengaluru",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=800&q=80",
    tag: "RESULTS",
    views: "31.9K",
    handle: "aura-cica-niacinamide-10-clarifying-drops",
    taggedProductId: "aura-prod-3",
    taggedProductTitle: "Aura Cica + Niacinamide 10% Clarifying Drops",
    productName: "Aura Cica + Niacinamide 10% Clarifying Drops",
    taggedProductPrice: 749,
    productPrice: 749,
    productOriginalPrice: 999,
    taggedProductImage: "https://images.unsplash.com/photo-1608248597263-0057e57b4524?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "reel-4",
    title: "Why Salons Switched to Aura Argan Gloss",
    author: "Velvet Elite Studio",
    authorRole: "Salon Chain, Hyderabad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    coverImage: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
    tag: "PRO REVIEWS",
    views: "15.2K",
    handle: "aura-moroccan-argan-macadamia-hair-elixir",
    taggedProductId: "aura-prod-6",
    taggedProductTitle: "Aura Moroccan Argan & Macadamia Gloss Elixir",
    productName: "Aura Moroccan Argan & Macadamia Gloss Elixir",
    taggedProductPrice: 1199,
    productPrice: 1199,
    productOriginalPrice: 1599,
    taggedProductImage: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80",
  },
];
