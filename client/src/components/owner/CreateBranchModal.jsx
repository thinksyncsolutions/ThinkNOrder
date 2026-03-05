import React, { useState } from "react";
import { X, Building2, Hash, MapPin, Navigation, PlusCircle } from "lucide-react";

export const CreateBranchModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    branchCode: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-orange-100">
        
        {/* Header */}
        <div className="bg-orange-950 p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Business Expansion
            </h2>
            <p className="text-2xl font-black italic uppercase tracking-tight">
              Launch Branch
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-orange-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* BRANCH NAME */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Building2 size={12} className="text-orange-600" /> Official Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g. ThinkNOrder Downtown"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all placeholder:text-gray-300"
            />
          </div>

          {/* BRANCH CODE */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Hash size={12} className="text-orange-600" /> System Identifier (Code)
            </label>
            <input
              name="branchCode"
              type="text"
              placeholder="e.g. TN-DEL-03"
              value={form.branchCode}
              onChange={handleChange}
              required
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-mono text-sm font-bold text-orange-950 transition-all placeholder:text-gray-300"
            />
          </div>

          {/* CITY */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <MapPin size={12} className="text-orange-600" /> Operational City
            </label>
            <input
              name="city"
              type="text"
              placeholder="e.g. New Delhi"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all placeholder:text-gray-300"
            />
          </div>

          {/* ADDRESS */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Navigation size={12} className="text-orange-600" /> Physical Address
            </label>
            <textarea
              name="address"
              rows="2"
              placeholder="Street, Landmark, ZIP..."
              value={form.address}
              onChange={handleChange}
              required
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all placeholder:text-gray-300 text-sm resize-none"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <PlusCircle size={18} />
              Confirm Deployment
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-950 transition-colors"
            >
              Abourt Expansion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};