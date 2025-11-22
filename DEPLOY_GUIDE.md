# Hướng Dẫn Deploy Wedding Site Lên VPS Ubuntu 20+ Với Docker

## Thông Tin VPS

- **IP**: 103.199.17.168
- **Domain**: loihangwedding.io.vn
- **OS**: Ubuntu 20+
- **Port SSH**: 22 (mặc định)

---

## Bước 1: Kết Nối SSH và Setup Ban Đầu

### 1.1 Kết nối SSH

```bash
ssh root@103.199.17.168
# Hoặc nếu có user khác:
# ssh username@103.199.17.168
```

### 1.2 Cập nhật hệ thống

```bash
apt update && apt upgrade -y
```

### 1.3 Cài đặt các package cần thiết

```bash
apt install -y curl wget git nano ufw fail2ban htop
```

### 1.4 Tạo user mới (nếu đang dùng root)

```bash
adduser deploy
usermod -aG sudo deploy
su - deploy
```

---

## Bước 2: Cấu Hình Firewall

```bash
# Bật UFW
sudo ufw enable

# Cho phép SSH
sudo ufw allow ssh
sudo ufw allow 22

# Cho phép HTTP và HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Kiểm tra status
sudo ufw status
```

---

## Bước 3: Cài Đặt Docker và Docker Compose

### 3.1 Cài đặt Docker

```bash
# Xóa phiên bản cũ (nếu có)
sudo apt remove docker docker-engine docker.io containerd runc

# Cài đặt dependencies
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Thêm Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Thêm repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Cài đặt Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Thêm user vào group docker
sudo usermod -aG docker $USER

# Khởi động và enable Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### 3.2 Cài đặt Docker Compose

```bash
# Download Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Cấp quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra version
docker-compose --version
```

### 3.3 Test Docker

```bash
# Logout và login lại để áp dụng group
exit
ssh deploy@103.199.17.168

# Test Docker
docker run hello-world
```

---

## Bước 4: Cài Đặt Nginx

```bash
sudo apt install -y nginx

