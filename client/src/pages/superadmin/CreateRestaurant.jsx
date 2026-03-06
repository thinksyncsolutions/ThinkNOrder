import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Store,
  Globe,
  ChevronRight,
  ShieldCheck,
  Server,
  Activity
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurantThunk } from "../../redux/features/restaurant/restaurant.thunk";
import toast from "react-hot-toast";

const CreateRestaurant = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.restaurant);
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
    dispatch(createRestaurantThunk(form))
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Enterprise Instance Deployed!");
        setForm({ restaurantName: "", ownerName: "", email: "", password: "" });
      })
      .catch((error) => {
        toast.error(error.message || "Deployment Failed");
      });
  };

  return (
    <div className="p-8 lg:p-12 bg-[#F8FAFC] min-h-screen animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">
          <span>SuperAdmin</span>
          <ChevronRight size={10} className="text-orange-600" />
          <span className="text-orange-600">Enterprise Onboarding</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">
          Provision <span className="text-orange-600">New Tenant</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2 font-medium max-w-2xl leading-relaxed">
          Initialize a dedicated cloud instance for a new restaurant enterprise within the ThinkNOrder ecosystem.
        </p>
      </div>

      <div className="max-w-6xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col lg:row md:flex-row min-h-[600px]">
          
          {/* LEFT PANEL: INFRASTRUCTURE STATUS */}
          <div className="md:w-80 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-600 mb-8 shadow-xl shadow-orange-600/30 ring-4 ring-white/10">
                <Server size={26} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight leading-tight italic">
                Instance <br /> Configuration
              </h3>
              <div className="h-1 w-12 bg-orange-600 mt-4 rounded-full" />
              <p className="text-slate-400 text-xs mt-6 leading-relaxed font-medium">
                Generating unique UUIDs and assigning dedicated database clusters for the target enterprise.
              </p>
            </div>

            <div className="relative z-10 space-y-6 pt-10">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                Hypervisor Active
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Activity size={14} className="text-orange-500" /> API Gateway: Stable
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <ShieldCheck size={14} className="text-orange-500" /> End-to-End SSL
              </div>
            </div>

            {/* Background Decorative Icon */}
            <Globe className="absolute -bottom-16 -left-16 w-64 h-64 text-white/5 rotate-12" />
          </div>

          {/* RIGHT PANEL: FORM */}
          <div className="flex-1 p-8 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Restaurant Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
                    Establishment Brand
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={form.restaurantName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-slate-900 text-sm font-bold focus:outline-none focus:border-orange-600 focus:bg-white transition-all shadow-sm"
                    placeholder="e.g. Skyline Brasserie"
                  />
                </div>

                {/* Owner Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
                    Account Principal
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={form.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-slate-900 text-sm font-bold focus:outline-none focus:border-orange-600 focus:bg-white transition-all shadow-sm"
                    placeholder="Owner Full Name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
                  Root Admin Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-slate-900 text-sm font-bold focus:outline-none focus:border-orange-600 focus:bg-white transition-all shadow-sm"
                  placeholder="admin@tenant.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
                  Master Access Key
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-slate-900 text-sm font-bold focus:outline-none focus:border-orange-600 focus:bg-white transition-all shadow-sm pr-14"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-12 py-5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-orange-600/30 active:scale-95"
                >
                  {loading ? "Initializing..." : "Provision Instance"}
                </button>

                <button
                  type="button"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Discard Setup
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* System Footer Metadata */}
        <div className="mt-8 flex flex-col sm:row justify-between items-center px-4 gap-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
            ThinknOrder V3.0 • Cloud-Native Architecture • Secure Provisioning
          </p>
          <div className="flex gap-6">
            <span className="text-[9px] font-black text-slate-300 uppercase hover:text-orange-600 cursor-help transition-colors">Compliance Shield</span>
            <span className="text-[9px] font-black text-slate-300 uppercase hover:text-orange-600 cursor-help transition-colors">SLA Registry</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;