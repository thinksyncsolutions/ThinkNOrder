import React, { useEffect, useState } from "react";
import { X, User, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

const roles = ["CASHIER", "WAITER", "KITCHEN"];

export const CreateStaffModal = ({ onClose, onCreate, editData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setEmail(editData.email);
      setRole(editData.role);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const staffData = {
      name,
      email,
      role,
      isActive: true,
    };

    onCreate(staffData, editData?._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-orange-100">
        
        {/* Header */}
        <div className="bg-orange-950 p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Team Member
            </h2>
            <p className="text-2xl font-black italic uppercase tracking-tight">
              {editData ? "Modify Staff" : "Add Staff"}
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
          {/* NAME INPUT */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <User size={12} className="text-orange-600" /> Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all placeholder:text-gray-300"
              required
            />
          </div>

          {/* EMAIL INPUT */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Mail size={12} className="text-orange-600" /> Work Email
            </label>
            <input
              type="email"
              placeholder="john@thinknorder.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all placeholder:text-gray-300 ${
                editData ? "opacity-60 cursor-not-allowed" : ""
              }`}
              required
              disabled={!!editData}
            />
          </div>

          {/* ROLE SELECT */}
          <div className="space-y-1.5 pb-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <ShieldCheck size={12} className="text-orange-600" /> Access Level
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all appearance-none cursor-pointer"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-orange-600">
                <CheckCircle2 size={16} />
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {editData ? "Update Credentials" : "Issue Access Card"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-950 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};