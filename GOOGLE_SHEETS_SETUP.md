# Google Sheets Setup Guide

## Mục tiêu

Tích hợp Google Sheets để lưu dữ liệu RSVP từ form wedding invitation.

## Bước 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Ghi nhớ **Project ID** (sẽ cần cho `GOOGLE_PROJECT_ID`)

## Bước 2: Enable Google Sheets API

1. Trong Google Cloud Console, vào **APIs & Services** > **Library**
2. Tìm kiếm "Google Sheets API"
3. Click **Enable**

## Bước 3: Tạo Service Account

1. Vào **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **Service account**
3. Điền thông tin:
   - **Service account name**: `wedding-sheets-service`
   - **Description**: `Service account for wedding RSVP Google Sheets integration`
4. Click **CREATE AND CONTINUE**
5. Bỏ qua các bước khác, click **DONE**

## Bước 4: Tạo và Download Key

1. Trong danh sách Service accounts, click vào service account vừa tạo
2. Vào tab **KEYS**
3. Click **ADD KEY** > **Create new key**
4. Chọn **JSON** và click **CREATE**
5. File JSON sẽ được download - **GIỮ AN TOÀN FILE NÀY!**

## Bước 5: Chia sẻ Google Sheet

1. Mở Google Sheet: https://docs.google.com/spreadsheets/d/1s6b52Q2OJHsBQkMGdDRo4eydPYUFMvszpYVdBwaVqBs/edit
2. Click **Share** (góc trên bên phải)
3. Thêm email của Service Account (tìm trong file JSON: `client_email`)
4. Cấp quyền **Editor**
5. Click **Send**

## Bước 6: Setup Headers trong Google Sheet

Trong Google Sheet, thêm headers ở row 1:

- **A1**: Name
- **B1**: Confirm
- **C1**: Timestamp

## Bước 7: Cấu hình Environment Variables

### Cho Development (Local):

1. Copy file `.env.local.example` thành `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Mở file `.env.local` và điền thông tin từ file JSON service account:

```env
# Lấy từ file JSON đã download
GOOGLE_PROJECT_ID=your-actual-project-id
GOOGLE_PRIVATE_KEY_ID=your-actual-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-actual-private-key-content\n-----END PRIVATE KEY-----"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-actual-client-id
GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com

# Next.js
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### ⚠️ Lưu ý quan trọng cho GOOGLE_PRIVATE_KEY:

Private key trong JSON có format với `\\n`. Bạn cần format lại:

**Từ file JSON service account:**

```json
{
  "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhki...\\n-----END PRIVATE KEY-----\\n"
}
```

**Trong .env.local (thay thế `\\n` bằng `\n`):**

```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhki...\n-----END PRIVATE KEY-----"
```

### 🔧 Quick Setup Script:

Tạo file `setup-env.js` để tự động format private key:

```javascript
// setup-env.js
const fs = require("fs");

// Read your service account JSON file
const serviceAccount = JSON.parse(
  fs.readFileSync("./path-to-your-service-account.json", "utf8")
);

// Create .env.local content
const envContent = `# Google Sheets Integration
GOOGLE_PROJECT_ID=${serviceAccount.project_id}
GOOGLE_PRIVATE_KEY_ID=${serviceAccount.private_key_id}
GOOGLE_PRIVATE_KEY="${serviceAccount.private_key}"
GOOGLE_CLIENT_EMAIL=${serviceAccount.client_email}
GOOGLE_CLIENT_ID=${serviceAccount.client_id}
GOOGLE_CLIENT_X509_CERT_URL=${serviceAccount.client_x509_cert_url}

# Next.js
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_TELEMETRY_DISABLED=1
`;

fs.writeFileSync(".env.local", envContent);
console.log("✅ .env.local created successfully!");
```

Chạy script: `node setup-env.js`

## Bước 8: Kiểm tra setup

### 8.1. Test Connection:

```bash
npm run dev
```

### 8.2. Test RSVP Form:

1. Mở http://localhost:3000
2. Tìm và điền form RSVP
3. Submit form
4. Kiểm tra Google Sheets xem có dữ liệu mới không

### 8.3. Debug nếu có lỗi:

```bash
# Check logs trong terminal
npm run dev
# Submit form và xem console logs trong browser
```

### ❌ Common Issues:

**Lỗi "Request is missing required authentication credential":**

- ✅ Kiểm tra file `.env.local` có tồn tại không
- ✅ Restart development server: `Ctrl+C` rồi `npm run dev`
- ✅ Kiểm tra format của `GOOGLE_PRIVATE_KEY`
- ✅ Đảm bảo không có spaces thừa trong file `.env.local`

**Lỗi "Invalid JSON":**

- ✅ Kiểm tra `GOOGLE_PRIVATE_KEY` có đúng format không
- ✅ Đảm bảo có quotes và escape newlines đúng
- ✅ Sử dụng setup script ở trên để tự động format

**Lỗi "Permission denied":**

- ✅ Kiểm tra Service Account có quyền "Editor" trong Google Sheets
- ✅ Kiểm tra email Service Account có được share quyền chỉnh sửa sheet không

## Bước 8: Test Integration

1. Start development server:

```bash
npm run dev
```

2. Truy cập trang wedding và test form RSVP
3. Kiểm tra Google Sheet để xem data có được thêm vào không

## Bước 9: Deploy Production

### Cho VPS Deployment:

Tạo file `.env.production` trên server:

```env
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com

NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://loihangwedding.io.vn
NEXT_TELEMETRY_DISABLED=1
```

### Update docker-compose.simple.yml:

```yaml
version: "3.8"

services:
  wedding-app:
    build: .
    container_name: wedding-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    volumes:
      - ./public:/app/public:ro
```

## Troubleshooting

### Lỗi thường gặp:

1. **"Error: invalid_grant"**

   - Kiểm tra `GOOGLE_PRIVATE_KEY` có format đúng không
   - Đảm bảo Service Account có quyền access Google Sheet

2. **"Error: Requested entity was not found"**

   - Kiểm tra `SPREADSHEET_ID` có đúng không
   - Đảm bảo đã share sheet với service account

3. **"Error: The caller does not have permission"**

   - Kiểm tra đã enable Google Sheets API chưa
   - Kiểm tra service account có quyền Editor trong sheet

4. **"Error: Invalid private key"**
   - Format lại `GOOGLE_PRIVATE_KEY` với `\n` thay vì `\\n`

### Debug Steps:

1. Kiểm tra logs trong Docker:

```bash
docker logs wedding-app
```

2. Test API endpoint trực tiếp:

```bash
curl -X POST http://localhost:3000/api/submit-rsvp \
  -H "Content-Type: application/json" \
  -d '{"fullName": "Test User", "attendance": "yes"}'
```

## ✅ Hoàn thành!

Sau khi setup xong, form RSVP sẽ tự động ghi dữ liệu vào Google Sheet với format:

- **Cột A**: Tên người dùng
- **Cột B**: "Có tham dự" hoặc "Không tham dự"
- **Cột C**: Timestamp
