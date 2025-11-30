import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { storage } from "./storage";
import { insertCartItemSchema, insertContactSchema, registerSchema, loginSchema, insertOrderSchema } from "@shared/schema";
import crypto from "crypto";
// @ts-ignore - pdfkit types not available
import PDFDocument from "pdfkit";
import type { SessionData } from "express-session";

declare global {
  namespace Express {
    interface SessionData {
      customerId?: string;
    }
  }
}

// Function to generate welcome PDF as buffer
async function generateWelcomePDF(customerName: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header
    doc.fontSize(24).font("Helvetica-Bold").text("GLAM GEAR", { align: "center" });
    doc.fontSize(10).text("Joias, Semi-Joias e Acessórios Exclusivos", { align: "center" });
    doc.fontSize(9).text("Whatsapp: (33) 98706-2406", { align: "center" });
    doc.text("Instagram: @glamgear5", { align: "center" });
    
    doc.moveTo(50, doc.y + 5).lineTo(550, doc.y).stroke();
    doc.moveDown(2);

    // Title
    doc.fontSize(18).font("Helvetica-Bold").text("BEM-VINDO!", { align: "center" });
    doc.fontSize(14).text("à Glam Gear", { align: "center" });
    doc.moveDown(1);

    // Welcome message
    doc.fontSize(11).font("Helvetica");
    doc.text(`Olá ${customerName},`, { align: "center" });
    doc.moveDown(0.5);
    doc.text("Obrigado por se cadastrar na Glam Gear! 🎉", { align: "center" });
    doc.moveDown(1);

    // Content
    doc.fontSize(10).font("Helvetica-Bold").text("O QUE VOCÊ VAI ENCONTRAR:");
    doc.font("Helvetica").fontSize(9);
    doc.text("✨ Joias exclusivas em ouro, prata e pedras preciosas", { indent: 20 });
    doc.text("✨ Semi-joias com design sofisticado", { indent: 20 });
    doc.text("✨ Peças em aço inoxidável hipoalergênicas", { indent: 20 });
    doc.text("✨ Bijuterias trendy e acessíveis", { indent: 20 });
    doc.text("✨ Bolsas em couro legítimo", { indent: 20 });
    doc.moveDown(1);

    // Call to action
    doc.fontSize(11).font("Helvetica-Bold").text("PRÓXIMOS PASSOS:", { align: "center" });
    doc.font("Helvetica").fontSize(9);
    doc.moveDown(0.5);
    doc.text("1. Explore nossa coleção completa", { align: "center" });
    doc.text("2. Adicione seus produtos favoritos ao carrinho", { align: "center" });
    doc.text("3. Finalize sua compra com segurança", { align: "center" });
    doc.text("4. Receba suas peças com frete dos Correios", { align: "center" });
    doc.moveDown(2);

    // Contact
    doc.fontSize(10).font("Helvetica-Bold").text("ENTRE EM CONTATO:");
    doc.font("Helvetica").fontSize(9);
    doc.text("WhatsApp: (33) 98706-2406", { indent: 20 });
    doc.text("Instagram: @glamgear5", { indent: 20 });
    doc.moveDown(2);

    // Footer
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);
    doc.fontSize(9).text("Com carinho,", { align: "center" });
    doc.fontSize(11).font("Helvetica-Bold").text("GLAM GEAR", { align: "center" });
    doc.fontSize(8).font("Helvetica").text("Luxo acessível para você", { align: "center" });

    doc.end();
  });
}

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
        (req.session as any).customerId = customer.id;

        // Send welcome email with PDF
        try {
          const pdfBuffer = await generateWelcomePDF(parsed.data.name);
          const base64Pdf = pdfBuffer.toString("base64");

          const resendApiKey = process.env.RESEND_API_KEY;
          if (resendApiKey) {
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                from: "Glam Gear <noreply@glamgear.com.br>",
                to: parsed.data.email,
                subject: `Bem-vindo à Glam Gear, ${parsed.data.name}! 🎉`,
                html: `
                  <h1>Bem-vindo à Glam Gear!</h1>
                  <p>Olá ${parsed.data.name},</p>
                  <p>Obrigado por se cadastrar na Glam Gear! Você agora tem acesso a nossa coleção exclusiva de joias, semi-joias, aço inoxidável, bijuterias e bolsas.</p>
                  <p>Em anexo, você encontra um recibo de boas-vindas com mais informações sobre nossa loja.</p>
                  <p><strong>Entre em contato:</strong></p>
                  <p>WhatsApp: (33) 98706-2406<br>Instagram: @glamgear5</p>
                  <p>Com carinho,<br><strong>GLAM GEAR</strong></p>
                `,
                attachments: [
                  {
                    filename: "bem-vindo-glam-gear.pdf",
                    content: base64Pdf
                  }
                ]
              })
            });
          }
        } catch (emailError) {
          console.error("Error sending welcome email:", emailError);
          // Don't fail registration if email fails
        }

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

      (req.session as any).customerId = customer.id;
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
    if (!req.session || !(req.session as any).customerId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({ customerId: (req.session as any).customerId });
  });

  // Generate invoice PDF
  app.post("/api/orders/invoice", async (req, res) => {
    try {
      const { orderData } = req.body;
      if (!orderData) {
        return res.status(400).json({ message: "Order data is required" });
      }

      const doc = new PDFDocument({ margin: 50 });
      
      // Set response headers for PDF download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="invoice-${Date.now()}.pdf"`);
      
      // Pipe PDF to response
      doc.pipe(res);

      // Header
      doc.fontSize(24).font("Helvetica-Bold").text("GLAM GEAR", { align: "center" });
      doc.fontSize(10).text("Joias, Semi-Joias e Acessórios Exclusivos", { align: "center" });
      doc.fontSize(9).text("Whatsapp: (33) 98706-2406", { align: "center" });
      doc.text("Instagram: @glamgear5", { align: "center" });
      
      doc.moveTo(50, doc.y + 5).lineTo(550, doc.y).stroke();
      doc.moveDown(1);

      // Title
      doc.fontSize(16).font("Helvetica-Bold").text("RECIBO DE PEDIDO", { align: "center" });
      doc.moveDown(0.5);

      // Customer Info
      doc.fontSize(10).font("Helvetica-Bold").text("DADOS DO CLIENTE");
      doc.font("Helvetica").fontSize(9);
      doc.text(`Nome: ${orderData.name}`);
      doc.text(`Email: ${orderData.email}`);
      doc.text(`Telefone: ${orderData.phone}`);
      doc.text(`CPF: ${orderData.cpf}`);
      doc.moveDown(0.5);

      // Address Info
      doc.fontSize(10).font("Helvetica-Bold").text("ENDEREÇO DE ENTREGA");
      doc.font("Helvetica").fontSize(9);
      doc.text(`${orderData.address.street}, ${orderData.address.number}`);
      if (orderData.address.complement) {
        doc.text(orderData.address.complement);
      }
      doc.text(`${orderData.address.neighborhood}, ${orderData.address.city} - ${orderData.address.state}`);
      doc.text(`CEP: ${orderData.address.cep}`);
      doc.moveDown(0.5);

      // Products
      doc.fontSize(10).font("Helvetica-Bold").text("PRODUTOS PEDIDOS");
      doc.moveTo(50, doc.y + 3).lineTo(550, doc.y + 3).stroke();
      doc.moveDown(0.5);
      
      doc.font("Helvetica-Bold").fontSize(9);
      doc.text("Produto", 50, doc.y, { width: 280 });
      doc.text("Qtd", 330, doc.y - 12, { width: 50, align: "center" });
      doc.text("Valor Unit.", 380, doc.y - 12, { width: 80, align: "right" });
      doc.text("Total", 460, doc.y - 12, { width: 90, align: "right" });
      doc.moveDown(0.5);
      
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      doc.font("Helvetica").fontSize(8);
      orderData.items.forEach((item: any) => {
        const totalPrice = (item.product.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
        const unitPrice = item.product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
        
        doc.text(item.product.name, 50, doc.y, { width: 280 });
        doc.text(item.quantity.toString(), 330, doc.y - 12, { width: 50, align: "center" });
        doc.text(`R$ ${unitPrice}`, 380, doc.y - 12, { width: 80, align: "right" });
        doc.text(`R$ ${totalPrice}`, 460, doc.y - 12, { width: 90, align: "right" });
        doc.moveDown(1);
      });

      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.5);

      // Totals
      const subtotal = orderData.subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
      const freight = orderData.shippingValue.toFixed(2);
      const total = orderData.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

      doc.fontSize(10).font("Helvetica");
      doc.text(`Subtotal: R$ ${subtotal}`, 350);
      doc.text(`Frete (${orderData.shippingDays} dias): R$ ${freight}`, 350);
      
      doc.font("Helvetica-Bold").fontSize(12);
      doc.text(`TOTAL: R$ ${total}`, 350, doc.y + 5);

      doc.moveDown(2);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1);

      // Footer
      doc.fontSize(9).font("Helvetica").text("Obrigado por escolher Glam Gear!", { align: "center" });
      doc.text("Data: " + new Date().toLocaleDateString("pt-BR"), { align: "center" });
      doc.fontSize(8).text("Este é um recibo de pedido. A entrega será confirmada via WhatsApp.", { align: "center" });

      doc.end();
    } catch (error) {
      res.status(500).json({ message: "Error generating invoice" });
    }
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

      // Default origin CEP (Governador Valadares - Glam Gear)
      const originCep = "35052090";
      
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

  // Order checkout endpoint
  app.post("/api/orders/checkout", async (req, res) => {
    try {
      const customerId = (req.session as any)?.customerId;
      if (!customerId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { customerName, customerPhone, paymentMethod, notes } = req.body;
      
      if (!customerName || !customerPhone) {
        return res.status(400).json({ message: "Nome e telefone obrigatórios" });
      }

      // Get cart items and calculate total
      const cartItems = await storage.getCartItems();
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Carrinho vazio" });
      }

      // Calculate total
      let total = 0;
      cartItems.forEach(item => {
        if (item.product) {
          total += item.product.price * item.quantity;
        }
      });

      // Create order
      const order = await storage.createOrder({
        customerId,
        customerName,
        customerPhone,
        items: cartItems,
        total,
        paymentMethod: paymentMethod || "pendente",
        notes,
      });

      // Clear cart after successful order
      await storage.clearCart();

      // Generate WhatsApp message
      const itemList = cartItems
        .map(item => `${item.quantity}x ${item.product?.name || 'Produto'}`)
        .join(" | ");

      const whatsappMessage = `Olá! Pedido #${order.orderNumber}. Itens: ${itemList}. Total: R$ ${total.toFixed(2)}${notes ? `. Obs: ${notes}` : ''}.`;

      // Generate WhatsApp link (user will need to click to send)
      const whatsappPhone = "5531995030612"; // ReiBurguer WhatsApp
      const whatsappLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;

      res.status(201).json({
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
        whatsappLink,
        message: whatsappMessage,
      });
    } catch (error) {
      console.error("Checkout error:", error);
      res.status(500).json({ message: "Erro ao criar pedido" });
    }
  });

  // Get order by number
  app.get("/api/orders/:orderNumber", async (req, res) => {
    try {
      const order = await storage.getOrderByNumber(req.params.orderNumber);
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar pedido" });
    }
  });

  return httpServer;
}
