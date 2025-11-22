# Wedding Fonts Guide

All custom fonts are now loaded and ready to use in your components!

## Available Fonts

### 1. **Aquarelle** (Decorative Script)
Elegant hand-painted style font.

```tsx
<h1 className="font-aquarelle text-4xl">Beautiful Wedding</h1>
```

### 2. **Belinda Avenue** (Elegant Script)
Sophisticated cursive font perfect for invitations.

```tsx
<h2 className="font-belinda text-3xl">Save the Date</h2>
```

### 3. **Katty Diona** (Modern Script)
Contemporary handwritten style.

```tsx
<p className="font-katty text-2xl">You're Invited</p>
```

### 4. **Madam Ghea** (Luxury Script)
Premium elegant script font.

```tsx
<h1 className="font-madam-ghea text-5xl">Loi & Hang</h1>
```

### 5. **Mallong** (Playful Script)
Fun and romantic handwritten font.

```tsx
<h3 className="font-mallong text-3xl">Join Us</h3>
```

### 6. **Playfair Display** (Serif)
Classic elegant serif font (local version).

```tsx
<h2 className="font-serif text-4xl">Our Love Story</h2>
```

### 7. **Quicksand** (Rounded Sans)
Modern, friendly sans-serif font.

```tsx
<p className="font-quicksand text-lg">Event Details</p>
```

### 8. **Showcase Sans** (Display Sans)
Bold display font for headlines.

```tsx
<h1 className="font-showcase text-6xl">WEDDING</h1>
```

### 9. **Signora** (Script)
Elegant calligraphy-style font.

```tsx
<h2 className="font-signora text-4xl">Celebrate With Us</h2>
```

### 10. **Inter** (Default Sans)
Clean modern sans-serif (from Google Fonts).

```tsx
<p className="font-sans text-base">Body text content</p>
```

## Font Pairings for Wedding Websites

### Classic Elegant
```tsx
<h1 className="font-madam-ghea text-6xl">Loi & Hang</h1>
<p className="font-serif text-xl">June 15, 2026</p>
<p className="font-sans text-base">You are cordially invited...</p>
```

### Modern Romantic
```tsx
<h1 className="font-belinda text-5xl">Save the Date</h1>
<h2 className="font-quicksand text-2xl">Wedding Celebration</h2>
<p className="font-sans text-base">Join us for our special day</p>
```

### Playful & Fun
```tsx
<h1 className="font-mallong text-6xl">Let's Celebrate!</h1>
<h2 className="font-katty text-3xl">Our Wedding Day</h2>
<p className="font-quicksand text-lg">Details inside</p>
```

### Luxury Premium
```tsx
<h1 className="font-signora text-7xl">The Wedding of</h1>
<h2 className="font-serif text-4xl">Loi & Hang</h2>
<p className="font-quicksand text-base">You're invited to celebrate</p>
```

## Usage Examples in Components

### Hero Section
```tsx
export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-madam-ghea text-7xl text-primary-500 mb-4">
          Loi & Hang
        </h1>
        <p className="font-serif text-2xl text-gray-700 mb-2">
          Are Getting Married
        </p>
        <p className="font-quicksand text-xl text-gray-600">
          June 15, 2026
        </p>
      </div>
    </section>
  )
}
```

### Timeline Section
```tsx
<div className="timeline-item">
  <h3 className="font-belinda text-3xl text-primary-500 mb-2">
    First Meeting
  </h3>
  <p className="font-sans text-base text-gray-600">
    We met at a coffee shop in downtown...
  </p>
</div>
```

### RSVP Section
```tsx
<section className="py-20">
  <h2 className="font-signora text-5xl text-center mb-4">
    Will You Join Us?
  </h2>
  <p className="font-quicksand text-xl text-center mb-8">
    Please respond by May 1, 2026
  </p>
  {/* Form content */}
</section>
```

## Font Weights & Styles

All fonts are loaded with weight 400 (regular). If you need bold or other weights, you can use Tailwind's font-weight utilities:

```tsx
<h1 className="font-madam-ghea font-bold">Bold Title</h1>
<p className="font-quicksand font-light">Light text</p>
<span className="font-sans font-semibold">Semibold</span>
```

## Text Size Guidelines

### Headlines (font-script, font-belinda, font-madam-ghea, font-signora)
- Mobile: `text-4xl` to `text-5xl`
- Desktop: `text-6xl` to `text-8xl`

### Subheadings (font-serif, font-katty, font-mallong)
- Mobile: `text-2xl` to `text-3xl`
- Desktop: `text-3xl` to `text-5xl`

### Body Text (font-sans, font-quicksand)
- Mobile: `text-base` to `text-lg`
- Desktop: `text-lg` to `text-xl`

### Small Text (font-sans, font-quicksand)
- Mobile: `text-sm`
- Desktop: `text-sm` to `text-base`

## Browser Support

All fonts are provided in both WOFF2 (modern browsers) and WOFF (older browsers) formats for maximum compatibility:
- ✅ Chrome 36+
- ✅ Firefox 39+
- ✅ Safari 10+
- ✅ Edge 14+
- ✅ Opera 23+

## Performance Tips

1. **Use sparingly**: Limit script fonts to headlines only
2. **Preload important fonts**: Add to `<head>` if needed
3. **Fallbacks**: Always specified in Tailwind config
4. **Font display**: Set to 'swap' for faster initial render

## Updating Components

To change fonts in existing components, simply update the className:

**Before:**
```tsx
<h1 className="font-script text-5xl">Wedding Title</h1>
```

**After:**
```tsx
<h1 className="font-madam-ghea text-5xl">Wedding Title</h1>
```

## Testing Fonts

View all fonts on your development site:
```bash
yarn dev
```

Then open http://localhost:3000 and check:
- Hero section (main titles)
- Timeline section (dates and events)
- Event details (locations)
- RSVP form (headings)

All fonts are now loaded and ready to use! 🎨✨
