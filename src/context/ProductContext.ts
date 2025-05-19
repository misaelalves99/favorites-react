// src/context/ProductContext.tsx

import { createContext, Dispatch, SetStateAction } from "react";
import { Product } from "../types/product";

export type ProductContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
