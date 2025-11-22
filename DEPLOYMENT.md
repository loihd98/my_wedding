# 🚀 Deployment Checklist

## Pre-Deployment

- [ ] Update wedding details in all components
- [ ] Add wedding photos to `/public/images/`
- [ ] Update couple names in Hero component
- [ ] Update event details and locations
- [ ] Update love story timeline
- [ ] Configure environment variables
- [ ] Update domain name in configs
- [ ] Update email addresses
- [ ] Update social media links
- [ ] Test locally with `npm run dev`
- [ ] Build and test production build: `npm run build && npm start`
- [ ] Test all forms and validations
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target 90+)

## Server Setup

- [ ] Ubuntu 22.04 VPS ready
- [ ] SSH access configured
- [ ] Domain DNS pointing to server IP (A record)
- [ ] Run `setup-server.sh` on server
- [ ] Verify firewall rules: `ufw status`
- [ ] Verify Docker installed: `docker --version`
- [ ] Verify Nginx installed: `nginx -v`

## Deployment

- [ ] Upload project files to `/var/www/loihangwedding`
- [ ] Update domain in `nginx.conf`
- [ ] Update email in `deploy.sh`
- [ ] Run `chmod +x deploy.sh setup-server.sh`
- [ ] Run `./deploy.sh`
- [ ] Verify container running: `docker ps`
- [ ] Verify SSL certificate: `certbot certificates`
- [ ] Test HTTP -> HTTPS redirect
- [ ] Test website on all devices

## Post-Deployment

- [ ] Test all pages and sections
- [ ] Test RSVP form submission
- [ ] Test gallery lightbox
- [ ] Test countdown timer
- [ ] Test smooth scroll
- [ ] Verify SEO metadata (view source)
- [ ] Test Open Graph tags (Facebook Debugger)
- [ ] Test Twitter Cards (Twitter Card Validator)
- [ ] Check sitemap: `/sitemap.xml`
- [ ] Check robots: `/robots.txt`
- [ ] Run Lighthouse audit
- [ ] Test page speed (PageSpeed Insights)
- [ ] Setup monitoring (UptimeRobot, etc.)
- [ ] Setup Google Analytics (if desired)
- [ ] Test on different browsers
- [ ] Test on different devices
- [ ] Share with friends for feedback

## Security Checks

- [ ] HTTPS working
- [ ] Security headers present (check with securityheaders.com)
- [ ] SSL rating A+ (check with ssllabs.com)
- [ ] No mixed content warnings
- [ ] CSP policy working
- [ ] Rate limiting configured
- [ ] Input sanitization working

## Monitoring

- [ ] Setup uptime monitoring
- [ ] Configure log rotation
- [ ] Setup backup system
- [ ] Monitor disk space: `df -h`
- [ ] Monitor memory: `free -h`
- [ ] Check Docker logs: `docker-compose logs`
- [ ] Check Nginx logs: `tail -f /var/log/nginx/loihangwedding_*.log`

## Maintenance

- [ ] Document update process
- [ ] Setup auto-renewal for SSL (already configured in deploy.sh)
- [ ] Schedule regular backups
- [ ] Keep dependencies updated
- [ ] Monitor performance metrics

## Emergency Contacts

- Domain Registrar: __________
- Hosting Provider: __________
- DNS Provider: __________
- Technical Support: __________

## Backup Plan

```bash
# Backup database (if applicable)
docker-compose exec wedding-app npm run backup

# Backup files
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/loihangwedding

# Restore from backup
tar -xzf backup-YYYYMMDD.tar.gz -C /
```

## Useful Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update application
cd /var/www/loihangwedding
git pull
docker-compose down
docker-compose up -d --build

# Check SSL expiry
certbot certificates

# Renew SSL manually
certbot renew

# Check disk space
df -h

# Check memory usage
free -h

# Monitor processes
htop

# Check open ports
netstat -tulpn
```
