import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/features/auth/auth.thunk";
import { Eye, EyeOff, LogIn, Pizza, ShieldCheck, Zap } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector(state => state.auth);

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

useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);

React.useEffect(() => {
  if (user) {
    toast.success("Login successful");
  }
}, [user]);


   // 🔥 ROLE BASED NAVIGATION
  useEffect(() => {
    if (user?.role) {
      switch (user.role) {
        case "SUPERADMIN":
          navigate("/superadmin");
          break;
        case "OWNER":
          navigate("/owner");
          break;
        case "WAITER":
        case "CASHIER":
          navigate("/staff/orders");
          break;
        case "KITCHEN":
          navigate("/staff/kitchen");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-6 selection:bg-orange-600 selection:text-white">
      {/* Abstract Background Vibe */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-orange-200 rounded-full blur-[100px] opacity-30" />

      <div className="w-full max-w-md relative">
        {/* Branding Above Card */}
        <div className="flex justify-center items-center gap-2 mb-8 text-orange-950 font-black text-2xl tracking-tighter">
          <div className="bg-orange-600 p-1.5 rounded-xl shadow-lg shadow-orange-600/20">
            <Pizza className="text-white" size={24} />
          </div>
          THINK<span className="text-orange-600 italic">N</span>ORDER
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(251,146,60,0.15)] border border-orange-100 p-10 relative overflow-hidden">
          {/* Subtle Decorative Gradient */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-[4rem] z-0" />

          <div className="relative z-10 text-center mb-10">
            <h1 className="text-3xl font-black text-orange-950 tracking-tight">Admin Portal</h1>
            <p className="text-orange-900/40 text-sm font-bold uppercase tracking-widest mt-2">Secure Kitchen Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900/50 ml-1">Terminal ID / Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-orange-50 border border-orange-100 text-orange-950 placeholder:text-orange-900/20 focus:outline-none focus:ring-4 focus:ring-orange-600/5 focus:border-orange-600 transition-all font-medium"
                placeholder="admin@restaurant.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-900/50">Passcode</label>
                <a href="#" className="text-[9px] font-black uppercase text-orange-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-orange-50 border border-orange-100 text-orange-950 placeholder:text-orange-900/20 focus:outline-none focus:ring-4 focus:ring-orange-600/5 focus:border-orange-600 transition-all font-medium pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-900/30 hover:text-orange-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
  type="submit"
  disabled={loading}
  className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-600/20 active:scale-95 disabled:opacity-60"
>
  <LogIn size={20} />
  {loading ? "Opening Terminal..." : "Open Terminal"}
</button>

          </form>

          {/* "Crowded" Professional Details */}
          <div className="mt-10 pt-8 border-t border-orange-50 space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black text-orange-900/30 uppercase tracking-widest">
                   <ShieldCheck size={12} /> Encrypted Session
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-green-500 uppercase tracking-widest">
                   <Zap size={12} fill="currentColor" /> System Ready
                </div>
             </div>
             <p className="text-[9px] text-center text-orange-900/20 font-bold uppercase tracking-widest leading-relaxed">
               Access restricted to authorized restaurant personnel only. <br />
               IP Logging Active: {new Date().toLocaleDateString()}
             </p>
          </div>
        </div>
        
        <p className="text-[10px] text-center text-orange-900/20 font-black uppercase tracking-[0.4em] mt-8">
          Product of ThinkSync Solutions
        </p>
      </div>
    </div>
  );
};

export default Login;