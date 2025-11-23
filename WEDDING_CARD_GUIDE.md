# Wedding Invitation Card Animation - Complete Guide

## 🎉 Features

✨ **3D Flip Animation** - Smooth rotationY card opening effect using Framer Motion
🎊 **Confetti Celebration** - Beautiful pink confetti burst when card opens
🔊 **Sound Effect** - Optional gentle sound on card open
📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
💖 **Elegant Design** - Soft pastel colors, decorative borders, beautiful typography
⚡ **Touch-Friendly** - Optimized for touch interactions
🎨 **Customizable** - Easy to modify names, dates, images, and text

## 📦 Installation Complete

All required packages have been installed:

- ✅ `framer-motion` - For smooth 3D animations
- ✅ `canvas-confetti` - For celebration effects
- ✅ `@types/canvas-confetti` - TypeScript support

## 🎨 Component Usage

The component is already integrated into `SectionEnvelop.tsx`. You can customize it with props:

```tsx
<EnvelopeAnimation
  groomName="Loi"
  brideName="Hang"
  weddingDate="15.06.2026"
  invitationText="Chúng tôi trân trọng kính mời bạn đến dự lễ cưới của chúng tôi"
  heroImage="/images/invitation_card.webp"
  soundEffect="/audio/open-card.mp3"
/>
```

## 📝 Customization Options

### 1. Change Couple Names

```tsx
groomName = "Your Name";
brideName = "Partner Name";
```

### 2. Update Wedding Date

```tsx
weddingDate = "25.12.2026";
```

### 3. Modify Invitation Text

```tsx
invitationText = "Your custom invitation message here";
```

### 4. Replace Hero Image

Place your couple photo at:

```
/public/images/invitation_card.webp
```

**Recommended specs:**

- Format: PNG or JPG
- Dimensions: 800x600px or similar 4:3 ratio
- File size: Under 500KB for fast loading

### 5. Add Sound Effect

Place your audio file at:

```
/public/audio/open-card.mp3
```

See `/public/audio/AUDIO_INSTRUCTIONS.md` for detailed audio setup guide.

## 🎭 How It Works

### Initial State (Closed Card)

- Shows elegant front of card with couple names
- Decorative corner borders
- Pulsing "tap to open" hint
- Wedding date prominently displayed

### After Click/Tap

1. **3D Flip Animation** - Card rotates 90° (0.6s smooth transition)
2. **Confetti Burst** - Pink/rose colored confetti from both sides
3. **Sound Effect** - Gentle opening sound (if audio file present)
4. **Content Reveal** - Inside of card fades in with:
   - Hero image of couple
   - Names and wedding date
   - Invitation text
   - RSVP button
   - Venue details

## 🎨 Typography

The component uses the following fonts (already configured):

- **Couple Names** - `font-katty` (elegant script font)
- **Body Text** - `font-quicksand` (clean, readable sans-serif)
- **Dates** - `font-quicksand` (with bold weight)

## 🎨 Color Scheme

Default color palette (all customizable in Tailwind):

```css
Primary Pink: #e3607e
Light Pink: #FFB6C1, #FFC0CB, #FFE4E1
Background: from-pink-50 via-white to-pink-100
Borders: pink-200/50
Text: Gray-600 to Gray-700
```

## 📱 Responsive Design

The component automatically adapts to screen sizes:

- **Desktop** - Full 400px width, larger text
- **Tablet** - Scaled proportionally
- **Mobile** - Full width with padding, adjusted text sizes

## 🔧 Advanced Customization

### Change Animation Duration

In `EnvelopeAnimation.tsx`, modify:

```tsx
transition={{ duration: 0.6, ease: "easeInOut" }}
```

### Adjust Confetti Colors

Modify the colors array:

```tsx
colors: ["#FFB6C1", "#FFC0CB", "#FFE4E1", "#FF69B4", "#FFF0F5"];
```

### Disable Confetti

Comment out the confetti code in the `handleOpen` function.

### Disable Sound

Simply don't add the audio file, or set:

```tsx
soundEffect = "";
```

### Change Card Size

Adjust the max-width:

```tsx
className = "relative w-full max-w-[400px]"; // Change 400px to desired size
```

## 🎯 Animation Details

### 3D Perspective

```css
perspective: 1000px
transform-style: preserve-3d
```

### Rotation Animation

- **Closed → Open**: rotateY(0) → rotateY(-90) → rotateY(0)
- **Duration**: 0.6 seconds
- **Easing**: easeInOut

### Content Fade-in

- **Delay**: 0.2s (image), 0.4s (text)
- **Duration**: 0.8s
- **Effect**: Opacity 0 → 1, translateY

## 🐛 Troubleshooting

### Confetti Not Showing

- Check browser console for errors
- Ensure `canvas-confetti` is installed
- Try clearing browser cache

### Sound Not Playing

- Add audio file to `/public/audio/open-card.mp3`
- Check browser autoplay policies (user interaction required)
- Try different audio format (MP3 recommended)

### Images Not Loading

- Verify image path: `/public/images/invitation_card.webp`
- Check file permissions
- Ensure Next.js Image Optimization is working

### Animation Stuttering

- Reduce confetti particle count
- Optimize image sizes
- Check device performance

## 📚 File Structure

```
components/
  ├── EnvelopeAnimation.tsx     # Main card component
  └── SectionEnvelop.tsx        # Parent wrapper component

public/
  ├── images/
  │   └── invitation_card.webp   # Hero image
  ├── audio/
  │   ├── open-card.mp3         # Sound effect
  │   └── AUDIO_INSTRUCTIONS.md # Audio setup guide
  └── fonts/                    # Custom fonts (already configured)
```

## 🎨 Example Variations

### Minimal Version (No Confetti/Sound)

```tsx
<EnvelopeAnimation
  groomName="John"
  brideName="Jane"
  weddingDate="01.01.2027"
  invitationText="Join us for our special day"
  heroImage="/images/couple.webp"
/>
```

### Full Featured Version

```tsx
<EnvelopeAnimation
  groomName="Alexander"
  brideName="Victoria"
  weddingDate="15.08.2026"
  invitationText="We would be honored by your presence at our wedding celebration"
  heroImage="/images/engagement-photo.webp"
  soundEffect="/audio/elegant-chime.mp3"
/>
```

## 🚀 Next Steps

1. ✅ Component is installed and ready
2. 📸 Add your couple photo to `/public/images/invitation_card.webp`
3. 🎵 (Optional) Add sound effect to `/public/audio/open-card.mp3`
4. ✏️ Update names and dates in `SectionEnvelop.tsx`
5. 🎨 Customize colors/fonts if desired
6. 🧪 Test on different devices

## 💡 Tips

- **Use high-quality images** - They make a big difference
- **Keep text concise** - Less is more for elegance
- **Test on mobile** - Most guests will view on phones
- **Consider adding RSVP link** - Connect the button to your RSVP form
- **Optimize performance** - Compress images before upload

## 📞 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review Framer Motion docs: https://www.framer.com/motion/
3. Review canvas-confetti docs: https://github.com/catdad/canvas-confetti

---

**Enjoy your beautiful wedding invitation! 💍💕**
