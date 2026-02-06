# Visual Style Reference - Pachamesa Design System

## 1. Core Aesthetic

**Style: Warm Earth-Tone Health-Tech**

A clean, approachable design that balances modern tech aesthetics with warmth rooted in Peruvian identity. The philosophy centers on making meal planning feel inviting, practical, and culturally authentic rather than clinical.

**Key Influences:**
- Earth-toned SaaS landing pages (natural gradients, generous whitespace)
- Modern food-tech app design language
- Friendly fintech UI patterns (trust badges, savings data, social proof)
- Peruvian cultural elements (Pachamama, ceramics, textiles)

---

## 2. Color Palette

### Primary Colors

| Color Name | Hex Code | Usage Context |
|------------|----------|---------------|
| **Cream/Warm White** | `#FDF8F3` | Primary background, creates warmth |
| **Pure White** | `#FFFFFF` | Cards, input fields, clean sections |
| **Forest Green** | `#2D6A4F` | Primary CTA buttons, health/nutrition accents |
| **Deep Green** | `#1B4332` | Primary hover state, emphasis |
| **Mint Green Light** | `#D8F3DC` | Primary light backgrounds, feature cards |
| **Dark Charcoal** | `#2D2A26` | Primary text, navigation |

### Secondary Colors (Terracotta)

| Color Name | Hex Code | Usage Context |
|------------|----------|---------------|
| **Terracotta** | `#C1694F` | Economic elements, savings badges, cost highlights |
| **Terracotta Dark** | `#A85842` | Secondary hover state |
| **Terracotta Light** | `#F7E5DD` | Secondary light backgrounds, recipe badges |
| **Medium Gray** | `#6B6B6B` | Secondary text, descriptions |
| **Light Gray** | `#E8DDD4` | Borders, dividers |

### Accent Colors (Feature Cards)

| Color Name | Hex Code | Usage Context |
|------------|----------|---------------|
| **Soft Yellow** | `#FEF9E7` | Feature card backgrounds (time/quick) |
| **Mint Green** | `#D8F3DC` | Feature card backgrounds (nutrition/health) |
| **Lavender** | `#F3E5F5` | Feature card backgrounds (variety) |
| **Light Blue** | `#E3F2FD` | Feature card backgrounds (technology) |
| **Warm Orange** | `#FFF3E0` | Feature card backgrounds (search) |
| **Terracotta Tint** | `#F7E5DD` | Feature card backgrounds (budget) |

### Semantic Colors

| Color Name | Hex Code | Usage Context |
|------------|----------|---------------|
| **Success Green** | `#40916C` | Positive indicators, health status |

**Color Usage Strategy:**
- **Green (Primary):** CTAs, badges de salud/nutricion, stats positivos, nav links
- **Terracotta (Secondary):** Elementos economicos (costos, ahorro), highlights culturales, prices
- **Cream:** Fondos para legibilidad y calidez
- **White:** Cards y contenedores

---

## 3. Typography System

### Headline Style
- **Weight:** Bold to Semi-bold (700-600)
- **Family:** Geist Sans (geometric sans-serif)
- **Scale:** Large headlines (~36-48px), creating strong visual hierarchy
- **Characteristics:**
  - Tight letter-spacing and tracking
  - Spanish language support with proper accents
  - Often spans 2 lines for impact

### Body/Secondary Text
- **Weight:** Regular (400) to Medium (500)
- **Size:** 16-18px for body, 14px for captions
- **Line Height:** Generous (~1.6-1.7)
- **Color:** Medium gray (`#6B6B6B`) for descriptions

### Hierarchy Structure
1. **Hero Headlines:** Bold, 36-60px, dark charcoal, key word in green
2. **Section Headers:** Semi-bold, 28-32px, dark charcoal
3. **Card Titles:** Semi-bold, 18-20px, dark charcoal
4. **Body Text:** Regular, 16px, medium gray
5. **Captions/Labels:** Regular, 14px, medium gray
6. **Stat Numbers:** Bold, 36px, green (institutional) or terracotta (economic)

---

## 4. Key Design Elements

### Textures and Treatments
- **No harsh shadows** - Soft, subtle elevation
- **Rounded corners everywhere** - 8-16px radius on cards, full-round on buttons
- **Gradient backgrounds** - Subtle earth-tone gradients (green to terracotta)
- **Ring borders** on elevated cards - `ring-1 ring-card-border` for depth
- **Backdrop blur** on header - `backdrop-blur-md` for floating feel

