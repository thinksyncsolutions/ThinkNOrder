import React from "react";

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cooking': 
      case 'preparing': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'served': return 'bg-green-100 text-green-700 border-green-200';
      case 'ready': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 border border-zinc-100 shadow-sm overflow-hidden relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Order ID</span>
          <h4 className="font-black text-orange-950 uppercase text-sm tracking-tighter">
            #{order._id.slice(-6)}
          </h4>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs">
            <span className="text-zinc-600 font-bold">
              <span className="text-orange-600 mr-2">{item.quantity}x</span> 
              {item.itemname || 'Item'} ({item.selectedSize})
            </span>
            <span className="font-black text-zinc-400">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-dashed border-zinc-100">
        <span className="text-[10px] font-black uppercase text-zinc-400">Total Bill</span>
        <span className="text-lg font-black text-orange-600 italic">₹{order.totalAmount}</span>
      </div>

      {/* Pulsing progress bar for active orders */}
      {(order.status === 'cooking' || order.status === 'preparing') && (
        <div className="absolute bottom-0 left-0 h-1 bg-orange-600 animate-pulse w-full" />
      )}
    </div>
  );
};

export default OrderCard;