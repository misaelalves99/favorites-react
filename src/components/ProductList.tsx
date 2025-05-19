// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useProduct } from "../hooks/useProduct";
import styles from "./ProductList.module.css";

const ProductList: React.FC = () => {
  const { products, fetchProducts } = useProduct();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        await fetchProducts();
      } catch (err) {
        setError("Erro ao carregar produtos");
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetchProducts]);

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!products.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
