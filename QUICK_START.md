# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Visit: `http://localhost:3000`

---

## 📝 Before You Deploy

### 1. Add Your Photos
Place images in `public/images/`:
- `hero-bg.jpg` - Hero background (1920x1080)
- `og-image.jpg` - Social preview (1200x630)
- `gallery/` folder - Gallery photos (1200x800)

### 2. Update Your Info
Edit these files:
- `components/Hero.tsx` - Names and date
- `components/EventDetails.tsx` - Venue and location
- `components/Timeline.tsx` - Your love story
- `app/layout.tsx` - SEO metadata

### 3. Test Everything
```bash
# Build for production
npm run build

# Test production build
npm start

# Run linter
npm run lint
```

---

## 🐳 Deploy with Docker

### Local Testing
```bash
docker-compose up -d
```
Visit: `http://localhost:3000`

### Production Deployment
1. Upload files to VPS: `/var/www/loihangwedding`
2. Update domain in `nginx.conf` and `deploy.sh`
3. Run deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 📚 Documentation

- **README.md** - Complete documentation
- **CUSTOMIZATION.md** - How to customize
- **DEPLOYMENT.md** - Deployment checklist
- **PROJECT_SUMMARY.md** - All features

---

## 🆘 Quick Troubleshooting

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Styling not working?**
```bash
# Rebuild Tailwind
npm run dev
```

---

## 🎯 Customization Checklist

- [ ] Update couple names
- [ ] Update wedding date
- [ ] Update event location
- [ ] Update timeline story
- [ ] Add wedding photos
- [ ] Update social links
- [ ] Update domain name
- [ ] Update colors (optional)
- [ ] Test on mobile
- [ ] Test all forms

---

## 📞 Need Help?

Check these files:
1. `CUSTOMIZATION.md` - Detailed customization guide
2. `DEPLOYMENT.md` - Deployment steps
3. `README.md` - Full documentation

---

**Happy wedding planning! 💒✨**
