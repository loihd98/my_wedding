# 💒 Loi & Hang Wedding Website

A modern, production-ready wedding landing page built with Next.js 14, featuring smooth animations, top-tier SEO, and enterprise-grade security.

## 🎯 Features

- ✨ **Modern Animations**: Framer Motion, GSAP with ScrollTrigger, Lenis smooth scroll
- 🎨 **Elegant Design**: Korean-style luxury wedding aesthetics
- 🔍 **SEO Optimized**: 90+ Lighthouse score, JSON-LD schema, sitemap
- 🔒 **Enterprise Security**: CSP, HSTS, security headers
- 📱 **Fully Responsive**: Mobile-first design
- 🚀 **Performance**: Next.js 14 App Router, image optimization
- 🐳 **Docker Ready**: Multi-stage build, production deployment
- 🌐 **SSL Configured**: Nginx reverse proxy with Let's Encrypt

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion, GSAP, Lenis
- **Forms**: React Hook Form + Zod validation
- **Gallery**: Yet Another React Lightbox
- **Deployment**: Docker + Nginx + Certbot

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose (for deployment)

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
loihangwedding/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # SEO sitemap
│   └── robots.ts           # Robots.txt config
├── components/
│   ├── Hero.tsx            # Hero section with countdown
│   ├── Timeline.tsx        # Love story timeline
│   ├── EventDetails.tsx    # Wedding event details
│   ├── Gallery.tsx         # Photo gallery with lightbox
│   ├── RSVP.tsx            # RSVP form with validation
│   └── Footer.tsx          # Footer with social links
├── lib/
│   ├── animations.ts       # Animation utilities
│   └── utils.ts            # Helper functions
├── public/
│   └── images/             # Image assets
├── middleware.ts           # Security headers
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose config
├── nginx.conf              # Nginx reverse proxy config
└── package.json
```

## 🎨 Customization Guide

### 1. **Update Wedding Details**

Edit `/app/page.tsx`:
```typescript
// Update JSON-LD schema with your details
startDate: '2026-06-15T14:00:00+07:00',  // Your wedding date
location: {
  name: 'Your Venue Name',
  address: {
    streetAddress: 'Your Address',
    addressLocality: 'Your City',
  }
}
```

Edit `/components/Hero.tsx`:
```typescript
// Update couple names and date
<h1>Your Name <span>&</span> Partner Name</h1>
<p>Your Wedding Date</p>

// Update countdown date
const weddingDate = new Date('2026-06-15T14:00:00+07:00')
```

### 2. **Add Wedding Photos**

Place your images in `/public/images/`:
```
public/
  images/
    hero-bg.jpg          # Hero background (1920x1080 recommended)
    og-image.jpg         # Social media preview (1200x630)
    gallery/
      1.jpg              # Gallery photos
      2.jpg
      ...
```

Update `/components/Gallery.tsx`:
```typescript
const photos: Photo[] = [
  { src: '/images/gallery/1.jpg', width: 4, height: 3, alt: 'Your photo description' },
  // Add more photos
]
```

### 3. **Update Love Story Timeline**

Edit `/components/Timeline.tsx`:
```typescript
const timelineEvents: TimelineEvent[] = [
  {
    date: 'Your Date',
    title: 'Your Event Title',
    description: 'Your event description',
    icon: '🎉', // Choose an emoji
  },
  // Add your story milestones
]
```

### 4. **Update Event Details**

Edit `/components/EventDetails.tsx`:
```typescript
const events = [
  {
    title: 'Wedding Ceremony',
    time: 'Your Time',
    date: 'Your Date',
    location: 'Your Venue',
    address: 'Full Address',
    description: 'Your description',
    mapUrl: 'Your Google Maps embed URL', // Get from Google Maps > Share > Embed
  }
]
```

### 5. **Update SEO Metadata**

Edit `/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your Names Wedding',
  description: 'Your wedding description',
  metadataBase: new URL('https://your-domain.com'),
  // Update other metadata fields
}
```

### 6. **Configure Environment Variables**

Create `.env.local`:
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
# Add Google Analytics ID if needed
NEXT_PUBLIC_GA_ID=your-ga-id
```

### 7. **Update Social Links**

Edit `/components/Footer.tsx`:
```typescript
<a href="https://instagram.com/yourhandle">Instagram</a>
<a href="https://facebook.com/yourpage">Facebook</a>
<a href="mailto:your@email.com">Email</a>
```

