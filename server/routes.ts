import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { storage } from "./storage";
import { insertCartItemSchema, insertContactSchema, registerSchema, loginSchema } from "@shared/schema";
import crypto from "crypto";

declare global {
  namespace Express {
    interface Session {
      customerId?: string;
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/assets", express.static(path.resolve(process.cwd(), "attached_assets")));

  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  app.get("/api/cart", async (_req, res) => {
    try {
      const items = await storage.getCartItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const parsed = insertCartItemSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid cart item data" });
      }
      const item = await storage.addToCart(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof Error && error.message === "Product not found") {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(500).json({ message: "Error adding to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      const item = await storage.updateCartItem(req.params.id, quantity);
      if (!item) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error removing from cart" });
    }
  });

  app.delete("/api/cart", async (_req, res) => {
    try {
      await storage.clearCart();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          message: "Invalid contact data",
          errors: parsed.error.flatten().fieldErrors 
        });
      }
      const message = await storage.createContactMessage(parsed.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error sending message" });
    }
  });

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          message: "Invalid registration data",
          errors: parsed.error.flatten().fieldErrors 
        });
      }

      const passwordHash = crypto.createHash("sha256").update(parsed.data.password).digest("hex");
      
      try {
        const customer = await storage.createCustomer(parsed.data.email, passwordHash, parsed.data.name);
        req.session.customerId = customer.id;
        res.status(201).json({ id: customer.id, email: customer.email, name: customer.name });
      } catch (error) {
        if (error instanceof Error && error.message === "Email already registered") {
          return res.status(409).json({ message: "Email already registered" });
        }
        throw error;
      }
    } catch (error) {
      res.status(500).json({ message: "Error registering" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ 
          message: "Invalid login data",
          errors: parsed.error.flatten().fieldErrors 
        });
      }

      const customer = await storage.getCustomerByEmail(parsed.data.email);
      if (!customer) {
        return res.status(401).json({ message: "Email or password incorrect" });
      }

      const passwordHash = crypto.createHash("sha256").update(parsed.data.password).digest("hex");
      if (passwordHash !== customer.passwordHash) {
        return res.status(401).json({ message: "Email or password incorrect" });
      }

      req.session.customerId = customer.id;
      res.json({ id: customer.id, email: customer.email, name: customer.name });
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.session.customerId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ customerId: req.session.customerId });
  });

  return httpServer;
}
