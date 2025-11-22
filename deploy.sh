#!/bin/bash

# Deployment Script for Loi & Hang Wedding Website
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/loihangwedding"
DOMAIN="loihangwedding.io.vn"
EMAIL="your@email.com"

echo -e "${YELLOW}Step 1: Checking prerequisites...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Installing...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Installing...${NC}"
    apt install docker-compose -y
fi

# Check if Nginx is installed
if ! command -v nginx &> /dev/null; then
    echo -e "${RED}Nginx is not installed. Installing...${NC}"
    apt install nginx -y
fi

echo -e "${GREEN}✓ Prerequisites checked${NC}"

echo -e "${YELLOW}Step 2: Building Docker image...${NC}"
cd "$PROJECT_DIR"
docker-compose build --no-cache

echo -e "${GREEN}✓ Docker image built${NC}"

echo -e "${YELLOW}Step 3: Starting container...${NC}"
docker-compose down
docker-compose up -d

echo -e "${GREEN}✓ Container started${NC}"

echo -e "${YELLOW}Step 4: Configuring Nginx...${NC}"

# Copy nginx config if it doesn't exist
if [ ! -f "/etc/nginx/sites-available/$DOMAIN" ]; then
    cp nginx.conf "/etc/nginx/sites-available/$DOMAIN"
    ln -sf "/etc/nginx/sites-available/$DOMAIN" /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
fi

# Test nginx config
nginx -t

# Reload nginx
systemctl reload nginx

echo -e "${GREEN}✓ Nginx configured${NC}"

echo -e "${YELLOW}Step 5: Setting up SSL...${NC}"

# Check if SSL certificate exists
if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
    echo -e "${YELLOW}Obtaining SSL certificate...${NC}"
    
    # Install certbot if not installed
    if ! command -v certbot &> /dev/null; then
        apt install certbot python3-certbot-nginx -y
    fi
    
    # Create certbot directory
    mkdir -p /var/www/certbot
    
    # Obtain certificate
    certbot certonly --webroot \
        -w /var/www/certbot \
        -d "$DOMAIN" \
        -d "www.$DOMAIN" \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        --non-interactive
    
    # Setup auto-renewal
    (crontab -l 2>/dev/null; echo "0 0 * * * certbot renew --quiet && systemctl reload nginx") | crontab -
    
    echo -e "${GREEN}✓ SSL certificate obtained${NC}"
else
    echo -e "${GREEN}✓ SSL certificate already exists${NC}"
fi

echo -e "${YELLOW}Step 6: Final checks...${NC}"

# Check if container is running
if [ "$(docker ps -q -f name=loihangwedding)" ]; then
    echo -e "${GREEN}✓ Container is running${NC}"
else
    echo -e "${RED}✗ Container is not running${NC}"
    docker-compose logs
    exit 1
fi

# Check if nginx is running
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx is running${NC}"
else
    echo -e "${RED}✗ Nginx is not running${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}Your website is now available at:${NC}"
echo -e "${GREEN}  https://$DOMAIN${NC}"
echo -e "${GREEN}  https://www.$DOMAIN${NC}"

# Display logs
echo -e "\n${YELLOW}Showing recent logs...${NC}"
docker-compose logs --tail=50
