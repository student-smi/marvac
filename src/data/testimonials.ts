export interface Testimonial {
  id: string;
  name: string;
  role: string;
  salon: string;
  city: string;
  comment: string;
  review?: string;
  rating: number;
  avatar: string;
  location?: string;
  verified?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Radhika Singhal",
    role: "Senior Consultant Cosmetologist",
    salon: "DermaGlow Aesthetic Clinic",
    city: "New Delhi",
    location: "New Delhi",
    comment: "The Niacinamide 10% & Saffron Elixir formulation is unmatched. Visible reduction in stubborn dark spots within 10 days for my Indian patients.",
    review: "The Niacinamide 10% & Saffron Elixir formulation is unmatched. Visible reduction in stubborn dark spots within 10 days for my Indian patients.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1594824813571-24a69c100417?auto=format&fit=crop&w=300&q=80",
    verified: true,
  },
  {
    id: "test-2",
    name: "Arjun Nambiar",
    role: "Creative Director",
    salon: "Toni&Guy Studio",
    city: "Bengaluru",
    location: "Bengaluru",
    comment: "The Salon Keratin Thermal Shield Mist doesn't weigh down fine Indian hair. Absolutely indispensable for outdoor bridal shoots in monsoon humidity.",
    review: "The Salon Keratin Thermal Shield Mist doesn't weigh down fine Indian hair. Absolutely indispensable for outdoor bridal shoots in monsoon humidity.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    verified: true,
  },
  {
    id: "test-3",
    name: "Pooja Deshmukh",
    role: "Verified VIP Customer",
    salon: "Aura Beauty Circle",
    city: "Mumbai",
    location: "Mumbai",
    comment: "Switched from expensive French luxury brands to Aura's 24K Saffron Elixir and Ceramide Soufflé. My skin hasn't looked this dewy and youthful in years.",
    review: "Switched from expensive French luxury brands to Aura's 24K Saffron Elixir and Ceramide Soufflé. My skin hasn't looked this dewy and youthful in years.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    verified: true,
  },
  {
    id: "test-4",
    name: "Vikramaditya Shah",
    role: "Founder & Master Stylist",
    salon: "Velvet Lounge Salon Chain",
    city: "Ahmedabad",
    location: "Ahmedabad",
    comment: "Aura packaging is world-class luxury, formulas smell divine, and our clients re-order before their bottles are even empty!",
    review: "Aura packaging is world-class luxury, formulas smell divine, and our clients re-order before their bottles are even empty!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    verified: true,
  },
];
