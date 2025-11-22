# 🎯 Quick Customization Checklist

## Essential Steps (5 minutes)

### 1️⃣ Update Names and Date
Open: `components/SectionEnvelop.tsx`

```tsx
<EnvelopeAnimation
  groomName="Your Name"        // ← Change this
  brideName="Partner Name"      // ← Change this
  weddingDate="DD.MM.YYYY"      // ← Change this
/>
```

### 2️⃣ Add Your Couple Photo
- File location: `/public/images/invitation_card.png`
- Recommended size: 800x600px (4:3 ratio)
- Format: PNG or JPG
- Max file size: 500KB

### 3️⃣ Customize Invitation Text
```tsx
invitationText="Your custom invitation message"  // ← Change this
```

### 4️⃣ Optional: Add Sound Effect
- File location: `/public/audio/open-card.mp3`
- Duration: 0.5-2 seconds
- See: `/public/audio/AUDIO_INSTRUCTIONS.md`

## Current Default Values

```tsx
groomName: "Loi"
brideName: "Hang"
weddingDate: "15.06.2026"
invitationText: "Chúng tôi trân trọng kính mời bạn đến dự lễ cưới của chúng tôi"
heroImage: "/images/invitation_card.png"
soundEffect: "/audio/open-card.mp3"
```

## Quick Test

1. Start dev server: `npm run dev`
2. Open: http://localhost:3000
3. Click/tap the card to see animation
4. Check mobile view (responsive)

## Color Customization

Want different colors? Edit the component classes:

**Pink Theme (Current)**
- `from-pink-50 via-white to-pink-100` - Background
- `text-pink-600` - Names
- `border-pink-200` - Borders

**Blue Theme**
- `from-blue-50 via-white to-blue-100`
- `text-blue-600`
- `border-blue-200`

**Gold Theme**
- `from-amber-50 via-white to-amber-100`
- `text-amber-600`
- `border-amber-200`

## Font Options

Current fonts (all available):
- `font-katty` - Script (used for names)
- `font-quicksand` - Sans-serif (used for text)
- `font-belinda` - Alternative script
- `font-aquarelle` - Alternative script
- `font-signora` - Alternative script

Change font by replacing className:
```tsx
className="font-katty text-5xl"  // ← Change font-katty to any font above
```

## Animation Speed

Want faster/slower animation? In `EnvelopeAnimation.tsx`:

```tsx
// Find this line (around line 85):
transition={{ duration: 0.6, ease: "easeInOut" }}

// Change to:
duration: 0.4  // Faster
duration: 1.0  // Slower
```

## Disable Features

**No Confetti:**
Comment out confetti code in `handleOpen` function (lines 50-78)

**No Sound:**
Remove or comment the sound effect prop:
```tsx
// soundEffect="/audio/open-card.mp3"
```

**No Animation:**
Change transition duration to 0:
```tsx
transition={{ duration: 0 }}
```

## ✅ Deployment Ready

The component is production-ready and optimized for:
- ✅ Performance
- ✅ SEO
- ✅ Mobile devices
- ✅ Accessibility
- ✅ Modern browsers

---

**Need more help?** See `WEDDING_CARD_GUIDE.md` for detailed documentation.
