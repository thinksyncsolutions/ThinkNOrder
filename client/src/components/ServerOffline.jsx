import React from "react";
import { Link } from "react-router-dom";
import { WifiOff, ArrowLeft, ServerCrash, RefreshCw } from "lucide-react";

const ServerOffline = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#F8FAFC] px-4 overflow-hidden font-sans">
      
      {/* Background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500 rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900 rounded-full blur-[120px] opacity-5" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-xl animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-red-900/10 border border-red-100 overflow-hidden">

          {/* Top banner */}
          <div className="bg-red-900 p-10 text-white flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-red-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-red-600/30 ring-4 ring-white/10 animate-bounce-slow">
              <WifiOff size={36} strokeWidth={2.5} />
            </div>

            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-red-400 mb-2">
              Network Status
            </h1>

            <h2 className="text-4xl font-black italic uppercase tracking-tighter">
              Server <span className="underline decoration-red-500">Offline</span>
            </h2>
          </div>

          {/* Content */}
          <div className="p-12 text-center">

            <div className="flex justify-center mb-6 text-red-500/20">
              <ServerCrash size={64} strokeWidth={1} />
            </div>

            <p className="text-lg font-black text-red-900 uppercase tracking-tight mb-2">
              Backend Connection Failed
            </p>

            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-10">
              ThinkNOrder cannot establish a secure connection to the server.
              The backend service may be offline or unreachable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

               <Link
                to="/"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-red-950/20"
              >
                <RefreshCw size={16} />
                Retry Connection
              </Link>

              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-100 transition-all"
              >
                <ArrowLeft size={16} />
                Go Home
              </Link>

            </div>
          </div>

          {/* Footer */}
          <div className="bg-red-50/50 py-4 px-8 border-t border-red-100 flex justify-between items-center">

            <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">
              Node: Network_Gateway
            </span>

            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
              Ref: {Math.random().toString(36).substring(7).toUpperCase()}
            </span>

          </div>
        </div>
      </div>

      <p className="mt-8 text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">
        ThinkNOrder V3.0 • Connection Monitor
      </p>
    </div>
  );
};

export default ServerOffline;