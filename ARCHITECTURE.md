# Component Architecture

## 🏗️ Application Structure

```
┌─────────────────────────────────────────────────┐
│                   app/layout.tsx                │
│  (Root Layout - Metadata, Fonts, Global CSS)   │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│                  app/page.tsx                   │
│         (Main Page - Client Component)          │
│           Smooth Scroll Initialization          │
│              JSON-LD Schema Markup              │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
        ┌──────────┴──────────┐
        │  Component Sections  │
        └──────────┬──────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
    ▼              ▼              ▼
┌───────┐    ┌──────────┐   ┌──────────┐
│ Hero  │    │ Timeline │   │  Event   │
│       │    │          │   │ Details  │
└───────┘    └──────────┘   └──────────┘
    │              │              │
    ▼              ▼              ▼
┌───────┐    ┌──────────┐   ┌──────────┐
│Gallery│    │   RSVP   │   │  Footer  │
│       │    │          │   │          │
└───────┘    └──────────┘   └──────────┘
```

## 📦 Component Breakdown

### 1. Hero Component (`components/Hero.tsx`)
```
┌────────────────────────────────────────┐
│         Parallax Background            │
│         (GSAP ScrollTrigger)           │
│                                        │
│    ┌────────────────────────────┐     │
│    │   Animated Text Container  │     │
│    │   (Framer Motion)          │     │
│    │                            │     │
│    │   Wedding Title            │     │
│    │   Couple Names             │     │
│    │   Date                     │     │
│    │                            │     │
│    │   ┌──────────────────┐    │     │
│    │   │ Countdown Timer  │    │     │
│    │   │ Days Hrs Min Sec │    │     │
│    │   └──────────────────┘    │     │
│    │                            │     │
│    │   Scroll Indicator         │     │
│    └────────────────────────────┘     │
└────────────────────────────────────────┘
```

**Features:**
- Real-time countdown to wedding date
- Parallax scrolling background
- Staggered fade-in animations
- Responsive typography
- Floating scroll indicator

---

### 2. Timeline Component (`components/Timeline.tsx`)
```
┌────────────────────────────────────────┐
│         Section Title & Description     │
└────────────────────────────────────────┘
              │
              ▼
┌─────────────┬───┬─────────────┐
│  Content    │ ● │             │  Event 1
│   Card      │ │ │   Spacer    │
└─────────────┴─┬─┴─────────────┘
                │ Vertical Line
┌─────────────┬─┴─┬─────────────┐
│             │ ● │  Content    │  Event 2
│   Spacer    │ │ │    Card     │
└─────────────┴─┬─┴─────────────┘
                │
┌─────────────┬─┴─┬─────────────┐
│  Content    │ ● │             │  Event 3
│   Card      │ │ │   Spacer    │
└─────────────┴───┴─────────────┘
```

**Features:**
- Alternating left/right layout
- Vertical connecting line
- Icon badges for each event
- Staggered scroll animations
- Gradient cards with hover effects

---

### 3. Event Details Component (`components/EventDetails.tsx`)
```
┌────────────────────────────────────────┐
│         Section Title & Description     │
└────────────────────────────────────────┘
              │
       ┌──────┴──────┐
       ▼             ▼
┌─────────────┐ ┌─────────────┐
│ Event Card  │ │ Event Card  │
│ ┌─────────┐ │ │ ┌─────────┐ │
│ │Google   │ │ │ │Google   │ │
│ │  Map    │ │ │ │  Map    │ │
│ └─────────┘ │ │ └─────────┘ │
│             │ │             │
│ Title       │ │ Title       │
│ Date/Time   │ │ Date/Time   │
│ Location    │ │ Location    │
│ Address     │ │ Address     │
│             │ │             │
│ [Get        │ │ [Get        │
│  Directions]│ │  Directions]│
└─────────────┘ └─────────────┘
```

**Features:**
- Google Maps embed
- Hover effects on maps (color → grayscale)
- Icon badges
- Action buttons for directions
- Responsive grid layout

---

