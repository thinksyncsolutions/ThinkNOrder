import React from "react";

const Loader = ({ message = "Syncing Data..." }) => {
  return (
    <div className="flex h-120 w-full flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute h-16 w-16 animate-ping rounded-full border-2 border-orange-600/20"></div>
        
        {/* Middle Spinning Border */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-600 border-t-transparent shadow-lg"></div>
        
        {/* Inner Static Dot */}
        <div className="absolute h-2 w-2 rounded-full bg-orange-950"></div>
      </div>

      {/* Modern Brutalist Label */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-950 animate-pulse">
          {message}
        </p>
        <div className="mt-2 h-[1px] w-12 bg-orange-200"></div>
      </div>
    </div>
  );
};

export default Loader;