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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background with ThinkNOrder Branding */}
      <div className="absolute inset-0 bg-orange-950" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600 rounded-full blur-[120px] opacity-20" />

      {/* Main Glass Container */}
      <div className="relative w-full max-w-5xl animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] border border-orange-100">
          
          {/* Left Panel: Brand Message */}
          <div className="w-full md:w-2/5 bg-orange-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                  <UtensilsCrossed size={32} />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-tight mb-4">
                  Think<br/>N<span className="text-orange-950 underline">Order</span>
                </h1>
                <p className="text-orange-100 font-bold uppercase tracking-widest text-xs">Restaurant Management OS</p>
             </div>

             <div className="relative z-10">
                <p className="text-sm font-medium opacity-80 italic">Select your workspace to begin managing orders, staff, and menus in real-time.</p>
             </div>

             {/* Ghost Icon Decoration */}
             <Building2 className="absolute -bottom-10 -right-10 w-64 h-64 text-orange-700 opacity-50" />
          </div>

          {/* Right Panel: Branch Selection */}
          <div className="w-full md:w-3/5 p-12 bg-white flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-black uppercase tracking-tight">
                Switch <span className="text-orange-600">Branch</span>
              </h2>
              <div className="h-1.5 w-12 bg-orange-600 mt-2 rounded-full" />
            </div>

            {loading ? (
              <div className="flex flex-col items-center py-20 text-orange-600">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">Fetching Locations...</p>
              </div>
            ) : branches.length === 0 ? (
              <div className="text-center py-20 bg-orange-50 rounded-3xl border-2 border-dashed border-orange-100">
                <MapPin size={40} className="mx-auto text-orange-200 mb-4" />
                <p className="font-bold text-orange-950 uppercase text-xs">No active branches found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {branches.map((b) => (
                  <button
                    key={b._id}
                    onClick={() => selectBranch(b._id)}
                    className="group flex items-center justify-between p-6 bg-white border-2 border-orange-50 rounded-3xl hover:border-orange-600 hover:shadow-xl hover:shadow-orange-900/10 transition-all duration-300 text-left relative overflow-hidden active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-5 z-10">
                      <div className="h-14 w-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-black uppercase tracking-tight leading-none group-hover:text-orange-600 transition-colors">
                          {b.name}
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Ready to login →</p>
                      </div>
                    </div>

                    <div className="bg-orange-50 p-2 rounded-full text-orange-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all z-10">
                      <ArrowRight size={20} strokeWidth={3} />
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            <p className="mt-10 text-[10px] text-center font-bold text-gray-300 uppercase tracking-[0.3em]">
              Powered by ThinkNOrder
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBranchScreen;