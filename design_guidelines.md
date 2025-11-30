# Design Guidelines: ReiBurguer - Moderno e Minimalista

## Design Approach
**Moderno & Minimalista:** Design limpo, sem poluição visual. Foco em espaço em branco, tipografia clara, e funcionalidade. Inspiração em marcas de comida modernas como Shake Shack e Five Guys.

## Typography System

**Font Stack:**
- Primary: Poppins (sans-serif) - Clean, modern, all text
- Secondary: Playfair Display (serif) - Headlines only, sparingly

**Hierarchy:**
- Hero Headlines: text-4xl to text-5xl, font-light, normal tracking
- Section Titles: text-2xl to text-3xl, font-light
- Product Names: text-lg, font-medium
- Body Copy: text-base, leading-relaxed
- Labels/Meta: text-sm, normal weight

## Color System

**Primary:** Vibrant Red HSL(0 100% 52%) - Only for CTAs and key highlights
**Backgrounds:** Clean white/light gray - Minimal gradients
**Text:** Dark gray for body, lighter for secondary info
**Borders:** Subtle light gray - No colored borders

## Layout System

**Spacing:** Consistent 16px units
- Component padding: p-4, p-6
- Section spacing: py-12, py-16
- Grid gaps: gap-4, gap-6
- Container: max-w-6xl

**Grid Structure:**
- Product Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Category Navigation: grid-cols-2 md:grid-cols-5
- Featured: grid-cols-1 md:grid-cols-2

## Components

**Navigation:**
- Simple fixed header, no decorative elements
- Logo left, nav center, cart right
- Clean, no gradients

**Hero Section:**
- Full-width background image only
- Text centered with drop shadow for legibility
- Single clear CTA button

**Product Cards:**
- Simple card with image, name, price
- Subtle hover effect (lift only)
- No complex overlays

**Benefits Section:**
- 4-column grid with simple icons
- Clean white cards, no gradients

**Footer:**
- Multi-column layout
- Simple, organized information
- WhatsApp link prominent

## Animations

**Minimal & Purposeful:**
- Use smooth fade-in on page load only
- Hover: subtle lift (no scale)
- No infinite animations
- Remove vibrant-pulse, red-glow, bounce-in

**No Animations:**
- Avoid rotateIn, slideInLeft, animationDelay cascades
- Remove floating/bobbing elements

## Key Principles

1. **Less is More:** Remove visual noise, use whitespace
2. **Clarity:** Clear typography, organized layout
3. **Function:** Design serves usability, not decoration
4. **Red Accent:** Use red strategically, not everywhere
5. **Mobile-First:** Touch-friendly, fast loading
