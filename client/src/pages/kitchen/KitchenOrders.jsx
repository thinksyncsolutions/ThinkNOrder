import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { CheckCircle2, Clock, UtensilsCrossed, ChefHat } from "lucide-react";
import { fetchOrdersForKitchen, changeOrderStatus } from "../../redux/features/order/order.thunk";
import PageHeader from "../../components/common/PageHeader";

const socketURL = import.meta.env.VITE_SOCKET_URL;

export default function KitchenOrders() {
  const dispatch = useDispatch();
  const { kitchenOrders: allOrders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const notificationSound = useRef(new Audio("/notification.mp3"));

  const playNotification = () => {
    notificationSound.current.play().catch(err => {
      console.log("Audio play blocked: Browser requires user interaction first.");
    });
  };

  const sortOrdersByPriorityAndTime = (orders) => {
    const statusPriority = {
      pending: 1,
      accepted: 2,
      preparing: 3,
      ready: 4,
      served: 5,
      cancelled: 6,
    };

    return [...orders].sort((a, b) => {
      const statusA = statusPriority[a.status?.toLowerCase()] || 4;
      const statusB = statusPriority[b.status?.toLowerCase()] || 4;
      if (statusA !== statusB) return statusA - statusB;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  };

  const sortedOrders = sortOrdersByPriorityAndTime(allOrders);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(changeOrderStatus({ orderId, newStatus }));
  };

  useEffect(() => {
    if (!user?.restaurantId || !user?.branchId) return;
    dispatch(fetchOrdersForKitchen());

    const socket = io(socketURL);
    socket.on("connect", () => socket.emit("joinRoom", user.restaurantId, user.branchId));

    socket.on("newOrder", () => {
      playNotification();
      dispatch(fetchOrdersForKitchen());
    });

    socket.on("orderStatusChanged", () => dispatch(fetchOrdersForKitchen()));

    return () => { socket.disconnect(); };
  }, [user?.restaurantId, user?.branchId, dispatch]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-orange-600 text-white animate-pulse";
      case "accepted": return "bg-black text-white";
      case "preparing": return "bg-orange-100 text-orange-700 border-2 border-orange-600";
      case "ready": return "bg-green-600 text-white";
      case "served": return "bg-gray-100 text-gray-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  if (loading && sortedOrders.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
        <p className="mt-4 font-black uppercase tracking-widest text-orange-950">Syncing Kitchen...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* INTEGRATED SHARED HEADER */}
      <PageHeader 
        title="Kitchen"
        highlight="Live"
        subtitle="Real-time Order Processing"
        extraPill={
          <div className="flex items-center gap-4">
             <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest animate-pulse">
               Audio Alert Active
             </div>
             <div className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl shadow-xl">
                <ChefHat size={20} className="text-orange-500" />
                <span className="text-sm font-black uppercase tracking-widest">
                  Orders: {sortedOrders.filter(o => !['served', 'cancelled'].includes(o.status.toLowerCase())).length}
                </span>
             </div>
          </div>
        }
      />

      {/* ORDERS GRID OR EMPTY STATE */}
      {sortedOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 px-4 border-2 border-dashed border-orange-200 rounded-[3rem] bg-orange-50/30 animate-in fade-in zoom-in duration-500">
          <div className="h-24 w-24 bg-white text-orange-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl border border-orange-100">
            <UtensilsCrossed size={40} strokeWidth={1.5} />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-black uppercase italic tracking-tight">
              Kitchen <span className="text-orange-600">Cleared</span>
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] max-w-xs mx-auto">
              No active tickets in the queue. Everything is served!
            </p>
          </div>
          <div className="mt-10 flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-orange-100 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-[10px] font-black text-orange-950 uppercase tracking-widest">
              Standing by for new orders
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedOrders.map((order) => (
            <div
              key={order._id}
              className={`relative flex flex-col bg-white rounded-[2rem] border-2 transition-all duration-300 overflow-hidden shadow-sm
                ${order.status?.toLowerCase() === 'pending' ? 'border-orange-500 shadow-orange-600/20 shadow-xl' : 'border-gray-100'}
              `}
            >
              {/* Card Header */}
              <div className={`p-5 flex justify-between items-center ${getStatusStyle(order.status)}`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-black text-xl">
                    {order.table}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{order.floor || 'Main'} Floor</p>
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <Clock size={12} /> {formatTime(order.createdAt)}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{order.status}</span>
              </div>

              {/* Items List */}
              <div className="p-6 flex-1 space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <span className="h-6 w-6 flex items-center justify-center bg-orange-50 text-orange-600 font-black rounded-lg text-xs">
                        {item.quantity}
                      </span>
                      <div>
                        <p className="font-black text-orange-950 uppercase text-sm leading-tight">{item.itemname}</p>
                        {item.selectedSize && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.selectedSize}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="p-6 pt-0 mt-auto">
                <div className="border-t border-gray-100 pt-4">
                  {order.status?.toLowerCase() === 'pending' && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleStatusChange(order._id, 'Accepted')}
                        className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all active:scale-95"
                      >
                        Accept & Print KOT
                      </button>
                      <button
                        onClick={() => handleStatusChange(order._id, 'Cancelled')}
                        className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-600"
                      >
                        Reject Ticket
                      </button>
                    </div>
                  )}

                  {order.status?.toLowerCase() === 'accepted' && (
                    <button
                      onClick={() => handleStatusChange(order._id, 'Preparing')}
                      className="w-full bg-orange-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all active:scale-95 shadow-lg shadow-orange-600/30"
                    >
                      Start Cooking
                    </button>
                  )}

                  {order.status?.toLowerCase() === 'preparing' && (
                    <button
                      onClick={() => handleStatusChange(order._id, 'Ready')}
                      className="w-full border-2 border-green-600 text-green-600 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-green-600 hover:text-white transition-all active:scale-95"
                    >
                      Ready for Pick-up
                    </button>
                  )}

                  {order.status?.toLowerCase() === 'ready' && (
                    <button
                      onClick={() => handleStatusChange(order._id, 'Served')}
                      className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-all active:scale-95"
                    >
                      Mark as Served
                    </button>
                  )}

                  {order.status?.toLowerCase() === 'served' && (
                    <div className="flex items-center justify-center gap-2 py-4 text-gray-400 font-black uppercase text-xs tracking-widest">
                      <CheckCircle2 size={16} /> Order Completed
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}