### Graphic Elements
- **App Preview Mockup:** Rounded card with meal plan cards inside (hero)
- **CENAN Badges:** Terracotta rounded badges on recipe images
- **Savings Indicators:** TrendingDown icon + green pill badges on pain points
- **Trust Badges:** White/10 rounded pills on dark background
- **Stat Cards:** Highlighted with `ring-1 ring-secondary/30` for economic stats

### Layout Structure
- **Max-width container:** ~1200px centered (`max-w-6xl`)
- **Grid System:**
  - 4-column for feature cards and recipe preview
  - 3-column for testimonials, pain points, and trust stats
  - 2-column for how-it-works (mobile), 4-column (desktop)
  - Single column for FAQ and pricing
- **Generous padding:** 20px sections (`py-20`)
- **Card-based design:** Information grouped in distinct bordered cards

### Button Styles
| Type | Style |
|------|-------|
| **Primary CTA** | Forest green (`#2D6A4F`), rounded-full, white text, shadow |
| **Secondary CTA** | White/card bg, rounded-full, border, dark text |
| **Ghost Link** | Green text, no background, arrow icon |
| **Final CTA** | White bg, rounded-full, green text (inverted on green bg) |

---

## 5. Visual Concept

### Conceptual Bridge
The design bridges **scientific nutrition** with **everyday Peruvian life** by:
- Using earth tones that evoke Pachamama (nature, land, roots)
- Terracotta accents that reference Peruvian ceramics and warmth
- Green primary that connects health, nature, and fresh ingredients
- Emphasizing practical savings data alongside nutritional value

### Brand Personality
- **Practica > Aspiracional** - Show real savings, real time saved
- **Eficiente > Perfeccionista** - Quick solutions, not perfect plans
- **Accesible > Exclusiva** - Free, local ingredients, familiar recipes
- **Respaldada cientificamente > Experimental** - CENAN/INS backing

### Photography Style (for future images)
- **Style:** Realistic homestyle, warm natural lighting
- **Props:** Traditional Peruvian ceramics, wooden utensils, textile accents
- **Portions:** Generous family-sized (not minimalist gourmet)
- **Angle:** 3/4 top-down or cenital
- **Format:** 4:3 horizontal or 1:1 square, min 600x600px

### Priority Dishes for Photography
1. Aji de gallina (cremoso, amarillo)
2. Quinua atamalada (granos dorados, rustico)
3. Ceviche de pescado (fresco, colorido)
4. Ensalada de pallares (verde, saludable)
5. Seco de res (abundante, familiar)
6. Causa limena (capas coloridas)

---

## 6. Implementation Notes for Next.js/Tailwind v4

### CSS Variables (globals.css)
```css
:root {
  --background: #FDF8F3;
  --foreground: #2D2A26;
  --primary: #2D6A4F;
  --primary-hover: #1B4332;
  --primary-light: #D8F3DC;
  --secondary: #C1694F;
  --secondary-hover: #A85842;
  --secondary-light: #F7E5DD;
  --success: #40916C;
  --card: #FFFFFF;
  --card-border: #E8DDD4;
}
```

### Key Tailwind Classes
- `rounded-full` for buttons and badges
- `rounded-2xl` for cards
- `rounded-3xl` for hero preview and pricing card
- `max-w-6xl mx-auto` for container
- `ring-1 ring-card-border` for elevated cards
- `shadow-lg shadow-primary/30` for CTA button depth

---

## 7. Component Patterns

1. **Hero Section:** Split layout - copy left, app preview right
2. **Pain Points Grid:** 3x2 cards with icon + title + description + savings badge
3. **How It Works:** 4-step numbered cards with connector lines
4. **Feature Grid:** 4x2 pastel cards alternating green/blue/terracotta/yellow
5. **Trust Section:** Dark bg, 3x2 stat grid (3 institutional + 3 economic highlighted)
6. **Recipe Preview:** 4-column cards with image placeholder + CENAN badge overlay
7. **Testimonials:** 3-column cards with savings-focused highlight badges
8. **Pricing:** Centered card with green checkmarks
9. **FAQ Accordion:** Expandable details with Plus icon rotation
10. **Final CTA:** Green gradient bg, white inverted button
11. **Footer:** 4-column grid with brand, product, resources, legal
