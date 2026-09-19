import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";
import {
  ShoppingBag,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import { SignIn, SignUp } from "@clerk/clerk-react";

export const LoginView = () => {
  const {
    login,
    clerkPublishableKey,
    setClerkPublishableKey,
    isClerkActive,
    showToast,
  } = useApp();

  const [authMode, setAuthMode] = useState("login"); // 'login', 'signup', 'clerk-config'
  const [email, setEmail] = useState("admin@shopwave.com");
  const [password, setPassword] = useState("admin123");
  const [name, setName] = useState("Vineet");
  const [inputClerkKey, setInputClerkKey] = useState(
    clerkPublishableKey || ""
  );
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill both email and password.");
      return;
    }
    const success = login(email, password, name);
    if (!success) {
      setError("Invalid credentials.");
    }
  };

  const handleQuickDemo = () => {
    login("admin@shopwave.com", "admin123", "Vineet");
  };

  const handleSaveClerkKey = (e) => {
    e.preventDefault();
    if (!inputClerkKey.trim().startsWith("pk_")) {
      setError(
        "Please enter a valid Clerk Publishable Key starting with pk_test_ or pk_live_"
      );
      return;
    }
    setClerkPublishableKey(inputClerkKey.trim());
    showToast("Clerk Publishable Key saved successfully!");
    setAuthMode("login");
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-md p-6 sm:p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-md bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            ShopWave Portal
          </h1>
          <p className="text-xs text-slate-500">
            Smart. Simple. Shopping. Admin & Store Management
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => {
              setAuthMode("login");
              setError("");
            }}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${
              authMode === "login"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("signup");
              setError("");
            }}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-all ${
              authMode === "signup"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("clerk-config");
              setError("");
            }}
            className={`py-1.5 px-2.5 rounded-md font-semibold transition-all flex items-center gap-1 ${
              authMode === "clerk-config"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Clerk Settings"
          >
            <KeyRound className="w-3.5 h-3.5" /> Clerk
          </button>
        </div>

        {/* 1-Click Demo Login Banner */}
        {authMode !== "clerk-config" && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-xs text-blue-900 flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <p className="font-semibold text-blue-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Quick Access
                Mode
              </p>
              <p className="text-[11px] text-blue-700 font-mono">
                admin@shopwave.com / admin123
              </p>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleQuickDemo}
            >
              1-Click Login
            </Button>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* MODE 1: CLERK KEY SETUP */}
        {authMode === "clerk-config" && (
          <form onSubmit={handleSaveClerkKey} className="space-y-4 text-xs">
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-md space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-semibold">
                <KeyRound className="w-4 h-4 text-blue-600" />
                <span>Connect Your Clerk Account</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Paste your <strong>Publishable Key</strong> from Clerk
                Dashboard (
                <a
                  href="https://dashboard.clerk.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline inline-flex items-center gap-0.5"
                >
                  dashboard.clerk.com <ExternalLink className="w-2.5 h-2.5" />
                </a>
                ).
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Clerk Publishable Key
              </label>
              <input
                type="text"
                required
                placeholder="pk_test_... or pk_live_..."
                value={inputClerkKey}
                onChange={(e) => setInputClerkKey(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900 font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="primary" fullWidth>
                Save & Activate Clerk
              </Button>
              {clerkPublishableKey && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setClerkPublishableKey("");
                    setInputClerkKey("");
                    showToast("Switched back to standard login.");
                  }}
                >
                  Reset
                </Button>
              )}
            </div>
          </form>
        )}

        {/* MODE 2: SIGN IN / SIGN UP */}
        {authMode !== "clerk-config" && (
          <>
            {isClerkActive ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  {authMode === "login" ? (
                    <SignIn
                      routing="hash"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "bg-transparent shadow-none border-none p-0 text-slate-900",
                          headerTitle: "text-slate-900",
                          headerSubtitle: "text-slate-500",
                          socialButtonsBlockButton:
                            "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200",
                          formButtonPrimary:
                            "bg-blue-600 hover:bg-blue-700 text-white rounded-md",
                          formFieldInput:
                            "bg-white border-slate-300 text-slate-900 rounded-md",
                          formFieldLabel: "text-slate-700",
                          footerActionLink: "text-blue-600",
                        },
                      }}
                    />
                  ) : (
                    <SignUp
                      routing="hash"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "bg-transparent shadow-none border-none p-0 text-slate-900",
                          headerTitle: "text-slate-900",
                          headerSubtitle: "text-slate-500",
                          socialButtonsBlockButton:
                            "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200",
                          formButtonPrimary:
                            "bg-blue-600 hover:bg-blue-700 text-white rounded-md",
                          formFieldInput:
                            "bg-white border-slate-300 text-slate-900 rounded-md",
                          formFieldLabel: "text-slate-700",
                          footerActionLink: "text-blue-600",
                        },
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
                {authMode === "signup" && (
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="admin@shopwave.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="....."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-600 text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Remember session</span>
                  </label>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  {authMode === "signup"
                    ? "Create Account & Sign In"
                    : "Sign In to Dashboard"}
                </Button>
              </form>
            )}
          </>
        )}

        <div className="pt-2 text-center text-slate-500 text-[11px] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>
            {isClerkActive
              ? "Protected by Clerk Authentication"
              : "Secured Session with LocalStorage Sync"}
          </span>
        </div>
      </div>
    </div>
  );
};
