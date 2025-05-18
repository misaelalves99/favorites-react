import React from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Handler de navegação
  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bem-vindo ao Nosso E-commerce</h1>
        <p className={styles.description}>Explore nossos produtos incríveis!</p>
        <button className={styles.heroButton} onClick={handleNavigate}>
          Ver Produtos
        </button>
      </section>

      {/* Produtos em Destaque */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Produtos em Destaque</h2>
        <ProductList />
      </section>
    </main>
  );
};

export default HomePage;
