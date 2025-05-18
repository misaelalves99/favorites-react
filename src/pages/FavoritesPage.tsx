// src/pages/FavoritesPage.tsx

import React from "react";
import Wishlist from "../components/Wishlist"; // Ajuste o caminho conforme necessário
import styles from "./FavoritesPage.module.css"; // Importando o CSS Module

const FavoritesPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Meus Favoritos</h1>
      <Wishlist />
    </div>
  );
};

export default FavoritesPage;
