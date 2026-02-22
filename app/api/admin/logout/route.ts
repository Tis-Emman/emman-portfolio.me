import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST() {
  try {
    // Set admin as offline
    const { data: admins } = await supabaseServer
      .from("admin_users")
      .select("id")
      .limit(1);

    if (admins && admins.length > 0) {
      await supabaseServer
        .from("admin_users")
        .update({ is_online: false })
        .eq("id", admins[0].id);
    }
  } catch (error) {
    console.error("Error updating admin status:", error);
  }

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });

  return response;
}
