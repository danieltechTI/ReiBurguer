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
    if (!req.session || !req.session.customerId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ customerId: req.session.customerId });
  });

  // Shipping calculation via Correios API
  app.post("/api/shipping/calculate", async (req, res) => {
    try {
      const { cep } = req.body;
      if (!cep || typeof cep !== "string") {
        return res.status(400).json({ message: "CEP is required" });
      }

      const apiKey = process.env.CORREIOS_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ message: "Shipping service not configured" });
      }

      const cleanCep = cep.replace(/\D/g, "");
      if (cleanCep.length !== 8) {
        return res.status(400).json({ message: "Invalid CEP format" });
      }

      // Default origin CEP (São Paulo - Glam Gear)
      const originCep = "01310100";
      
      // Default weight and dimensions for jewelry/accessories (in grams and cm)
      // Typical jewelry: 50-100g, small package
      const weight = 500; // 500g default
      const length = 15; // cm
      const width = 10; // cm
      const height = 5; // cm
      const diameter = 0;

      try {
        // Calling Correios API
        const correiosapiUrl = "https://api.correios.com.br/public/v2/shipping";
        
        const payload = {
          token: apiKey,
          plpReturn: false,
          mcu: "g",
          requestId: `glam-${Date.now()}`,
          shippingServices: [
            {
              serviceCode: "04162", // SEDEX Contrato
              itemValue: 0
            },
            {
              serviceCode: "02626", // PAC Contrato
              itemValue: 0
            }
          ],
          shipmentInfo: {
            originPostalCode: originCep,
            destinationPostalCode: cleanCep,
            weight: weight,
            itemCode: 2,
            receiverCountryCode: "BR",
            originCountryCode: "BR"
          }
        };

        const response = await fetch(correiosapiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          // Fallback to simplified calculation if API fails
          const state = cleanCep.substring(0, 2);
          const baseRates: Record<string, { sedex: number; pac: number; days: number }> = {
            "01": { sedex: 35, pac: 18, days: 5 }, // SP
            "20": { sedex: 45, pac: 22, days: 7 }, // RJ
            "30": { sedex: 40, pac: 20, days: 6 }, // MG
          };

          const rate = baseRates[state] || { sedex: 60, pac: 30, days: 10 };
          
          return res.json({
            shippingOptions: [
              { service: "SEDEX", value: rate.sedex, days: 2, serviceCode: "04162" },
              { service: "PAC", value: rate.pac, days: rate.days, serviceCode: "02626" }
            ]
          });
        }

        const data = await response.json();
        
        // Parse Correios response
        const shippingOptions = data.shippingServices?.map((service: any) => ({
          service: service.serviceCode === "04162" ? "SEDEX" : "PAC",
          value: parseFloat(service.value) || 0,
          days: service.deliveryTime || (service.serviceCode === "04162" ? 2 : 7),
          serviceCode: service.serviceCode
        })) || [];

        res.json({ shippingOptions });
      } catch (apiError) {
        // Fallback: return simple static rates
        const state = cleanCep.substring(0, 2);
        const baseRates: Record<string, { sedex: number; pac: number; days: number }> = {
          "01": { sedex: 35, pac: 18, days: 5 }, // SP
          "20": { sedex: 45, pac: 22, days: 7 }, // RJ
          "30": { sedex: 40, pac: 20, days: 6 }, // MG
        };

        const rate = baseRates[state] || { sedex: 60, pac: 30, days: 10 };
        
        res.json({
          shippingOptions: [
            { service: "SEDEX", value: rate.sedex, days: 2, serviceCode: "04162" },
            { service: "PAC", value: rate.pac, days: rate.days, serviceCode: "02626" }
          ]
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error calculating shipping" });
    }
  });

  return httpServer;
}
