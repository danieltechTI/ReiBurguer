import { randomUUID } from "crypto";
import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { ordersTable, orderCounterTable, contactMessagesTable } from "@shared/schema";
import type { Product, CartItem, ContactMessage, InsertCartItem, InsertContact, Customer, Order, InsertOrderData } from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

const db = drizzle(process.env.DATABASE_URL);

// Initial products data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Sanduíche Artesanal",
    description: "Nosso sanduíche artesanal com queijo derretido. Simples, gostoso e feito com ingredientes frescos. A especialidade da casa!",
    price: 14.99,
    category: "hamburguer",
    ingredient: "carne",
    image: "/assets/generated_images/produto_1.jpeg",
    images: ["/assets/generated_images/produto_1.jpeg"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "250g aprox",
      ingredients: "Carne, Queijo, Alface, Tomate",
      allergen: "Glúten, Lácteos",
    },
  },
  {
    id: "2",
    name: "X-Tudo de Batata Palha",
    description: "X-Tudo com batata palha crocante e suculento. Apenas R$9,99! Promoção imperdível e deliciosa.",
    price: 9.99,
    category: "hamburguer",
    ingredient: "bacon",
    image: "/assets/generated_images/produto_2.jpeg",
    images: ["/assets/generated_images/produto_2.jpeg"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "300g aprox",
      ingredients: "Batata Palha, Ham, Pão",
      allergen: "Glúten",
    },
  },
  {
    id: "3",
    name: "Pizza Artesanal",
    description: "Pizza fresca com ham, tomate, pimentão, milho e muito sabor! Feita na hora com ingredientes selecionados.",
    price: 19.99,
    originalPrice: 24.00,
    category: "combos",
    ingredient: "carne",
    image: "/assets/generated_images/produto_3.jpeg",
    images: ["/assets/generated_images/produto_3.jpeg"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "400g aprox",
      ingredients: "Massa, Ham, Tomate, Pimentão, Milho",
      allergen: "Glúten, Lácteos",
    },
  },
  {
    id: "4",
    name: "X-Tudo Completo Premium",
    description: "X-Tudo completo com maionese cremosa e ingredientes premium. Tudo isso por apenas R$10,00!",
    price: 10.00,
    category: "hamburguer",
    ingredient: "vegetariano",
    image: "/assets/generated_images/produto_4.jpeg",
    images: ["/assets/generated_images/produto_4.jpeg"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "280g aprox",
      ingredients: "Pão, Maionese, Tudo Misturado",
      allergen: "Glúten",
    },
  },
  {
    id: "5",
    name: "Combo Hamburgueria Completo",
    description: "Tudo por R$10,00! Burger com batata frita crocante na embalagem vermelha. A melhor promoção!",
    price: 10.00,
    category: "combos",
    ingredient: "carne",
    image: "/assets/generated_images/produto_5.jpeg",
    images: ["/assets/generated_images/produto_5.jpeg"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "350g aprox",
      ingredients: "Hambúrguer, Batata Frita",
      allergen: "Glúten",
    },
  },
  {
    id: "6",
    name: "Açai Premium",
    description: "Açai cremoso com granulado crocante e cobertura especial. Refrescante e delicioso por R$10,00!",
    price: 10.00,
    category: "sobremesas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/produto_6.jpeg",
    images: ["/assets/generated_images/produto_6.jpeg"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "200g aprox",
      ingredients: "Açai, Granulado, Calda",
      allergen: "Sem glúten",
    },
  },
  {
    id: "7",
    name: "Bebida Gelada Especial",
    description: "Bebida gelada com cobertura especial. Acompanhamento perfeito com um toque único!",
    price: 10.00,
    category: "bebidas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/produto_7.jpeg",
    images: ["/assets/generated_images/produto_7.jpeg"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "300ml aprox",
      ingredients: "Bebida gelada especial",
      allergen: "Sem glúten",
    },
  },
  {
    id: "8",
    name: "Macarrão com Bacon Crocante",
    description: "Macarrão quentinho em embalagem prática com bacon crocante por toda parte. Apenas R$10,00! Muito saboroso.",
    price: 10.00,
    category: "acompanhamentos",
    ingredient: "bacon",
    image: "/assets/generated_images/produto_8.jpeg",
    images: ["/assets/generated_images/produto_8.jpeg"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "280g aprox",
      ingredients: "Macarrão, Bacon, Molho",
      allergen: "Glúten",
    },
  },
  {
    id: "9",
    name: "Refrigerante 2L",
    description: "Refrigerante geladinho em garrafa de 2L para acompanhar seu pedido favorito!",
    price: 8.90,
    originalPrice: 10.00,
    category: "bebidas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/2l_soda_bottle.png",
    images: ["/assets/generated_images/2l_soda_bottle.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "2000ml",
      ingredients: "Refrigerante",
      allergen: "Sem glúten",
    },
  },
  {
    id: "10",
    name: "Batata Frita Grande",
    description: "Batata frita crocante com sal especial ReiBurguer. Acompanhamento perfeito!",
    price: 12.90,
    category: "acompanhamentos",
    ingredient: "vegetariano",
    image: "/assets/generated_images/large_french_fries.png",
    images: ["/assets/generated_images/large_french_fries.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "350g",
      ingredients: "Batata, Óleo vegetal, Sal",
      allergen: "Sem glúten",
    },
  },
  {
    id: "11",
    name: "Anéis de Cebola",
    description: "Anéis de cebola crocantes e deliciosos. Perfeitos para compartilhar!",
    price: 14.90,
    category: "acompanhamentos",
    ingredient: "vegetariano",
    image: "/assets/generated_images/crispy_onion_rings.png",
    images: ["/assets/generated_images/crispy_onion_rings.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "250g",
      ingredients: "Cebola, Farinha, Óleo vegetal",
      allergen: "Glúten",
    },
  },
  {
    id: "12",
    name: "Sorvete Sundae",
    description: "Sorvete macio com calda de chocolate e granulado. Doce finalização perfeita!",
    price: 11.90,
    category: "sobremesas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/chocolate_sundae_ice_cream.png",
    images: ["/assets/generated_images/chocolate_sundae_ice_cream.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "150g",
      ingredients: "Sorvete, Calda de Chocolate, Granulado",
      allergen: "Lácteos",
    },
  },
];

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getCartItems(): Promise<CartItem[]>;
  getCartItem(id: string): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(): Promise<void>;
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  createCustomer(email: string, passwordHash: string, name: string): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  createOrder(data: InsertOrderData): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  getOrdersByCustomerId(customerId: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
}

