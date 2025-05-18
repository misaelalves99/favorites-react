// lib/api/products.ts

import { Product } from "../../types/product";

// Mock de produtos para exibição no ProductList
const products: Product[] = [
  {
    id: 1,
    name: "Smartphone XYZ",
    price: 1499.9,
    description: "Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.",
    imageUrl: "https://cdn.pixabay.com/photo/2018/10/10/13/59/huawei-3737335_1280.jpg",
    category: "electronics",
  },
  {
    id: 2,
    name: "Camiseta Estilosa",
    price: 59.9,
    description: "Camiseta 100% algodão, disponível em várias cores.",
    imageUrl: "https://cdn.pixabay.com/photo/2020/03/21/09/36/fashion-4953133_1280.jpg",
    category: "clothing",
  },
  {
    id: 3,
    name: "Fone de Ouvido Bluetooth",
    price: 299.9,
    description: "Fone de ouvido sem fio com excelente qualidade de som.",
    imageUrl: "https://cdn.pixabay.com/photo/2019/10/25/06/15/headphone-4576092_1280.jpg",
    category: "electronics",
  },
  {
    id: 4,
    name: "Relógio de Pulso",
    price: 249.9,
    description: "Relógio masculino com design moderno e resistente à água.",
    imageUrl: "https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg",
    category: "accessories",
  },
  {
    id: 5,
    name: "Jaqueta Casual",
    price: 399.9,
    description: "Jaqueta estilosa para dias frios.",
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/13/26/casual-1869832_1280.jpg",
    category: "clothing",
  },
];

// Função que simula uma chamada para a API para obter os produtos
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("/api/products"); // Endpoint para os produtos
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error("Erro no getProducts:", error);
    // Em caso de erro, retornamos os produtos mockados
    return products;
  }
};

// Função que busca um produto específico pelo ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar produto");
    const data: Product = await res.json();
    return data;
  } catch (error) {
    console.error("Erro no getProductById:", error);
    return null;
  }
};
