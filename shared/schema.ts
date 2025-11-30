import { z } from "zod";

export const categories = ["hamburguer", "bebidas", "acompanhamentos", "sobremesas", "combos"] as const;
export type Category = typeof categories[number];

export const ingredients = ["carne", "frango", "vegetariano", "queijo", "bacon", "alface", "tomate"] as const;
export type Ingredient = typeof ingredients[number];

export const categoryLabels: Record<Category, string> = {
  hamburguer: "Hambúrgueres",
  bebidas: "Bebidas",
  acompanhamentos: "Acompanhamentos",
  sobremesas: "Sobremesas",
  combos: "Combos",
};

export const ingredientLabels: Record<Ingredient, string> = {
  carne: "Carne",
  frango: "Frango",
  vegetariano: "Vegetariano",
  queijo: "Queijo",
  bacon: "Bacon",
  alface: "Alface",
  tomate: "Tomate",
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  ingredient: Ingredient;
  image: string;
  images: string[];
  featured: boolean;
  inStock: boolean;
  specifications: {
    weight?: string;
    size?: string;
    ingredients?: string;
    allergen?: string;
  };
}

export const insertProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  category: z.enum(categories),
  ingredient: z.enum(ingredients),
  image: z.string(),
  images: z.array(z.string()),
  featured: z.boolean().default(false),
  inStock: z.boolean().default(true),
  specifications: z.object({
    weight: z.string().optional(),
    size: z.string().optional(),
    ingredients: z.string().optional(),
    allergen: z.string().optional(),
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

// Customer Authentication
export interface Customer {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
}

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;

// WhatsApp Configuration
export const WHATSAPP_NUMBER = "5533987062406"; // Replace with actual store number

// Address and Order types
export interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ShippingInfo {
  days: number;
  value: number;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: Address;
  shippingInfo: ShippingInfo;
  items: CartItem[];
  subtotal: number;
  total: number;
}

export const insertAddressSchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  street: z.string().min(1, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().length(2, "Estado inválido"),
});

export const insertOrderSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-?\d{2}$/, "CPF inválido"),
  address: insertAddressSchema,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;

// Order types for ReiBurguer (Pickup only)
export type OrderStatus = "confirmado" | "preparando" | "pronto" | "finalizado";

export interface Order {
  id: string;
  orderNumber: string; // Format: 00001, 00002, ..., 99999 (sequential)
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: string; // "dinheiro", "cartao", "pix", etc.
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const insertOrderSchema = z.object({
  customerId: z.string().min(1, "Cliente inválido"),
  customerName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  customerPhone: z.string().min(10, "Telefone inválido"),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })).min(1, "Pedido deve ter pelo menos 1 item"),
  total: z.number().positive(),
  paymentMethod: z.enum(["dinheiro", "cartao", "pix"]).optional(),
  notes: z.string().optional(),
});

export type InsertOrderData = z.infer<typeof insertOrderSchema>;
