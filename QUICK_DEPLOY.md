# 🎊 Wedding Website - Complete Deployment Guide

## Quick Start

### 1. Test Locally First

```bash
# Make scripts executable (if on Unix/Mac)
chmod +x *.sh

# Test locally with Docker
./test-local.sh
```

### 2. Deploy to VPS

```bash
# Upload files to VPS
./upload-to-vps.sh

# SSH to VPS and deploy
ssh root@103.199.17.168
cd /home/wedding-app
./deploy.sh
```

## Complete Step-by-Step Guide

### Prerequisites

- VPS with Ubuntu 20+ (IP: 103.199.17.168)
- Domain pointing to VPS (loihangwedding.io.vn)
- SSH access to VPS
- Docker installed locally (for testing)

### Step 1: Local Testing

```bash
# Clone/download wedding website
cd landing_wedding_version_1

# Test locally
./test-local.sh
# Visit http://localhost:3000 to verify
```

### Step 2: VPS Initial Setup

```bash
# Upload files to VPS
./upload-to-vps.sh

# SSH to VPS
ssh root@103.199.17.168

# Run initial setup
cd /home/wedding-app
./setup-vps.sh

# Reboot to apply all changes
sudo reboot
```

### Step 3: Configure SSL Certificate

```bash
# After VPS reboot, SSH again
ssh root@103.199.17.168

# Get SSL certificate (domain must point to your VPS)
sudo certbot certonly --standalone -d loihangwedding.io.vn -d www.loihangwedding.io.vn

# Verify certificate
sudo certbot certificates
```

### Step 4: Deploy Website

```bash
cd /home/wedding-app
./deploy.sh

# Check status
./monitor.sh
```

### Step 5: Verify Deployment

- Visit: https://loihangwedding.io.vn
- Check SSL certificate is working
- Test mobile responsiveness
- Verify all animations work

## File Structure

```
wedding-website/
├── 📱 Next.js App Files
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── next.config.js
│
├── 🐳 Docker Configuration
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── .dockerignore
│
├── 🚀 Deployment Scripts
│   ├── setup-vps.sh       # Initial VPS setup
│   ├── upload-to-vps.sh   # Upload files to VPS
│   ├── deploy.sh          # Deploy application
│   ├── test-local.sh      # Local testing
│   └── DEPLOYMENT.md      # Detailed deployment guide
│
└── 📚 Documentation
    ├── README.md
    └── DEPLOYMENT.md
```

## Management Commands

### On VPS (/home/wedding-app):

```bash
./deploy.sh      # Deploy/redeploy
./monitor.sh     # Check status
./backup.sh      # Create backup

# Docker commands
docker-compose ps              # Check containers
docker-compose logs -f         # Live logs
docker-compose restart         # Restart services
docker-compose down           # Stop all
docker-compose up -d          # Start all
```

### Local Development:

```bash
yarn dev         # Development server
yarn build       # Build for production
./test-local.sh  # Test with Docker locally
```

## Troubleshooting

### Common Issues:

1. **Domain not pointing to VPS**

   ```bash
   # Check DNS
   nslookup loihangwedding.io.vn
   # Should return 103.199.17.168
   ```

2. **SSL certificate issues**

   ```bash
   # Check certificate
   sudo certbot certificates
   # Renew if needed
   sudo certbot renew
   ```

3. **Website not accessible**

   ```bash
   # Check containers
   docker-compose ps
   # Check logs
   docker-compose logs
   # Check firewall
   sudo ufw status
   ```

4. **Performance issues**
   ```bash
   # Monitor resources
   ./monitor.sh
   # Clean up Docker
   docker system prune -f
   ```

## Security Features ✅

- SSL/TLS encryption (Let's Encrypt)
- HTTP to HTTPS redirect
- Security headers (HSTS, XSS protection)
- Rate limiting
- Firewall configuration
- Non-root container execution
- Regular backups

## Performance Optimizations ✅

- Static file caching
- Image optimization
- Gzip compression
- CDN-ready setup
- Efficient Docker layers

## Monitoring & Maintenance

### Daily Checks:

```bash
./monitor.sh     # Check status and resources
```

### Weekly Tasks:

```bash
./backup.sh      # Create backup
docker system prune -f  # Clean unused resources
```

### Monthly Tasks:

- Check SSL certificate renewal
- Update system packages
- Review logs for issues

## Support

If you encounter issues:

1. **Check logs**: `docker-compose logs`
2. **Verify DNS**: Domain points to 103.199.17.168
3. **Check firewall**: Ports 80, 443 are open
4. **SSL issues**: Certificate is valid and not expired
5. **Resources**: Sufficient RAM/CPU/disk space

## Environment Setup Checklist

- [ ] VPS running Ubuntu 20+
- [ ] Domain DNS pointing to VPS IP
- [ ] SSH access configured
- [ ] Docker installed on VPS
- [ ] SSL certificate obtained
- [ ] Website deployed and accessible
- [ ] Backup system configured
- [ ] Monitoring setup working

🎉 **Congratulations! Your wedding website is now live!**

Visit: https://loihangwedding.io.vn
