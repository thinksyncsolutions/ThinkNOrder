import React from "react";
import { ShoppingBag, Clock, Flame, CheckCircle2, UtensilsCrossed, ReceiptText } from "lucide-react";

const UserOrders = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-10 text-center">
        <div className="w-24 h-24 bg-white rounded-[3rem] shadow-sm border border-zinc-100 flex items-center justify-center mb-6 text-zinc-200">
          <ShoppingBag size={40} />
        </div>
        <h3 className="font-black text-orange-950 uppercase text-xs tracking-[0.2em]">No Orders Yet</h3>
        <p className="text-[10px] text-zinc-400 mt-2 uppercase font-bold tracking-widest leading-relaxed">
          Your delicious choices will appear <br /> here once you place an order.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[10px] font-black text-orange-950 uppercase tracking-[0.3em]">Live Order Tracking</h2>
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">Live Updates</span>
        </div>
      </div>

      <div className="space-y-6">
        {[...orders].reverse().map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

// ================= STYLISH ORDER CARD (KDS SYNCED) =================
const OrderCard = ({ order }) => {
  const getStatusConfig = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'pending': 
        return { color: 'bg-orange-600 text-white border-orange-700', icon: <Clock size={14} className="animate-pulse" />, label: 'Received' };
      case 'accepted': 
        return { color: 'bg-black text-white border-zinc-800', icon: <CheckCircle2 size={14} />, label: 'Confirmed' };
      case 'preparing': 
        return { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Flame size={14} className="animate-pulse" />, label: 'Chef is Cooking' };
      case 'ready': 
        return { color: 'bg-green-600 text-white border-green-700', icon: <CheckCircle2 size={14} />, label: 'Ready for Pickup' };
      case 'served': 
        return { color: 'bg-zinc-100 text-zinc-400 border-zinc-200', icon: <UtensilsCrossed size={14} />, label: 'Served' };
      case 'cancelled':
        return { color: 'bg-red-50 text-red-600 border-red-100', icon: <ReceiptText size={14} />, label: 'Rejected' };
      default: 
        return { color: 'bg-zinc-50 text-zinc-500 border-zinc-100', icon: <ReceiptText size={14} />, label: status };
    }
  };

  const config = getStatusConfig(order.status);
  const isCooking = order.status?.toLowerCase() === 'preparing';

  return (
    <div className={`bg-white rounded-[2.5rem] p-6 border transition-all duration-300 shadow-sm overflow-hidden relative
      ${order.status?.toLowerCase() === 'pending' ? 'border-orange-500 ring-4 ring-orange-500/5' : 'border-zinc-100'}
    `}>
      {/* Status Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Token ID</span>
          <h4 className="font-black text-orange-950 uppercase text-sm tracking-tighter italic">#{order._id.slice(-6).toUpperCase()}</h4>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border shadow-sm ${config.color}`}>
          {config.icon}
          <span className="text-[9px] font-black uppercase tracking-widest">{config.label}</span>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3 mb-6">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs">
            <span className="text-zinc-600 font-bold flex items-center gap-2">
              <span className="text-orange-600 font-black">{item.quantity}x</span> 
              <span className="uppercase tracking-tight">{item.itemname || item.name}</span>
            </span>
            <span className="font-black text-zinc-300 italic uppercase text-[9px]">{item.selectedSize}</span>
          </div>
        ))}
      </div>

      {/* Footer Summary */}
      <div className="flex justify-between items-center pt-5 border-t border-dashed border-zinc-100">
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Subtotal</span>
          <p className="text-[10px] text-zinc-300 font-bold uppercase">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-black text-orange-600 italic tracking-tighter">₹{order.totalAmount || order.total}</span>
        </div>
      </div>
      
      {/* 🔥 PROGRESS INDICATOR FOR KITCHEN STATUS */}
      {isCooking && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-orange-100 overflow-hidden">
          <div className="h-full bg-orange-600 animate-[loading_2s_infinite] w-1/3 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default UserOrders;