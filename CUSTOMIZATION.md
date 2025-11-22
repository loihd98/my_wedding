# Customization Guide

This guide will help you personalize the wedding website with your own information.

## 🎯 Quick Customization Checklist

### 1. Basic Information

#### Update Couple Names (Multiple Files)

**File: `app/layout.tsx`**
```typescript
title: 'Your Names Wedding - A Love Story Begins',
description: 'Join us as we celebrate the union of [Your Name] and [Partner Name].',
```

**File: `components/Hero.tsx`**
```typescript
<h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
  YourName <span className="text-gold-300">&</span> PartnerName
</h1>
```

**File: `components/Footer.tsx`**
```typescript
<p className="font-script text-3xl mb-2 text-gold-300">YourName & PartnerName</p>
```

#### Update Wedding Date

**File: `components/Hero.tsx`**
```typescript
// Line 28: Update countdown date
const weddingDate = new Date('2026-06-15T14:00:00+07:00').getTime()

// Line 83: Update display date
<p className="text-xl md:text-2xl mb-8 font-light">June 15, 2026</p>
```

**File: `app/page.tsx`**
```typescript
// Line 27: Update JSON-LD schema
startDate: '2026-06-15T14:00:00+07:00',
endDate: '2026-06-15T22:00:00+07:00',
```

### 2. Event Details

**File: `components/EventDetails.tsx`**

Update the `events` array (starting around line 11):
```typescript
const events = [
  {
    title: 'Wedding Ceremony',
    time: '2:00 PM',
    date: 'June 15, 2026',
    location: 'Your Venue Name',
    address: 'Full Street Address, City, State ZIP',
    description: 'Your ceremony description',
    mapUrl: 'YOUR_GOOGLE_MAPS_EMBED_URL', // See below for how to get this
    icon: '💒',
  },
  // Add more events as needed
]
```

**Getting Google Maps Embed URL:**
1. Go to Google Maps
2. Search for your venue
3. Click "Share" button
4. Select "Embed a map" tab
5. Copy the URL from the iframe src attribute
6. Paste into `mapUrl` field

### 3. Love Story Timeline

**File: `components/Timeline.tsx`**

Update the `timelineEvents` array (starting around line 17):
```typescript
const timelineEvents: TimelineEvent[] = [
  {
    date: 'Spring 2018',
    title: 'First Meeting',
    description: 'Your story of how you met',
    icon: '☕',
  },
  // Add your own milestones
]
```

**Available Emoji Icons:**
- ☕ Coffee/First meeting
- 🌅 Sunset/Date
- ⛰️ Mountains/Travel
- 💍 Ring/Proposal
- 💒 Church/Wedding
- ❤️ Heart/Love
- 🎉 Celebration
- ✈️ Travel
- 🏠 Home
- 👶 Baby

### 4. Contact & Social Media

**File: `components/Footer.tsx`**

Update social media links (around line 20):
```typescript
<a href="https://instagram.com/yourhandle" target="_blank">
<a href="https://facebook.com/yourpage" target="_blank">
<a href="mailto:your.email@example.com">
```

**File: `app/layout.tsx`**

Update verification code (line 78):
```typescript
verification: {
  google: 'your-google-verification-code',
},
```

### 5. Colors & Styling

**File: `tailwind.config.ts`**

Customize your wedding color palette:
```typescript
colors: {
  primary: {
    50: '#fdf4f5',   // Lightest
    100: '#fce8eb',
    200: '#f9d5dc',
    300: '#f4b3c1',
    400: '#ed869d',
    500: '#e3607e',  // Main color - CHANGE THIS
    600: '#cf3d64',
    700: '#b02f51',
    800: '#932948',
    900: '#7d2642',  // Darkest
  },
}
```

**Popular Wedding Color Palettes:**

**Romantic Pink & Gold:**
```typescript
primary: { 500: '#e3607e' }
gold: { 400: '#facc15' }
```

**Classic Navy & Blush:**
```typescript
primary: { 500: '#1e3a8a' }
accent: { 500: '#fbbf24' }
```

**Elegant Purple:**
```typescript
primary: { 500: '#9333ea' }
gold: { 400: '#f59e0b' }
```

### 6. Wedding Photos

