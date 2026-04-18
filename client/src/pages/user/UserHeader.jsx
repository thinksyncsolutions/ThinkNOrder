import React from "react";
import { Search, MapPin, ChevronDown, ShoppingCart } from "lucide-react";

const UserHeader = ({ place, cartCount, onOpenCart }) => {
  return (
    <header className="px-6 py-2 flex items-center justify-between sticky top-0 bg-[#F8F5F2]/80 backdrop-blur-md z-40">
      {/* Search Trigger */}
      {/* <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50 active:scale-90 transition-transform">
        <Search size={20} className="text-slate-400" />
      </button> */}
      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
              {place?.restaurantLogo ? (
                   <img src={place.restaurantLogo} alt="logo" className="w-full h-full object-cover" />
                 ) : (
                   <span className="text-lg font-black text-slate-500">
                     {place?.restaurantName?.charAt(0) || "R"}
                   </span>
                 )}
               </div>

      {/* Location / Branch Info */}
      <div className="text-center px-2 min-w-0">
        {/* <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold truncate">
          Location
        </p> */}
        <div className="flex items-center gap-2 justify-center">
          <MapPin size={16} className="text-[#FFB800] shrink-0" />
          <span className="text-sm font-black uppercase truncate max-w-[140px]">
            {place?.branchName || "Unknown Branch"}
          </span>
          {/* online red dot and green dot for open and closed branches respectively */}
          <span
            className={`flex items-center gap-1 text-[9px] font-black px-2 py-[2px] rounded-full ${place?.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${place?.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
            />
            {place?.isOpen ? "OPEN" : "CLOSED"}
          </span>
          {/* <ChevronDown size={14} className="text-slate-400" /> */}
        </div>
      </div>

      {/* Shopping Cart Trigger */}
      <button
        onClick={onOpenCart}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 relative active:scale-90 transition-transform"
      >
        <ShoppingCart size={20} className="text-slate-600" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-[#FFB800] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-[#F8F5F2]">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default UserHeader;
