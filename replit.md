# Glam Gear - E-commerce de Acessórios e Bolsas

## Overview
Loja online elegante para venda de Joias, Semi-joias, Aço inoxidável, Bijuterias e Bolsas. Sistema completo de pedido onde o cliente monta seu carrinho e finaliza a compra via WhatsApp, escolhendo a forma de pagamento com a loja.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Authentication**: Express Session com senha SHA256

## Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Header.tsx (com botões de auth)
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── ProductFilters.tsx
│   │   ├── lib/
│   │   │   └── authContext.tsx (Context de autenticação)
│   │   ├── pages/        # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Collection.tsx
│   │   │   ├── Category.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Login.tsx (Novo)
│   │   │   ├── Register.tsx (Novo)
│   │   │   └── not-found.tsx
│   │   ├── App.tsx       # Main app com rotas auth
│   │   └── index.css     # Global styles
├── server/               # Backend Express application
│   ├── routes.ts         # API endpoints (com auth)
│   ├── storage.ts        # In-memory data storage
│   └── index.ts          # Express com session middleware
├── shared/               # Shared types and schemas
│   └── schema.ts         # Data models e Zod schemas
└── attached_assets/      # Generated images
    └── generated_images/ # Product images
```

## Features
- **Homepage**: Hero section, categorias em grid, produtos em destaque
- **Collection Page**: Catálogo completo com filtros e ordenação
- **Category Pages**: Produtos filtrados por categoria (Joias, Semi-joias, Aço inoxidável, Bijuterias, Bolsas)
- **Product Detail**: Galeria de imagens, especificações, adicionar ao carrinho
- **Shopping Cart**: Carrinho slide-out com controle de quantidade
- **Authentication**: ✅ Sistema de registro e login para clientes
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

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Detalhes do produto
- `GET /api/products/category/:category` - Produtos por categoria

### Carrinho
- `GET /api/cart` - Itens do carrinho
- `POST /api/cart` - Adicionar item ao carrinho
- `PATCH /api/cart/:id` - Atualizar quantidade
- `DELETE /api/cart/:id` - Remover item
- `DELETE /api/cart` - Limpar carrinho

### Contato
- `POST /api/contact` - Enviar mensagem de contato

### Autenticação (Novo)
- `POST /api/auth/register` - Registrar novo cliente
- `POST /api/auth/login` - Login de cliente
- `POST /api/auth/logout` - Logout de cliente
- `GET /api/auth/me` - Verificar se está autenticado

## Fluxo de Compra
1. Cliente se registra ou faz login
2. Navega pelos produtos e categorias
3. Adiciona itens ao carrinho
4. Abre o carrinho via ícone ou botão
5. Clica em "Finalizar via WhatsApp"
6. É direcionado para conversa com a loja no WhatsApp
7. Mensagem inclui: items, quantidades, valor total
8. Loja confirma o pedido e propõe formas de pagamento

## Autenticação (Novo)
- **Registro**: Página em `/registro` com formulário de criação de conta
- **Login**: Página em `/login` com formulário de autenticação
- **Header**: Botões "Entrar" e "Registrar" visíveis quando não autenticado
- **Header**: Nome do cliente e botão "Sair" quando autenticado
- **Session**: Mantém cliente logado por 7 dias
- **Segurança**: Senhas com hash SHA256

## Dados de Teste
Você pode se registrar com qualquer email e senha (mínimo 6 caracteres).

## Running the Project
A aplicação roda na porta 5000 com `npm run dev`.

## Recent Updates
- ✅ Sistema de autenticação completo (registro, login, logout)
- ✅ Pages de Login e Register
- ✅ Header com botões de autenticação
- ✅ AuthContext para gerenciar estado de autenticação
- ✅ Session management com express-session
- ✅ Armazenamento de customers em memória

## Próximos Passos (Sugestões)
- Integrar endereço e CEP no checkout
- Calcular frete
- Enviar email após pedido
- Histórico de pedidos para clientes
- Painel de admin
