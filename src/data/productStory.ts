export interface ProductStoryItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  quote: string;
  quoteAuthor: string;
  ctaText: string;
  ctaLink: string;
  floatingBadgeTitle?: string;
  floatingBadgeDesc?: string;
  benefits?: string[];
}

export const productStories: ProductStoryItem[] = [
  {
    id: "story-1",
    badge: "CLINICAL BOTANICAL DISCOVERY",
    title: "The Saffron & Swiss Peptide Miracle",
    subtitle: "Reversing photo-aging and pollution damage in tropical Indian climates.",
    description:
      "Hand-harvested from the pristine valleys of Kashmir, Grade-A Mongra Saffron contains crocin concentrations 3x higher than standard saffron. When combined with Swiss Tri-Peptides and cold-pressed bio-actives in our Mumbai laboratory, it repairs damaged cell membranes and restores natural skin radiance from within.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
    quote: "Indian skin requires bio-compatible formulations that balance deep hydration without causing sebum congestion in hot humidity.",
    quoteAuthor: "Dr. Ananya Sharma, Head of Formulations",
    ctaText: "DISCOVER THE RADIANCE ELIXIR →",
    ctaLink: "/products/aura-24k-gold-saffron-radiance-elixir",
    floatingBadgeTitle: "24K GOLD & SAFFRON",
    floatingBadgeDesc: "99.8% Potency Active Cell Matrix",
    benefits: [
      "Grade-A Kashmiri Mongra Saffron for cellular illumination",
      "Encapsulated Swiss Tri-Peptides stimulate collagen",
      "Zero oily feel in 85%+ monsoon humidity",
    ],
  },
];
