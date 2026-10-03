export interface CustomizedKit {
  id: string;
  name: string;
  subtitle: string;
  itemCount: number;
  price: number;
  originalPrice: number;
  image: string;
  badge: string;
  items: string[];
}

export const customizedKits: CustomizedKit[] = [
  {
    id: "starter-kit",
    name: "Aura Starter Kit",
    subtitle: "Detangling brush + styling mousse + weightless hold spray",
    itemCount: 3,
    price: 1299,
    originalPrice: 1799,
    image: "/images/kit_starter.jpg",
    badge: "MOST POPULAR",
    items: ["Detangling Pro Brush", "Hydra Mousse 180ml", "Silk Hold Mist"],
  },
  {
    id: "professional-kit",
    name: "Aura Salon Pro Kit",
    subtitle: "Ultra lock spray + carbon tail combs + 250g precision pins",
    itemCount: 12,
    price: 2646,
    originalPrice: 3535,
    image: "/images/hero_podium.png",
    badge: "SALON CHOICE",
    items: ["Aura Super Spray", "Carbon Tail Comb", "Sectioning Clips (6)", "Aura Pins 250g"],
  },
  {
    id: "bridal-kit",
    name: "Aura Bridal Master Suite",
    subtitle: "Full bridal suite: lock sprays, U-pins, lashes & bun paddings",
    itemCount: 27,
    price: 3499,
    originalPrice: 4890,
    image: "/images/kit_bridal.jpg",
    badge: "COMPLETE SUITE",
    items: ["Super Hold Spray", "Shine Gloss Mist", "Bridal U-Pins Box", "Hair Padding Bundles"],
  },
  {
    id: "daily-styling-kit",
    name: "Aura Daily Lift Kit",
    subtitle: "Root volumizer powder + paddle brush + silicone bands",
    itemCount: 6,
    price: 1599,
    originalPrice: 2199,
    image: "/images/kit_sleek_bun.jpg",
    badge: "DAILY ESSENTIAL",
    items: ["Micro Volumizer Powder", "Large Paddle Brush", "Silicone Elastic Bands", "Bobby Pins No.4"],
  },
];