**Directory: `public/images/`**

Upload your images:
```
public/images/
├── hero-bg.jpg          (1920x1080, <300KB)
├── og-image.jpg         (1200x630, <200KB)
└── gallery/
    ├── 1.jpg            (1200x800, <150KB each)
    ├── 2.jpg
    └── ...
```

**File: `components/Gallery.tsx`**

Update the photos array (around line 19):
```typescript
const photos: Photo[] = [
  { src: '/images/gallery/1.jpg', width: 4, height: 3, alt: 'Engagement shoot at sunset' },
  { src: '/images/gallery/2.jpg', width: 3, height: 4, alt: 'Portrait of the couple' },
  // Add all your photos with descriptions
]
```

### 7. SEO & Metadata

**File: `app/layout.tsx`**

Update all metadata (starting line 23):
```typescript
export const metadata: Metadata = {
  title: 'Your Names Wedding',
  description: 'Your custom description',
  keywords: ['your names', 'wedding date', 'location', 'wedding invitation'],
  metadataBase: new URL('https://your-domain.com'),
  // ... update all fields
}
```

### 8. Domain & Environment

**File: `.env.local`** (create this file)
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**File: `nginx.conf`**

Replace all instances of `loihangwedding.io.vn` with your domain:
```nginx
server_name your-domain.com www.your-domain.com;
ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
```

**File: `deploy.sh`**

Update configuration (lines 13-15):
```bash
PROJECT_DIR="/var/www/your-project"
DOMAIN="your-domain.com"
EMAIL="your@email.com"
```

### 9. RSVP Configuration

The RSVP form currently logs to console. To connect to a backend:

**File: `components/RSVP.tsx`**

Update the `onSubmit` function (around line 58):
```typescript
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true)

  try {
    // Replace with your API endpoint
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Failed to submit')

    setIsSuccess(true)
    reset()
  } catch (error) {
    console.error('RSVP submission error:', error)
    // Add error handling UI
  } finally {
    setIsSubmitting(false)
  }
}
```

### 10. Analytics (Optional)

To add Google Analytics:

**File: `app/layout.tsx`**

Add to the `<head>` section:
```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

**File: `.env.local`**
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🎨 Design Customization

### Font Changes

**File: `app/layout.tsx`**

Currently uses:
- Playfair Display (serif)
- Dancing Script (script/handwriting)
- Geist (sans-serif)

To change fonts, import from Google Fonts:
```typescript
import { Your_Font_Name } from 'next/font/google'

const yourFont = Your_Font_Name({
  subsets: ['latin'],
  variable: '--font-your-font',
})
```

### Animation Adjustments

**File: `lib/animations.ts`**

Adjust animation speeds and easing:
```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }, // Adjust duration
}
```

### Layout Changes

All component files are in `components/` directory:
- `Hero.tsx` - Hero section with countdown
- `Timeline.tsx` - Love story timeline
- `EventDetails.tsx` - Wedding events and location
- `Gallery.tsx` - Photo gallery
- `RSVP.tsx` - RSVP form
- `Footer.tsx` - Footer with social links

Edit any component to customize layout and content.

## 📝 Content Writing Tips

### Hero Section
- Keep names prominent and easy to read
- Add a tagline if desired
- Make sure date is visible

### Timeline
- 4-6 milestones work best
- Keep descriptions concise (2-3 sentences)
- Use emojis that represent the moment

### Event Details
- Provide clear directions
- Include parking information if needed
- Mention dress code if applicable

### Gallery
- Mix of portrait and landscape photos
- Include engagement photos, candid shots
- Show your personality as a couple

## 🔧 Testing Your Changes

After making changes:

```bash
# Test locally
npm run dev

# Build and test production
npm run build
npm start

# Check for errors
npm run lint
```

## 📞 Need Help?

Common issues:
- **Build errors**: Check all file paths are correct
- **Images not showing**: Verify image paths and files exist
- **Animations not working**: Check JavaScript console for errors
- **Styling issues**: Clear browser cache, check Tailwind classes

For more help, refer to:
- Next.js documentation: https://nextjs.org/docs
- TailwindCSS docs: https://tailwindcss.com/docs
- README.md in this project

---

**Remember**: Always test your changes locally before deploying to production!
