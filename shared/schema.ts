import { z } from "zod";

export const categories = ["joias", "semi-joias", "aco-inoxidavel", "biju", "bolsas"] as const;
export type Category = typeof categories[number];

export const materials = ["ouro", "prata", "aco-inoxidavel", "cristal", "couro", "tecido"] as const;
export type Material = typeof materials[number];

export const categoryLabels: Record<Category, string> = {
  joias: "Joias",
  "semi-joias": "Semi-Joias",
  "aco-inoxidavel": "Aço Inoxidável",
  biju: "Bijuterias",
  bolsas: "Bolsas",
};

export const materialLabels: Record<Material, string> = {
  ouro: "Ouro",
  prata: "Prata",
  "aco-inoxidavel": "Aço Inoxidável",
  cristal: "Cristal",
  couro: "Couro",
  tecido: "Tecido",
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  material: Material;
  image: string;
  images: string[];
  featured: boolean;
  inStock: boolean;
  specifications: {
    weight?: string;
    size?: string;
    material?: string;
    stone?: string;
  };
}

export const insertProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  category: z.enum(categories),
  material: z.enum(materials),
  image: z.string(),
  images: z.array(z.string()),
  featured: z.boolean().default(false),
  inStock: z.boolean().default(true),
  specifications: z.object({
    weight: z.string().optional(),
    size: z.string().optional(),
    material: z.string().optional(),
    stone: z.string().optional(),
  }).default({}),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export const insertCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive().default(1),
});

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export const insertContactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;

export interface User {
  id: string;
  username: string;
  password: string;
}

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// WhatsApp Configuration
export const WHATSAPP_NUMBER = "5511999999999"; // Replace with actual store number
