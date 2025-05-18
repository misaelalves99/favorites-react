// app/src/WishlistContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/product";

// 01 - Tipagem do contexto
type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
};

// 02 - Criação do contexto
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// 03 - Componente Provider do contexto
type WishlistProviderProps = {
  children: ReactNode;
};

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  // 06 - Estado local da lista de desejos
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // 04 - Adiciona produto se ainda não estiver na lista
  const addToWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };

  // 05 - Remove produto pelo ID
  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // 06 - Verifica se produto está na lista
  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// 07 - Hook customizado
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist deve ser usado dentro de um WishlistProvider");
  }
  return context;
};
