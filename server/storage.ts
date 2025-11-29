import { randomUUID } from "crypto";
import type { Product, CartItem, ContactMessage, InsertCartItem, InsertContact } from "@shared/schema";

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
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Anel Solitário Diamante",
    description: "Anel solitário em ouro 18k com diamante central de 0.30ct. Design clássico e atemporal, perfeito para momentos especiais. Acabamento polido de alta qualidade.",
    price: 2890,
    originalPrice: 3200,
    category: "aneis",
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
    name: "Colar Pingente Gota",
    description: "Colar delicado em ouro 18k com pingente em formato de gota. Corrente veneziana de 45cm com extensor. Ideal para uso diário ou ocasiões especiais.",
    price: 1590,
    category: "colares",
    material: "ouro",
    image: "/assets/generated_images/gold_necklace_product_shot.png",
    images: ["/assets/generated_images/gold_necklace_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "2.8g",
      size: "45cm + 5cm extensor",
      material: "Ouro 18k",
    },
  },
  {
    id: "3",
    name: "Brincos Argola Clássica",
    description: "Brincos de argola em ouro 18k com acabamento polido. Tamanho médio, perfeito para o dia a dia. Sistema de trava seguro e confortável.",
    price: 1290,
    originalPrice: 1450,
    category: "brincos",
    material: "ouro",
    image: "/assets/generated_images/gold_earrings_product_shot.png",
    images: ["/assets/generated_images/gold_earrings_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "4.2g (par)",
      size: "25mm diâmetro",
      material: "Ouro 18k",
    },
  },
  {
    id: "4",
    name: "Pulseira Elos Delicados",
    description: "Pulseira em ouro 18k com elos delicados e acabamento acetinado. Design moderno e sofisticado. Fecho de segurança com extensor.",
    price: 1890,
    category: "pulseiras",
    material: "ouro",
    image: "/assets/generated_images/gold_bracelet_product_shot.png",
    images: ["/assets/generated_images/gold_bracelet_product_shot.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "5.1g",
      size: "18cm + 3cm extensor",
      material: "Ouro 18k",
    },
  },
  {
    id: "5",
    name: "Anel Prata Cristal",
    description: "Anel em prata 925 com cristal Swarovski central. Design contemporâneo com detalhes delicados. Perfeito para presentear.",
    price: 289,
    originalPrice: 350,
    category: "aneis",
    material: "prata",
    image: "/assets/generated_images/silver_ring_product_shot.png",
    images: ["/assets/generated_images/silver_ring_product_shot.png"],
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
    id: "6",
    name: "Colar Prata Lua",
    description: "Colar em prata 925 com pingente de lua em madrepérola. Corrente de 42cm com fecho lagosta. Design delicado e feminino.",
    price: 189,
    category: "colares",
    material: "prata",
    image: "/assets/generated_images/silver_necklace_product_shot.png",
    images: ["/assets/generated_images/silver_necklace_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "3.2g",
      size: "42cm",
      material: "Prata 925",
      stone: "Madrepérola",
    },
  },
  {
    id: "7",
    name: "Brincos Prata Gotas",
    description: "Brincos em prata 925 com design de gotas e zircônias. Elegantes e versáteis, perfeitos para qualquer ocasião.",
    price: 159,
    category: "brincos",
    material: "prata",
    image: "/assets/generated_images/silver_earrings_product_shot.png",
    images: ["/assets/generated_images/silver_earrings_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "2.5g (par)",
      size: "30mm comprimento",
      material: "Prata 925",
      stone: "Zircônia",
    },
  },
  {
    id: "8",
    name: "Anel Ouro Rosé Infinito",
    description: "Anel em ouro rosé 18k com símbolo do infinito cravejado de zircônias. Significado especial para quem você ama.",
    price: 1490,
    category: "aneis",
    material: "ouro-rose",
    image: "/assets/generated_images/gold_ring_product_shot.png",
    images: ["/assets/generated_images/gold_ring_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "2.8g",
      size: "14-19",
      material: "Ouro Rosé 18k",
      stone: "Zircônias",
    },
  },
  {
    id: "9",
    name: "Colar Coração Rubi",
    description: "Colar em ouro 18k com pingente de coração e rubi central. Romântico e elegante, perfeito para ocasiões especiais.",
    price: 3490,
    category: "colares",
    material: "pedras",
    image: "/assets/generated_images/gold_necklace_product_shot.png",
    images: ["/assets/generated_images/gold_necklace_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "4.5g",
      size: "45cm",
      material: "Ouro 18k",
      stone: "Rubi natural",
    },
  },
  {
    id: "10",
    name: "Pulseira Prata Estrelas",
    description: "Pulseira em prata 925 com pingentes de estrelas e lua. Design lúdico e charmoso para todas as idades.",
    price: 219,
    originalPrice: 280,
    category: "pulseiras",
    material: "prata",
    image: "/assets/generated_images/gold_bracelet_product_shot.png",
    images: ["/assets/generated_images/gold_bracelet_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "6.2g",
      size: "17cm + 4cm extensor",
      material: "Prata 925",
    },
  },
  {
    id: "11",
    name: "Brincos Ouro Pérolas",
    description: "Brincos em ouro 18k com pérolas cultivadas de água doce. Clássico e sofisticado, ideal para noivas.",
    price: 1890,
    category: "brincos",
    material: "ouro",
    image: "/assets/generated_images/gold_earrings_product_shot.png",
    images: ["/assets/generated_images/gold_earrings_product_shot.png"],
    featured: false,
    inStock: false,
    specifications: {
      weight: "3.8g (par)",
      size: "8mm pérola",
      material: "Ouro 18k",
      stone: "Pérola cultivada",
    },
  },
  {
    id: "12",
    name: "Anel Esmeralda Colombiana",
    description: "Anel em ouro 18k com esmeralda colombiana natural de 0.50ct. Peça única e exclusiva para colecionadores.",
    price: 4890,
    category: "aneis",
    material: "pedras",
    image: "/assets/generated_images/gold_ring_product_shot.png",
    images: ["/assets/generated_images/gold_ring_product_shot.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "4.2g",
      size: "15-18",
      material: "Ouro 18k",
      stone: "Esmeralda 0.50ct",
    },
  },
];

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.contactMessages = new Map();

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
}

export const storage = new MemStorage();
