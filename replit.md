# Glam Gear - E-commerce de Acessórios e Bolsas

## Overview
Loja online elegante para venda de Joias, Semi-joias, Aço inoxidável, Bijuterias e Bolsas. Sistema completo de pedido onde o cliente monta seu carrinho e finaliza a compra via WhatsApp, escolhendo a forma de pagamento com a loja.

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
    └── generated_images/ # Product images
```

## Features
- **Homepage**: Hero section, categorias em grid, produtos em destaque
- **Collection Page**: Catálogo completo com filtros e ordenação
- **Category Pages**: Produtos filtrados por categoria (Joias, Semi-joias, Aço inoxidável, Bijuterias, Bolsas)
- **Product Detail**: Galeria de imagens, especificações, adicionar ao carrinho
- **Shopping Cart**: Carrinho slide-out com controle de quantidade
- **WhatsApp Checkout**: Finalizar compra via WhatsApp com pedido, valor final e opções de pagamento
- **Contact**: Formulário de contato para atendimento
- **WhatsApp**: Botão flutuante para contato rápido

## Categorias de Produtos
1. **Joias** - Peças em ouro, prata e pedras preciosas
2. **Semi-joias** - Acessórios banhados e cristais
3. **Aço Inoxidável** - Peças resistentes e hipoalergênicas
4. **Bijuterias** - Acessórios fashion acessíveis
5. **Bolsas** - Bolsas em couro e tecido

## API Endpoints
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Detalhes do produto
- `GET /api/products/category/:category` - Produtos por categoria
- `GET /api/cart` - Itens do carrinho
- `POST /api/cart` - Adicionar item ao carrinho
- `PATCH /api/cart/:id` - Atualizar quantidade
- `DELETE /api/cart/:id` - Remover item
- `POST /api/contact` - Enviar mensagem de contato

## Fluxo de Compra
1. Cliente navega pelos produtos e categorias
2. Adiciona itens ao carrinho
3. Abre o carrinho via ícone ou botão
4. Clica em "Finalizar via WhatsApp"
5. É direcionado para conversa com a loja no WhatsApp
6. Mensagem inclui: items, quantidades, valor total
7. Loja confirma o pedido e propõe formas de pagamento

## Running the Project
A aplicação roda na porta 5000 com `npm run dev`.
