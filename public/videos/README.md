# Wedding Background Video

## Required Files

Place your wedding background video in this directory with the following names:

- `wedding-bg.mp4` - Main video file (recommended: H.264 codec)
- `wedding-bg.webm` - WebM version for better browser compatibility (optional)

## Video Recommendations

### Format & Codec
- **Format**: MP4 (H.264 codec) for best compatibility
- **WebM**: VP9 codec for modern browsers
- **Resolution**: 1920x1080 (Full HD) or 3840x2160 (4K)
- **Aspect Ratio**: 16:9

### Optimization Tips
1. **File Size**: Keep under 20MB for fast loading
2. **Duration**: 20-60 seconds loop works best
3. **Frame Rate**: 24-30 fps is sufficient
4. **Bitrate**: 3-5 Mbps for HD, 8-12 Mbps for 4K

### Compression Tools
- **HandBrake** (Free): https://handbrake.fr/
  - Preset: "Fast 1080p30" or "Production Standard"
  - Video Codec: H.264
  - Quality: RF 22-24

- **FFmpeg** (Command Line):
  ```bash
  # Convert to MP4
  ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -vf scale=1920:1080 -c:a aac -b:a 128k wedding-bg.mp4
  
  # Convert to WebM
  ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1920:1080 -c:a libopus wedding-bg.webm
  ```

- **Online Tools**:
  - CloudConvert: https://cloudconvert.com/
  - FreeConvert: https://www.freeconvert.com/video-compressor

### Content Suggestions
- Pre-wedding photoshoot footage
- Romantic scenic footage (beach, garden, sunset)
- Elegant motion graphics or particle effects
- Slow-motion clips of couple
- Drone footage of venue

## Current Setup

The video will:
- ✅ Autoplay on page load (muted by default)
- ✅ Loop continuously
- ✅ Have parallax scroll effect
- ✅ Include mute/unmute toggle button
- ✅ Fallback to static image if video doesn't load

## Fallback Image

If video is not available, the hero section will use:
- `public/images/hero-bg.jpg`

Make sure to have a high-quality backup image!

## Testing

After adding your video files, check:
1. Video loads and plays smoothly
2. Video doesn't cause lag on scroll
3. Mobile compatibility (videos may not autoplay on some mobile browsers)
4. File size is reasonable for web loading
