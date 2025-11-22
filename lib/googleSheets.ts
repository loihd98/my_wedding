import { google } from "googleapis";

// Google Sheets configuration
const SPREADSHEET_ID = "1s6b52Q2OJHsBQkMGdDRo4eydPYUFMvszpYVdBwaVqBs";
const SHEET_NAME = "Sheet1";
const RANGE = "Sheet1!A:D"; // Name, Attendance, Timestamp, URL

export async function appendToSheet(
  name: string,
  attendance: string,
  url?: string
) {
  try {
    // Check if all required environment variables are present
    const requiredEnvVars = [
      "GOOGLE_PROJECT_ID",
      "GOOGLE_PRIVATE_KEY_ID",
      "GOOGLE_PRIVATE_KEY",
      "GOOGLE_CLIENT_EMAIL",
      "GOOGLE_CLIENT_ID",
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );
    if (missingVars.length > 0) {
      console.log("Missing environment variables:", missingVars);
      throw new Error(
        `Missing required environment variables: ${missingVars.join(
          ", "
        )}. Please check your .env.local file.`
      );
    }

    console.log("Google Sheets credentials check passed");

    // Service account credentials from environment
    const credentials = {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    };

    // Create auth client with credentials object
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Create sheets API client
    const sheets = google.sheets({ version: "v4", auth });

    // Prepare data to append
    const attendanceText =
      attendance === "yes" ? "Có tham dự" : "Không tham dự";
    const timestamp = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const values = [
      [name, attendanceText, timestamp, url || ""], // Name, Attendance, Timestamp, URL
    ];

    console.log("Attempting to append to Google Sheets:", {
      name,
      attendanceText,
      timestamp,
    });

    // Check if sheet has headers - if not, add them
    try {
      const checkResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "A1:D1",
      });

      // If no data or first row is empty, add headers
      if (
        !checkResponse.data.values ||
        checkResponse.data.values.length === 0
      ) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: "A1:D1",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [["Tên khách mời", "Tham dự", "Thời gian", "URL"]],
          },
        });
        console.log("Added headers to Google Sheets");
      }
    } catch (headerError) {
      console.log(
        "Could not check/add headers, proceeding with append:",
        headerError
      );
    }

    // Append data to sheet using proper range format
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "A:D", // Use simple range format
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: values,
      },
    });

    console.log("Successfully added to Google Sheets:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    throw new Error("Failed to save to Google Sheets");
  }
}

// Function to read from sheet (optional - for admin view)
export async function readFromSheet() {
  try {
    const requiredEnvVars = [
      "GOOGLE_PROJECT_ID",
      "GOOGLE_PRIVATE_KEY_ID",
      "GOOGLE_PRIVATE_KEY",
      "GOOGLE_CLIENT_EMAIL",
      "GOOGLE_CLIENT_ID",
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(", ")}`
      );
    }

    const credentials = {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    return response.data.values || [];
  } catch (error) {
    console.error("Error reading from Google Sheets:", error);
    throw new Error("Failed to read from Google Sheets");
  }
}
