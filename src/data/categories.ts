export interface Category {
  id: string;
  name: string;
  title: string;
  itemCount: number;
  image: string;
  link: string;
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "FACIAL SERUMS & ELIXIRS",
    title: "FACIAL SERUMS & ELIXIRS",
    itemCount: 18,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    link: "/category/facial-serums-elixirs",
  },
  {
    id: "cat-2",
    name: "HYDRA CREAMS & MOISTURISERS",
    title: "HYDRA CREAMS & MOISTURISERS",
    itemCount: 14,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    link: "/category/hydra-creams-moisturisers",
  },
  {
    id: "cat-3",
    name: "SALON HAIR FORMULATIONS",
    title: "SALON HAIR FORMULATIONS",
    itemCount: 22,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    link: "/category/salon-hair-formulations",
  },
  {
    id: "cat-4",
    name: "SUN PROTECTION & SPF",
    title: "SUN PROTECTION & SPF",
    itemCount: 8,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    link: "/category/sun-protection-spf",
  },
  {
    id: "cat-5",
    name: "EXFOLIATING PEELS & CLEANSERS",
    title: "EXFOLIATING PEELS & CLEANSERS",
    itemCount: 12,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    link: "/category/exfoliating-peels-cleansers",
  },
  {
    id: "cat-6",
    name: "CURATED LUXURY RITUALS",
    title: "CURATED LUXURY RITUALS",
    itemCount: 6,
    image: "https://images.unsplash.com/photo-1512290900676-26c2a4d4b5b3?auto=format&fit=crop&w=800&q=80",
    link: "/category/curated-luxury-rituals",
  },
];
