# 🚀 Hướng Dẫn Deploy Wedding Site Lên VPS Production

**Thông tin server:**

- **IP**: 103.199.17.168
- **Domain**: loihangwedding.io.vn
- **OS**: Ubuntu 20+ (Fresh Installation)
- **Tech Stack**: Next.js + Docker + Nginx + SSL

---

## 📋 Yêu Cầu Trước Khi Bắt Đầu

1. ✅ VPS Ubuntu 20+ đã setup
2. ✅ Domain `loihangwedding.io.vn` đã trỏ A record về IP `103.199.17.168`
3. ✅ SSH access với quyền root hoặc sudo
4. ✅ Source code đã push lên GitHub repository

---

## 🔧 BƯỚC 1: Kết Nối và Setup Server Cơ Bản

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
apt install -y curl wget git nano ufw htop unzip software-properties-common
```

### 1.4 Tạo user deploy (bảo mật)

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

### 3.1 Cài đặt Docker (Phương pháp Recommended)

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

# Thêm Docker GPG key (đảm bảo URL đúng)
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Thêm Docker repository với syntax đúng
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package list
sudo apt-get update

# Cài đặt Docker Engine
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Thêm user deploy vào Docker group (thay vì $USER)
sudo usermod -aG docker deploy

# Enable và start Docker service
sudo systemctl enable docker
sudo systemctl start docker
```

### 3.1.1 Phương pháp Alternative (nếu gặp lỗi repository)

```bash
# Sử dụng script cài đặt tự động của Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Thêm user vào Docker group
sudo usermod -aG docker deploy

# Clean up script
rm get-docker.sh

# Start Docker service
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

# Test Docker với sudo (nếu group chưa áp dụng)
sudo docker run hello-world

# Test Docker không cần sudo (sau khi login lại)
docker run hello-world

# Kiểm tra Docker service status
sudo systemctl status docker
```

### 3.5 Troubleshooting Docker Issues

**Nếu gặp lỗi "ttps" hoặc repository không tìm thấy:**

```bash
# Xóa repository lỗi
sudo rm -f /etc/apt/sources.list.d/docker.list

# Xóa GPG key cũ
sudo rm -f /etc/apt/keyrings/docker.gpg

# Sử dụng script tự động
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker deploy
```

**Nếu Docker service không tồn tại (Unit docker.service could not be found):**

```bash
# Gỡ cài đặt hoàn toàn Docker cũ
sudo apt-get purge -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo apt-get purge -y docker docker-engine docker.io containerd runc
sudo apt autoremove -y

# Xóa thư mục và file Docker
sudo rm -rf /var/lib/docker
sudo rm -rf /etc/docker
sudo rm -rf /var/run/docker.sock
sudo rm -f /etc/apt/sources.list.d/docker.list
sudo rm -f /etc/apt/keyrings/docker.gpg

# Cài lại Docker bằng script official
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
rm get-docker.sh

# Setup Docker service
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker deploy
sudo chmod 666 /var/run/docker.sock

# Test Docker
sudo docker --version
sudo systemctl status docker
```

**Nếu Docker service không start:**

```bash
# Restart Docker service
sudo systemctl restart docker

# Kiểm tra logs
sudo journalctl -u docker.service

# Kiểm tra Docker daemon
sudo dockerd --debug
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

# Kiểm tra cron job auto-renewal (thường đã tự động setup)
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

### 6.3 Tạo Dockerfile

```bash
nano Dockerfile
```

**Nội dung Dockerfile (production-ready với network fix):**

```dockerfile
FROM node:20-bookworm-slim

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application directly
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Create user for security
RUN groupadd -g 1001 appgroup && \
    useradd -r -u 1001 -g appgroup appuser

# Set up permissions
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["npm", "start"]
```

### 6.4 Cập nhật next.config.js cho standalone

```bash
nano next.config.js
```

**Đảm bảo có `output: 'standalone'`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

### 6.5 Tạo docker-compose.yml

```bash
nano docker-compose.yml
```

**Nội dung docker-compose.yml (bỏ version để tránh warning):**

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

networks:
  wedding-network:
    driver: bridge
```

