# Lumière Joias - E-commerce de Joias e Semi Joias

## Overview
Página de vendas elegante para joias e semi joias com design luxuoso e sofisticado. O sistema permite visualizar produtos por categoria, adicionar ao carrinho e entrar em contato via WhatsApp ou formulário.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter

## Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── ProductFilters.tsx
│   │   ├── pages/        # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Collection.tsx
│   │   │   ├── Category.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── Contact.tsx
│   │   ├── App.tsx       # Main app with routing
│   │   └── index.css     # Global styles
├── server/               # Backend Express application
│   ├── routes.ts         # API endpoints
│   └── storage.ts        # In-memory data storage
├── shared/               # Shared types and schemas
│   └── schema.ts         # Data models and Zod schemas
└── attached_assets/      # Generated images
    └── generated_images/ # Product and hero images
```

## Features
- **Homepage**: Hero section, categories grid, featured products, testimonials
- **Collection Page**: Full product catalog with filters and sorting
- **Category Pages**: Products filtered by category (Anéis, Colares, Brincos, Pulseiras)
- **Product Detail**: Product gallery, specifications, add to cart
- **Shopping Cart**: Slide-out drawer with quantity controls
- **Contact**: Form and WhatsApp integration
- **WhatsApp**: Floating button for quick contact

## API Endpoints
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Get products by category
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/contact` - Submit contact form

## Design System
- **Fonts**: Cormorant Garamond (headings), Inter (body)
- **Colors**: Gold primary (#D4AF37), elegant neutrals
- **Style**: Luxury e-commerce inspired by Tiffany, Mejuri

## Running the Project
The application runs on port 5000 with `npm run dev`.
