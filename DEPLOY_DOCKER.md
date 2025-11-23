# 🐳 Hướng Dẫn Deploy Wedding Site Lên VPS với Docker

**Thông tin VPS:**

- **IP**: 103.199.17.168
- **Domain**: loihangwedding.io.vn
- **OS**: Ubuntu Server 20.04 LTS (Focal Fossa) Minimal
- **Tech Stack**: Next.js + Docker + Docker Compose + Nginx + SSL

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
apt install -y curl wget git nano ufw htop unzip software-properties-common ca-certificates gnupg lsb-release
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

## 🐳 BƯỚC 3: Cài Đặt Docker và Docker Compose

### 3.1 Cài đặt Docker (Phương pháp Official)

```bash
# Xóa Docker cũ và repository lỗi (nếu có)
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo rm -f /etc/apt/sources.list.d/docker.list
sudo rm -f /etc/apt/keyrings/docker.gpg

# Cài đặt Docker dependencies
sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Tạo thư mục keyrings
sudo mkdir -p /etc/apt/keyrings

# Thêm Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Thêm Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package list
sudo apt-get update

# Cài đặt Docker Engine
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Thêm user deploy vào Docker group
sudo usermod -aG docker deploy

# Enable và start Docker service
sudo systemctl enable docker
sudo systemctl start docker
```

### 3.2 Cài đặt Docker Compose (standalone)

```bash
# Download Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Cấp quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Tạo symlink
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### 3.3 Logout và login lại để áp dụng Docker group

```bash
# Logout từ session hiện tại
exit

# SSH lại với user deploy
ssh deploy@103.199.17.168
```

### 3.4 Kiểm tra Docker hoạt động

```bash
# Test Docker version
docker --version
docker-compose --version

# Test Docker không cần sudo
docker run hello-world

# Kiểm tra Docker service status
sudo systemctl status docker
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

    # Proxy to Docker container
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

    # Static files caching
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

## 📦 BƯỚC 6: Clone Project và Setup Docker Files

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

### 6.3 Tạo Dockerfile

```bash
nano Dockerfile
```

**Nội dung Dockerfile (production-ready với standalone output):**

```dockerfile
FROM node:20-bookworm-slim AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies including devDependencies for build
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application với standalone output
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create user for security
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs

# Copy the public folder
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Start the standalone server
CMD ["node", "server.js"]
```

### 6.4 Tạo docker-compose.yml

```bash
nano docker-compose.yml
```

**Nội dung docker-compose.yml:**

```yaml
services:
  wedding-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: wedding-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    networks:
      - wedding-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

networks:
  wedding-network:
    driver: bridge
```

### 6.5 Tạo .dockerignore để tối ưu build

```bash
nano .dockerignore
```

**Nội dung .dockerignore:**

```
node_modules
.next
.git
.gitignore
README.md
Dockerfile
.dockerignore
npm-debug.log
.env.local
.env.development.local
.env.test.local
.env.production.local
.vscode
.DS_Store
*.log
coverage
.nyc_output
.cache
dist
build
logs
*.tgz
*.tar.gz
```

---

## 🚀 BƯỚC 7: Build và Deploy với Docker

### 7.1 Build Docker image

```bash
# Build image với Docker Compose
docker-compose build --no-cache

# Kiểm tra image được tạo
docker images
```

### 7.2 Chạy application

```bash
# Start với Docker Compose
docker-compose up -d

# Kiểm tra container status
docker ps

# Kiểm tra logs
docker-compose logs -f wedding-app
```

### 7.3 Kiểm tra container health

```bash
# Xem container health status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Test app locally
curl http://localhost:3000

# Kiểm tra port 3000 có mở không
sudo netstat -tulpn | grep :3000
```

---

## 🔍 BƯỚC 8: Kiểm Tra và Testing

### 8.1 Test HTTP (trước khi có SSL)

```bash
# Test container health
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

echo "🚀 Updating Wedding Website with Docker..."

# Go to project directory
cd /home/deploy/my_wedding

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin master

# Stop current containers
echo "🛑 Stopping current containers..."
docker-compose down

# Remove old image to force rebuild
echo "🗑️ Removing old Docker image..."
docker rmi wedding-app_wedding-app 2>/dev/null || echo "No old image to remove"

# Rebuild and restart
echo "🔄 Rebuilding Docker containers..."
docker-compose build --no-cache
docker-compose up -d

# Wait for container to be ready
echo "⏳ Waiting for container to start..."
sleep 15

# Check container status
echo "🔍 Checking container status..."
docker ps | grep wedding-app

# Check health
echo "🏥 Checking container health..."
docker inspect wedding-app --format='{{.State.Health.Status}}' || echo "No health check configured"

# Show recent logs
echo "📋 Recent container logs:"
docker-compose logs --tail=10 wedding-app

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

# Backup Docker image
docker save $(docker images --format "{{.Repository}}:{{.Tag}}" | grep wedding-app | head -1) | gzip > $BACKUP_DIR/wedding_docker_$DATE.tar.gz

# Backup Docker compose and environment files
cp $PROJECT_DIR/docker-compose.yml $BACKUP_DIR/docker-compose_$DATE.yml
cp $PROJECT_DIR/.env.production $BACKUP_DIR/env_production_$DATE
cp $PROJECT_DIR/Dockerfile $BACKUP_DIR/Dockerfile_$DATE

# Keep only last 7 backups
find $BACKUP_DIR -name "wedding_backup_*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "wedding_docker_*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "docker-compose_*.yml" -mtime +7 -delete
find $BACKUP_DIR -name "env_production_*" -mtime +7 -delete
find $BACKUP_DIR -name "Dockerfile_*" -mtime +7 -delete

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

# Docker system cleanup weekly
0 4 * * 0 docker system prune -f
```

