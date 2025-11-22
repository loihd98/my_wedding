# Wedding Background Music

## Required Files

Place your wedding background music in this directory with the following names:

- `wedding-song.mp3` - Main audio file (recommended)
- `wedding-song.ogg` - OGG version for better browser compatibility (optional)

## Audio Recommendations

### Format & Codec
- **Format**: MP3 (MPEG-1 Audio Layer 3) for best compatibility
- **OGG**: Vorbis codec for modern browsers
- **Bitrate**: 128-192 kbps (good quality, reasonable file size)
- **Sample Rate**: 44.1 kHz

### Optimization Tips
1. **File Size**: Keep under 10MB
2. **Duration**: Full song or 3-5 minute loop
3. **Volume**: Normalize to -14 LUFS (standard music loudness)
4. **Fade**: Add fade-in/fade-out for smooth looping

### Compression Tools
- **Audacity** (Free): https://www.audacityteam.org/
  - Export as MP3 (192 kbps constant bitrate)
  - Effect > Normalize to -1.0 dB
  - Effect > Fade In / Fade Out

- **FFmpeg** (Command Line):
  ```bash
  # Convert to MP3
  ffmpeg -i input.wav -c:a libmp3lame -b:a 192k wedding-song.mp3
  
  # Convert to OGG
  ffmpeg -i input.wav -c:a libvorbis -q:a 6 wedding-song.ogg
  
  # Add fade in/out (10 seconds)
  ffmpeg -i input.mp3 -af "afade=t=in:st=0:d=10,afade=t=out:st=170:d=10" wedding-song.mp3
  ```

- **Online Tools**:
  - CloudConvert: https://cloudconvert.com/
  - Online Audio Converter: https://online-audio-converter.com/

### Song Suggestions
Choose romantic, instrumental, or soft vocal songs:
- Classical piano pieces (Debussy, Chopin, Yiruma)
- Acoustic guitar instrumentals
- String quartet arrangements
- Contemporary love songs
- Jazz standards
- Lo-fi romantic beats

### Popular Wedding Songs
- "A Thousand Years" - Christina Perri (instrumental)
- "All of Me" - John Legend (instrumental)
- "Perfect" - Ed Sheeran (instrumental)
- "River Flows in You" - Yiruma
- "Canon in D" - Pachelbel
- "Clair de Lune" - Debussy
- "Kiss the Rain" - Yiruma

## Copyright Notice

⚠️ **Important**: Ensure you have proper licensing for any music used on your website:

1. **Royalty-Free Music Sources**:
   - Epidemic Sound: https://www.epidemicsound.com/
   - Artlist: https://artlist.io/
   - AudioJungle: https://audiojungle.net/
   - Free Music Archive: https://freemusicarchive.org/
   - YouTube Audio Library: https://www.youtube.com/audiolibrary

2. **Creative Commons**:
   - Search on ccMixter: http://ccmixter.org/
   - Ensure you credit the artist if required

3. **Purchase License**:
   - For popular songs, purchase sync license
   - Contact the copyright holder for permission

## Current Setup

The audio player:
- ✅ Does NOT autoplay (user must click play button)
- ✅ Loops continuously when playing
- ✅ Has play/pause toggle button (top right corner)
- ✅ Elegant animated control button
- ✅ Works independently from video sound

## User Experience

The play button appears in the top-right corner with:
- 🎵 Play icon when paused
- ⏸️ Pause icon when playing
- Smooth fade-in animation
- Glass morphism design (frosted glass effect)

## Testing

After adding your audio files, check:
1. Audio plays when button is clicked
2. Audio loops smoothly without gaps
3. Volume is appropriate (not too loud)
4. Button states update correctly
5. Mobile compatibility (audio controls work on iOS/Android)
