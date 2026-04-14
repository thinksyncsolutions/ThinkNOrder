import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/features/auth/auth.thunk";
import { Eye, EyeOff, LogIn, Pizza, ShieldCheck, Zap, Lock } from "lucide-react";
import toast from "react-hot-toast";
import bgVideo from "../../assets/bgvideo.mp4";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, requiresBranchSelection } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { id: "login-error" });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
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
    /* h-screen and overflow-hidden prevent the page from scrolling */
    <div className="h-screen w-full flex items-center justify-center bg-orange-950 overflow-hidden relative selection:bg-orange-600 selection:text-white">
      
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 via-black/30 to-orange-950/20 z-10" />

      {/* LIGHT EFFECTS */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500 rounded-full blur-[150px] opacity-20 z-20 animate-pulse" />

      {/* MAIN CONTAINER: Scaled down slightly to ensure it fits all screens */}
      <div className="w-full max-w-md px-6 relative z-30 scale-90 lg:scale-100 flex flex-col items-center">
        
        {/* BRANDING */}
        <div className="flex flex-col items-center mb-6 group">
          {/* <div className="bg-orange-600 p-3 rounded-2xl shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
            <Pizza className="text-white" size={28} />
          </div> */}
          <h1 className="mt-3 lg:text-5xl text-4xl font-black text-white tracking-tighter uppercase italic">
            Think<span className="text-orange-600">N</span>Order
          </h1>
        </div>

        {/* LOGIN CARD */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          
          <div className="relative z-10 mb-6">
            <h2 className="text-xl font-black text-orange-950 uppercase tracking-tight">
              Restaurant <span className="text-orange-600">Login</span>
            </h2>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-400 mt-1">
              v1.0 Aplha
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-orange-900/50 ml-1 flex items-center gap-2">
                <Lock size={10} /> Terminal Identity
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 rounded-xl bg-orange-50/50 border-2 border-transparent text-orange-950 font-bold focus:outline-none focus:border-orange-600 focus:bg-white transition-all text-sm"
                placeholder="admin@enterprise.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-orange-900/50 flex items-center gap-2">
                  <ShieldCheck size={10} /> Passcode
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-orange-50/50 border-2 border-transparent text-orange-950 font-bold focus:outline-none focus:border-orange-600 focus:bg-white transition-all text-sm pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-900/30 hover:text-orange-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? "Verifying..." : "Establish Session"}
              {!loading && <LogIn size={14} strokeWidth={3} />}
            </button>
          </form>

          {/* FOOTER INFO */}
          <div className="mt-8 pt-5 border-t border-orange-100 flex flex-col gap-3">
            <div className="flex items-center justify-between opacity-60">
              <div className="flex items-center gap-1.5 text-[8px] font-black text-orange-900 uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </div>
              <div className="flex items-center gap-1.5 text-[8px] font-black text-orange-900 uppercase">
                <Zap size={10} fill="currentColor" /> Encrypted
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-center text-orange-100/40 font-black uppercase tracking-[0.4em] mt-6">
          Powered by ThinkSync
        </p>
      </div>
    </div>
  );
};

export default Login;