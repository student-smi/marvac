import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ContentProvider } from "@/context/StoreContentContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Beauty | Luxury Skincare & Salon Hair Formulations India",
  description:
    "Buy professional beauty and salon styling essentials online at Aura Beauty. Clinically formulated, dermatologically tested, engineered for Indian climate. Free express shipping available.",
  keywords: [
    "Aura Beauty",
    "luxury beauty",
    "hair spray",
    "salon products",
    "hair styling",
    "bridal kit",
    "hair pins",
    "bobby pins",
    "texture powder",
    "glass skin",
  ],
  openGraph: {
    title: "Aura Beauty | Luxury Skincare & Salon Hair Formulations India",
    description:
      "Buy professional beauty and salon styling essentials online at Aura Beauty. Clinically formulated, dermatologically tested, engineered for Indian climate.",
    url: "https://aurabeauty.in",
    siteName: "Aura Beauty",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        <ContentProvider>
          <CartProvider>{children}</CartProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
