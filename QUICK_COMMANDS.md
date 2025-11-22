# Quick Deploy Commands

## VPS Info

- IP: 103.199.17.168
- Domain: loihangwedding.io.vn
- User: deploy

## 1. Connect to VPS

```bash
ssh deploy@103.199.17.168
```

## 2. Clone Project (on VPS)

```bash
cd /home/deploy
git clone https://github.com/loihd98/my_wedding.git
cd my_wedding
```

## 3. Simple Deploy

```bash
# Build and run
docker-compose -f docker-compose.simple.yml up -d --build

# Check status
docker ps
docker logs wedding-app
```

## 4. Update Code

```bash
git pull origin main
docker-compose -f docker-compose.simple.yml up -d --build
```

## 5. Common Commands

```bash
# View logs
docker logs -f wedding-app

# Restart
docker-compose -f docker-compose.simple.yml restart

# Stop
docker-compose -f docker-compose.simple.yml down

# Check nginx
sudo systemctl status nginx
sudo nginx -t
```

For detailed setup guide: **DEPLOY_GUIDE.md**
