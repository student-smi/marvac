export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Are Aura Beauty products suitable for sensitive & acne-prone skin?",
    answer: "Yes, 100%. All Aura formulations are non-comedogenic, dermatologically tested on Indian skin types, and completely free from parabens, sulfates, and mineral oils.",
    category: "Formulations",
  },
  {
    id: "faq-2",
    question: "How long does express shipping take across India?",
    answer: "Orders are dispatched within 24 hours from our Mumbai fulfillment center. Delivery takes 2–4 business days for metro cities and 3–5 days for rest of India. Express shipping is free on orders above ₹999.",
    category: "Shipping & Delivery",
  },
  {
    id: "faq-3",
    question: "Are these formulas 100% cruelty-free and clean?",
    answer: "Absolutely! Aura is certified 100% Cruelty-Free by PETA. We never test on animals and ethically source all bio-botanicals from sustainable Himalayan farms and Swiss bio-tech labs.",
    category: "Ethics & Safety",
  },
  {
    id: "faq-4",
    question: "Can I use the facial serums during pregnancy or breastfeeding?",
    answer: "Our 24K Saffron Elixir, Ceramide Soufflé, and Cica Niacinamide drops are completely safe for pregnant and nursing mothers. However, we recommend consulting your physician for chemical peels like AHA/BHA.",
    category: "Usage & Care",
  },
  {
    id: "faq-5",
    question: "What is the return or replacement policy for damaged shipments?",
    answer: "We offer a hassle-free 7-day replacement guarantee. If your package arrives damaged or tampered, contact care@aurabeauty.in with a unboxing photo/video for instant replacement.",
    category: "Returns & Support",
  },
];
