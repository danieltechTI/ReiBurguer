# Design Guidelines: Luxury Jewelry E-Commerce

## Design Approach
**Reference-Based:** Drawing inspiration from premium jewelry e-commerce leaders like Tiffany & Co, Mejuri, and Catbird. The design emphasizes elegance, sophistication, and product-first visual storytelling with generous whitespace and refined typography.

## Typography System

**Font Stack:**
- Primary: Cormorant Garamond (serif) - Headlines, product names
- Secondary: Inter (sans-serif) - Body text, UI elements

**Hierarchy:**
- Hero Headlines: text-5xl to text-7xl, font-light, tracking-tight
- Section Titles: text-3xl to text-4xl, font-light
- Product Names: text-xl to text-2xl, font-normal
- Product Prices: text-2xl, font-light, tracking-wide
- Body Copy: text-base to text-lg, leading-relaxed
- Labels/Meta: text-sm, uppercase, tracking-widest

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 24
- Component padding: p-6, p-8
- Section spacing: py-16, py-24
- Grid gaps: gap-6, gap-8, gap-12
- Container max-width: max-w-7xl

**Grid Structure:**
- Product Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Featured Collections: grid-cols-1 lg:grid-cols-2
- Category Navigation: grid-cols-2 md:grid-cols-4

## Component Library

**Navigation:**
- Fixed header with logo centered, minimal menu items, shopping cart icon
- Category pills/tabs with subtle borders
- Breadcrumb navigation for product pages

**Hero Section:**
- Full-width (not 100vh) hero with large product photography
- Overlay text with refined typography
- Single elegant CTA button with blur backdrop

**Product Cards:**
- Square aspect ratio images (1:1)
- Hover effect: subtle scale and overlay with quick view
- Product name, price, material badge
- Wishlist heart icon in top-right

**Product Gallery:**
- Primary large image with thumbnail strip below
- Lightbox zoom capability
- Image aspect ratio: 4:5 for portraits

**Filters & Sort:**
- Sidebar filters on desktop, drawer on mobile
- Checkbox groups for categories, price ranges, materials
- Pill-style active filter indicators

**Shopping Cart:**
- Slide-out drawer from right
- Line items with small thumbnails
- Quantity selectors, remove buttons
- Sticky checkout button at bottom

**Product Details:**
- Two-column layout: gallery left, details right
- Expandable accordion sections for specifications, care instructions
- Size/customization selectors
- Add to cart with quantity selector

**Testimonials/Trust:**
- Customer review cards with star ratings
- Quote style testimonials with customer photos
- Trust badges (secure payment, free shipping, returns)

**Footer:**
- Multi-column layout: about, categories, customer service, newsletter signup
- Social media icons
- Payment method icons
- WhatsApp contact button prominently displayed

## Images Strategy

**Hero Section:**
- Large, high-quality lifestyle image featuring jewelry worn by model
- Soft, natural lighting with subtle bokeh
- Portrait or landscape orientation, minimum 1920px width

**Product Photography:**
- White or soft neutral backgrounds for catalog views
- Lifestyle shots showing scale and wear
- Detail macro shots highlighting craftsmanship
- Consistent lighting and styling across all products

**Category Headers:**
- Medium-sized banner images for each category page
- Mixed lifestyle and flat lay compositions

**About/Brand Story:**
- Behind-the-scenes workshop images
- Founder/artisan portraits
- Material sourcing imagery

## Page Structure

**Homepage:**
1. Hero section with featured collection
2. Category navigation grid (Anéis, Colares, Brincos, Pulseiras)
3. Featured products carousel
4. Collections showcase (2-column split layout)
5. Brand story section with image
6. Customer testimonials
7. Newsletter signup with benefits
8. Rich footer

**Category Pages:**
- Category hero banner
- Filter sidebar + product grid
- Load more pagination
- Quick view modal functionality

**Product Pages:**
- Product gallery (left 60%, details right 40%)
- Related products section
- Recently viewed items

## Interactions

**Minimal Animations:**
- Smooth fade-in on scroll for sections
- Subtle hover scale (1.02) on product cards
- Drawer slide transitions for cart/filters
- Image crossfade in product gallery

**No Animations:**
- Avoid distracting parallax effects
- Skip scroll-triggered animations on product grids
- Maintain fast, instant page transitions

## Key Design Principles

1. **Product-First:** Photography drives the experience
2. **Generous Whitespace:** Let products breathe, avoid clutter
3. **Refined Typography:** Elegant serif for emotional connection
4. **Trust Signals:** Prominent WhatsApp contact, secure checkout badges
5. **Intuitive Navigation:** Clear categories, easy filtering
6. **Mobile-Optimized:** Touch-friendly, fast loading imagery