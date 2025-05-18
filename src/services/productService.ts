// src/services/productService.ts

import { PrismaClient } from "@prisma/client";
import { Product } from "../types/product";

const prisma = new PrismaClient();

// Produtos simulados para fallback
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone XYZ",
    price: 1499.99,
    description: "Smartphone com tela OLED, 6GB de RAM e 128GB de armazenamento.",
    imageUrl: "/images/smartphone.jpg",
    category: "electronics",
  },
  {
    id: 2,
    name: "Camiseta Estilosa",
    price: 59.9,
    description: "Camiseta 100% algodão, disponível em várias cores.",
    imageUrl: "/images/tshirt.jpg",
    category: "clothing",
  },
  {
    id: 3,
    name: "Fone de Ouvido Bluetooth",
    price: 299.9,
    description: "Fone de ouvido sem fio com excelente qualidade de som.",
    imageUrl: "/images/headphones.jpg",
    category: "electronics",
  },
  {
    id: 4,
    name: "Relógio de Pulso",
    price: 249.9,
    description: "Relógio masculino com design moderno e resistente à água.",
    imageUrl: "/images/watch.jpg",
    category: "accessories",
  },
];

// Produtos extras de mock
const mockProducts: Product[] = [
  {
    id: 5,
    name: "Produto 5",
    price: 100,
    imageUrl: "https://cdn.pixabay.com/photo/2020/04/11/08/07/clothing-5029294_1280.jpg",
    category: "Categoria 1",
  },
  {
    id: 6,
    name: "Produto 6",
    price: 200,
    imageUrl: "https://cdn.pixabay.com/photo/2020/04/11/08/07/clothing-5029294_1280.jpg",
    category: "Categoria 2",
  },
  {
    id: 7,
    name: "Produto 7",
    price: 300,
    imageUrl: "https://cdn.pixabay.com/photo/2020/04/11/08/07/clothing-5029294_1280.jpg",
    category: "Categoria 3",
  },
];

// === Banco de Dados (Prisma) ===

export const getProductsFromDb = async (): Promise<Product[]> => {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Erro ao buscar produtos no banco:", error);
    return [...fallbackProducts, ...mockProducts];
  }
};

export const getProductByIdFromDb = async (id: number): Promise<Product | null> => {
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error("Erro ao buscar produto pelo ID:", error);
    return null;
  }
};

export const createProductInDb = async (data: Product): Promise<Product> => {
  try {
    return await prisma.product.create({ data });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw new Error("Erro ao criar produto");
  }
};

export const updateProductInDb = async (id: number, data: Partial<Product>): Promise<Product> => {
  try {
    return await prisma.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw new Error("Erro ao atualizar produto");
  }
};

export const deleteProductFromDb = async (id: number): Promise<void> => {
  try {
    await prisma.product.delete({ where: { id } });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw new Error("Erro ao excluir produto");
  }
};

// === Mocks (Fallback) ===

export const getProductsMock = async (): Promise<Product[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve([...fallbackProducts, ...mockProducts]), 500)
  );
};

export const getProductByIdMock = async (id: number): Promise<Product | null> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const product = [...fallbackProducts, ...mockProducts].find((p) => p.id === id) || null;
      resolve(product);
    }, 500)
  );
};
