// src/pages/ProductsPage.tsx

import React from 'react';
import ProductList from '../components/ProductList';
import styles from './ProductsPage.module.css';

const ProductsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Produtos</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