### 4. Gallery Component (`components/Gallery.tsx`)
```
┌────────────────────────────────────────┐
│         Section Title & Description     │
└────────────────────────────────────────┘
              │
              ▼
┌───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │  Masonry Grid
├───┼───┼───┼───┤
│ 5 │ 6 │ 7 │ 8 │  (Responsive)
├───┼───┼───┼───┤
│ 9 │...│...│...│
└───┴───┴───┴───┘
       │
       ▼ Click
┌────────────────────────────────────────┐
│          Lightbox Overlay              │
│  ◀  [  Full Size Image  ]  ▶          │
│             [Close]                     │
└────────────────────────────────────────┘
```

**Features:**
- Masonry grid layout
- Lazy loading images
- Hover zoom effects
- Full-screen lightbox
- Keyboard navigation
- Touch gestures on mobile

---

### 5. RSVP Component (`components/RSVP.tsx`)
```
┌────────────────────────────────────────┐
│         Section Title & Description     │
└────────────────────────────────────────┘
              │
              ▼
┌────────────────────────────────────────┐
│          Form Container                │
│                                        │
│  ┌──────────────┐  ┌──────────────┐  │
│  │ Name Field   │  │ Email Field  │  │
│  └──────────────┘  └──────────────┘  │
│                                        │
│  ┌──────────────┐  ┌──────────────┐  │
│  │○ Yes ○ No    │  │ # of Guests  │  │
│  └──────────────┘  └──────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │                                  │ │
│  │   Message Text Area              │ │
│  │                                  │ │
│  └──────────────────────────────────┘ │
│                                        │
│     [    Send RSVP Button    ]        │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  ✓ Success Message               │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

**Features:**
- Real-time validation (Zod schema)
- Error messages
- Success animation
- Loading state
- Radio buttons for attendance
- Responsive 2-column layout

---

### 6. Footer Component (`components/Footer.tsx`)
```
┌────────────────────────────────────────┐
│                                        │
│          Thank You Message             │
│                                        │
│    ┌───┐  ┌───┐  ┌───┐               │
│    │ IG│  │ FB│  │ ✉ │  Social Icons │
│    └───┘  └───┘  └───┘               │
│                                        │
│          ──────────                    │
│                                        │
│        Couple Names & Date             │
│                                        │
│     ────────────────────────           │
│                                        │
│       © Copyright Info                 │
│       Made with ❤                      │
│                                        │
└────────────────────────────────────────┘
```

**Features:**
- Social media links with hover effects
- Couple names display
- Copyright information
- Elegant dividers
- Dark gradient background

---

## 🎨 Animation Flow

### Page Load Sequence
```
1. Hero Section
   ↓ 0.3s delay
   Title fades in + slides up
   ↓ 0.6s delay
   Countdown scales in
   ↓ 1.2s delay
   Scroll indicator fades in

2. Timeline Section (on scroll)
   ↓ Trigger: top center+100
   Items stagger in (0.2s between each)
   Fade + slide up animation

3. Event Details (on scroll)
   ↓ Trigger: top center+200
   Cards stagger in (0.3s between each)
   Fade + slide up animation

4. Gallery (on scroll)
   ↓ Trigger: top center+100
   Items stagger in (0.1s between each)
   Fade + scale animation

5. RSVP (on scroll)
   ↓ Trigger: top center+200
   Form fades + slides up (1s duration)
```

### Scroll Animations
```
Hero Background
  ↓ Scroll down
  Parallax: moves 50% slower
  (GSAP ScrollTrigger)

Timeline Items
  ↓ Scroll into view
  Opacity: 0 → 1
  Y position: 50 → 0
  (GSAP + ScrollTrigger)

Event Cards
  ↓ Scroll into view
  Opacity: 0 → 1
  Y position: 60 → 0
  (GSAP + ScrollTrigger)

Gallery Items
  ↓ Scroll into view
  Opacity: 0 → 1
  Scale: 0.8 → 1
  (GSAP + ScrollTrigger)
