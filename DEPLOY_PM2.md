# 🚀 Hướng Dẫn Deploy Wedding Site Lên VPS với PM2

**Thông tin VPS:**

- **IP**: 103.199.17.168
- **Domain**: loihangwedding.io.vn
- **OS**: Ubuntu Server 20.04 LTS (Focal Fossa) Minimal
- **Tech Stack**: Next.js + PM2 + Nginx + SSL

---

## 📋 Yêu Cầu Trước Khi Bắt Đầu

1. ✅ VPS Ubuntu 20.04 LTS đã setup
2. ✅ Domain `loihangwedding.io.vn` đã trỏ A record về IP `103.199.17.168`
3. ✅ SSH access với quyền root
4. ✅ Source code đã push lên GitHub repository

---

## 🔧 BƯỚC 1: Kết Nối SSH và Setup Server Cơ Bản

### 1.1 SSH vào server

```bash
ssh root@103.199.17.168
```

### 1.2 Cập nhật hệ thống

```bash
apt update && apt upgrade -y
```

### 1.3 Cài đặt các tools cần thiết

```bash
apt install -y curl wget git nano ufw htop unzip software-properties-common build-essential
```

### 1.4 Tạo user deploy

```bash
# Tạo user mới
adduser deploy
usermod -aG sudo deploy

# Chuyển sang user deploy
su - deploy
cd ~
```

---

## 🔥 BƯỚC 2: Cấu Hình Firewall

```bash
# Enable UFW firewall
sudo ufw enable

# Cho phép SSH (quan trọng!)
sudo ufw allow ssh
sudo ufw allow 22/tcp

# Cho phép HTTP và HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Kiểm tra status
sudo ufw status verbose
```

---

## 📦 BƯỚC 3: Cài Đặt Node.js và NPM

### 3.1 Cài đặt Node.js 20 LTS

```bash
# Cài đặt NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Cài đặt Node.js
sudo apt-get install -y nodejs

# Kiểm tra version
node --version
npm --version
```

### 3.2 Cài đặt PM2 Global

```bash
sudo npm install -g pm2

# Kiểm tra PM2
pm2 --version
```

---

## 🌐 BƯỚC 4: Cài Đặt và Cấu Hình Nginx

### 4.1 Cài đặt Nginx

```bash
sudo apt update
sudo apt install -y nginx

# Start và enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Kiểm tra status
sudo systemctl status nginx
```

### 4.2 Tạo cấu hình Nginx cho domain

```bash
sudo nano /etc/nginx/sites-available/loihangwedding.io.vn
```

**Nội dung file cấu hình Nginx:**

```nginx
server {
    listen 80;
    server_name loihangwedding.io.vn www.loihangwedding.io.vn;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Proxy to Next.js app
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files optimization
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Cache static files
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
}
```

### 4.3 Enable site và test config

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/loihangwedding.io.vn /etc/nginx/sites-enabled/

# Disable default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 BƯỚC 5: Cài Đặt SSL Certificate (Let's Encrypt)

### 5.1 Cài đặt Certbot

```bash
# Cài đặt snapd (nếu chưa có)
sudo apt update
sudo apt install -y snapd

# Cài đặt Certbot via snap
sudo snap install --classic certbot

# Tạo symlink
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### 5.2 Tạo SSL certificate

```bash
# Tạo certificate cho domain
sudo certbot --nginx -d loihangwedding.io.vn -d www.loihangwedding.io.vn

# Nhập email và đồng ý terms khi được hỏi
```

### 5.3 Kiểm tra auto-renewal

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Kiểm tra cron job auto-renewal
sudo systemctl list-timers | grep certbot
```

---

## 📦 BƯỚC 6: Clone Project và Setup

### 6.1 Clone source code

```bash
cd /home/deploy
git clone https://github.com/loihd98/my_wedding.git
cd my_wedding
```

### 6.2 Tạo file .env.production

```bash
nano .env.production
```

**Nội dung file .env.production:**

```env
# Environment
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://loihangwedding.io.vn
NEXT_TELEMETRY_DISABLED=1

# Google Sheets Integration (nếu sử dụng)
# Uncomment và điền thông tin nếu bạn muốn form RSVP lưu vào Google Sheets
# GOOGLE_PROJECT_ID=your-project-id
# GOOGLE_PRIVATE_KEY_ID=your-private-key-id
# GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----"
# GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
# GOOGLE_CLIENT_ID=your-client-id
# GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com

# Admin password cho viewing RSVP data (thay đổi mật khẩu này!)
ADMIN_PASSWORD=your-super-secure-admin-password-2024
```

### 6.3 Cài đặt dependencies

```bash
npm ci --production=false
```

### 6.4 Build application

```bash
npm run build
```

---

## 🚀 BƯỚC 7: Setup PM2 và Deploy

### 7.1 Tạo file ecosystem PM2

```bash
nano ecosystem.config.js
```

**Nội dung ecosystem.config.js:**

