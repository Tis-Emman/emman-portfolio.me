"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import type { RegistrationStep } from "../types/community";

export function useEmailVerification() {
  const [registrationStep, setRegistrationStep] =
    useState<RegistrationStep>("form");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false);

  const waitingRef = useRef(false);

  useEffect(() => {
    waitingRef.current = waitingForConfirmation;
  }, [waitingForConfirmation]);

  // Method 1: onAuthStateChange — fires if confirmation happens in same tab
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        (event === "SIGNED_IN" || event === "USER_UPDATED") &&
        session?.user?.email_confirmed_at &&
        waitingRef.current
      ) {
        setRegistrationStep("success");
        setWaitingForConfirmation(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Method 2: Check session when user returns to this tab after confirming
  // in a different tab (the most common flow)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && waitingRef.current) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user?.email_confirmed_at) {
          setRegistrationStep("success");
          setWaitingForConfirmation(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Method 3: Fallback polling every 3 seconds while waiting
  // Catches edge cases where neither of the above fire
  useEffect(() => {
    if (!waitingForConfirmation) return;

    const interval = setInterval(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.email_confirmed_at) {
        setRegistrationStep("success");
        setWaitingForConfirmation(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [waitingForConfirmation]);

  const startWaitingForVerification = (email: string) => {
    setVerificationEmail(email);
    setRegistrationStep("waiting");
    setWaitingForConfirmation(true);
  };

  const resetVerification = () => {
    setRegistrationStep("form");
    setVerificationEmail("");
    setWaitingForConfirmation(false);
  };

  return {
    registrationStep,
    verificationEmail,
    setRegistrationStep,
    startWaitingForVerification,
    resetVerification,
  };
}