// src/hooks/useWishlist.ts

import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist deve ser usado dentro de um WishlistProvider");
  }
  return context;
};
