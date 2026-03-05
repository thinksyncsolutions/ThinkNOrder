import React, { useEffect, useState } from "react";
import { X, User, Mail, ShieldCheck, Building2, CheckCircle2, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchesThunk } from "../../redux/features/branch/branch.thunk";

const roles = ["ADMIN", "MANAGER", "CASHIER", "WAITER", "KITCHEN"];

export const CreateStaffModal = ({ onClose, onCreate, editData }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [branchIds, setBranchIds] = useState([]);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setEmail(editData.email);
      setRole(editData.role);
      setBranchIds(editData.accessibleBranches || []);
    }
  }, [editData]);

  useEffect(() => {
    if (!editData) setBranchIds([]);
  }, [role, editData]);

  useEffect(() => {
    if (branches.length === 0) {
      dispatch(fetchBranchesThunk()).catch(() => {});
    }
  }, [dispatch, branches.length]);

  const toggleBranch = (id) => {
    if (role === "MANAGER" || role === "ADMIN") {
      setBranchIds(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setBranchIds([id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const staffData = { name, email, role, branchIds, isActive: true };
    onCreate(staffData, editData?._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-orange-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-orange-950 p-8 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Personnel Hub</h2>
            <p className="text-2xl font-black italic uppercase tracking-tight">
              {editData ? "Edit Staff" : "Register Staff"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-orange-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <User size={12} className="text-orange-600" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all text-sm"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <ShieldCheck size={12} className="text-orange-600" /> Privilege Level
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all text-sm appearance-none"
              >
                {roles.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Mail size={12} className="text-orange-600" /> Work Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all text-sm ${editData ? 'opacity-50' : ''}`}
              required
              disabled={!!editData}
            />
          </div>

          {/* Sector/Branch Assignment */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-orange-950 flex items-center gap-2">
              <Building2 size={12} className="text-orange-600" /> Assigned Sectors 
              <span className="text-[9px] text-gray-400 lowercase italic">({role === 'MANAGER' ? 'Multiple' : 'Single'} selection)</span>
            </label>
            
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto p-2 bg-orange-50/30 rounded-3xl border border-orange-100 custom-scrollbar">
              {branches.map((b) => (
                <div 
                  key={b._id}
                  onClick={() => toggleBranch(b._id)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-2 
                    ${branchIds.includes(b._id) 
                      ? 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-600/20' 
                      : 'bg-white border-transparent text-gray-600 hover:border-orange-200'}`}
                >
                  <span className="text-xs font-bold uppercase tracking-tight">{b.name}</span>
                  {branchIds.includes(b._id) && <CheckCircle2 size={16} />}
                </div>
              ))}
              {branches.length === 0 && <p className="text-[10px] text-center py-4 text-gray-400 font-bold uppercase">No branches detected</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-95"
            >
              {editData ? "Update System Access" : "Deploy Personnel"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-950 transition-colors"
            >
              Cancel Operation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};