export class DatabaseStorage implements IStorage {
  private cartItems: Map<string, CartItem> = new Map();
  private customers: Map<string, Customer> = new Map();

  async getNextOrderNumber(): Promise<string> {
    try {
      const counters = await db.select().from(orderCounterTable);
      let counter = counters[0];
      
      if (!counter) {
        await db.insert(orderCounterTable).values({ counter: 1 });
        return "00001";
      }
      
      const nextCounter = (counter.counter % 100000) + 1;
      await db.update(orderCounterTable).set({ counter: nextCounter }).where(eq(orderCounterTable.id, counter.id));
      return String(nextCounter).padStart(5, "0");
    } catch (e) {
      console.error("Error getting next order number:", e);
      return "00001";
    }
  }

  async getProducts(): Promise<Product[]> {
    return initialProducts;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return initialProducts.find(p => p.id === id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return initialProducts.filter(p => p.category === category);
  }

  async getCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItems.values());
  }

  async getCartItem(id: string): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const product = await this.getProduct(item.productId);
    if (!product) throw new Error("Product not found");

    const existing = Array.from(this.cartItems.values()).find(ci => ci.productId === item.productId);
    if (existing) {
      const updated = { ...existing, quantity: existing.quantity + (item.quantity || 1) };
      this.cartItems.set(existing.id, updated);
      return updated;
    }

    const id = randomUUID();
    const cartItem: CartItem = { id, productId: item.productId, quantity: item.quantity || 1, product };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    const updated = { ...item, quantity };
    this.cartItems.set(id, updated);
    return updated;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }

  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = { id, ...message, createdAt: new Date().toISOString() };
    try {
      await db.insert(contactMessagesTable).values(contactMessage);
    } catch (e) {
      console.error("Error creating contact message:", e);
    }
    return contactMessage;
  }

  async createCustomer(email: string, passwordHash: string, name: string): Promise<Customer> {
    const existing = Array.from(this.customers.values()).find(c => c.email === email);
    if (existing) throw new Error("Email already registered");
    const id = randomUUID();
    const customer: Customer = { id, email, passwordHash, name };
    this.customers.set(id, customer);
    return customer;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(c => c.email === email);
  }

  async createOrder(data: InsertOrderData): Promise<Order> {
    const id = randomUUID();
    const orderNumber = await this.getNextOrderNumber();
    const now = new Date().toISOString();

    const order: Order = {
      id,
      orderNumber,
      customerId: data.customerId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      items: data.items as CartItem[],
      subtotal: data.total,
      shippingCost: 0,
      total: data.total,
      status: "confirmado",
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await db.insert(ordersTable).values({
        id,
        orderNumber,
        customerId: data.customerId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        items: JSON.stringify(data.items),
        subtotal: String(data.total),
        shippingCost: "0",
        total: String(data.total),
        status: "confirmado",
        paymentMethod: data.paymentMethod,
        notes: data.notes,
        createdAt: new Date(now),
        updatedAt: new Date(now),
      });
    } catch (e) {
      console.error("Error creating order:", e);
    }

    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    try {
      const rows = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
      if (!rows || rows.length === 0) return undefined;
      return this.rowToOrder(rows[0]);
    } catch (e) {
      console.error("Error getting order:", e);
      return undefined;
    }
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    try {
      const rows = await db.select().from(ordersTable).where(eq(ordersTable.orderNumber, orderNumber));
      if (!rows || rows.length === 0) return undefined;
      return this.rowToOrder(rows[0]);
    } catch (e) {
      console.error("Error getting order by number:", e);
      return undefined;
    }
  }

  async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    try {
      const rows = await db.select().from(ordersTable).where(eq(ordersTable.customerId, customerId));
      return rows.map(r => this.rowToOrder(r)).filter(o => o !== undefined) as Order[];
    } catch (e) {
      console.error("Error getting orders by customer:", e);
      return [];
    }
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    try {
      await db.update(ordersTable).set({ status, updatedAt: new Date() }).where(eq(ordersTable.id, id));
      return this.getOrder(id);
    } catch (e) {
      console.error("Error updating order status:", e);
      return undefined;
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const rows = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
      return rows.map(r => this.rowToOrder(r)).filter(o => o !== undefined) as Order[];
    } catch (e) {
      console.error("Error getting all orders:", e);
      return [];
    }
  }

  private rowToOrder(row: any): Order {
    return {
      id: row.id,
      orderNumber: row.orderNumber,
      customerId: row.customerId,
      customerName: row.customerName,
      customerPhone: row.customerPhone,
      items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
      subtotal: parseFloat(row.subtotal),
      shippingCost: parseFloat(row.shippingCost),
      total: parseFloat(row.total),
      status: row.status,
      paymentMethod: row.paymentMethod,
      notes: row.notes,
      createdAt: new Date(row.createdAt).toISOString(),
      updatedAt: new Date(row.updatedAt).toISOString(),
    };
  }
}

export const storage = new DatabaseStorage();
