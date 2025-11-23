# 🚀 Wedding Site Deployment Guide

**Thông tin VPS:**

- **IP**: 103.199.17.168
- **Domain**: loihangwedding.io.vn
- **OS**: Ubuntu Server 20.04 LTS (Focal Fossa) Minimal

---

## 📋 Chọn Phương Pháp Deploy

Bạn có thể chọn 1 trong 2 phương pháp deploy sau:

### 🟢 1. Deploy với PM2 (Khuyến nghị cho beginners)

**Ưu điểm:**

- ✅ Đơn giản, dễ setup
- ✅ Resource usage thấp
- ✅ Restart nhanh
- ✅ Logs dễ theo dõi
- ✅ Phù hợp với VPS nhỏ

**Nhược điểm:**

- ⚠️ Phụ thuộc vào Node.js version trên server
- ⚠️ Ít isolated hơn Docker

**➡️ Xem hướng dẫn chi tiết: [DEPLOY_PM2.md](./DEPLOY_PM2.md)**

### 🔵 2. Deploy với Docker (Khuyến nghị cho production)

**Ưu điểm:**

- ✅ Môi trường isolated và consistent
- ✅ Dễ scale và maintain
- ✅ Không phụ thuộc Node.js version trên server
- ✅ Portable và reproducible
- ✅ Health checks tự động

**Nhược điểm:**

- ⚠️ Cần hiểu biết về Docker
- ⚠️ Resource usage cao hơn một chút
- ⚠️ Setup phức tạp hơn

**➡️ Xem hướng dẫn chi tiết: [DEPLOY_DOCKER.md](./DEPLOY_DOCKER.md)**

---

## 🎯 So Sánh Chi Tiết

| Tiêu chí           | PM2                 | Docker                  |
| ------------------ | ------------------- | ----------------------- |
| **Độ khó setup**   | ⭐⭐ (Dễ)           | ⭐⭐⭐ (Trung bình)     |
| **Resource usage** | ⭐⭐⭐⭐⭐ (Thấp)   | ⭐⭐⭐⭐ (Trung bình)   |
| **Reliability**    | ⭐⭐⭐⭐ (Tốt)      | ⭐⭐⭐⭐⭐ (Rất tốt)    |
| **Scalability**    | ⭐⭐⭐ (Khá)        | ⭐⭐⭐⭐⭐ (Xuất sắc)   |
| **Maintenance**    | ⭐⭐⭐⭐ (Tốt)      | ⭐⭐⭐⭐⭐ (Rất tốt)    |
| **Learning curve** | ⭐⭐⭐⭐⭐ (Dễ học) | ⭐⭐⭐ (Cần học Docker) |

---

## 🛠️ Files Cần Thiết Đã Chuẩn Bị

### PM2 Deployment

- `ecosystem.config.js` - PM2 configuration
- `nginx-site.conf` - Nginx configuration
- `.env.production` - Environment variables (cần tạo)

### Docker Deployment

- `Dockerfile` - Docker image configuration
- `docker-compose.yml` - Docker Compose setup
- `.dockerignore` - Docker build optimization
- `nginx-site.conf` - Nginx configuration
- `.env.production` - Environment variables (cần tạo)

---

## 🚀 Quick Start

### Nếu chọn PM2:

```bash
# Xem hướng dẫn chi tiết
cat DEPLOY_PM2.md

# Hoặc đi thẳng tới step deploy
ssh root@103.199.17.168
```

### Nếu chọn Docker:

```bash
# Xem hướng dẫn chi tiết
cat DEPLOY_DOCKER.md

# Hoặc đi thẳng tới step deploy
ssh root@103.199.17.168
```

---

## 📞 Hỗ Trợ

- **PM2 Issues**: Xem troubleshooting trong `DEPLOY_PM2.md`
- **Docker Issues**: Xem troubleshooting trong `DEPLOY_DOCKER.md`
- **General VPS Issues**: Kiểm tra firewall, DNS, SSL configuration

**🎉 Chúc bạn deploy thành công!**
