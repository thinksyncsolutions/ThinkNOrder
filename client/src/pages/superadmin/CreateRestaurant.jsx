import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, Pizza, Store, BadgeCheck, Globe } from "lucide-react";

const CreateRestaurant = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Owner Register Data:", form);
    // 🔥 call API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 selection:bg-orange-600 selection:text-white">
      {/* Decorative Brand Elements */}
      <div className="opacity-10 pointer-events-none">
        <Pizza size={300} className="rotate-12" />
      </div>

      <div className="w-full max-w-2xl relative">
        <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(251,146,60,0.12)] border border-orange-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Left Side: Onboarding Vibe */}
            <div className="md:w-1/3 bg-orange-600 p-10 text-white flex flex-col justify-between">
              <div>
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <Store size={24} />
                </div>
                <h2 className="text-3xl font-black leading-tight tracking-tighter">
                  Welcome to the <br /> Ecosystem.
                </h2>
                <p className="text-orange-100 text-xs mt-4 font-medium leading-relaxed">
                  Join 500+ restaurateurs who have digitized their kitchen operations.
                </p>
              </div>
              
              <div className="space-y-4 mt-10">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-orange-200">
                  <BadgeCheck size={14} /> Global Standards
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-orange-200">
                  <Globe size={14} /> 24/7 Support
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-2/3 p-10">
              <div className="mb-8">
                <h1 className="text-2xl font-black text-orange-950 tracking-tight">Onboard Restaurant</h1>
                <p className="text-orange-900/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                  New Owner Registration
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Restaurant Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 ml-1">Establishment Name</label>
                    <input
                      type="text"
                      name="restaurantName"
                      value={form.restaurantName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-950 text-sm focus:outline-none focus:border-orange-600 transition-all font-medium"
                      placeholder="Spice Garden"
                    />
                  </div>

                  {/* Owner Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-950 text-sm focus:outline-none focus:border-orange-600 transition-all font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 ml-1">Business Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-950 text-sm focus:outline-none focus:border-orange-600 transition-all font-medium"
                    placeholder="owner@restaurant.com"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-orange-900/40 ml-1">Secure Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-950 text-sm focus:outline-none focus:border-orange-600 transition-all font-medium pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-900/20 hover:text-orange-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-zinc-950 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-orange-600/20 active:scale-95 group mt-4"
                >
                  <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
                  Create Account
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-orange-50 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-orange-900/20 tracking-widest leading-tight">
                  ThinknOrder V3.0 <br /> Multi-Tenant Architecture
                </span>
                <div className="bg-orange-50 px-3 py-1 rounded-full text-[9px] font-black text-orange-600 uppercase tracking-tighter">
                  Cloud Ready
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-center text-orange-900/20 font-black uppercase tracking-[0.4em] mt-8">
          Restaurant Management System • SuperAdmin Console
        </p>
      </div>
    </div>
  );
};

export default CreateRestaurant;