### 6.6 Tạo .dockerignore để tối ưu build

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
```

---

## 🚀 BƯỚC 7: Build và Deploy

### 7.1 Build Docker image

```bash
# Build image với Docker Compose
docker-compose build

# Hoặc build manual (nếu cần debug)
# docker build -t wedding-app .
```

### 7.2 Chạy application

```bash
# Start với Docker Compose
docker-compose up -d

# Kiểm tra logs realtime
docker-compose logs -f wedding-app
```

### 7.3 Kiểm tra container chạy

```bash
# Xem container status
docker ps

# Kiểm tra logs (nếu có lỗi)
docker logs wedding-app

# Test app locally trước khi test qua Nginx
curl http://localhost:3000

# Kiểm tra port 3000 có mở không
sudo netstat -tulpn | grep :3000
```

### 7.5 Troubleshooting Docker Build Issues

**Nếu build bị lỗi Alpine package repository:**

```bash
# Kiểm tra Alpine version và package availability
docker run --rm node:20-alpine apk info

# Alternative 1: Sử dụng Ubuntu base image thay vì Alpine (recommended)
# Tạo Dockerfile.ubuntu
cat > Dockerfile.ubuntu << 'EOF'
FROM node:20-slim AS base

FROM base AS deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
EOF

# Build với Ubuntu base image
docker build -f Dockerfile.ubuntu -t wedding-app .
```

**Alternative 2: Fix Alpine với package mirrors:**

```bash
# Tạo Dockerfile với Alpine mirrors khác
cat > Dockerfile.alpine-fixed << 'EOF'
FROM node:20-alpine AS base

FROM base AS deps
# Sử dụng mirrors khác cho Alpine
RUN sed -i 's|dl-cdn.alpinelinux.org|alpine.global.ssl.fastly.net|g' /etc/apk/repositories && \
    apk update && apk add --no-cache gcompat

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
EOF

# Build với Alpine fixed
docker build -f Dockerfile.alpine-fixed -t wedding-app .
```

**Alternative 3: Build simple với current working Alpine:**

```bash
# Build với cache disabled
docker-compose build --no-cache

# Hoặc build manual (nếu cần debug)
# docker build -t wedding-app .
```

**Nếu container không start:**

```bash
# Kiểm tra logs chi tiết
docker logs wedding-app

# Kiểm tra environment variables
docker exec wedding-app env

# Test chạy container interactive để debug
docker run -it --rm wedding-app sh
```

---

## 🔍 BƯỚC 8: Kiểm Tra và Testing

### 8.1 Test HTTP (trước khi có SSL)

```bash
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

# Stop current container
echo "🛑 Stopping current container..."
docker-compose down

# Rebuild and restart
echo "🔄 Rebuilding Docker container..."
docker-compose build --no-cache
docker-compose up -d

# Wait for container to be ready
echo "⏳ Waiting for container to start..."
sleep 10

# Check container status
echo "🔍 Checking container status..."
docker ps | grep wedding-app

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
docker save wedding-app:latest | gzip > $BACKUP_DIR/wedding_docker_$DATE.tar.gz

# Keep only last 7 backups
find $BACKUP_DIR -name "wedding_backup_*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "wedding_docker_*.tar.gz" -mtime +7 -delete

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
```

---

## 📊 BƯỚC 10: Monitoring và Logs

### 10.1 Tạo script monitoring

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

echo "🐳 Docker Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
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

echo "🔗 Website Response:"
curl -s -o /dev/null -w "Status: %{http_code}, Time: %{time_total}s\n" https://loihangwedding.io.vn

echo ""
echo "📋 Recent Logs:"
docker logs wedding-app --tail=5
```

```bash
chmod +x ~/check-status.sh
```

---

## 🎯 BƯỚC 11: Production Optimization

### 11.1 Cấu hình log rotation

