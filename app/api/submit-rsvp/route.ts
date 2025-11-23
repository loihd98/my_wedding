import { NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, attendance, timestamp, url } = body;

    // Validation
    if (!fullName || !attendance) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      );
    }

    // Log RSVP data locally
    console.log("New RSVP:", {
      fullName,
      attendance,
      timestamp,
      url: url || "No URL provided",
      ip: request.ip || request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
    });

    // Save to Google Sheets
    try {
      await appendToSheet(fullName, attendance, url);
      console.log("Successfully saved to Google Sheets");
    } catch (sheetError) {
      console.error("Google Sheets error:", sheetError);
      // Continue even if sheets fails - we don't want to break user experience
      // In production, you might want to save to a local database as backup
    }

    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn đã xác nhận tham dự! Thông tin đã được ghi nhận.",
    });
  } catch (error) {
    console.error("RSVP API Error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
