import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBranchThunk } from "../redux/features/auth/auth.thunk";
import { MapPin, Building2, ArrowRight, Loader2, UtensilsCrossed } from "lucide-react";

const SelectBranchScreen = () => {
  const dispatch = useDispatch();
  const { branches, loading } = useSelector((state) => state.auth);

  const selectBranch = (branchId) => {
    dispatch(selectBranchThunk(branchId));
  };

  return (
    <>
      {/* Custom Scrollbar Styling */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #fff7ed;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ea580c;
            border-radius: 10px;
          }
        `}
      </style>

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden bg-orange-950">
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-orange-600 rounded-full blur-[100px] opacity-20 animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[25%] h-[25%] bg-orange-800 rounded-full blur-[80px] opacity-10" />

        {/* Main Modal - Optimized max-width for Laptop screens */}
        <div className="relative w-full max-w-4xl animate-in zoom-in-95 fade-in duration-500 shadow-2xl">
          <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row min-h-[420px] md:min-h-[480px] border border-white/10 shadow-orange-950/50">
            
            {/* LEFT PANEL: BRANDING (Compact on Desktop) */}
            <div className="w-full md:w-[38%] bg-orange-600 p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
               <div className="relative z-10">
                  <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <UtensilsCrossed size={24} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter italic leading-none mb-3">
                    Think<br/>N<span className="text-orange-950 underline decoration-orange-950/30">Order</span>
                  </h1>
                  <p className="text-orange-100 font-bold uppercase tracking-[0.2em] text-[9px] bg-orange-700/40 inline-block px-2 py-1 rounded">
                    Restaurant POS By ThinkSync
                  </p>
               </div>

               <div className="relative z-10 mt-8 md:mt-0">
                  <p className="text-xs font-medium opacity-90 italic leading-relaxed max-w-[200px]">
                    Select your workspace to manage orders, staff, and analytics in real-time.
                  </p>
               </div>

               {/* Large Decorative Icon */}
               <Building2 className="absolute -bottom-8 -right-8 w-44 h-44 text-orange-700 opacity-30 transform rotate-12" />
            </div>

            {/* RIGHT PANEL: BRANCH LIST */}
            <div className="w-full md:w-[62%] p-8 md:p-10 bg-white flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-black uppercase tracking-tight">
                    Switch <span className="text-orange-600">Branch</span>
                  </h2>
                  <div className="h-1 w-10 bg-orange-600 mt-1 rounded-full" />
                </div>
                <div className="hidden sm:block text-[10px] font-black text-orange-200 uppercase tracking-widest">
                  Step 2 of 2
                </div>
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <Loader2 size={40} className="animate-spin text-orange-600" />
                    <div className="absolute inset-0 blur-md bg-orange-600/20 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mt-4">Initializing Session...</p>
                </div>
              ) : branches.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-10 bg-orange-50/50 rounded-3xl border-2 border-dashed border-orange-100">
                  <MapPin size={32} className="text-orange-200 mb-3" />
                  <p className="font-bold text-orange-950 uppercase text-[10px]">No active branches found</p>
                  <p className="text-[9px] text-gray-400 mt-1">Contact your admin to assign a branch.</p>
                </div>
              ) : (
                /* Scrollable Grid - Capped for Laptop Heights */
                <div className="flex-1 grid grid-cols-1 gap-3 max-h-[300px] md:max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                  {branches.map((b) => (
                    <button
                      key={b._id}
                      onClick={() => selectBranch(b._id)}
                      className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-600 hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-300 text-left active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                            {b.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Active Workspace</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 p-2 rounded-full text-orange-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all">
                        <ArrowRight size={16} strokeWidth={3} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Footer */}
              <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                  ThinkSync Solutions
                </p>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-orange-200" />
                  <div className="w-1 h-1 rounded-full bg-orange-300" />
                  <div className="w-1 h-1 rounded-full bg-orange-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectBranchScreen;