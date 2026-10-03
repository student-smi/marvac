export interface HairGoal {
  id: string;
  name: string;
  title: string;
  tagline: string;
  badge: string;
  image: string;
  filterKey: string;
}

export const hairGoals: HairGoal[] = [
  {
    id: "goal-1",
    name: "GLASS GLOW & RADIANCE",
    title: "GLASS GLOW & RADIANCE",
    tagline: "Dewy, luminous finish with micro-reflecting radiance",
    badge: "HYDRATION",
    image: "/images/goal_glass_glow.jpg",
    filterKey: "shine",
  },
  {
    id: "goal-2",
    name: "24-HOUR SALON HOLD",
    title: "24-HOUR SALON HOLD",
    tagline: "Unshakeable micro-polymer lock with zero flaking",
    badge: "HOLD",
    image: "/images/goal_salon_hold.jpg",
    filterKey: "hold",
  },
  {
    id: "goal-3",
    name: "ROOT LIFT & VOLUME",
    title: "ROOT LIFT & VOLUME",
    tagline: "Instant density and matte texture at the crown",
    badge: "VOLUME",
    image: "/images/goal_root_volume.jpg",
    filterKey: "volume",
  },
  {
    id: "goal-4",
    name: "ANTI-FRIZZ SHIELD",
    title: "ANTI-FRIZZ SHIELD",
    tagline: "Tested across 85% monsoon humidity without curling",
    badge: "SMOOTHNESS",
    image: "/images/goal_anti_frizz.jpg",
    filterKey: "smoothness",
  },
  {
    id: "goal-5",
    name: "BRIDAL UPDO SECURITY",
    title: "BRIDAL UPDO SECURITY",
    tagline: "Reinforced support for heavy floral veils and buns",
    badge: "BRIDAL PRO",
    image: "/images/goal_bridal_updo.jpg",
    filterKey: "styling",
  },
  {
    id: "goal-6",
    name: "DAILY EFFORTLESS FINISH",
    title: "DAILY EFFORTLESS FINISH",
    tagline: "Natural bounce and satin softness in under 2 minutes",
    badge: "DAILY ESSENTIAL",
    image: "/images/goal_daily_finish.jpg",
    filterKey: "finishing",
  },
];
