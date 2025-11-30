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
    name: "Sanduíche Artesanal",
    description: "Nosso sanduíche artesanal com queijo derretido. Simples, gostoso e feito com ingredientes frescos. Apenas dinheiro!",
    price: 14.99,
    category: "hamburguer",
    ingredient: "carne",
    image: "/assets/generated_images/classic_cheeseburger.png",
    images: ["/assets/generated_images/classic_cheeseburger.png"],
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
    name: "X-Tudo",
    description: "X-Tudo de batata palha com ham delicioso. Apenas R$9,99! Promoção imperdível.",
    price: 9.99,
    category: "hamburguer",
    ingredient: "bacon",
    image: "/assets/generated_images/bacon_premium_burger.png",
    images: ["/assets/generated_images/bacon_premium_burger.png"],
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
    description: "Pizza fresca com ham, tomate, pimentão, milho e muito sabor! Feita na hora.",
    price: 19.99,
    originalPrice: 24.00,
    category: "combos",
    ingredient: "carne",
    image: "/assets/generated_images/classic_burger_combo.png",
    images: ["/assets/generated_images/classic_burger_combo.png"],
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
    name: "X-Tudo Completo",
    description: "X-Tudo completo com maionese cremosa. Tudo isso por apenas R$10,00!",
    price: 10.00,
    category: "hamburguer",
    ingredient: "vegetariano",
    image: "/assets/generated_images/grilled_chicken_burger.png",
    images: ["/assets/generated_images/grilled_chicken_burger.png"],
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
    name: "Combo Hamburgueria",
    description: "Tudo por R$10,00! Burger com batata frita crocante. A melhor promoção da cidade!",
    price: 10.00,
    category: "combos",
    ingredient: "carne",
    image: "/assets/generated_images/large_french_fries.png",
    images: ["/assets/generated_images/large_french_fries.png"],
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
    description: "Açai cremoso com granulado e cobertura. Refrescante e delicioso por R$10,00!",
    price: 10.00,
    category: "sobremesas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/chocolate_sundae_ice_cream.png",
    images: ["/assets/generated_images/chocolate_sundae_ice_cream.png"],
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
    name: "Macarrão com Bacon",
    description: "Macarrão quentinho com bacon crocante. Apenas R$10,00! Muito saboroso.",
    price: 10.00,
    category: "acompanhamentos",
    ingredient: "bacon",
    image: "/assets/generated_images/crispy_onion_rings.png",
    images: ["/assets/generated_images/crispy_onion_rings.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "280g aprox",
      ingredients: "Macarrão, Bacon, Molho",
      allergen: "Glúten",
    },
  },
  {
    id: "8",
    name: "Refrigerante 2L",
    description: "Refrigerante geladinho em garrafa de 2L para acompanhar seu pedido!",
    price: 8.90,
    originalPrice: 10.00,
    category: "bebidas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/2l_soda_bottle.png",
    images: ["/assets/generated_images/2l_soda_bottle.png"],
    featured: true,
    inStock: true,
    specifications: {
      weight: "2000ml",
      ingredients: "Refrigerante",
      allergen: "Sem glúten",
    },
  },
  {
    id: "9",
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
    id: "10",
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
    id: "11",
    name: "Milk Shake de Morango",
    description: "Milk shake cremoso de morango com calda e cobertura. Refrescante!",
    price: 13.90,
    category: "bebidas",
    ingredient: "vegetariano",
    image: "/assets/generated_images/350ml_soda_can.png",
    images: ["/assets/generated_images/350ml_soda_can.png"],
    featured: false,
    inStock: true,
    specifications: {
      weight: "400ml",
      ingredients: "Leite, Morango, Calda",
      allergen: "Lácteos",
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