```

---

## 🔄 Data Flow

### RSVP Form Submission
```
User Input
    ↓
React Hook Form
    ↓
Zod Validation
    ↓
  Valid?
    ├─ No → Show Error Messages
    │
    └─ Yes
        ↓
    Submit Handler
        ↓
    API Call (simulated)
        ↓
    Success State
        ↓
    Show Success Message
        ↓
    Reset Form
        ↓
    Hide Message (5s)
```

### Image Loading
```
Page Load
    ↓
Hero Image
    ├─ Priority Load (preload)
    └─ No lazy loading
        ↓
Other Images
    ├─ Lazy loading enabled
    ├─ Load on scroll into view
    └─ Next.js Image optimization
        ↓
    Format Selection
        ├─ AVIF (if supported)
        ├─ WebP (if supported)
        └─ JPEG (fallback)
```

---

## 🎯 Performance Optimizations

### Code Splitting
```
Main Bundle
├─ Layout (always loaded)
├─ Page component (always loaded)
└─ Components (loaded as needed)
    ├─ Hero (above fold)
    ├─ Timeline (lazy)
    ├─ EventDetails (lazy)
    ├─ Gallery (lazy)
    ├─ RSVP (lazy)
    └─ Footer (lazy)

External Libraries
├─ React/Next.js (core)
├─ Framer Motion (lazy)
├─ GSAP (lazy)
├─ Lenis (client-side only)
└─ Lightbox (lazy + on-demand)
```

### Asset Loading Strategy
```
Critical Path
├─ HTML
├─ CSS (inline critical)
├─ Hero background (preload)
└─ JavaScript (defer)

Non-Critical
├─ Gallery images (lazy)
├─ Map iframes (lazy)
├─ Social icons (lazy)
└─ Fonts (swap)
```

---

## 🔒 Security Layers

```
Client Request
    ↓
DNS Resolution
    ↓
Firewall (UFW)
    ├─ Allow: 80, 443, 22
    └─ Deny: Others
        ↓
Nginx Reverse Proxy
    ├─ Rate Limiting
    ├─ SSL/TLS Termination
    ├─ Security Headers
    └─ Static File Caching
        ↓
Next.js Middleware
    ├─ CSP Headers
    ├─ HSTS Headers
    ├─ X-Frame-Options
    └─ Input Sanitization
        ↓
Next.js Application
    ├─ Form Validation (Zod)
    ├─ XSS Prevention
    └─ CSRF Protection
        ↓
Response to Client
```

---

## 📱 Responsive Breakpoints

```
Mobile
320px - 639px
├─ Single column
├─ Stack components
├─ Touch-optimized
└─ Simplified navigation

Tablet
640px - 1023px
├─ 2-column grid
├─ Larger text
└─ Hover states

Desktop
1024px - 1279px
├─ Multi-column layouts
├─ Side-by-side content
└─ Full animations

Large Desktop
1280px+
├─ Max-width containers
├─ Enhanced spacing
└─ Full experience
```

---

## 🗂️ File Dependencies

```
app/page.tsx
├─ components/Hero.tsx
│  ├─ framer-motion
│  ├─ gsap
│  └─ react hooks
├─ components/Timeline.tsx
│  ├─ framer-motion
│  ├─ gsap
│  └─ react hooks
├─ components/EventDetails.tsx
│  ├─ framer-motion
│  └─ gsap
├─ components/Gallery.tsx
│  ├─ framer-motion
│  ├─ gsap
│  └─ yet-another-react-lightbox
├─ components/RSVP.tsx
│  ├─ react-hook-form
│  ├─ zod
│  ├─ @hookform/resolvers
│  └─ framer-motion
└─ components/Footer.tsx
   └─ react

lib/animations.ts
├─ lenis
└─ Used by: app/page.tsx

lib/utils.ts
└─ Used by: components/RSVP.tsx

middleware.ts
└─ Applied to: All routes
```

---

This architecture ensures:
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Optimized performance
- ✅ Easy maintenance
- ✅ Scalable structure
