import React from "react";
import { X, Plus } from "lucide-react";

const VariantModal = ({ item, onClose, onAdd }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-4">
          <div>
            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">
              Customise
            </p>
            <h3 className="font-black text-xl text-orange-950 uppercase tracking-tight">
              {item.name}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-zinc-100 rounded-full text-zinc-500 hover:bg-zinc-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {item.prices.map((price, i) => (
            <button 
              key={i} 
              onClick={() => { 
                onAdd(item, price); 
                onClose(); 
              }} 
              className="w-full bg-white border-2 border-zinc-100 p-5 rounded-2xl flex justify-between items-center hover:border-orange-600 transition-all active:scale-[0.98] group"
            >
              <span className="capitalize font-black text-zinc-600 group-hover:text-orange-950">
                {price.label}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-orange-600 font-black">₹{price.price}</span>
                <Plus size={18} className="text-zinc-300 group-hover:text-orange-600" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VariantModal;