import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const fallbackProducts = [
  { id: 1, name: "Smartphone XYZ", price: 1499.99, description: "Smartphone com tela OLED...", imageUrl: "https://cdn.pixabay.com/photo/2020/02/24/06/00/clothing-4875289_1280.jpg", category: "electronics" },
  { id: 2, name: "Camiseta Estilosa", price: 59.9, description: "Camiseta 100% algodão...", imageUrl: "https://cdn.pixabay.com/photo/2020/02/24/06/00/clothing-4875289_1280.jpg", category: "clothing" },
  // Adicione os outros produtos aqui...
];

// Simulando dados mock
const getAllMockProducts = async (): Promise<any[]> => {
  return new Promise(resolve => setTimeout(() => resolve(fallbackProducts), 500));
};

// Rota para listar produtos
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    const fallback = await getAllMockProducts();
    res.json(fallback);
  }
});

// Rota para obter produto específico pelo ID
app.get("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
});

// Rota para criar produto
app.post("/api/products", async (req: Request, res: Response) => {
  const { name, price, description, imageUrl, category } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { name, price, description, imageUrl, category }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
});

// Rota para atualizar produto
app.put("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, category } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price, description, imageUrl, category }
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
});

// Rota para excluir produto
app.delete("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro ao excluir produto" });
  }
});

// Iniciando o servidor Express
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
