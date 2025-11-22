# Wedding Website Images

Place your wedding images in this directory following the structure below:

## Required Images

### Hero Section
- `hero-bg.jpg` - Main hero background image
  - Recommended size: 1920x1080px
  - Format: JPEG/WebP/AVIF
  - Max size: 300KB (compressed)

### Open Graph / Social Media
- `og-image.jpg` - Social media preview image
  - Recommended size: 1200x630px
  - Format: JPEG
  - Max size: 200KB

### Gallery Photos
Create a `gallery/` subdirectory and add your photos:
- `gallery/1.jpg`
- `gallery/2.jpg`
- `gallery/3.jpg`
- etc.

**Gallery image recommendations:**
- Size: 1200x800px or similar aspect ratios
- Format: JPEG/WebP
- Max size per image: 150KB (compressed)

## Image Optimization Tips

1. **Use Online Tools:**
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)

2. **Convert to Modern Formats:**
   - Use WebP or AVIF for better compression
   - Next.js will automatically serve optimal formats

3. **Responsive Images:**
   - Next.js Image component handles responsive images automatically
   - Provide high-quality originals, Next.js optimizes on-demand

4. **Lazy Loading:**
   - All images except hero use lazy loading automatically
   - This improves initial page load time

## Directory Structure

```
images/
├── hero-bg.jpg          # Hero background (1920x1080)
├── og-image.jpg         # Social preview (1200x630)
└── gallery/
    ├── 1.jpg           # Gallery images (1200x800)
    ├── 2.jpg
    ├── 3.jpg
    ├── 4.jpg
    ├── 5.jpg
    └── ...
```

## Quick Commands

```bash
# Batch resize images (requires ImageMagick)
mogrify -resize 1200x800 -quality 85 gallery/*.jpg

# Convert to WebP
for i in *.jpg; do cwebp -q 80 "$i" -o "${i%.jpg}.webp"; done

# Optimize JPEGs
jpegoptim --max=85 --strip-all *.jpg
```

## Notes

- Keep original high-resolution images as backups
- Test image loading on slow connections
- Monitor Core Web Vitals (LCP should be < 2.5s)
- Consider using a CDN for better performance
