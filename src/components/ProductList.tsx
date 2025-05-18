// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useProduct } from "../context/ProductContext";
import { getProducts } from "../lib/api/products"; // ✅ Importando a função que retorna produtos
import styles from "./ProductList.module.css";

const ProductList: React.FC = () => {
  const { products, setProducts } = useProduct(); // Usa o contexto global
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Efeito para carregar os produtos mockados ou reais
  useEffect(() => {
    const load = async () => {
      try {
        const fetchedProducts = await getProducts(); // ✅ Chamada direta
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Erro ao carregar produtos");
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [setProducts]);

  // Estado de carregamento
  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!products.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  // Renderiza os cards
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
