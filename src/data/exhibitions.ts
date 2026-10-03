export interface ExhibitionItem {
  id: string;
  image: string;
  title: string;
  location: string;
  tag: string;
  attendees: string;
}

export const exhibitions: ExhibitionItem[] = [
  {
    id: "ex-1",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    title: "Cosmoprof India Mumbai 2026",
    location: "Jio World Convention Centre, BKC Mumbai",
    tag: "Main Stage Pavilion",
    attendees: "15,000+ Visitors",
  },
  {
    id: "ex-2",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    title: "Professional Beauty India Delhi",
    location: "Pragati Maidan, New Delhi",
    tag: "Masterclass Workshop",
    attendees: "4,500+ Salon Owners",
  },
  {
    id: "ex-3",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
    title: "Clean Beauty & Wellness Summit",
    location: "ITC Gardenia, Bengaluru",
    tag: "Derma Innovation Showcase",
    attendees: "2,000+ Doctors",
  },
  {
    id: "ex-4",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    title: "Dubai Derma World Trade Center 2026",
    location: "Dubai World Trade Centre, UAE",
    tag: "Global Formulation Debut",
    attendees: "25,000+ International Delegates",
  },
];
