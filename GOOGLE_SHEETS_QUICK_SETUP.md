# Quick Setup cho Google Sheets Integration

## 🚀 Cách nhanh nhất (Recommended)

### 1. Download Service Account JSON

- Làm theo GOOGLE_SHEETS_SETUP.md từ bước 1-6
- Download file JSON và đổi tên thành `service-account.json`
- Đặt file này trong project root

### 2. Chạy setup script tự động

```bash
node setup-google-sheets.js
```

Script sẽ:

- ✅ Tự động đọc service-account.json
- ✅ Tạo file .env.local với format đúng
- ✅ Escape private key correctly
- ✅ Validate tất cả required fields

### 3. Update Google Sheet ID

```bash
# Mở .env.local và thay:
GOOGLE_SHEET_ID=your-google-sheet-id-here

# Bằng Sheet ID thực tế từ URL Google Sheets:
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

### 4. Test

```bash
npm run dev
# Mở http://localhost:3000
# Test RSVP form
```

## 🛠️ Manual Setup (nếu script không work)

Xem chi tiết trong `GOOGLE_SHEETS_SETUP.md`

## ❌ Troubleshooting

**Script báo lỗi "Không tìm thấy file JSON":**

```bash
# Đảm bảo file có tên đúng:
ls -la service-account.json  # hoặc
ls -la credentials.json      # hoặc
ls -la google-service-account.json
```

**Lỗi permission:**

```bash
chmod +x setup-google-sheets.js
node setup-google-sheets.js
```

**Private key format issues:**
Script tự động fix format, nhưng nếu vẫn lỗi:

- Kiểm tra file JSON có đúng format không
- Re-download file từ Google Cloud Console

## 📖 Full Documentation

Xem `GOOGLE_SHEETS_SETUP.md` để hiểu đầy đủ process.
