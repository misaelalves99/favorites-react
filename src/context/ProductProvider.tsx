import { useState, ReactNode } from "react";
import { Product } from "../types/product";
import { ProductContext, ProductContextType } from "./ProductContext";
import { getProducts } from "../lib/api/products";

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  const contextValue: ProductContextType = {
    products,
    setProducts,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
