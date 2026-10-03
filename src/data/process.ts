export interface ProcessStep {
  step: "01" | "02" | "03";
  title: string;
  category: string;
  productName: string;
  tagline: string;
  description: string;
  benefits: string[];
  howToUse: string;
  result: string;
  image: string;
  badge: string;
}

export const processStorySteps: ProcessStep[] = [
  {
    step: "01",
    title: "PREPARE & PURIFY",
    category: "BOTANICAL EXTRACTION",
    productName: "Aura Japanese Green Tea Gentle Gel Cleanser",
    tagline: "Cold-pressed bio-botanical extraction for pure skin preparation.",
    description:
      "Every Aura ritual begins with wild-harvested Himalayan saffron and Swiss peptides, extracted at low temperatures to preserve 99.8% cellular active potency.",
    benefits: [
      "Dissolves stubborn urban micro-pollution particles instantly",
      "Maintains natural skin mantle pH at optimal 5.5",
      "Prepares skin barrier for 4x deeper serum penetration",
    ],
    howToUse:
      "Massage 2 pumps onto damp skin for 60 seconds in circular motion. Rinse with lukewarm water.",
    result: "Purified pore bed · Zero tight feeling · Pristine clarity",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    badge: "STEP 01 — PREPARE",
  },
  {
    step: "02",
    title: "CLINICAL FORMULATION",
    category: "BIO-TECH DERMA LABS",
    productName: "Aura 24K Gold Saffron Radiance Facial Elixir",
    tagline: "ISO 9001 certified cleanroom formulation with 24K nano-gold.",
    description:
      "Formulated under strict dermatological oversight. Swiss Tri-Peptides and Niacinamide are blended into a silk lipid matrix engineered specifically for Indian climatic humidity.",
    benefits: [
      "Encapsulated 24K nano-gold stimulates micro-circulation",
      "Eliminates hyperpigmentation and uneven patches in 14 days",
      "Lightweight fast-absorbing silk texture without oily film",
    ],
    howToUse:
      "Warm 3-4 drops between fingertips and gently press into face, neck, and decolletage twice daily.",
    result: "Glass-skin luminescence · Uniform tone · Plump elasticity",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    badge: "STEP 02 — FORMULATE",
  },
  {
    step: "03",
    title: "SEAL & DEFEND",
    category: "ECO-GLASS PACKAGING",
    productName: "Aura Hydra-Barrier Ceramide Deep Moisture Soufflé",
    tagline: "Zero-oxidation amber glass seal locks active potency.",
    description:
      "Housed in pharmaceutical-grade UV-blocking amber glass jars. 5 essential ceramides lock in hydration for 72 hours while protecting against environmental stressors.",
    benefits: [
      "Forms a 72-hour weightless moisture shield against dry air-conditioning",
      "Reduces transepidermal water loss (TEWL) by up to 68%",
      "100% recyclable eco-glass packaging with gold embossed details",
    ],
    howToUse:
      "Smooth a blueberry-sized amount over face and neck as the final sealing step in your skincare ritual.",
    result: "Velvety suppleness · All-day moisture defense · Radiant skin",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    badge: "STEP 03 — SEAL & DEFEND",
  },
];
