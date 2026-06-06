# MarxMind — Interactive Educational Experience
## Complete Redesign Specification

---

## 1. Concept & Vision

A premium interactive documentary-style web experience exploring Karl Marx's theory that **social existence determines social consciousness**. The site feels like a thoughtfully curated museum exhibit meets a Linear.app product page — intellectual, calm, and beautifully orchestrated. Users don't read slides; they journey through a narrative that reveals, step by step, how the material conditions of life shape how people think. The entire aesthetic channels Apple keynote polish, Figma presentation aesthetics, and the smooth interactivity of Linear.app.

---

## 2. Design Language

### Aesthetic Direction
**Reference**: Apple.com editorial layouts + Linear.app micro-interactions + A24 documentary title cards. Light, spacious, intelligent. The opposite of every dark-mode-cyberpunk trope.

### Color Palette
| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#2563EB` | CTAs, active states, primary text emphasis |
| Secondary | `#06B6D4` | Icons, secondary highlights, links |
| Accent | `#F59E0B` | Progress indicators, special callouts, timeline markers |
| Background | `#F8FAFC` | Page background |
| Surface | `#FFFFFF` | Cards, elevated elements |
| Text | `#0F172A` | Primary text (slate-900 equivalent) |
| Muted | `#64748B` | Secondary text, labels |
| Border | `#E2E8F0` | Card borders, dividers |
| Success | `#10B981` | Positive indicators |
| Danger | `#EF4444` | Errors only |

### Gradient System
- Primary gradient: `linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)` — used for section dividers, accent lines, active states
- Light gradient overlay: `linear-gradient(135deg, rgba(37,99,235,0.03) 0%, rgba(6,182,212,0.03) 100%)` — subtle background washes
- Surface hover: `linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(6,182,212,0.04) 100%)`

### Typography
- **Headings**: Inter (weight 800, tight tracking for large titles; weight 700 for section headers)
- **Body**: Inter (weight 400-500, generous line-height 1.7)
- **Display/Quotes**: Cormorant Garamond (italic for quotes, weight 600)
- **Label/Tag**: Inter (weight 600, uppercase, letter-spacing 0.1em, size 11px)
- **No Oswald** — heading font changed to Inter for modern feel

### Spatial System
- Base unit: 8px
- Section padding: 120px vertical (mobile: 80px)
- Content max-width: 1200px (prose max: 720px)
- Card padding: 32px (mobile: 24px)
- Gap between cards: 24px
- Border radius: 16px (cards), 12px (buttons), 8px (tags)

