"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/community/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Supabase puts the tokens in the URL hash fragment
    // getSession() will automatically parse and store them
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        router.replace("/?error=confirmation_failed");
        return;
      }

      if (data.session) {
        // Successfully confirmed — redirect back to community page
        // The onAuthStateChange listener in useEmailVerification will
        // detect the SIGNED_IN event and show the success popup
        router.replace("/community");
      } else {
        router.replace("/community");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontSize: "1.1rem",
      }}
    >
      Confirming your email...
    </div>
  );
}