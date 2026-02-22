import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Check if ANY admin already exists
    const { data: admins, error: checkError } = await supabaseServer
      .from("admin_users")
      .select("id", { count: "exact" })
      .limit(1);

    if (!checkError && admins && admins.length > 0) {
      return NextResponse.json(
        { error: "Admin account already exists. Contact your administrator." },
        { status: 403 }
      );
    }

    const passwordHash = hashPassword(password);

    // Create new admin user
    const { data: admin, error } = await supabaseServer
      .from("admin_users")
      .insert({
        email,
        password_hash: passwordHash,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating admin:", error);
      return NextResponse.json(
        { error: "Failed to create admin account" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully",
      admin: { id: admin.id, email: admin.email },
    });
  } catch (error) {
    console.error("Admin setup error:", error);
    return NextResponse.json(
      { error: "Setup failed" },
      { status: 500 }
    );
  }
}