```javascript
module.exports = {
  apps: [
    {
      name: "wedding-app",
      script: "server.js",
      cwd: "/home/deploy/my_wedding",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      env_file: "/home/deploy/my_wedding/.env.production",
      error_file: "/home/deploy/logs/wedding-app-error.log",
      out_file: "/home/deploy/logs/wedding-app-out.log",
      log_file: "/home/deploy/logs/wedding-app.log",
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      node_args: "--max-old-space-size=1024",
    },
  ],
};
```

### 7.2 Tạo thư mục logs

```bash
mkdir -p /home/deploy/logs
```

### 7.3 Start ứng dụng với PM2

```bash
# Start application
pm2 start ecosystem.config.js

# Kiểm tra status
pm2 status

# Xem logs
pm2 logs wedding-app

# Setup PM2 startup
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy

# Save PM2 configuration
pm2 save
```

---

## 🔍 BƯỚC 8: Kiểm Tra và Testing

### 8.1 Test HTTP (trước khi có SSL)

```bash
# Test app chạy trên port 3000
curl http://localhost:3000

# Test Nginx proxy
curl -H "Host: loihangwedding.io.vn" http://103.199.17.168

# Kiểm tra từ bên ngoài
curl http://loihangwedding.io.vn
```

### 8.2 Test HTTPS (sau khi có SSL)

```bash
# Test SSL certificate
curl -I https://loihangwedding.io.vn

# Test full page
curl https://loihangwedding.io.vn
```

### 8.3 Kiểm tra DNS

```bash
# Kiểm tra DNS resolution
nslookup loihangwedding.io.vn
dig loihangwedding.io.vn
```

---

## 🔧 BƯỚC 9: Scripts Tự Động và Monitoring

### 9.1 Tạo script update

```bash
nano ~/update-website.sh
```

**Nội dung script:**

```bash
#!/bin/bash
set -e

echo "🚀 Updating Wedding Website..."

# Go to project directory
cd /home/deploy/my_wedding

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin master

# Install dependencies (if needed)
echo "📦 Installing dependencies..."
npm ci --production=false

# Build application
echo "🔨 Building application..."
npm run build

# Restart PM2 app
echo "🔄 Restarting PM2 application..."
pm2 restart wedding-app

# Wait for app to be ready
echo "⏳ Waiting for application to start..."
sleep 10

# Check PM2 status
echo "🔍 Checking PM2 status..."
pm2 status

# Show recent logs
echo "📋 Recent application logs:"
pm2 logs wedding-app --lines 10

echo "✅ Update completed!"
echo "🌐 Website: https://loihangwedding.io.vn"

# Test website response
echo "🧪 Testing website..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000 || echo "Local test failed"
```

```bash
# Make executable
chmod +x ~/update-website.sh
```

### 9.2 Tạo script backup

```bash
nano ~/backup-website.sh
```

**Nội dung script:**

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/deploy/backups"
PROJECT_DIR="/home/deploy/my_wedding"

# Create backup directory
mkdir -p $BACKUP_DIR

echo "📦 Creating backup..."

# Backup project files
tar -czf $BACKUP_DIR/wedding_backup_$DATE.tar.gz \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='.next' \
    $PROJECT_DIR

# Backup PM2 ecosystem
cp /home/deploy/my_wedding/ecosystem.config.js $BACKUP_DIR/ecosystem_$DATE.config.js

# Backup environment files
cp /home/deploy/my_wedding/.env.production $BACKUP_DIR/env_production_$DATE

# Keep only last 7 backups
find $BACKUP_DIR -name "wedding_backup_*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "ecosystem_*.config.js" -mtime +7 -delete
find $BACKUP_DIR -name "env_production_*" -mtime +7 -delete

echo "✅ Backup completed: $BACKUP_DIR/"
```

```bash
# Make executable
chmod +x ~/backup-website.sh
```

### 9.3 Setup cron jobs

```bash
crontab -e
```

**Thêm vào crontab:**

```cron
# Backup daily at 3 AM
0 3 * * * /home/deploy/backup-website.sh

# SSL renewal check (redundant but safe)
0 2 * * 0 /usr/bin/certbot renew --quiet

# PM2 logs rotation weekly
0 1 * * 0 pm2 flush
```

---

## 📊 BƯỚC 10: Monitoring và Management

### 10.1 PM2 Commands hữu ích

```bash
# Xem status tất cả apps
pm2 status

# Xem logs realtime
pm2 logs wedding-app

# Restart application
pm2 restart wedding-app

# Reload application (zero downtime)
pm2 reload wedding-app

# Stop application
pm2 stop wedding-app

# Delete application
pm2 delete wedding-app

# Monitor resources
pm2 monit

# Flush logs
pm2 flush

# Xem chi tiết app
pm2 describe wedding-app
```

### 10.2 Tạo script monitoring

```bash
nano ~/check-status.sh
```

**Nội dung script:**

```bash
#!/bin/bash

echo "🔍 Wedding Website Status Check"
echo "================================"

echo "📅 Date: $(date)"
echo ""

echo "🚀 PM2 Status:"
pm2 status
echo ""

echo "🌐 Nginx Status:"
sudo systemctl status nginx --no-pager -l
echo ""

