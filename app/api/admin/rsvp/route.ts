import { NextRequest, NextResponse } from "next/server";
import { readFromSheet } from "@/lib/googleSheets";

// Simple authentication - in production use proper auth
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wedding2025";

export async function GET(request: NextRequest) {
  try {
    // Simple password protection
    const password = request.nextUrl.searchParams.get("password");
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Read data from Google Sheets
    const data = await readFromSheet();

    return NextResponse.json({
      success: true,
      data: data,
      total: data.length - 1, // Minus header row
    });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