---

## 📊 BƯỚC 10: Monitoring và Logs

### 10.1 Docker Commands hữu ích

```bash
# Xem containers đang chạy
docker ps

# Xem tất cả containers
docker ps -a

# Xem logs realtime
docker-compose logs -f wedding-app

# Xem logs với timestamp
docker-compose logs -t wedding-app

# Restart container
docker-compose restart wedding-app

# Stop containers
docker-compose down

# Start containers
docker-compose up -d

# Rebuild và restart
docker-compose up -d --build
```

### 10.2 Tạo script monitoring

```bash
nano ~/check-status.sh
```

**Nội dung script:**

```bash
#!/bin/bash

echo "🔍 Wedding Website Docker Status Check"
echo "====================================="

echo "📅 Date: $(date)"
echo ""

echo "🐳 Docker Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.Image}}"
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

echo "🐳 Docker System Info:"
docker system df
echo ""

echo "📊 Container Resource Usage:"
docker stats --no-stream wedding-app 2>/dev/null || echo "Container not running"
echo ""

echo "🔗 Website Response:"
curl -s -o /dev/null -w "Status: %{http_code}, Time: %{time_total}s\n" https://loihangwedding.io.vn

echo ""
echo "📋 Recent Container Logs:"
docker logs wedding-app --tail=5 2>/dev/null || echo "No logs available"
```

```bash
chmod +x ~/check-status.sh
```

---

## 🎯 BƯỚC 11: Production Optimization

### 11.1 Cấu hình Docker log rotation

```bash
# Tạo file daemon.json cho Docker
sudo nano /etc/docker/daemon.json
```

**Nội dung:**

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "5"
  }
}
```

```bash
# Restart Docker service
sudo systemctl restart docker

# Restart containers
docker-compose down
docker-compose up -d
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

# 3. Test Docker health
docker inspect wedding-app --format='{{.State.Health.Status}}'

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
2. ✅ Docker + Docker Compose containerization
3. ✅ Nginx reverse proxy với caching
4. ✅ SSL certificate từ Let's Encrypt (auto-renewal)
5. ✅ Next.js app chạy trong Docker container với standalone output
6. ✅ Monitoring và backup scripts
7. ✅ Security với firewall và fail2ban
8. ✅ Performance optimization với health checks

---

## 🛠 Commands Hữu Ích

### Docker Management

```bash
# Update code và redeploy
~/update-website.sh

# Backup
~/backup-website.sh

# Check status
~/check-status.sh

# Quick restart
docker-compose restart wedding-app

# View logs realtime
docker-compose logs -f wedding-app

# Container shell access
docker exec -it wedding-app sh
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

### Docker Issues

**Container không start:**

```bash
# Kiểm tra Docker logs
docker logs wedding-app

# Kiểm tra container health
docker inspect wedding-app --format='{{.State.Health.Status}}'

# Rebuild container
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Build failures:**

```bash
# Clean Docker system
docker system prune -f
docker volume prune -f

# Rebuild từ đầu
docker-compose down
docker rmi $(docker images -q)
docker-compose build --no-cache
```

**Lỗi "Cannot find module 'tailwindcss'" trong build:**

Nguyên nhân: Dockerfile đang sử dụng `--only=production` khiến devDependencies không được cài đặt.

Giải pháp:

```bash
# Tạo lại Dockerfile với multi-stage build
nano Dockerfile

# Copy nội dung Dockerfile mới từ guide này (đã được fix)
# Sau đó rebuild
docker-compose build --no-cache
```

**Memory/Resource issues:**

```bash
# Check resource usage
docker stats

# Restart Docker daemon
sudo systemctl restart docker
```

### Application Issues

**Container chạy nhưng website không load:**

```bash
# Check container logs
docker logs wedding-app --tail=50

# Check port binding
docker port wedding-app

# Test container health
curl http://localhost:3000
```

### Website Issues

**Nếu website không load:**

1. **Check Docker:**

   ```bash
   docker ps
   docker logs wedding-app
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

4. **Check ports và firewall:**
   ```bash
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :443
   sudo netstat -tulpn | grep :3000
   sudo ufw status
   ```

### Emergency Recovery

**Nếu tất cả đều fail:**

```bash
# Stop tất cả containers
docker-compose down

# Clean Docker system
docker system prune -af

# Restart Docker service
sudo systemctl restart docker

# Rebuild và restart
docker-compose build --no-cache
docker-compose up -d

# Restore from backup nếu cần
~/backup-website.sh
```

---

## 📞 Hỗ Trợ

Sau khi deploy xong, bạn có thể:

1. 🔍 Sử dụng `~/check-status.sh` để monitor
2. 🔄 Sử dụng `~/update-website.sh` để update code
3. 💾 Sử dụng `~/backup-website.sh` để backup
4. 📊 Kiểm tra logs với `docker-compose logs wedding-app`
5. 📈 Monitor resource với `docker stats`

**🎊 Chúc mừng! Website cưới của bạn đã sẵn sàng với Docker!**
