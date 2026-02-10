"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import { CommunityHeader } from "./components/community/CommunityHeader";
import { Sidebar } from "./components/community/Sidebar";
import { PostList } from "./components/community/PostList";
import { RegistrationModal } from "./components/auth/RegistrationModal";
import { SignInModal } from "./components/auth/SignInModal";
import { LogoutModal } from "./components/auth/LogoutModal";
import { EmailVerification } from "./components/auth/EmailVerification";
import { RegistrationSuccess } from "./components/auth/RegistrationSuccess";
import { useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import { useEmailVerification } from "./hooks/useEmailVerification";
import type { Post, RegistrationData, SignInData } from "./types/community";

export default function CommunityHub() {
  // Hooks
  const {
    user,
    isLoading: authLoading,
    isCheckingAuth,
    error: authError,
    setError: setAuthError,
    signUp,
    signIn,
    signOut,
    resendVerificationEmail,
  } = useAuth();

  const { isDark, toggleTheme } = useTheme();

  const {
    registrationStep,
    verificationEmail,
    setRegistrationStep,
    startWaitingForVerification,
    resetVerification,
  } = useEmailVerification();

  // Local state
  const [activeTab, setActiveTab] = useState<"latest" | "most_discussed">(
    "latest"
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 500);
  };

  const handleRegisterSubmit = async (data: RegistrationData) => {
    const result = await signUp(data);

    if (result.success && result.email) {
      // Keep showRegisterModal=true so the EmailVerification modal renders
      startWaitingForVerification(result.email);
    }
  };

  const handleSignInSubmit = async (data: SignInData) => {
    const result = await signIn(data);

    if (result.success) {
      setShowSignInModal(false);
    }
  };

  const handleLogout = async () => {
    const result = await signOut();

    if (result.success) {
      setShowLogoutModal(false);
    }
  };

  const closeRegistrationFlow = () => {
    setShowRegisterModal(false);
    resetVerification();
    setAuthError("");
  };

  const handleCreatePost = () => {
    // TODO: Navigate to create post
    console.log("Create post clicked");
  };

  // Mock data
  const posts: Post[] = [
    {
      id: "1",
      author: "Emmanuel Dela Pena",
      avatar: "🔵",
      timeAgo: "1 day ago",
      badge: "STI College Baliuag",
      title: "We're officially live!",
      content:
        "Currently preparing my portfolio for deployment after completing local development. Final refinements and testing are underway.",
      comments: 0,
    },
  ];

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="community-hub-page">
        <CommunityHeader
          isDark={isDark}
          isRefreshing={false}
          onToggleTheme={toggleTheme}
          onRefresh={() => {}}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Loader size={40} className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="community-hub-page">
      <CommunityHeader
        isDark={isDark}
        isRefreshing={isRefreshing}
        onToggleTheme={toggleTheme}
        onRefresh={handleRefresh}
      />

      <div className="container">
        <div className="community-grid">
          <Sidebar
            user={user}
            onRegisterClick={() => setShowRegisterModal(true)}
            onSignInClick={() => setShowSignInModal(true)}
            onLogoutClick={() => setShowLogoutModal(true)}
            onCreatePostClick={handleCreatePost}
          />

          <main className="community-main">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "latest" ? "active" : ""}`}
                onClick={() => setActiveTab("latest")}
              >
                Latest
              </button>
              <button
                className={`tab ${activeTab === "most_discussed" ? "active" : ""}`}
                onClick={() => setActiveTab("most_discussed")}
              >
                Most Discussed
              </button>
            </div>

            <PostList posts={posts} />
          </main>
        </div>
      </div>

      {/* Registration form — only shown on the "form" step */}
      {registrationStep === "form" && (
        <RegistrationModal
          isOpen={showRegisterModal}
          isLoading={authLoading}
          error={authError}
          onClose={closeRegistrationFlow}
          onSubmit={handleRegisterSubmit}
          onSwitchToSignIn={() => {
            closeRegistrationFlow();
            setShowSignInModal(true);
          }}
        />
      )}

      {/* Email verification waiting screen
          isOpen is always true here because this component only mounts
          when registrationStep === "waiting", so showRegisterModal is guaranteed true */}
      {registrationStep === "waiting" && showRegisterModal && (
        <EmailVerification
          isOpen={true}
          email={verificationEmail}
          onResend={() => resendVerificationEmail(verificationEmail)}
          onClose={closeRegistrationFlow}
        />
      )}

      {/* Success screen after email confirmed */}
      {registrationStep === "success" && showRegisterModal && (
        <RegistrationSuccess
          isOpen={true}
          onClose={closeRegistrationFlow}
        />
      )}

      <SignInModal
        isOpen={showSignInModal}
        isLoading={authLoading}
        error={authError}
        onClose={() => {
          setShowSignInModal(false);
          setAuthError("");
        }}
        onSubmit={handleSignInSubmit}
        onSwitchToRegister={() => {
          setShowSignInModal(false);
          setShowRegisterModal(true);
          setRegistrationStep("form");
          setAuthError("");
        }}
      />

      <LogoutModal
        isOpen={showLogoutModal}
        isLoading={authLoading}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <footer style={{ marginTop: 50 }}>
        <p>&copy; 2026 Emmanuel Dela Pena. All Rights Reserved.</p>
        <p>Developed in Baliuag City, Bulacan, Philippines</p>
      </footer>
    </div>
  );
}