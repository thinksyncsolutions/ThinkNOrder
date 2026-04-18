import React from "react";
import { X, Minus, Plus, ShoppingBag, ChevronRight, Utensils } from "lucide-react";

const UserCart = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  cartTotal, 
  place, 
  onAdd, 
  onRemove, 
  onSubmit 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* 1. BLURRED BACKDROP */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* 2. BOTTOM SHEET CONTENT */}
      <div className="relative w-full max-w-lg bg-[#F8F5F2] rounded-t-[3rem] p-8 flex flex-col max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* DRAG HANDLE */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />

        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="font-black text-3xl text-slate-900 tracking-tighter uppercase leading-none">
              My <span className="text-[#FFB800]">Order</span>
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Table {place?.number || "-"}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase italic">
                {place?.floor || "Dining Area"}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 active:scale-90 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
               <ShoppingBag size={48} className="mx-auto text-slate-200 mb-4" />
               <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={`${item._id}-${item.selectedPrice.label}`} 
                className="flex justify-between items-center bg-white p-5 rounded-[2rem] shadow-sm border border-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                        <Utensils size={20} className="text-slate-200" />
                    )}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 uppercase text-sm tracking-tight leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                      {item.selectedPrice.label !== "default" ? item.selectedPrice.label : "Standard"} • ₹{item.selectedPrice.price}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-[#F8F5F2] p-1.5 rounded-2xl border border-slate-100">
                  <button 
                    onClick={() => onRemove(item._id, item.selectedPrice.label)}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-black transition-colors"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <span className="text-sm font-black text-slate-900 min-w-[1rem] text-center">{item.qty}</span>
                  <button 
                    onClick={() => onAdd(item, item.selectedPrice)}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-black transition-colors"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER / CHECKOUT */}
        <div className="mt-6 pt-6 border-t-2 border-dashed border-slate-200 space-y-6 shrink-0">
          <div className="flex justify-between items-end">
            <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-1">Estimated Total</span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter italic">₹{cartTotal}</span>
            </div>
            <div className="text-right">
                <span className="text-[10px] font-black text-[#FFB800] uppercase block">Free Delivery</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase italic">Inc. all taxes</span>
            </div>
          </div>
          
          <button 
            onClick={onSubmit} 
            disabled={cartItems.length === 0}
            className={`w-full py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                cartItems.length === 0 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-[#FFB800] hover:text-black'
            }`}
          >
            Send to Kitchen <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCart;