import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import {
  SignIn,
  SignUp,
  useClerk,
  useUser
} from '@clerk/clerk-react';

export const LoginView = () => {
  const {
    login,
    clerkPublishableKey,
    setClerkPublishableKey,
    isClerkActive,
    showToast
  } = useApp();

  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'clerk-config'
  const [email, setEmail] = useState('admin@shopwave.com');
  const [password, setPassword] = useState('admin123');
  const [name, setName] = useState('Vineet');
  const [inputClerkKey, setInputClerkKey] = useState(clerkPublishableKey || '');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill both email and password.');
      return;
    }
    const success = login(email, password, name);
    if (!success) {
      setError('Invalid credentials.');
    }
  };

  const handleQuickDemo = () => {
    login('admin@shopwave.com', 'admin123', 'Vineet');
  };

  const handleSaveClerkKey = (e) => {
    e.preventDefault();
    if (!inputClerkKey.trim().startsWith('pk_')) {
      setError('Please enter a valid Clerk Publishable Key starting with pk_test_ or pk_live_');
      return;
    }
    setClerkPublishableKey(inputClerkKey.trim());
    showToast('Clerk Publishable Key saved successfully!');
    setAuthMode('login');
  };

  return (
    <div className="min-h-screen w-full bg-[#0c1322] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#131b2e] border border-[#1e2a44] rounded-3xl p-7 sm:p-8 shadow-2xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-pink-600 via-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">ShopWave Portal</h1>
          <p className="text-xs text-slate-400">Smart. Simple. Shopping. Admin & Store Management</p>
        </div>

        {/* Tab Navigation: Sign In / Sign Up / Clerk Config */}
        <div className="flex bg-[#0c1322] p-1 rounded-2xl border border-[#1e2a44] text-xs">
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setError(''); }}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${
              authMode === 'login' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setError(''); }}
            className={`flex-1 py-2 rounded-xl font-bold transition-all ${
              authMode === 'signup' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('clerk-config'); setError(''); }}
            className={`py-2 px-3 rounded-xl font-bold transition-all flex items-center gap-1 ${
              authMode === 'clerk-config' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Clerk Authentication Settings"
          >
            <KeyRound className="w-3.5 h-3.5" /> Clerk Key
          </button>
        </div>

        {/* 1-Click Demo Login Banner */}
        {authMode !== 'clerk-config' && (
          <div className="bg-blue-950/40 border border-blue-800/40 rounded-2xl p-3 text-xs text-blue-300 flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <p className="font-semibold text-blue-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Quick Access Mode
              </p>
              <p className="text-[11px] text-blue-400 font-mono">admin@shopwave.com / admin123</p>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-[11px] shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              1-Click Login
            </button>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* MODE 1: CLERK KEY SETUP */}
        {authMode === 'clerk-config' && (
          <form onSubmit={handleSaveClerkKey} className="space-y-4 text-xs">
            <div className="p-3.5 bg-pink-950/30 border border-pink-800/30 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-pink-300 font-bold">
                <KeyRound className="w-4 h-4 text-pink-400" />
                <span>Connect Your Clerk Account</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Apna Clerk Dashboard (<a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" className="text-pink-400 underline inline-flex items-center gap-0.5">dashboard.clerk.com <ExternalLink className="w-2.5 h-2.5" /></a>) se <strong>Publishable Key</strong> copy karke niche paste karein.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Clerk Publishable Key</label>
              <input
                type="text"
                required
                placeholder="pk_test_... or pk_live_..."
                value={inputClerkKey}
                onChange={(e) => setInputClerkKey(e.target.value)}
                className="w-full bg-[#0c1322] border border-[#1e2a44] rounded-xl px-3.5 py-2.5 text-white font-mono text-xs placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg transition-all text-xs"
              >
                Save & Activate Clerk
              </button>
              {clerkPublishableKey && (
                <button
                  type="button"
                  onClick={() => {
                    setClerkPublishableKey('');
                    setInputClerkKey('');
                    showToast('Switched back to standard login.');
                  }}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        )}

        {/* MODE 2: SIGN IN / SIGN UP (Standard / Clerk Integration) */}
        {authMode !== 'clerk-config' && (
          <>
            {isClerkActive ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  {authMode === 'login' ? (
                    <SignIn
                      routing="hash"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "bg-transparent shadow-none border-none p-0 text-white",
                          headerTitle: "text-white",
                          headerSubtitle: "text-slate-400",
                          socialButtonsBlockButton: "bg-slate-800 border-slate-700 text-white hover:bg-slate-700",
                          formButtonPrimary: "bg-blue-600 hover:bg-blue-500 text-white",
                          formFieldInput: "bg-[#0c1322] border-slate-700 text-white",
                          formFieldLabel: "text-slate-300",
                          footerActionLink: "text-blue-400",
                        }
                      }}
                    />
                  ) : (
                    <SignUp
                      routing="hash"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "bg-transparent shadow-none border-none p-0 text-white",
                          headerTitle: "text-white",
                          headerSubtitle: "text-slate-400",
                          socialButtonsBlockButton: "bg-slate-800 border-slate-700 text-white hover:bg-slate-700",
                          formButtonPrimary: "bg-blue-600 hover:bg-blue-500 text-white",
                          formFieldInput: "bg-[#0c1322] border-slate-700 text-white",
                          formFieldLabel: "text-slate-300",
                          footerActionLink: "text-blue-400",
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#0c1322] border border-[#1e2a44] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="admin@shopwave.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0c1322] border border-[#1e2a44] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="....."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#0c1322] border border-[#1e2a44] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-400 text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0"
                    />
                    <span>Remember session</span>
                  </label>
                  <span className="text-blue-400 hover:underline cursor-pointer">Forgot password?</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span>{authMode === 'signup' ? 'Create Account & Sign In' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </>
        )}

        <div className="pt-2 text-center text-slate-500 text-[11px] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{isClerkActive ? 'Protected by Clerk Authentication' : 'Secured Session with LocalStorage Sync'}</span>
        </div>
      </div>
    </div>
  );
};
