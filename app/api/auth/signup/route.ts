import { supabaseServer } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

interface ProfileData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  school: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profileData: ProfileData = body;

    // Use service role to bypass RLS and create the profile
    const { error: profileError } = await supabaseServer
      .from("profiles")
      .insert([profileData])
      .select();

    if (profileError) {
      // Ignore duplicate key errors (user already registered)
      if (profileError.code !== "23505") {
        return NextResponse.json(
          { error: `Failed to create profile: ${profileError.message}` },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create profile" },
      { status: 500 }
    );
  }
}
