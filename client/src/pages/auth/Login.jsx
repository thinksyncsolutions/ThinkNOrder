import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/features/auth/auth.thunk";
import { Eye, EyeOff, LogIn, Pizza, ShieldCheck, Zap, Lock } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, requiresBranchSelection } = useSelector(state => state.auth);
  const hasShownToast = useRef(false);
  

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  // reset on page load
useEffect(() => {
  hasShownToast.current = false;
}, []);

// reset when user changes
useEffect(() => {
  if (!user) {
    hasShownToast.current = false;
  }
}, [user]);

  useEffect(() => {
  if (error) {
    toast.error(error, {
      id: 'login-error',
      icon: '⚠️', 
      style: {
        background: '#ef4444', // Red-500 for errors
        color: '#fff',
      }
    });
  }
}, [error]);


useEffect(() => {
  if (user && !hasShownToast.current) {
    hasShownToast.current = true;

    toast.success("Identity Verified", {
      icon: "🛡️",
      style: {
        background: "#ea580c",
        color: "#fff",
      },
    });

    if (requiresBranchSelection) {
      navigate("/select-branch", { replace: true });
    } else if (user.role) {
      const roleRoutes = {
        SUPERADMIN: "/superadmin",
        OWNER: "/owner",
        MANAGER: "/manager",
        WAITER: "/waiter",
        CASHIER: "/cashier",
        KITCHEN: "/kitchen",
      };

      navigate(roleRoutes[user.role] || "/", { replace: true });
    }
  }
}, [user, requiresBranchSelection, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7ED] p-6 selection:bg-orange-600 selection:text-white overflow-hidden">
      {/* Dynamic Background Aura */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-200 rounded-full blur-[120px] opacity-40 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-300 rounded-full blur-[100px] opacity-20" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* BRANDING HEADER */}
        <div className="flex flex-col items-center mb-10 group">
          <div className="bg-orange-600 p-4 rounded-[1.5rem] shadow-2xl shadow-orange-600/30 transform group-hover:rotate-12 transition-transform duration-500">
            <Pizza className="text-white" size={32} strokeWidth={2.5} />
          </div>
          <h1 className="mt-4 text-3xl font-black text-orange-950 tracking-tighter uppercase italic">
            Think<span className="text-orange-600">N</span>Order
          </h1>
          <div className="h-1 w-8 bg-orange-600 rounded-full mt-1" />
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(251,146,60,0.2)] border border-orange-100 p-10 relative overflow-hidden">
          
          {/* Top Corner Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent rounded-bl-[5rem]" />

          <div className="relative z-10 mb-8">
            <h2 className="text-2xl font-black text-orange-950 uppercase tracking-tight leading-none">
              Terminal <span className="text-orange-600">Login</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mt-2">
              Secure Cloud Infrastructure v3.0
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* EMAIL / TERMINAL ID */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 ml-1 flex items-center gap-2">
                <Lock size={10} /> Terminal Identity
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl bg-orange-50/50 border-2 border-transparent text-orange-950 font-bold placeholder:text-orange-900/20 focus:outline-none focus:border-orange-600 focus:bg-white transition-all shadow-inner"
                placeholder="admin@enterprise.com"
              />
            </div>

            {/* PASSWORD / PASSCODE */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 flex items-center gap-2">
                  <ShieldCheck size={10} /> Security Passcode
                </label>
                <button type="button" className="text-[9px] font-black uppercase text-orange-600 hover:text-orange-700 underline tracking-tighter">
                  Reset Credentials
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-orange-50/50 border-2 border-transparent text-orange-950 font-bold placeholder:text-orange-900/20 focus:outline-none focus:border-orange-600 focus:bg-white transition-all shadow-inner pr-14"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-900/20 hover:text-orange-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* SUBMIT ACTION */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-orange-600/30 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <LogIn size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                  <span>Establish Session</span>
                </>
              )}
            </button>
          </form>

          {/* FOOTER METADATA */}
          <div className="mt-10 pt-6 border-t border-orange-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-black text-orange-900/30 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Network Secure
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-orange-900/30 uppercase tracking-widest">
                <Zap size={10} fill="currentColor" /> SSL Hardened
              </div>
            </div>
            <p className="text-[9px] text-center text-orange-900/20 font-bold uppercase tracking-[0.2em] leading-relaxed">
              Authorized Access Only. System logs and IP tracking are active for this terminal.
            </p>
          </div>
        </div>
        
        <p className="text-[10px] text-center text-orange-900/40 font-black uppercase tracking-[0.5em] mt-8">
          Powered by ThinkSync • V3.0.4
        </p>
      </div>
    </div>
  );
};

export default Login;