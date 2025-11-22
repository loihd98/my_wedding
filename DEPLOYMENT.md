# Wedding Website Deployment

## Server Information

- **Domain**: loihangwedding.io.vn
- **IP**: 103.199.17.168
- **OS**: Ubuntu 20+
- **Stack**: Next.js + Docker + Nginx + Let's Encrypt SSL

## Quick Deployment Guide

### 1. Initial VPS Setup

Connect to your VPS:

```bash
ssh root@103.199.17.168
```

Run the setup script:

```bash
# Download and run setup script
curl -fsSL https://raw.githubusercontent.com/loihd98/my_wedding/main/setup-vps.sh -o setup-vps.sh
chmod +x setup-vps.sh
./setup-vps.sh
```

### 2. Upload Wedding Website Files

Upload your wedding website files to the VPS:

```bash
# From your local machine
scp -r /path/to/wedding-files/* root@103.199.17.168:/home/$USER/wedding-app/

# Or use git
ssh root@103.199.17.168
cd /home/$USER/wedding-app
git clone https://github.com/loihd98/my_wedding.git .
```

### 3. Configure SSL Certificate

```bash
# On the VPS
sudo certbot certonly --standalone -d loihangwedding.io.vn -d www.loihangwedding.io.vn

# Verify SSL certificate
sudo certbot certificates
```

### 4. Deploy the Website

```bash
cd /home/$USER/wedding-app
./deploy.sh
```

## File Structure

```
wedding-app/
├── Dockerfile              # Next.js app container
├── docker-compose.yml      # Services orchestration
├── nginx.conf              # Nginx configuration
├── setup-vps.sh           # VPS initial setup
├── deploy.sh              # Deployment script
├── backup.sh              # Backup script
├── monitor.sh             # Monitoring script
└── [Next.js app files]    # Your wedding website
```

## Management Commands

### Deployment

```bash
./deploy.sh                 # Deploy/redeploy website
```

### Monitoring

```bash
./monitor.sh               # Check status and resources
docker-compose logs -f     # View live logs
docker-compose ps          # Check container status
```

### Backup

```bash
./backup.sh                # Create backup
```

### Maintenance

```bash
docker-compose restart     # Restart services
docker-compose down        # Stop all services
docker-compose up -d       # Start services
docker system prune -f     # Clean up unused resources
```

## SSL Certificate Renewal

SSL certificates auto-renew via cron job. To manually renew:

```bash
sudo certbot renew
docker-compose restart nginx
```

## Troubleshooting

### Check if services are running:

```bash
docker-compose ps
systemctl status docker
```

### View logs:

```bash
docker-compose logs nginx
docker-compose logs wedding-app
```

### Test website accessibility:

```bash
curl -I http://localhost:3000
curl -I https://loihangwedding.io.vn
```

### Check domain DNS:

```bash
nslookup loihangwedding.io.vn
dig loihangwedding.io.vn
```

### Firewall issues:

```bash
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

## Performance Optimization

### Enable Nginx caching:

The nginx.conf already includes caching for static files, images, and fonts.

### Monitor resources:

```bash
htop                       # Monitor CPU/RAM usage
docker stats              # Monitor container resources
df -h                     # Check disk usage
```

### Database (if needed):

If you need to add a database later, modify docker-compose.yml to include PostgreSQL or MongoDB.

## Security Features

- ✅ SSL/TLS encryption (Let's Encrypt)
- ✅ HTTP to HTTPS redirect
- ✅ Security headers (HSTS, XSS protection, etc.)
- ✅ Rate limiting
- ✅ Firewall configuration
- ✅ Non-root container execution

## Support

For issues or questions, check:

1. Container logs: `docker-compose logs`
2. Nginx logs: `docker-compose logs nginx`
3. System logs: `journalctl -xe`
4. Domain DNS settings
5. Firewall configuration

## Environment Variables

You can add environment variables in docker-compose.yml:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_TELEMETRY_DISABLED=1
  - CUSTOM_VAR=value
```
