import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Lock, Globe } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#F8FAFC] px-4 overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600 rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-950 rounded-full blur-[120px] opacity-5" />

      {/* Main Security Card */}
      <div className="relative z-10 w-full max-w-xl animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-orange-950/10 border border-orange-100 overflow-hidden">
          
          {/* Top Security Banner */}
          <div className="bg-orange-950 p-10 text-white flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-orange-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-orange-600/30 ring-4 ring-white/10 animate-bounce-slow">
              <Lock size={36} strokeWidth={2.5} />
            </div>
            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-orange-500 mb-2">
              System Protocols
            </h1>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">
              Access <span className="text-white underline decoration-orange-600">Denied</span>
            </h2>
          </div>

          {/* Content Area */}
          <div className="p-12 text-center">
            <div className="flex justify-center mb-6 text-orange-600/20">
              <ShieldAlert size={64} strokeWidth={1} />
            </div>
            
            <p className="text-lg font-black text-orange-950 uppercase tracking-tight mb-2">
              Insufficient Clearance
            </p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-10">
              Your credentials do not meet the security level required to view this sector of the ThinkNOrder OS.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/20"
              >
                <ArrowLeft size={16} />
                Return to Base
              </Link>
              
              <button className="px-8 py-4 bg-orange-50 text-orange-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-100 transition-all">
                Request Access
              </button>
            </div>
          </div>

          {/* Bottom Security Metadata */}
          <div className="bg-orange-50/50 py-4 px-8 border-t border-orange-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Globe size={12} className="text-orange-400" />
              <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">
                Node: Security_Gateway_403
              </span>
            </div>
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
              Ref: {Math.random().toString(36).substring(7).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-8 text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">
        ThinkNOrder V3.0 • Protected Environment
      </p>
    </div>
  );
};

export default Unauthorized;