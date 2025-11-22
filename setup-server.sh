#!/bin/bash

# Quick Setup Script for Ubuntu 22.04
# This script sets up the entire environment from scratch

set -e

echo "🔧 Setting up server environment..."

# Update system
echo "Updating system packages..."
apt update && apt upgrade -y

# Install Docker
echo "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose
echo "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    apt install docker-compose -y
fi

# Install Nginx
echo "Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt install nginx -y
    systemctl enable nginx
    systemctl start nginx
fi

# Install Certbot
echo "Installing Certbot..."
if ! command -v certbot &> /dev/null; then
    apt install certbot python3-certbot-nginx -y
fi

# Install additional tools
echo "Installing additional tools..."
apt install -y git curl wget nano htop ufw

# Configure firewall
echo "Configuring firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable

# Create project directory
echo "Creating project directory..."
mkdir -p /var/www/loihangwedding
mkdir -p /var/www/certbot

# Set permissions
chown -R $USER:$USER /var/www/loihangwedding

echo "✅ Server environment setup completed!"
echo ""
echo "Next steps:"
echo "1. Upload your project files to /var/www/loihangwedding"
echo "2. Run the deployment script: ./deploy.sh"
echo ""
echo "Server information:"
echo "  IP Address: $(curl -s ifconfig.me)"
echo "  Docker: $(docker --version)"
echo "  Docker Compose: $(docker-compose --version)"
echo "  Nginx: $(nginx -v 2>&1)"
echo "  Certbot: $(certbot --version 2>&1)"
