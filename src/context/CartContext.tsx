"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  isKitBuilderOpen: boolean;
  setIsKitBuilderOpen: (open: boolean) => void;
  selectedKitId: string | null;
  setSelectedKitId: (id: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isKitBuilderOpen, setIsKitBuilderOpen] = useState(false);
  const [selectedKitId, setSelectedKitId] = useState<string | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("marvac_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("marvac_cart", JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        isKitBuilderOpen,
        setIsKitBuilderOpen,
        selectedKitId,
        setSelectedKitId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
