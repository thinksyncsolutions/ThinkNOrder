import React from "react";
import { X, Minus, Plus, ShoppingBag, ChevronRight } from "lucide-react";

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
    <div className="fixed inset-0 z-[70] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-white h-full p-8 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="font-black text-2xl text-orange-950 uppercase tracking-tighter italic">
              Review <span className="text-orange-600">Order</span>
            </h2>
            <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">
              Table {place?.number} • {place?.floor}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-zinc-50 rounded-2xl text-zinc-400"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {cartItems.map((item) => (
            <div 
              key={`${item._id}-${item.selectedPrice.label}`} 
              className="flex justify-between items-center bg-zinc-50/50 p-4 rounded-3xl border border-zinc-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-black text-xs">
                  {item.qty}x
                </div>
                <div>
                  <p className="font-black text-orange-950 uppercase text-xs tracking-tight">
                    {item.name}
                  </p>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase">
                    {item.selectedPrice.label} • ₹{item.selectedPrice.price}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white border border-zinc-200 p-1 rounded-xl shadow-sm">
                <button onClick={() => onRemove(item._id, item.selectedPrice.label)}>
                  <Minus size={14} />
                </button>
                <span className="text-xs font-black text-orange-950">{item.qty}</span>
                <button onClick={() => onAdd(item, item.selectedPrice)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t-2 border-dashed border-zinc-100 space-y-6">
          <div className="flex justify-between text-xl font-black text-orange-950 uppercase tracking-tighter italic">
            <span>Total Amount</span>
            <span className="text-orange-600 text-2xl tracking-tight">₹{cartTotal}</span>
          </div>
          <button 
            onClick={onSubmit} 
            className="w-full bg-orange-950 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Send to Kitchen <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCart;