#!/usr/bin/env node

/**
 * Google Sheets Setup Helper Script
 * Tự động tạo .env.local từ Google Service Account JSON
 */

const fs = require("fs");
const path = require("path");

console.log("🚀 Google Sheets Setup Helper\n");

// Check if service account JSON file exists
const possiblePaths = [
  "./service-account.json",
  "./credentials.json",
  "./google-service-account.json",
];

let serviceAccountPath = null;

for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    serviceAccountPath = p;
    break;
  }
}

if (!serviceAccountPath) {
  console.error("❌ Không tìm thấy file service account JSON!");
  console.log("📋 Hãy đặt file JSON với tên:");
  console.log("   - service-account.json");
  console.log("   - credentials.json");
  console.log("   - google-service-account.json");
  console.log("\n📖 Xem GOOGLE_SHEETS_SETUP.md để biết cách download file này");
  process.exit(1);
}

try {
  // Read service account JSON
  console.log(`📖 Đang đọc ${serviceAccountPath}...`);
  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );

  // Validate required fields
  const requiredFields = [
    "project_id",
    "private_key",
    "client_email",
    "private_key_id",
    "client_id",
    "client_x509_cert_url",
  ];
  const missingFields = requiredFields.filter(
    (field) => !serviceAccount[field]
  );

  if (missingFields.length > 0) {
    console.error("❌ Service account JSON thiếu các field:");
    missingFields.forEach((field) => console.log(`   - ${field}`));
    process.exit(1);
  }

  // Create .env.local content
  const envContent = `# Google Sheets Integration
GOOGLE_PROJECT_ID=${serviceAccount.project_id}
GOOGLE_PRIVATE_KEY_ID=${serviceAccount.private_key_id}
GOOGLE_PRIVATE_KEY="${serviceAccount.private_key}"
GOOGLE_CLIENT_EMAIL=${serviceAccount.client_email}
GOOGLE_CLIENT_ID=${serviceAccount.client_id}
GOOGLE_CLIENT_X509_CERT_URL=${serviceAccount.client_x509_cert_url}

# Google Sheets Configuration  
GOOGLE_SHEET_ID=your-google-sheet-id-here

# Next.js Configuration
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_TELEMETRY_DISABLED=1
`;

  // Write .env.local
  console.log("📝 Đang tạo .env.local...");
  fs.writeFileSync(".env.local", envContent);

  console.log("✅ .env.local đã được tạo thành công!");
  console.log("\n📋 Tiếp theo:");
  console.log(
    '1. Mở .env.local và thay "your-google-sheet-id-here" bằng Sheet ID thực tế'
  );
  console.log("2. Chạy: npm run dev");
  console.log("3. Test RSVP form trên http://localhost:3000");

  // Show Google Sheets ID help
  console.log("\n💡 Để lấy Google Sheet ID:");
  console.log("   URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit");
  console.log("   Copy phần [SHEET_ID] và paste vào .env.local");
} catch (error) {
  console.error("❌ Lỗi khi đọc service account JSON:", error.message);
  console.log("\n🔧 Kiểm tra:");
  console.log("   - File JSON có đúng format không?");
  console.log("   - File có bị corrupt không?");
  process.exit(1);
}
