import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  UserPlus,
  Store,
  BadgeCheck,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurantThunk } from "../../redux/features/restaurant/restaurant.thunk";
import toast from "react-hot-toast";

const CreateRestaurant = () => {
  const dispatch = useDispatch();
  const { restaurant, loading, error } = useSelector(
    (state) => state.restaurant,
  );
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
    dispatch(createRestaurantThunk(form))
      .unwrap()
      .then((data) => {
  toast.success(data.message || "Restaurant created successfully!");
})
      .catch((error) => {
        toast.error(error.message || "Failed to create restaurant");
      });
  };

  return (
    <div className="p-6 lg:p-10 bg-slate-50 min-h-full">
      {/* Breadcrumbs / Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
          <span>SuperAdmin</span>
          <ChevronRight size={12} />
          <span className="text-orange-600">Inventory & Tenants</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Onboard New Restaurant
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Deploy a new instance to the ThinknOrder multi-tenant ecosystem.
        </p>
      </div>

      <div className="max-w-5xl">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel: Status & Info */}
          <div className="md:w-72 bg-slate-900 p-8 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-600 mb-6 shadow-lg shadow-orange-600/20">
                <Store size={22} />
              </div>
              <h3 className="text-xl font-bold leading-tight">
                Instance Configuration
              </h3>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                You are creating a top-level administrative account for a new
                tenant.
              </p>
            </div>

            <div className="space-y-4 mt-10">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                System Ready
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Globe size={14} className="text-orange-500" /> Auto-Scaling
                Enabled
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="flex-1 p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Restaurant Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">
                    Establishment Name
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={form.restaurantName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all"
                    placeholder="e.g. The Gourmet Hub"
                  />
                </div>

                {/* Owner Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">
                    Primary Owner
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={form.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">
                  Administrative Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all"
                  placeholder="admin@tenant.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider ml-1">
                  Temporary Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-orange-600/20 active:scale-[0.98]"
                >
                  {loading ? "Creating..." : "Provision Account"}
                </button>

                <button
                  type="button"
                  className="px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* System Footer Metadata */}
        <div className="mt-6 flex justify-between items-center px-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            ThinknOrder V3.0 • Node Cluster: US-EAST-1
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Security Policy
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              SLA Docs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
