import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBranchThunk } from "../redux/features/auth/auth.thunk";
import { Building2, ArrowRight, Loader2, UtensilsCrossed, CheckCircle2 } from "lucide-react";

const SelectBranchScreen = () => {
  const dispatch = useDispatch();
  const { branches, loading } = useSelector((state) => state.auth);
  
  const [isSwitching, setIsSwitching] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  const selectBranch = (branchId, branchName) => {
    setSelectedName(branchName);
    setIsSwitching(true);
    
    // Simulate a high-end system "handshake"
    setTimeout(() => {
      dispatch(selectBranchThunk(branchId));
    }, 1000); 
  };

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #ea580c; border-radius: 10px; }
          
          @keyframes wave {
            0% { transform: scale(0); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: scale(4); opacity: 0; }
          }
          .animate-wave { animation: wave 2s infinite; }
          
          .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-orange-600 overflow-hidden">
        
        {/* Background Visuals */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px]" />

        <div className="relative w-full max-w-4xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          
          {/* AMAZING SWITCHING OVERLAY */}
          {isSwitching && (
            <div className="absolute inset-0 z-[120] bg-orange-950 rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden animate-in fade-in zoom-in duration-500">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              {/* Animated Circles */}
              <div className="absolute w-64 h-64 border border-white/20 rounded-full animate-wave" />
              <div className="absolute w-64 h-64 border border-white/10 rounded-full animate-wave [animation-delay:0.5s]" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-6 animate-bounce">
                  <UtensilsCrossed size={40} className="text-orange-600" />
                </div>
                
                <h2 className="lg:text-5xl text:3xl font-black text-white italic tracking-tighter uppercase mb-2">
                  Think<span className="text-orange-600">N</span>Order
                </h2>
                
                <div className="flex items-center gap-3 px-6 py-2 bg-orange-950/20 backdrop-blur-md rounded-full border border-white/10 mt-4">
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span className="text-[11px] font-black text-white uppercase tracking-[0.3em]">
                    Syncing {selectedName}
                  </span>
                </div>

                {/* Progress Bar Shimmer */}
                <div className="w-48 h-1 bg-orange-900 rounded-full mt-8 overflow-hidden">
                  <div className="h-full w-full bg-white shimmer" />
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row min-h-[500px] border border-white/20">
            
            {/* LEFT SIDE: THE BRAND */}
            <div className="w-full md:w-[40%] bg-[#1a0f00] p-10 text-white flex flex-col justify-between relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:15px_15px]" />
               
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(234,88,12,0.5)]">
                    <UtensilsCrossed size={28} />
                  </div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                    THINK<br/>N<span className="text-orange-600">ORDER</span>
                  </h1>
                  <p className="mt-4 text-gray-400 text-xs font-medium leading-relaxed max-w-[200px]">
                    Welcome back. Please select a workspace to continue to your dashboard.
                  </p>
               </div>

               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Powered by ThinkSync</span>
                  </div>
               </div>
               
               <Building2 className="absolute -bottom-10 -right-10 w-56 h-56 text-white/5 transform -rotate-12" />
            </div>

            {/* RIGHT SIDE: THE SELECTION */}
            <div className="w-full md:w-[60%] p-10 bg-white flex flex-col">
              <div className="mb-8">
                <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em]">Security Check</span>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mt-1">
                  Select <span className="text-orange-600">Branch</span>
                </h2>
              </div>

              <div className="flex-1 space-y-3 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
                {branches.map((b) => (
                  <button
                    key={b._id}
                    onClick={() => selectBranch(b._id, b.name)}
                    className="group relative w-full flex items-center justify-between p-5 rounded-[1.5rem] border-2 border-gray-50 hover:border-orange-600 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(234,88,12,0.1)] overflow-hidden"
                  >
                    {/* Hover Background Slide */}
                    <div className="absolute inset-0 bg-orange-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                    <div className="relative z-10 flex items-center gap-5">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-gray-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                          {b.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <CheckCircle2 size={12} className="text-green-500" />
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">System Ready</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight size={18} className="text-orange-600" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Can't see your branch? <span className="text-orange-600 cursor-pointer hover:underline">Refresh List</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectBranchScreen;