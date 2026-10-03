export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  link: string;
  blobColor: string;
}

export const categories: CategoryItem[] = [
  {
    id: "hair-pins-clips",
    name: "HAIR PINS & CLIPS",
    image: "/images/cat_pins.png",
    link: "/category/hair-pins-clips",
    blobColor: "from-sky-100 to-blue-200"
  },
  {
    id: "hair-styling-products",
    name: "HAIR STYLING PRODUCTS",
    image: "/images/cat_products.png",
    link: "/category/hair-styling-products",
    blobColor: "from-blue-600 to-indigo-700"
  },
  {
    id: "hair-styling-accessories",
    name: "HAIR STYLING ACCESSORIES",
    image: "/images/cat_accessories.png",
    link: "/category/hair-styling-accessories",
    blobColor: "from-sky-100 to-blue-200"
  },
  {
    id: "practice-academy",
    name: "PRACTICE & ACADEMY",
    image: "/images/cat_academy.png",
    link: "/category/practice-academy",
    blobColor: "from-sky-100 to-blue-200"
  },
  {
    id: "hair-style-accessories",
    name: "HAIR STYLE ACCESSORIES",
    image: "/images/cat_style_acc.png",
    link: "/category/hair-style-accessories",
    blobColor: "from-sky-100 to-blue-200"
  }
];

export const hairGoalsList = [
  "HOLD MY STYLE",
  "GIVE ME VOLUME",
  "SMOOTH & DETANGLE",
  "ADD SHINE",
  "INSTANT HAIR TRANSFORMATION"
];

export interface ComboSlide {
  id: string;
  title: string;
  subtext: string;
  badge: string;
  price: number;
  items: { icon: string; text: string }[];
  trustBadges: { icon: string; text: string }[];
  bannerImage: string;
  podiumImage: string;
}

export const comboSlides: ComboSlide[] = [
  {
    id: "combo-999",
    title: "EVERYDAY STYLING.\nPROFESSIONAL RESULTS.",
    subtext: "— ESSENTIALS YOU NEED. STYLE YOU DESERVE. —",
    badge: "BEST VALUE",
    price: 999,
    items: [
      { icon: "spray", text: "1 SPRAY (H OR H+ SPRAY)" },
      { icon: "comb", text: "1 COMB/BUN" },
      { icon: "pin", text: "1 PIN (135G)" },
      { icon: "box", text: "1 SMALL SIZE BOX" }
    ],
    trustBadges: [
      { icon: "shield", text: "PROFESSIONAL QUALITY" },
      { icon: "clock", text: "DAILY USE ESSENTIALS" },
      { icon: "award", text: "TRUSTED BY PROFESSIONALS" }
    ],
    bannerImage: "/images/combo_banner_999.jpg",
    podiumImage: "/images/combo_podium_999.png"
  },
  {
    id: "combo-1999",
    title: "COMPLETE CONTROL.\nUNLIMITED STYLE.",
    subtext: "— EVERYTHING YOU NEED. NOTHING YOU DON'T —",
    badge: "BEST VALUE",
    price: 1999,
    items: [
      { icon: "spray", text: "MOUSSE" },
      { icon: "pin", text: "PINS" },
      { icon: "comb", text: "COMB/CLIPS" },
      { icon: "spray", text: "SPRAY" }
    ],
    trustBadges: [
      { icon: "shield", text: "PROFESSIONAL QUALITY" },
      { icon: "clock", text: "DAILY USE ESSENTIALS" },
      { icon: "award", text: "TRUSTED BY PROFESSIONALS" }
    ],
    bannerImage: "/images/combo_banner_1999.jpg",
    podiumImage: "/images/combo_podium_1999.png"
  }
];

export interface KitCard {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  image: string;
  avatarIcons: string[];
}

export const kitCards: KitCard[] = [
  {
    id: "sleek-bun",
    name: "Sleek Bun Starter Kit",
    description: "Strong-hold spray + styling comb + pins + rubber bands",
    itemCount: 23,
    image: "/images/kit_sleek_bun.jpg",
    avatarIcons: ["spray", "comb", "pins", "+19"]
  },
  {
    id: "volume-starter",
    name: "Volume Starter Kit",
    description: "Hair mousse + back-combing brush + sectioning clips",
    itemCount: 6,
    image: "/images/kit_volume.jpg",
    avatarIcons: ["mousse", "brush", "clips", "+2"]
  },
  {
    id: "bridal-hairstylist",
    name: "Bridal Hairstylist Kit",
    description: "H+ spray + U-pins + bob pins + combs + lashes",
    itemCount: 27,
    image: "/images/kit_bridal.jpg",
    avatarIcons: ["spray", "pins", "lashes", "+23"]
  },
  {
    id: "starter-kit",
    name: "Starter Kit",
    description: "Detangling brush + mousse + lightweight finishing product",
    itemCount: 3,
    image: "/images/kit_starter.jpg",
    avatarIcons: ["brush", "mousse", "spray"]
  }
];

export interface ProcessStep {
  step: string;
  title: string;
  product: string;
  image: string;
  whatItDoes: string;
  howToUse: string;
  result: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Start With Volumizer",
    product: "Marvac Volumizer (Matte Texture Powder)",
    image: "/images/process_01_volumizer.png",
    whatItDoes: "Lifts roots and adds instant volume before any styling begins.",
    howToUse: "Sprinkle a small amount directly onto dry roots at the crown. Massage gently into the scalp with fingertips. Tousle hair for instant lift and body. This is always your first step — it creates the foundation everything else builds on.",
    result: "Lifted roots · Full body · Natural volume that lasts all day"
  },
  {
    step: "02",
    title: "Add Body & Bounce",
    product: "Marvac Hair Mousse 180ml",
    image: "/images/cat_products.png",
    whatItDoes: "Infuses long-lasting bounce and flexible structure through each hair layer.",
    howToUse: "Dispense an egg-sized foam puff into palms. Distribute evenly from mid-lengths to ends on towel-dried or dry hair before styling.",
    result: "Featherlight bounce · No sticky residue · Touchably soft touch"
  },
  {
    step: "03",
    title: "Define & Control Edges",
    product: "Marvac Precision Sectioning Clips & Combs",
    image: "/images/cat_accessories.png",
    whatItDoes: "Secures sections firmly without leaving clip marks or creases.",
    howToUse: "Clip away crown volume to work underneath. Use fine-tooth tail comb to direct baby hairs and establish sharp parts.",
    result: "Flawless hair partitions · Clean scalp lines · Professional styling speed"
  },
  {
    step: "04",
    title: "Lock The Style",
    product: "Marvac H Strong Hold Hair Spray 300ml",
    image: "/images/process_05_hspray.png",
    whatItDoes: "Provides reliable 24-hour hold against movement while preserving hair shine.",
    howToUse: "Hold can 25cm away and sweep across finished curls, sleek ponytails, or bridal braids in a continuous arc.",
    result: "24hr firm hold · Humidity resistant · Brushed out cleanly at night"
  },
  {
    step: "05",
    title: "Super Lock For Tough Conditions",
    product: "Marvac H+ Spray (Super Strong Hold)",
    image: "/images/process_05_hspray.png",
    whatItDoes: "Maximum strength hold for heavy humidity, wind, or long 12-hour wedding days — when H Spray alone isn't enough.",
    howToUse: "Use H+ instead of or on top of H Spray when you need extra protection. Spray in short bursts on specific sections that need maximum control — like the top, crown, or front.",
    result: "Rock-solid freeze hold · Zero flyaways · Unshakable architectural shapes"
  },
  {
    step: "06",
    title: "Add The Shine Finish",
    product: "Marvac Shine Hair Spray 300ml",
    image: "/images/process_sec_66.png",
    whatItDoes: "Delivers an ultra-fine luminous gloss across the hair surface without greasiness.",
    howToUse: "Mist a fine veil over the entire finished hairdo from 30cm away. Let settle for 10 seconds without touching.",
    result: "Glossy camera-ready shine · Zero oiliness · Soft silk reflection"
  },
  {
    step: "07",
    title: "Final Setting & Details",
    product: "Marvac Matte Bob & U-Pins + Detangling Comb",
    image: "/images/cat_pins.png",
    whatItDoes: "Fastens internal bun structures invisibly with zero scalp discomfort.",
    howToUse: "Slide matte black pins wavy-side down into bun base. Lock crossings with U-pins for weightless stability.",
    result: "Hidden anchor stability · Zero scalp tension · Complete all-day security"
  }
];

export interface WhyFeature {
  title: string;
  icon: string;
  description: string;
}

export const whyFeatures: WhyFeature[] = [
  {
    title: "STRONG HOLD PERFORMANCE",
    icon: "lock",
    description: "Engineered specifically for tough Asian and Indian hair textures that demand firm hold without chalky residue."
  },
  {
    title: "SALON-QUALITY RESULTS",
    icon: "sparkle",
    description: "Tested and trusted by over 10,000+ bridal hair specialists, academy trainers, and professional stylists."
  },
  {
    title: "PREMIUM YET AFFORDABLE",
    icon: "crown",
    description: "Direct-to-stylist fair pricing eliminates salon markup, bringing top-shelf professional tools to everyone."
  },
  {
    title: "BUILT FOR EVERYDAY USE",
    icon: "calendar",
    description: "Gentle non-damaging formulations enriched with botanical protective agents for safe daily styling routines."
  }
];

export interface StoryReel {
  id: string;
  title: string;
  views: string;
  image: string;
  productTitle: string;
  productHandle: string;
  price: number;
  originalPrice: number;
  tag: string;
}

