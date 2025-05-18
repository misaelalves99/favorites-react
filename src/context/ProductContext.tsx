// src/context/ProductContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { Product } from "../types/product";
import { getProducts } from "../lib/api/products";

// Tipagem do contexto
type ProductContextType = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  fetchProducts: () => void;
};

// Criação do contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Tipagem das props do Provider
type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook customizado
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};