echo "🔒 SSL Certificate:"
sudo certbot certificates 2>/dev/null | grep loihangwedding.io.vn -A 5
echo ""

echo "💾 Disk Usage:"
df -h / | tail -n 1
echo ""

echo "💻 Memory Usage:"
free -h
echo ""

echo "🔗 Website Response:"
curl -s -o /dev/null -w "Status: %{http_code}, Time: %{time_total}s\n" https://loihangwedding.io.vn

echo ""
echo "📋 Recent PM2 Logs:"
pm2 logs wedding-app --lines 5
```

```bash
chmod +x ~/check-status.sh
```

---

## 🎯 BƯỚC 11: Production Optimization

### 11.1 Cấu hình PM2 log rotation

```bash
# Cài đặt PM2 log rotate module
pm2 install pm2-logrotate

# Cấu hình log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

### 11.2 Setup fail2ban cho bảo mật

```bash
sudo apt install -y fail2ban

sudo nano /etc/fail2ban/jail.local
```

**Nội dung:**

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
```

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## ✅ BƯỚC 12: Verification và Launch

### 12.1 Final checklist

```bash
# 1. Kiểm tra tất cả services
~/check-status.sh

# 2. Test website từ nhiều devices
curl -I https://loihangwedding.io.vn
curl -I https://www.loihangwedding.io.vn

# 3. Kiểm tra PM2 process
pm2 status

# 4. Test performance
curl -w "@curl-format.txt" -o /dev/null -s https://loihangwedding.io.vn
```

### 12.2 Tạo curl format file

```bash
cat > curl-format.txt << 'EOF'
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF
```

---

## 🎉 HOÀN THÀNH!

**Website của bạn giờ đã LIVE tại:**

- 🌐 **Primary**: https://loihangwedding.io.vn
- 🌐 **WWW**: https://www.loihangwedding.io.vn

### ✅ Những gì đã hoàn thành:

1. ✅ VPS Ubuntu 20.04 LTS được setup và bảo mật
2. ✅ Node.js 20 LTS + PM2 process manager
3. ✅ Nginx reverse proxy với caching
4. ✅ SSL certificate từ Let's Encrypt (auto-renewal)
5. ✅ Next.js app chạy với PM2 cluster mode
6. ✅ Monitoring và backup scripts
7. ✅ Security với firewall và fail2ban
8. ✅ Performance optimization với gzip và caching

---

## 🛠 Commands Hữu Ích

### PM2 Management

```bash
# Update code và redeploy
~/update-website.sh

# Backup
~/backup-website.sh

# Check status
~/check-status.sh

# Quick restart
pm2 restart wedding-app

# Monitor resources
pm2 monit

# Xem logs realtime
pm2 logs wedding-app --follow
```

### Nginx Commands

```bash
# Test config
sudo nginx -t

# Reload config
sudo systemctl reload nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### SSL Commands

```bash
# Check certificates
sudo certbot certificates

# Manual renewal
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

---

## 🚨 Troubleshooting

### PM2 Issues

**PM2 app không start:**

```bash
# Kiểm tra PM2 logs
pm2 logs wedding-app

# Restart PM2 daemon
pm2 kill
pm2 resurrect

# Check ecosystem config
pm2 start ecosystem.config.js --env production
```

**Memory issues:**

```bash
# Kiểm tra memory usage
pm2 monit

# Restart app to clear memory
pm2 restart wedding-app

# Adjust memory limit trong ecosystem.config.js
max_memory_restart: '1G'
```

### Application Issues

**Build thất bại:**

```bash
# Clear cache và rebuild
rm -rf .next
rm -rf node_modules
npm ci --production=false
npm run build
```

**Port conflicts:**

```bash
# Kiểm tra port 3000
sudo netstat -tulpn | grep :3000

# Kill process sử dụng port
sudo fuser -k 3000/tcp
```

### Website Issues

**Nếu website không load:**

1. **Check PM2:**

   ```bash
   pm2 status
   pm2 logs wedding-app
   curl http://localhost:3000
   ```

2. **Check Nginx:**

   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   sudo systemctl restart nginx
   ```

3. **Check DNS:**
   ```bash
   nslookup loihangwedding.io.vn
   dig loihangwedding.io.vn
   ```

### Emergency Recovery

**Nếu tất cả đều fail:**

```bash
# Stop tất cả services
pm2 stop all
sudo systemctl stop nginx

# Restart từ đầu
sudo systemctl start nginx
pm2 start ecosystem.config.js

# Restore from backup nếu cần
~/backup-website.sh
```

---

## 📞 Hỗ Trợ

Sau khi deploy xong, bạn có thể:

1. 🔍 Sử dụng `~/check-status.sh` để monitor
2. 🔄 Sử dụng `~/update-website.sh` để update code
3. 💾 Sử dụng `~/backup-website.sh` để backup
4. 📊 Kiểm tra logs với `pm2 logs wedding-app`
5. 📈 Monitor resource với `pm2 monit`

**🎊 Chúc mừng! Website cưới của bạn đã sẵn sàng với PM2!**