### Motion Philosophy
All animations via Framer Motion. Principles:
- **Entrance**: fade-in + translateY(24px→0), 600ms ease-out, staggered 100ms between siblings
- **Scroll-triggered**: use `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- **Hover**: scale(1.02) + shadow lift, 200ms spring
- **Transitions**: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo feel)
- **Counters**: AnimateNumber component for statistics
- **Parallax**: subtle Y-translate based on scroll position
- **NO**: bounce, elastic overshoot, aggressive scale, flash effects

### Visual Assets
- Icons: Lucide React (consistent stroke-width 1.5)
- Decorative: CSS gradient orbs, subtle dot grid backgrounds
- No emoji in production UI — use Lucide icons exclusively
- Section numbers: large typographic numerals (Inter 800, 120px) as background decoration

---

## 3. Layout & Structure

### Page Architecture
1. **Hero** — Full viewport, centered, light gradient background with floating particles
2. **Opening Question** — Large pull-quote interaction
3. **Marx Quote** — Full-width editorial moment
4. **Social Existence** — Three-pillar interactive cards
5. **Social Consciousness** — Two-column card layout
6. **Dialectical Flow** — Animated vertical timeline showing existence→consciousness
7. **Case Studies** — Expandable character cards (6 personas)
8. **Historical Timeline** — Four-era interactive timeline
9. **Real-World Examples** — Data cards with animated statistics
10. **Interactive Quiz** — Five-question quiz with animated results
11. **Final Reflection** — Immersive closing with animated pyramid diagram
12. **Footer** — Clean minimal footer

### Navigation
- Fixed top navbar: transparent → frosted glass on scroll
- Left-side section progress indicator (desktop only): subtle dot navigation
- Smooth scroll between sections

### Responsive Strategy
- Mobile-first breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
- Single column on mobile, expanding to 2-3 columns on larger screens
- Touch-friendly interactions (min 44px tap targets)

---

## 4. Features & Interactions

### Hero Section
- Small pill label: "Karl Marx's Theory"
- Large heading (Inter 800, 56-72px): "Do We Shape Our Thoughts, Or Does Society Shape Them For Us?"
- Subtitle in muted text (Inter 400, 18-20px)
- Subtle animated gradient background (blue→cyan, very light opacity)
- Floating dot particles (canvas, gentle drift upward)
- Scroll indicator with animated chevron

### Opening Question Section
- Large editorial text with a question that sparks curiosity
- Animated underline on key phrase

### Marx Quote
- Full-width centered layout
- Cormorant Garamond italic quote (40-56px)
- Attribution with a subtle card
- Gradient divider line below

### Social Existence (Three Pillars)
- Three cards in a row (stack on mobile)
- Each card: icon (Lucide), title, subtitle, hover reveal description
- Active card gets blue left border + subtle background
- Smooth transition between cards

### Social Consciousness
- Two cards: "Tâm lý xã hội" and "Hệ tư tưởng"
- Each with icon, title, tag, description
- Animated entrance from left/right

### Dialectical Flow (Animated Timeline)
- Vertical flow on mobile, horizontal on desktop
- 5 steps: Điều kiện sống → Hoàn cảnh kinh tế → Quan hệ xã hội → Cách suy nghĩ → Ý thức xã hội
- Animated connecting lines (draw SVG path on scroll)
- Each step reveals on scroll with stagger

### Case Studies (Character Cards)
- 6 persona cards in a grid (2 cols mobile, 3 cols desktop)
- Each card: avatar placeholder, name, role, income bracket
- Click to expand: reveals full consciousness breakdown
- Smooth height animation on expand/collapse

### Historical Timeline
- 4 eras: Chiến tranh (1945-75), Bao cấp (1975-86), Đổi mới (1986-2010), AI & MXH (2010-nay)
- Horizontal timeline with era cards
- Each era: title, years, conditions list, consciousness list, quote
- Click to highlight and expand

### Real-World Examples
- 5 example cards with icons and statistics
- Animated counter for numbers
- Hover to reveal full description

### Interactive Quiz
- 5 questions, one at a time
- Smooth card transitions between questions
- Progress bar at top
- Results: animated reveal with spectrum bar (materialist→spiritualist)
- Each result type with icon, title, analysis

### Final Reflection
- Large question: "How much of your thinking is truly yours?"
- Animated upward-flow diagram: Social Existence → Environment → Experiences → Consciousness
- Closing quote from Marx
- Credits

---

## 5. Component Inventory

### `<Navbar>`
- States: transparent (top), frosted glass (scrolled)
- Logo: simple star icon + "MarxMind" text in Inter 600
- Right side: section dots (desktop), hamburger menu (mobile)

### `<SectionLabel>`
- Small pill with icon, uppercase text
- Blue primary color
- Used as section headers throughout

### `<Card>`
- White surface, border, rounded-16
- Hover: subtle shadow lift + background tint
- States: default, hover, active (blue border)

### `<CharacterCard>`
- Expandable card with avatar circle
- Collapsed: name, role, income
- Expanded: full consciousness breakdown list

### `<TimelineEra>`
- Era card with year badge
- Two-column: conditions | consciousness
- Quote at bottom

### `<QuizCard>`
- Question text, 4 option buttons
- Selected state: blue fill
- Progress indicator

### `<ResultSpectrum>`
- Horizontal bar showing materialist-spiritualist spectrum
- Animated fill based on result
- Analysis text below

### `<FlowDiagram>`
- SVG-based vertical flow
- Animated path drawing
- Node cards at each step

### `<AnimatedCounter>`
- Counts from 0 to target number
- Eased animation over 2 seconds
- Used for statistics

### `<ParticleBackground>`
- Canvas-based floating dots
- Very subtle, light blue color
- Slow upward drift

---

## 6. Technical Approach

### Framework
- React 19 + Vite
- Tailwind CSS 3 (with custom theme extension)
- Framer Motion 12 for all animations
- Lucide React for icons

### Architecture
- Single-page app (App.jsx as main container)
- Components organized in `src/components/`
- Data in `src/data/` (characters, timeline, quiz, realworld)
- All sections as `<section>` tags within the main App
- Custom hooks for scroll position, intersection observer

### Key Implementation Notes
- `useRef` + `useCallback` for slider/drag interactions
- `requestAnimationFrame` for canvas particle system
- Intersection Observer via Framer Motion's `whileInView`
- CSS custom properties for dynamic theming
- All text content preserved from existing data files
- No breaking changes to data structures — content stays the same