```bash
sudo nano /etc/logrotate.d/wedding-app
```

**Nội dung:**

```
/var/lib/docker/containers/*/*-json.log {
    daily
    rotate 7
    missingok
    notifempty
    sharedscripts
    copytruncate
    compress
}
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

# 3. Test form RSVP (nếu có)
# Mở browser và test form

# 4. Kiểm tra SSL grade
# Truy cập: https://www.ssllabs.com/ssltest/analyze.html?d=loihangwedding.io.vn
```

### 12.2 Performance test

```bash
# Test load time
curl -w "@curl-format.txt" -o /dev/null -s https://loihangwedding.io.vn

# Tạo file curl-format.txt
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

1. ✅ VPS Ubuntu 20+ được setup và bảo mật
2. ✅ Docker + Docker Compose đã cài đặt
3. ✅ Nginx reverse proxy với caching
4. ✅ SSL certificate từ Let's Encrypt (auto-renewal)
5. ✅ Next.js app chạy trong Docker container
6. ✅ Monitoring và backup scripts
7. ✅ Security với firewall và fail2ban
8. ✅ Performance optimization

---

## 🛠 Commands Hữu Ích

### Docker Commands

```bash
# Xem logs realtime
docker-compose logs -f wedding-app

# Restart app
docker-compose restart wedding-app

# Update code và redeploy
~/update-website.sh

# Backup
~/backup-website.sh

# Check status
~/check-status.sh
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

**Lỗi repository "ttps" hoặc không tìm thấy package:**

```bash
# Clean up lỗi repository
sudo rm -f /etc/apt/sources.list.d/docker.list
sudo rm -f /etc/apt/keyrings/docker.gpg

# Cài lại Docker bằng script tự động
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker deploy
rm get-docker.sh

# Test Docker
sudo systemctl start docker
docker --version
```

**Container không start hoặc bị crash:**

```bash
# Kiểm tra logs
docker logs wedding-app

# Kiểm tra resource usage
docker stats

# Kiểm tra disk space
df -h

# Clean Docker system
docker system prune -f
docker volume prune -f
```

**Build Docker image bị lỗi:**

```bash
# Build với verbose logs
docker-compose build --no-cache --progress=plain

# Check Dockerfile syntax
docker run --rm -i hadolint/hadolint < Dockerfile

# Build từng stage để debug
docker build --target=deps .
```

### Website Issues

**Nếu website không load:**

1. **Check container:**
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

### SSL Issues

**Nếu SSL không hoạt động:**

```bash
# Kiểm tra certificate status
sudo certbot certificates

# Test SSL handshake
openssl s_client -connect loihangwedding.io.vn:443

# Re-issue certificate
sudo certbot delete --cert-name loihangwedding.io.vn
sudo certbot --nginx -d loihangwedding.io.vn -d www.loihangwedding.io.vn
```

**SSL certificate expired:**

```bash
# Force renewal
sudo certbot renew --force-renewal

# Check renewal service
sudo systemctl status snap.certbot.renew.timer
```

### Performance Issues

**Website chậm:**

```bash
# Check resource usage
htop
docker stats

# Check Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Optimize Docker
docker system df
docker system prune

# Check network latency
ping google.com
```

### Emergency Recovery

**Nếu tất cả đều fail:**

```bash
# Stop tất cả services
docker-compose down
sudo systemctl stop nginx

# Restart từ đầu
sudo systemctl start nginx
docker-compose up -d

# Restore from backup
~/backup-website.sh
# (Restore từ backup gần nhất nếu có)
```

---

## 📞 Hỗ Trợ

Sau khi deploy xong, bạn có thể:

1. 🔍 Sử dụng `~/check-status.sh` để monitor
2. 🔄 Sử dụng `~/update-website.sh` để update code
3. 💾 Sử dụng `~/backup-website.sh` để backup
4. 📊 Kiểm tra logs với `docker-compose logs wedding-app`

**🎊 Chúc mừng! Website cưới của bạn đã sẵn sàng!**
