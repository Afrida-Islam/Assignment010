import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserCheck,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  Zap,
  Globe,
  Trophy,
} from "lucide-react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toastStyle = {
    borderRadius: "15px",
    background: "#059e4a",
    color: "#fff",
    border: "1px solid #f97316",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const validateForm = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome Back to SkillSet!", {
        icon: "🔥",
        style: toastStyle,
      });

      navigate("/");
    } catch (err) {
      const message =
        err.code === "auth/invalid-credential"
          ? "The email or password provided is incorrect."
          : "Authentication failed. Please try again.";
      setError(message);
      toast.error(message, { style: toastStyle });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success(`Hello, ${result.user.displayName.split(" ")[0]}!`, {
          icon: "🚀",
          style: toastStyle,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Google login failed:", error);
        setError(error.message);
      });
  };

  const fillDemo = (role) => {
    setEmail(role === "admin" ? "admin@skillset.com" : "user@skillset.com");
    setPassword(role === "admin" ? "admin123" : "user1234");
    setError("");
    toast("Demo credentials filled!", { icon: "📝", style: toastStyle });
  };

  return (
    <div className="min-h-screen bg-white flex font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* LEFT SIDE: Brand & Social Proof */}
      <div className="hidden lg:flex lg:w-[42%] bg-slate-950 relative flex-col justify-between p-16 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-20 group">
            <div className="h-12 w-12 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40 group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="text-white" size={26} />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">
              SkillSet
            </span>
          </Link>

          <div className="space-y-8">
            <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">
              Unlock your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-100">
                true potential.
              </span>
            </h1>
            <p className="text-slate-400 text-xl max-w-md leading-relaxed font-light">
              Join the elite circle of professionals managing their career
              trajectory.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-colors">
            <div className="h-10 w-10 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 text-orange-400">
              <Globe size={20} />
            </div>
            <h3 className="text-white font-bold text-base">Global Access</h3>
            <p className="text-slate-500 text-sm mt-1">
              Connect from anywhere.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] translate-y-8 hover:bg-white/10 transition-colors">
            <div className="h-10 w-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400">
              <Trophy size={20} />
            </div>
            <h3 className="text-white font-bold text-base">Career Growth</h3>
            <p className="text-slate-500 text-sm mt-1">Top-tier mentorship.</p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 SkillSet Technologies Inc.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form */}
      <div className="w-full lg:w-[58%] flex items-center justify-center p-8 sm:p-20 bg-white">
        <div className="w-full max-w-lg">
          <div className="flex justify-between items-center mb-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>
            <div className="text-sm text-slate-500">
              New here?{" "}
              <Link
                to="/register"
                className="text-orange-600 font-black hover:underline ml-1"
              >
                Create free account
              </Link>
            </div>
          </div>

          <header className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-lg">
              Enter your credentials to access your dashboard.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-50 border border-slate-100 rounded-3xl mb-10">
            <button
              onClick={() => fillDemo("user")}
              className="flex items-center justify-center gap-2 py-3 text-sm font-black text-slate-600 hover:text-slate-900 rounded-2xl hover:bg-white hover:shadow-sm transition-all"
            >
              <UserCheck size={16} /> USER DEMO
            </button>
            <button
              onClick={() => fillDemo("admin")}
              className="flex items-center justify-center gap-2 py-3 text-sm font-black text-slate-600 hover:text-slate-900 rounded-2xl hover:bg-white hover:shadow-sm transition-all"
            >
              <ShieldAlert size={16} /> ADMIN DEMO
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-900 rounded-r-2xl flex items-start gap-3">
              <ShieldAlert size={20} className="mt-0.5 text-red-600 shrink-0" />
              <div>
                <p className="text-sm font-black">Login Error</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] outline-none focus:border-orange-500 focus:bg-white focus:ring-8 focus:ring-orange-500/5 transition-all text-slate-900 font-medium"
                  placeholder="name@work.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[12px] font-black uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <Link
                  to="/reset-password"
                  onClick={() =>
                    toast.error("Reset functionality coming soon!", {
                      style: toastStyle,
                    })
                  }
                  className="text-xs font-black text-orange-500 hover:text-orange-600 uppercase tracking-widest"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-5 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] outline-none focus:border-orange-500 focus:bg-white focus:ring-8 focus:ring-orange-500/5 transition-all text-slate-900 font-medium"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full py-5 bg-slate-950 hover:bg-orange-600 text-white rounded-[1.5rem] font-black text-lg shadow-2xl shadow-slate-200 hover:shadow-orange-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? "Validating..." : "Login to Dashboard"}
                {!isLoading && (
                  <Zap size={18} className="group-hover:fill-current" />
                )}
              </span>
            </button>
          </form>

          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
              <span className="bg-white px-6">Or Authenticate via</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
