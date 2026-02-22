import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check if admin has a valid token cookie
    const token = request.cookies.get("admin_token");

    if (token) {
      return NextResponse.json({
        isOnline: true,
        status: "ONLINE",
      });
    }

    return NextResponse.json({
      isOnline: false,
      status: "Emman is busy playing guitar",
    });
  } catch (error) {
    console.error("Admin status error:", error);
    return NextResponse.json(
      {
        isOnline: false,
        status: "Emman is busy playing guitar",
      },
      { status: 200 } // Still return 200 even on error
    );
  }
}
