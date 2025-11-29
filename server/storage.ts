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
    name: "Anel Solitário Ouro 18k",
    description: "Anel solitário elegante em ouro 18k com diamante central. Design clássico e atemporal.",
    price: 2890,
    originalPrice: 3200,
    category: "joias",
    material: "ouro",
    image: "/assets/generated_images/gold_ring_product_shot.png",
    images: ["/assets/generated_images/gold_ring_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "3.5g",
      size: "15-20",
      material: "Ouro 18k",
      stone: "Diamante 0.30ct",
    },
  },
  {
    id: "2",
    name: "Colar Pingente Semi-Joia",
    description: "Colar delicado em semi-joia com pingente. Perfeito para o dia a dia.",
    price: 89,
    category: "semi-joias",
    material: "cristal",
    image: "/assets/generated_images/gold_necklace_product_shot.png",
    images: ["/assets/generated_images/gold_necklace_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "15g",
      size: "45cm",
      material: "Semi-joia",
    },
  },
  {
    id: "3",
    name: "Brincos Argola Aço Inoxidável",
    description: "Brincos em aço inoxidável resistente com acabamento polido. Hipoalergênico.",
    price: 39,
    originalPrice: 49,
    category: "aco-inoxidavel",
    material: "aco-inoxidavel",
    image: "/assets/generated_images/gold_earrings_product_shot.png",
    images: ["/assets/generated_images/gold_earrings_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "8g (par)",
      size: "25mm",
      material: "Aço Inoxidável",
    },
  },
  {
    id: "4",
    name: "Bijuteria Pulseira Colorida",
    description: "Pulseira de bijuteria com cristais coloridos. Design descontraído e moderno.",
    price: 19,
    category: "biju",
    material: "cristal",
    image: "/assets/generated_images/gold_bracelet_product_shot.png",
    images: ["/assets/generated_images/gold_bracelet_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "25g",
      size: "18cm ajustável",
      material: "Bijuteria com cristal",
    },
  },
  {
    id: "5",
    name: "Bolsa Clutch Elegante",
    description: "Bolsa clutch em couro legítimo com design minimalista. Perfeita para eventos.",
    price: 189,
    originalPrice: 220,
    category: "bolsas",
    material: "couro",
    image: "/assets/generated_images/silver_ring_product_shot.png",
    images: ["/assets/generated_images/silver_ring_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "280g",
      size: "25cm x 15cm",
      material: "Couro legítimo",
    },
  },
  {
    id: "6",
    name: "Anel Prata 925",
    description: "Anel em prata 925 com cristal Swarovski. Design contemporâneo.",
    price: 159,
    category: "joias",
    material: "prata",
    image: "/assets/generated_images/silver_necklace_product_shot.png",
    images: ["/assets/generated_images/silver_necklace_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "2.1g",
      size: "14-18",
      material: "Prata 925",
      stone: "Cristal Swarovski",
    },
  },
  {
    id: "7",
    name: "Colar Semi-Joia Dourada",
    description: "Colar semi-joia com acabamento dourado. Brilhante e sofisticado.",
    price: 49,
    category: "semi-joias",
    material: "cristal",
    image: "/assets/generated_images/silver_earrings_product_shot.png",
    images: ["/assets/generated_images/silver_earrings_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "12g",
      size: "40cm",
      material: "Semi-joia",
    },
  },
  {
    id: "8",
    name: "Pulseira Aço Inoxidável Unissex",
    description: "Pulseira em aço inoxidável com design unissex. Resistente e durável.",
    price: 69,
    category: "aco-inoxidavel",
    material: "aco-inoxidavel",
    image: "/assets/generated_images/gold_ring_product_shot.png",
    images: ["/assets/generated_images/gold_ring_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "45g",
      size: "18cm + 3cm extensor",
      material: "Aço Inoxidável",
    },
  },
  {
    id: "9",
    name: "Bijuteria Colar Longo",
    description: "Colar longo em bijuteria com cristais multicoloridos. Versátil.",
    price: 29,
    category: "biju",
    material: "cristal",
    image: "/assets/generated_images/gold_necklace_product_shot.png",
    images: ["/assets/generated_images/gold_necklace_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "18g",
      size: "70cm",
      material: "Bijuteria",
    },
  },
  {
    id: "10",
    name: "Bolsa Tote Casual",
    description: "Bolsa tote em lona com alças de couro. Perfeita para o dia a dia.",
    price: 129,
    originalPrice: 160,
    category: "bolsas",
    material: "tecido",
    image: "/assets/generated_images/gold_bracelet_product_shot.png",
    images: ["/assets/generated_images/gold_bracelet_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "350g",
      size: "40cm x 25cm",
      material: "Lona com couro",
    },
  },
  {
    id: "11",
    name: "Brincos Prata com Pérola",
    description: "Brincos em prata 925 com pérolas cultivadas. Clássico e sofisticado.",
    price: 219,
    category: "joias",
    material: "prata",
    image: "/assets/generated_images/gold_earrings_product_shot.png",
    images: ["/assets/generated_images/gold_earrings_product_shot.png"],
    featured: false,
    inStock: false,
    specifications: {
      weight: "3.8g (par)",
      size: "8mm",
      material: "Prata 925",
      stone: "Pérola cultivada",
    },
  },
  {
    id: "12",
    name: "Bolsa Crossbody Prática",
    description: "Bolsa crossbody em couro com vários compartimentos. Funcional.",
    price: 199,
    category: "bolsas",
    material: "couro",
    image: "/assets/generated_images/gold_ring_product_shot.png",
    images: ["/assets/generated_images/gold_ring_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "320g",
      size: "22cm x 18cm",
      material: "Couro legítimo",
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
