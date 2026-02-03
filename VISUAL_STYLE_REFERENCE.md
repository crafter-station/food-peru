# Visual Style Reference - Fitia Design System

## 1. Core Aesthetic

**Style: Warm Minimalist Health-Tech**

A clean, approachable design that balances modern tech aesthetics with warmth and accessibility. The philosophy centers on making health tracking feel inviting rather than clinical.

**Key Influences:**
- Soft SaaS landing pages (linear gradients, generous whitespace)
- Modern fitness app design language
- Friendly fintech UI patterns (trust badges, social proof)

---

## 2. Color Palette

### Primary Colors

| Color Name | Hex Code | Usage Context |
|------------|----------|---------------|
| **Cream/Warm White** | `#FDF8F3` | Primary background, creates warmth |
| **Pure White** | `#FFFFFF` | Cards, input fields, clean sections |
| **Golden Yellow** | `#E5A93D` | Primary CTA buttons, accents |
| **Dark Charcoal** | `#1A1A1A` | Primary text, navigation |

### Secondary Colors

| Color Name | Hex Code | Usage Context |
|------------|----------|---------------|
| **Soft Yellow** | `#FEF3C7` | Feature card backgrounds (warm tint) |
| **Mint Green** | `#D1FAE5` | Feature card backgrounds (fresh tint) |
| **Lavender** | `#E9D5FF` | Feature card backgrounds (calm tint) |
| **Light Blue** | `#DBEAFE` | Feature card backgrounds (cool tint) |
| **Medium Gray** | `#6B7280` | Secondary text, descriptions |
| **Light Gray** | `#F3F4F6` | Borders, dividers |

### Accent Colors (Feature Cards)

| Color Name | Hex Code | Usage Context |
|------------|----------|---------------|
| **Olive/Sage** | `#84A98C` | Food label badges |
| **Warm Brown** | `#8B7355` | Food label badges |

**Total Color Count:** 12 colors (restrained palette with purpose)

---

## 3. Typography System

### Headline Style
- **Weight:** Bold to Semi-bold (700-600)
- **Family Type:** Sans-serif, likely Inter or similar geometric sans
- **Scale:** Large headlines (~36-48px), creating strong visual hierarchy
- **Characteristics:** 
  - Tight letter-spacing
  - Spanish language support with proper accents
  - Often spans 2 lines for impact

### Body/Secondary Text
- **Weight:** Regular (400) to Medium (500)
- **Size:** 16-18px for body, 14px for captions
- **Line Height:** Generous (~1.6-1.7)
- **Color:** Medium gray (`#6B7280`) for descriptions

### Hierarchy Structure
1. **Hero Headlines:** Bold, 36-48px, dark charcoal
2. **Section Headers:** Semi-bold, 28-32px, dark charcoal
3. **Card Titles:** Semi-bold, 18-20px, dark charcoal
4. **Body Text:** Regular, 16px, medium gray
5. **Captions/Labels:** Regular, 14px, medium gray

### Special Considerations
- Fully Spanish language content
- Numbers displayed prominently (10M+, 4.9, 4,000,000+)
- Emphasis on readability and accessibility

---

## 4. Key Design Elements

### Textures and Treatments
- **No harsh shadows** - Soft, subtle elevation
- **Rounded corners everywhere** - 8-16px radius on cards, full-round on buttons
- **Gradient backgrounds** - Subtle cream-to-white gradients
- **No borders** on cards - Relies on background color contrast

### Graphic Elements
- **Phone Mockups:** 3D-rendered iPhones as hero elements
- **Food Labels:** Floating annotation badges with food names and calories
- **Corner Brackets:** Decorative scanning frame corners in hero image
- **App Integration Logos:** Horizontal scrolling brand strip (Garmin, Oura, Whoop, etc.)
- **Emojis as Icons:** Strategic use of native emojis for features (stars, fire, arm, plate)

### Layout Structure
- **Max-width container:** ~1200px centered
- **Grid System:** 
  - 4-column for feature cards
  - 3-column for testimonials and larger features
  - 2-column for FAQ
- **Generous padding:** 24-48px between sections
- **Card-based design:** Information grouped in distinct cards

### Unique Stylistic Choices
- **Pastel gradient cards:** Each feature card has subtle tinted background
- **Social proof strip:** Horizontal scrolling app integration logos
- **Statistics display:** Large numbers with emoji icons above
- **Testimonials with flags:** Country flags next to reviewer names
- **Expandable FAQ:** Accordion-style with chevron icons

### Button Styles
| Type | Style |
|------|-------|
| **Primary CTA** | Golden yellow (`#E5A93D`), rounded-full, white text |
| **Secondary CTA** | Dark charcoal, rounded-full, white text |
| **Ghost Button** | Transparent with dark border, rounded-full |

---

## 5. Visual Concept

### Conceptual Bridge
The design bridges **clinical health tracking** with **everyday lifestyle** by:
- Using warm, food-adjacent colors (cream, golden yellow)
- Featuring real food photography vs. abstract graphics
- Employing friendly, rounded shapes vs. sharp medical aesthetics
- Including emojis to humanize data-driven features

### Relationship Between Elements
- **Photography + Data Labels:** Food images annotated with calorie information creates the core value proposition visualization
- **Warm Background + Tech Features:** Cream backgrounds soften the tech-forward functionality
- **Statistics + Emojis:** Raw numbers made approachable with visual icons
- **Testimonials + Flags:** Global reach made personal through individual stories

### Ideal Use Cases
This visual style is ideal for:
- Health and fitness applications
- Food tracking or meal planning services
- Wellness platforms targeting mainstream users
- Apps that need to feel approachable rather than clinical
- Spanish-speaking Latin American markets
- B2C subscription services with freemium models

---

## 6. Implementation Notes for Next.js/Tailwind

### Suggested CSS Variables
```css
:root {
  --background: #FDF8F3;
  --background-white: #FFFFFF;
  --foreground: #1A1A1A;
  --primary: #E5A93D;
  --primary-hover: #D4922E;
  --text-secondary: #6B7280;
  
  /* Feature card tints */
  --card-yellow: #FEF3C7;
  --card-green: #D1FAE5;
  --card-purple: #E9D5FF;
  --card-blue: #DBEAFE;
}
```

### Key Tailwind Classes to Use
- `rounded-full` for buttons
- `rounded-2xl` for cards
- `bg-[#FDF8F3]` for warm backgrounds
- `max-w-6xl mx-auto` for container
- `px-6 md:px-12 lg:px-24` for responsive padding
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` for feature grids

---

## 7. Component Patterns Identified

1. **Hero Section:** Phone mockup centered, headline below, stats badges
2. **Logo Strip:** Horizontal auto-scrolling brand logos
3. **Feature Grid:** 4-column cards with pastel backgrounds and phone screenshots
4. **Stats Section:** Emoji + large number + description vertical stack
5. **Feature Grid (Small):** 3x3 grid of icon + label cards
6. **Testimonial Carousel:** Horizontal cards with avatar, name, flag, rating, text
7. **FAQ Accordion:** Expandable questions with chevron indicators
8. **Mega Footer:** Multi-column link sections + country selector + social icons
