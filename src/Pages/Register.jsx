import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validations = {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : "Registration failed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google sign-up successful:", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google sign-up failed:", error);
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-white flex font-sans selection:bg-orange-100">
      {/* LEFT PANEL: Matching Hero/Dark Sections */}
      <div className="hidden lg:flex lg:w-[40%] bg-[#0F172A] relative flex-col justify-between p-16 overflow-hidden">
        {/* Abstract Glow (Matches Hero design) */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-orange-600/10 rounded-full blur-[120px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Sparkles className="text-white" size={22} />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              SkillSet
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-black text-white leading-tight">
              Ready to <br />
              <span className="text-orange-500">transform</span> your <br />
              Journey?
            </h1>
            <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
              Join 1,200+ global students already mastering new skills on
              SkillSet.
            </p>
          </div>
        </div>

        {/* Feature Bento Card (Matching "Why Choose Our Platform" cards) */}
        <div className="relative z-10 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <Rocket size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Premium Access</h3>
              <p className="text-slate-500 text-sm font-medium">
                Industry expert content
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {["Expert Mentors", "32+ Premium Courses", "Global Community"].map(
              (text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-slate-300 text-sm font-semibold"
                >
                  <CheckCircle2 size={18} className="text-orange-500" /> {text}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Matching Insights/Statistics & Light Sections */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-8 bg-slate-50/30 overflow-y-auto">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <Link
              to="/"
              className="text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            <Link
              to="/login"
              className="text-orange-600 font-black text-xs uppercase tracking-widest hover:underline"
            >
              Log in
            </Link>
          </div>

          <header className="mb-8">
            <h2 className="text-3xl font-black text-orange-600 mb-2">
              Create Profile
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Start your professional evolution today.
            </p>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <XCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-sm font-bold"
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-sm font-bold"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-sm font-bold"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all text-sm font-bold"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl grid grid-cols-2 gap-x-4 gap-y-1 mt-2 border border-slate-100">
                  <ValidationItem label="6+ Chars" met={validations.length} />
                  <ValidationItem label="Uppercase" met={validations.upper} />
                  <ValidationItem label="Lowercase" met={validations.lower} />
                  <ValidationItem label="Number" met={validations.number} />
                </div>
              )}
            </div>

            <button
              disabled={isLoading || !isPasswordValid}
              className="w-full py-4 bg-orange-600 rounded-lg hover:bg-orange-700 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-slate-200 hover:shadow-orange-500/20 transition-all "
            >
              {isLoading ? "Enrolling..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <span className="bg-white px-4">Or use social</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-700 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const ValidationItem = ({ label, met }) => (
  <div
    className={`flex items-center gap-2 text-[10px] font-bold transition-colors ${
      met ? "text-green-600" : "text-slate-300"
    }`}
  >
    <ShieldCheck
      size={12}
      className={met ? "text-green-500" : "text-slate-200"}
    />
    {label}
  </div>
);

export default Register;
