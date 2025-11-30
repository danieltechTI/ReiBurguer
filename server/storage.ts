import { randomUUID } from "crypto";
import type { Product, CartItem, ContactMessage, InsertCartItem, InsertContact, Customer } from "@shared/schema";

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
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Hambúrguer Clássico",
    description: "Hambúrguer suculento com carne premium, queijo derretido, alface e tomate frescos.",
    price: 28.90,
    originalPrice: 32.00,
    category: "hamburguer",
    ingredient: "carne",
    image: "/assets/generated_images/gold_ring_product_shot.png",
    images: ["/assets/generated_images/gold_ring_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "250g",
      ingredients: "Carne 150g, Queijo, Alface, Tomate",
      allergen: "Glúten",
    },
  },
  {
    id: "2",
    name: "Hambúrguer Bacon Premium",
    description: "Hambúrguer com bacon crocante, queijo cheddar e molho especial.",
    price: 34.90,
    category: "hamburguer",
    ingredient: "bacon",
    image: "/assets/generated_images/gold_necklace_product_shot.png",
    images: ["/assets/generated_images/gold_necklace_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "280g",
      ingredients: "Carne 150g, Bacon, Queijo Cheddar, Molho Especial",
      allergen: "Glúten, Lácteos",
    },
  },
  {
    id: "3",
    name: "Hambúrguer de Frango",
    description: "Hambúrguer de frango grelhado com alface, tomate e maionese caseira.",
    price: 24.90,
    originalPrice: 28.00,
    category: "hamburguer",
    ingredient: "frango",
    image: "/assets/generated_images/gold_earrings_product_shot.png",
    images: ["/assets/generated_images/gold_earrings_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "220g",
      ingredients: "Frango 150g, Alface, Tomate, Maionese",
      allergen: "Glúten",
    },
  },
  {
    id: "4",
    name: "Hambúrguer Vegetariano",
    description: "Hambúrguer delicioso com grão-de-bico, quinoa e legumes grelhados.",
    price: 22.90,
    category: "hamburguer",
    ingredient: "vegetariano",
    image: "/assets/generated_images/gold_bracelet_product_shot.png",
    images: ["/assets/generated_images/gold_bracelet_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "200g",
      ingredients: "Grão-de-bico, Quinoa, Abóbora, Cenoura",
      allergen: "Glúten",
    },
  },
  {
    id: "5",
    name: "Refrigerante 2L",
    description: "Refrigerante geladinho para acompanhar seu hambúrguer favorito.",
    price: 8.90,
    originalPrice: 10.00,
    category: "bebidas",
    ingredient: "frango",
    image: "/assets/generated_images/silver_ring_product_shot.png",
    images: ["/assets/generated_images/silver_ring_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "2000ml",
      ingredients: "Refrigerante",
      allergen: "Sem glúten",
    },
  },
  {
    id: "6",
    name: "Batata Frita Grande",
    description: "Batata frita crocante com sal especial da ReiBurguer.",
    price: 12.90,
    category: "acompanhamentos",
    ingredient: "vegetariano",
    image: "/assets/generated_images/silver_necklace_product_shot.png",
    images: ["/assets/generated_images/silver_necklace_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "350g",
      ingredients: "Batata, Óleo vegetal, Sal",
      allergen: "Sem glúten",
    },
  },
  {
    id: "7",
    name: "Anéis de Cebola",
    description: "Anéis de cebola crocantes e crocantes, perfeitos para compartilhar.",
    price: 14.90,
    category: "acompanhamentos",
    ingredient: "vegetariano",
    image: "/assets/generated_images/silver_earrings_product_shot.png",
    images: ["/assets/generated_images/silver_earrings_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "250g",
      ingredients: "Cebola, Farinha, Óleo vegetal",
      allergen: "Glúten",
    },
  },
  {
    id: "8",
    name: "Refrigerante 350ml",
    description: "Lata gelada de refrigerante para sua bebida perfeita.",
    price: 3.50,
    category: "bebidas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/gold_ring_product_shot.png",
    images: ["/assets/generated_images/gold_ring_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "350ml",
      ingredients: "Refrigerante",
      allergen: "Sem glúten",
    },
  },
  {
    id: "9",
    name: "Sorvete Sundae",
    description: "Sorvete macio com cobertura de calda de chocolate e granulado.",
    price: 11.90,
    category: "sobremesas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/gold_necklace_product_shot.png",
    images: ["/assets/generated_images/gold_necklace_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "150g",
      ingredients: "Sorvete, Calda de Chocolate, Granulado",
      allergen: "Lácteos",
    },
  },
  {
    id: "10",
    name: "Combo Clássico",
    description: "Hambúrguer Clássico + Batata Frita Grande + Refrigerante 2L.",
    price: 42.90,
    originalPrice: 50.00,
    category: "combos",
    ingredient: "carne",
    image: "/assets/generated_images/gold_bracelet_product_shot.png",
    images: ["/assets/generated_images/gold_bracelet_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "500g aprox",
      ingredients: "Hambúrguer, Batata, Refrigerante",
      allergen: "Glúten, Lácteos",
    },
  },
  {
    id: "11",
    name: "Milk Shake de Morango",
    description: "Milk shake cremoso de morango com calda e cobertura.",
    price: 13.90,
    category: "bebidas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/gold_earrings_product_shot.png",
    images: ["/assets/generated_images/gold_earrings_product_shot.png"],
    featured: false,
    inStock: false,
    specifications: {
      weight: "400ml",
      ingredients: "Leite, Morango, Calda",
      allergen: "Lácteos",
    },
  },
  {
    id: "12",
    name: "Combo Premium",
    description: "Hambúrguer Bacon Premium + Anéis de Cebola + Milk Shake.",
    price: 54.90,
    category: "combos",
    ingredient: "bacon",
    image: "/assets/generated_images/gold_ring_product_shot.png",
    images: ["/assets/generated_images/gold_ring_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "600g aprox",
      ingredients: "Hambúrguer, Anéis, Milk Shake",
      allergen: "Glúten, Lácteos",
    },
  },
];

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private contactMessages: Map<string, ContactMessage>;
  private customers: Map<string, Customer>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.contactMessages = new Map();
    this.customers = new Map();

    initialProducts.forEach((product) => {
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (p) => p.category === category
    );
  }

  async getCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItems.values());
  }

  async getCartItem(id: string): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const product = await this.getProduct(item.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const existingItem = Array.from(this.cartItems.values()).find(
      (cartItem) => cartItem.productId === item.productId
    );

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + (item.quantity || 1),
      };
      this.cartItems.set(existingItem.id, updatedItem);
      return updatedItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = {
      id,
      productId: item.productId,
      quantity: item.quantity || 1,
      product,
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) {
      return undefined;
    }
    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }

  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = {
      id,
      ...message,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async createCustomer(email: string, passwordHash: string, name: string): Promise<Customer> {
    const existing = Array.from(this.customers.values()).find(c => c.email === email);
    if (existing) {
      throw new Error("Email already registered");
    }
    
    const id = randomUUID();
    const customer: Customer = {
      id,
      email,
      passwordHash,
      name,
    };
    this.customers.set(id, customer);
    return customer;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(c => c.email === email);
  }
}

export const storage = new MemStorage();