export const storyReels: StoryReel[] = [
  {
    id: "story-1",
    title: "Scanty Hair → Dreamy Mermaid Look",
    views: "8.0K",
    image: "/images/story_card_1.jpg",
    productTitle: "MARVAC PROFESSIONAL LARGE PADDLE HAIR BRUSH...",
    productHandle: "marvac-professional-large-paddle-hair-brush",
    price: 625.50,
    originalPrice: 695.00,
    tag: "Mermaid Styling"
  },
  {
    id: "story-2",
    title: "Instant Mousse Lift & Bounce Tutorial",
    views: "4.6K",
    image: "/images/story_card_2.jpg",
    productTitle: "MARVAC DETANGLING HAIR BRUSH – GENTLE TANGLE...",
    productHandle: "marvac-detangling-hair-brush",
    price: 445.50,
    originalPrice: 495.00,
    tag: "Tutorial"
  },
  {
    id: "story-3",
    title: "Salon Masterclass & Pin Box Unboxing",
    views: "6.6K",
    image: "/images/story_card_3.jpg",
    productTitle: "MARVAC BLACK BOB PINS NO.6 135G STRONG HOLD...",
    productHandle: "marvac-black-bob-pins-no6-135g",
    price: 139.50,
    originalPrice: 155.00,
    tag: "Unboxing"
  },
  {
    id: "story-4",
    title: "Bridal Hairstyle Master Academy Session",
    views: "7.2K",
    image: "/images/story_card_4.jpg",
    productTitle: "MARVAC LISBON HAIR DUMMY – TRAINING...",
    productHandle: "marvac-lisbon-hair-dummy",
    price: 14490.00,
    originalPrice: 16000.00,
    tag: "Academy"
  },
  {
    id: "story-5",
    title: "Thank You Laikaa Cosmetics Unboxing Review",
    views: "37K",
    image: "/images/story_card_5.jpg",
    productTitle: "MARVAC STUDENT KIT - PROFESSIONAL STYLING...",
    productHandle: "marvac-hair-styling-student-kit",
    price: 2646.00,
    originalPrice: 2940.00,
    tag: "Kit Review"
  }
];

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  image: string;
  fullCardImage?: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "VAISHNAVI",
    quote: "Used MARVAC before a party and my hairstyle literally stayed the whole night. Friends kept asking which salon I visited.",
    image: "/images/person_vaishnavi.png",
    fullCardImage: "/images/customer_vaishnavi.jpg",
    rating: 5
  },
  {
    id: "t-2",
    name: "SAHANA SHETTY",
    quote: "Bought the MARVAC combo after seeing it on Instagram reels. The hair fiber covers the scalp nicely, and the texture powder adds volume on top. Good combination for styling.",
    image: "/images/person_sahana.png",
    fullCardImage: "/images/customer_sahana.jpg",
    rating: 5
  },
  {
    id: "t-3",
    name: "TANUSHREE",
    quote: "I have flat hair, and nothing used to hold properly. The texture powder changed that completely. Adds lift without making the hair crunchy.",
    image: "/images/person_tanushree.png",
    fullCardImage: "/images/customer_tanushree.jpg",
    rating: 5
  },
  {
    id: "t-4",
    name: "CHANDANA",
    quote: "What I liked most is that the products don't look overdone. Everything feels subtle and natural instead of giving that artificial styled look.",
    image: "/images/person_chandana.png",
    fullCardImage: "/images/customer_chandana.jpg",
    rating: 5
  },
  {
    id: "t-5",
    name: "BHOOMIKA",
    quote: "I was confused about how to use hair styling products before, but MARVAC products are actually simple to use. The instructions helped a lot, and the results were visible instantly.",
    image: "/images/person_bhoomi.png",
    fullCardImage: "/images/customer_bhoomi.jpg",
    rating: 5
  },
  {
    id: "t-6",
    name: "POOJA",
    quote: "The H+ spray is an absolute godsend in rainy and humid weather! My client's curls stayed intact for 10 hours straight without falling flat.",
    image: "/images/person_pooja.png",
    fullCardImage: "/images/customer_neha.jpg",
    rating: 5
  },
  {
    id: "t-7",
    name: "NEHA GOWDA",
    quote: "Delivery was quick, and packaging was neat. I ordered the brown hair fiber, and the shade matched my hair perfectly. Definitely ordering again.",
    image: "/images/person_neha.png",
    fullCardImage: "/images/customer_neha.jpg",
    rating: 5
  }
];

export interface ExhibitionItem {
  id: string;
  image: string;
  title: string;
  location: string;
  tag: string;
}

export const exhibitions: ExhibitionItem[] = [
  {
    id: "ex-1",
    image: "/images/exhibition_1.jpg",
    title: "Beauty Expo India 2026",
    location: "Mumbai Exhibition Center",
    tag: "Main Stage"
  },
  {
    id: "ex-2",
    image: "/images/exhibition_2.jpg",
    title: "Salon International Workshop",
    location: "Bangalore World Trade Center",
    tag: "Workshop"
  },
  {
    id: "ex-3",
    image: "/images/exhibition_3.jpg",
    title: "Marvac Academy Master Showcase",
    location: "Pragati Maidan, New Delhi",
    tag: "Academy"
  },
  {
    id: "ex-4",
    image: "/images/exhibition_4.jpg",
    title: "Professional Stylist Meet & Greet",
    location: "HITEX, Hyderabad",
    tag: "Live Demo"
  }
];