# Khởi động và enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Kiểm tra status
sudo systemctl status nginx
```

---

## Bước 5: Cấu Hình Domain và DNS

### 5.1 Kiểm tra DNS

```bash
# Kiểm tra domain đã trỏ đúng IP chưa
nslookup loihangwedding.io.vn
dig loihangwedding.io.vn
```

### 5.2 Tạo cấu hình Nginx tạm thời

```bash
sudo nano /etc/nginx/sites-available/loihangwedding.io.vn
```

Nội dung file:

```nginx
server {
    listen 80;
    server_name loihangwedding.io.vn www.loihangwedding.io.vn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5.3 Enable site

```bash
sudo ln -s /etc/nginx/sites-available/loihangwedding.io.vn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Bước 6: Cài Đặt SSL Certificate (Let's Encrypt)

### 6.1 Cài đặt Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 6.2 Tạo SSL certificate

```bash
sudo certbot --nginx -d loihangwedding.io.vn -d www.loihangwedding.io.vn
```

### 6.3 Cấu hình auto-renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Thêm cron job
sudo crontab -e
# Thêm dòng này:
# 0 2 * * * /usr/bin/certbot renew --quiet
```

---

## Bước 7: Clone và Setup Project

### 7.1 Clone project

```bash
cd /home/deploy
git clone https://github.com/loihd98/my_wedding.git
cd my_wedding
```

### 7.2 Setup Google Sheets (Tùy chọn)

**Để form RSVP lưu vào Google Sheets:**

1. Follow hướng dẫn trong `GOOGLE_SHEETS_SETUP.md`
2. Tạo Service Account và download JSON key
3. Share Google Sheet với service account email

### 7.3 Tạo file environment

```bash
nano .env.production
```

Nội dung cơ bản:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://loihangwedding.io.vn
NEXT_TELEMETRY_DISABLED=1
```

**Nếu sử dụng Google Sheets, thêm:**

```env
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com
```

---

## Bước 8: Build và Deploy với Docker

### 8.1 Build Docker image

```bash
docker build -t wedding-app .
```

### 8.2 Chạy container

```bash
docker run -d \
  --name wedding-app \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  wedding-app
```

### 8.3 Hoặc sử dụng Docker Compose

```bash
docker-compose up -d
```

---

## Bước 9: Kiểm Tra và Monitoring

### 9.1 Kiểm tra container

```bash
docker ps
docker logs wedding-app
```

### 9.2 Kiểm tra Nginx

```bash
sudo nginx -t
sudo systemctl status nginx
```

### 9.3 Kiểm tra SSL

```bash
curl -I https://loihangwedding.io.vn
```

### 9.4 Test website

Mở trình duyệt và truy cập: `https://loihangwedding.io.vn`

---

## Bước 10: Setup Backup và Monitoring (Tùy chọn)

### 10.1 Backup script

```bash
mkdir -p /home/deploy/backups
nano /home/deploy/backup.sh
```

Nội dung script:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/deploy/backups"

# Backup project files
tar -czf $BACKUP_DIR/wedding_backup_$DATE.tar.gz /home/deploy/my_wedding

# Keep only last 7 backups
find $BACKUP_DIR -name "wedding_backup_*.tar.gz" -mtime +7 -delete
```

```bash
chmod +x /home/deploy/backup.sh

# Thêm vào crontab
crontab -e
# Thêm: 0 3 * * * /home/deploy/backup.sh
```

### 10.2 Setup log rotation

```bash
sudo nano /etc/logrotate.d/nginx
```

---

## Bước 11: Commands Thường Dùng

### Docker Commands

```bash
# Xem containers
docker ps -a

# Xem logs
docker logs wedding-app

# Restart container
docker restart wedding-app

# Rebuild và redeploy
docker build -t wedding-app .
docker stop wedding-app
docker rm wedding-app
docker run -d --name wedding-app --restart unless-stopped -p 3000:3000 --env-file .env.production wedding-app

# Hoặc với docker-compose
docker-compose down
docker-compose up -d --build
```

### Nginx Commands

```bash
# Test config
sudo nginx -t

# Reload config
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### SSL Commands

```bash
# Check certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Force renew
sudo certbot renew --force-renewal
```

---

## Bước 12: Troubleshooting

### 12.1 Kiểm tra port đang sử dụng

```bash
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
sudo netstat -tulpn | grep :3000
```

### 12.2 Kiểm tra logs

```bash
# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Docker logs
docker logs wedding-app

# System logs
sudo journalctl -u nginx
sudo journalctl -u docker
```

### 12.3 Restart services

```bash
sudo systemctl restart nginx
sudo systemctl restart docker
docker restart wedding-app
```

---

## Bước 13: Update Code Mới

### 13.1 Pull code mới

```bash
cd /home/deploy/my_wedding
git pull origin main
```

### 13.2 Rebuild và deploy

```bash
docker-compose down
docker-compose up -d --build
```

Hoặc:

```bash
docker stop wedding-app
docker rm wedding-app
docker build -t wedding-app .
docker run -d --name wedding-app --restart unless-stopped -p 3000:3000 --env-file .env.production wedding-app
```

---

## Bước 14: Performance Optimization

### 14.1 Cấu hình Nginx cache

```bash
sudo nano /etc/nginx/sites-available/loihangwedding.io.vn
```

Thêm vào config:

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 14.2 Enable gzip compression

Thêm vào server block:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied expired no-cache no-store private auth;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

---

## 🎉 Hoàn Thành!

Sau khi hoàn thành tất cả các bước trên, bạn sẽ có:

1. ✅ VPS Ubuntu được cấu hình an toàn
2. ✅ Docker và Docker Compose hoạt động
3. ✅ Nginx reverse proxy
4. ✅ SSL certificate tự động gia hạn
5. ✅ Wedding site chạy trên HTTPS
6. ✅ Backup và monitoring cơ bản
7. ✅ Process để update code mới

Website của bạn sẽ có thể truy cập tại: **https://loihangwedding.io.vn**

---

## 📞 Support

Nếu gặp vấn đề, hãy kiểm tra:

1. DNS đã trỏ đúng IP chưa
2. Firewall có mở port 80, 443 chưa
3. Docker container có chạy không
4. Nginx config có lỗi không
5. SSL certificate có hợp lệ không
