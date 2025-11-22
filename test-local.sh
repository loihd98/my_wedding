#!/bin/bash

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}     LOCAL TEST BEFORE DEPLOY        ${NC}"
echo -e "${BLUE}======================================${NC}"

# Kiểm tra Docker
echo -e "${YELLOW}1. Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker is available${NC}"

# Kiểm tra Docker Compose
echo -e "${YELLOW}2. Checking Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose is available${NC}"

# Build image
echo -e "${YELLOW}3. Building Docker image...${NC}"
if docker build -t wedding-app-test .; then
    echo -e "${GREEN}✓ Docker image built successfully${NC}"
else
    echo -e "${RED}✗ Failed to build Docker image${NC}"
    exit 1
fi

# Test chạy container
echo -e "${YELLOW}4. Testing container...${NC}"
if docker run -d --name wedding-test -p 3001:3000 wedding-app-test; then
    echo -e "${GREEN}✓ Container started successfully${NC}"
    
    # Đợi container khởi động
    echo -e "${YELLOW}5. Waiting for container to be ready...${NC}"
    sleep 15
    
    # Test HTTP response
    echo -e "${YELLOW}6. Testing HTTP response...${NC}"
    if curl -f http://localhost:3001 > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Application is responding correctly${NC}"
        echo -e "${GREEN}✓ Local test PASSED!${NC}"
        echo -e "${BLUE}You can test at: http://localhost:3001${NC}"
    else
        echo -e "${RED}✗ Application is not responding${NC}"
        docker logs wedding-test
    fi
else
    echo -e "${RED}✗ Failed to start container${NC}"
    exit 1
fi

echo -e "${BLUE}======================================${NC}"
echo -e "${YELLOW}Test completed. Clean up with:${NC}"
echo -e "${YELLOW}docker stop wedding-test && docker rm wedding-test && docker rmi wedding-app-test${NC}"
echo -e "${BLUE}======================================${NC}"