### 8. **Customize Colors**

Edit `/tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Your wedding color palette
    500: '#your-color',
  }
}
```

## 🐳 Docker Deployment

### Build and Run Locally

```bash
# Build Docker image
docker-compose build

# Run container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down
```

## 🌐 VPS Deployment Guide

### Server Requirements
- Ubuntu 22.04 LTS
- 2GB RAM minimum
- Docker & Docker Compose installed
- Domain pointing to server IP

### Step 1: Server Setup

```bash
# SSH into your VPS
ssh root@180.93.138.93

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Install Nginx
apt install nginx -y

# Install Certbot
apt install certbot python3-certbot-nginx -y
```

### Step 2: Configure Firewall

```bash
# Enable UFW firewall
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
ufw status
```

### Step 3: Deploy Application

```bash
# Create project directory
mkdir -p /var/www/loihangwedding
cd /var/www/loihangwedding

# Clone or upload your project files
# (Use git clone, scp, or FTP to upload files)

# Build and run with Docker
docker-compose up -d --build

# Verify container is running
docker ps
docker-compose logs
```

### Step 4: Configure Nginx

```bash
# Copy nginx config
cp nginx.conf /etc/nginx/sites-available/loihangwedding.io.vn

# Create symbolic link
ln -s /etc/nginx/sites-available/loihangwedding.io.vn /etc/nginx/sites-enabled/

# Remove default config
rm /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Reload nginx
systemctl reload nginx
```

### Step 5: Setup SSL Certificate

```bash
# Create certbot directory
mkdir -p /var/www/certbot

# Obtain SSL certificate
certbot certonly --webroot \
  -w /var/www/certbot \
  -d loihangwedding.io.vn \
  -d www.loihangwedding.io.vn \
  --email your@email.com \
  --agree-tos \
  --no-eff-email

# Test auto-renewal
certbot renew --dry-run

# Setup auto-renewal cron job
crontab -e
# Add this line:
0 0 * * * certbot renew --quiet && systemctl reload nginx
```

### Step 6: Update Nginx with SSL

```bash
# Edit nginx config to uncomment SSL lines
nano /etc/nginx/sites-available/loihangwedding.io.vn

# Test configuration
nginx -t

# Reload nginx
systemctl reload nginx
```

### Step 7: Verify Deployment

Visit your website:
- `http://loihangwedding.io.vn` (should redirect to HTTPS)
- `https://loihangwedding.io.vn` (secure site)

### Step 8: Monitoring & Maintenance

```bash
# View application logs
docker-compose logs -f

# View nginx logs
tail -f /var/log/nginx/loihangwedding_access.log
tail -f /var/log/nginx/loihangwedding_error.log

# Restart services
docker-compose restart
systemctl restart nginx

# Update application
cd /var/www/loihangwedding
git pull  # or upload new files
docker-compose down
docker-compose up -d --build
```

## 🔧 Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Nginx errors
```bash
# Test configuration
nginx -t

# Check error logs
tail -f /var/log/nginx/error.log

# Restart nginx
systemctl restart nginx
```

### SSL certificate issues
```bash
# Check certificate status
certbot certificates

# Force renewal
certbot renew --force-renewal

# Check certificate files
ls -la /etc/letsencrypt/live/loihangwedding.io.vn/
```

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
```

## 📊 Performance Optimization

### Image Optimization
- Use AVIF/WebP formats
- Compress images before upload
- Recommended sizes:
  - Hero: 1920x1080 (~200KB)
  - Gallery: 1200x800 (~150KB)
  - Thumbnails: 600x400 (~50KB)

### Caching Strategy
- Static assets: 1 year cache
- Images: 1 year cache
- HTML/API: No cache or short cache

### Monitoring
- Use Lighthouse for performance testing
- Monitor with Google Analytics
- Setup uptime monitoring (UptimeRobot)

## 🔒 Security Best Practices

- ✅ HTTPS only (HTTP redirects to HTTPS)
- ✅ Security headers configured
- ✅ CSP policy implemented
- ✅ Rate limiting on forms
- ✅ Input validation and sanitization
- ✅ Regular security updates

## 📄 License

© 2025 Loi & Hang Wedding. All rights reserved.

## 💝 Support

For issues or questions, contact: loihang@example.com

---

**Made with ❤️ for a special day**
