import React from "react";
import { Clock, CheckCircle2, Flame, Utensils } from "lucide-react";

const OrderCard = ({ order }) => {
  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': 
        return { color: 'bg-amber-100 text-amber-700', icon: <Clock size={12} />, label: 'Pending' };
      case 'cooking': 
      case 'preparing': 
        return { color: 'bg-orange-100 text-orange-700', icon: <Flame size={12} className="animate-pulse" />, label: 'In Kitchen' };
      case 'ready': 
        return { color: 'bg-blue-100 text-blue-700', icon: <Utensils size={12} />, label: 'Ready' };
      case 'served': 
        return { color: 'bg-green-100 text-green-700', icon: <CheckCircle2 size={12} />, label: 'Served' };
      default: 
        return { color: 'bg-zinc-100 text-zinc-500', icon: null, label: status };
    }
  };

  const status = getStatusInfo(order.status);

  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-50 relative overflow-hidden transition-all active:scale-[0.98]">
      {/* Top Header: ID & Status */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Reference</span>
          <span className="text-sm font-black text-slate-900">#{order._id.slice(-6).toUpperCase()}</span>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${status.color}`}>
          {status.icon}
          {status.label}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4 mb-5">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-400">
                {item.quantity}x
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 leading-none mb-1">
                  {item.name || item.itemname || 'Delicious Item'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                  Size: {item.size || item.selectedSize || 'Standard'}
                </span>
              </div>
            </div>
            <span className="text-xs font-black text-slate-900">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-slate-50 mb-4" />

      {/* Footer: Total & Time */}
      <div className="flex justify-between items-end">
        <div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Total Amount</span>
           <span className="text-2xl font-black text-slate-900 tracking-tighter">
             ₹{order.totalAmount}
           </span>
        </div>
        
        {/* Re-order button or Date */}
        <div className="text-[10px] font-bold text-slate-300">
          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Active Animation Bar */}
      {(order.status === 'cooking' || order.status === 'preparing') && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFB800] overflow-hidden">
          <div className="w-full h-full bg-black/10 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default OrderCard;