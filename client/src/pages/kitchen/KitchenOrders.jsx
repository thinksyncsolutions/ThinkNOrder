import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Added Redux hooks
import { io } from "socket.io-client";
import { CheckCircleIcon } from "lucide-react";
import { fetchOrdersForKitchen, changeOrderStatus } from "../../redux/features/order/order.thunk"; // Adjust path as needed

const socketURL = import.meta.env.VITE_SOCKET_URL; // Ensure this is set in your .env file

export default function KitchenOrders() {
  const dispatch = useDispatch();
  
  // Get state from Redux
  const { kitchenOrders: allOrders, loading } = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.auth);

  // Custom sorting function for orders
  const sortOrdersByPriorityAndTime = (orders) => {
    const statusPriority = {
      'pending': 1,
      'accepted': 2,
      'delivered': 3,
    };

    return [...orders].sort((a, b) => {
      const statusA = statusPriority[a.status?.toLowerCase()] || 4;
      const statusB = statusPriority[b.status?.toLowerCase()] || 4;

      if (statusA !== statusB) {
        return statusA - statusB;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  // Memoize sorted orders for display
  const sortedOrders = sortOrdersByPriorityAndTime(allOrders);

  const handleStatusChange = (orderId, newStatus) => {
    // Redux handles the optimistic/state update via changeOrderStatus.fulfilled
    dispatch(changeOrderStatus({ orderId, newStatus }));
  };

useEffect(() => {
  dispatch(fetchOrdersForKitchen());
  if (!user?.restaurantId || !user?.branchId) return;

  const socket = io(socketURL);

  socket.on("connect", () => {
    socket.emit("joinRoom", user.restaurantId, user.branchId);
    // console.log(`Joining Room: restaurant:${user.restaurantId}:branch:${user.branchId}`);
  });

  socket.on("newOrder", () => {
    dispatch(fetchOrdersForKitchen());
  });

  socket.on("orderStatusChanged", () => {
    dispatch(fetchOrdersForKitchen());
  });

  return () => {
    socket.disconnect();
  };

}, [user]);

  const getStatusPillClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
    });
  };

  const isNewOrder = (order) => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return order.status?.toLowerCase() === 'pending' && new Date(order.createdAt) > fiveMinutesAgo;
  };

  if (loading && sortedOrders.length === 0) {
    return (
      <div className="h-full bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100 p-4 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Kitchen Orders</h1>
            <p className="text-gray-600 mt-1">Manage and track all incoming kitchen orders in real-time.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-sm font-medium text-gray-700">Live</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Active Orders: </span>
              <span className="font-bold text-gray-900">
                {sortedOrders.filter(o => o.status?.toLowerCase() !== 'delivered').length}
              </span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {sortedOrders.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-600">New orders will appear here automatically.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 hidden md:block">
              <div className="grid grid-cols-12 gap-x-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-1">Table</div>
                <div className="col-span-2">Time</div>
                <div className="col-span-5">Items</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            </div>

            {/* Orders */}
            <div className="divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <div
                  key={order._id}
                  className={`p-6 transition-colors duration-200 hover:bg-gray-50 ${
                    isNewOrder(order) ? "bg-yellow-50 border-l-4 border-yellow-400" : ""
                  }`}
                >
                  <div className="grid grid-cols-12 gap-x-6 gap-y-4 items-center">
                    <div className="col-span-4 md:col-span-1 uppercase">
                      <div className="text-xs text-gray-500 md:hidden">Table</div>
                      {order.floor ? <div className="text-xs text-gray-900">{order.floor} Floor</div> : null}
                      <div className="text-xs text-gray-900">{order.table}</div>
                    </div>

                    <div className="col-span-8 md:col-span-2 text-right md:text-left">
                       <div className="text-xs text-gray-500 md:hidden">Time</div>
                      <div className="text-sm text-gray-700">{formatTime(order.createdAt)}</div>
                    </div>

                    <div className="col-span-12 md:col-span-5 space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-800">
                            {item.quantity} × {item.itemname}{" "}
                            {item.selectedSize && `(${item.selectedSize})`}
                          </span>
                          <span className="font-mono text-gray-600">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                       <div className="border-t pt-2 mt-2 flex justify-between font-bold text-gray-800">
                         <span>Total</span>
                         <span>₹{order.totalAmount}</span>
                       </div>
                    </div>

                    <div className="col-span-6 md:col-span-2">
                       <div className="text-xs text-gray-500 md:hidden mb-1">Status</div>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusPillClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="col-span-6 md:col-span-2 text-right">
                      {order.status?.toLowerCase() === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(order._id, 'Accepted')}
                          className="w-full text-sm bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
                        >
                          Accept
                        </button>
                      )}
                      {order.status?.toLowerCase() === 'accepted' && (
                        <button
                          onClick={() => handleStatusChange(order._id, 'Delivered')}
                          className="w-full text-sm bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-all duration-200"
                        >
                          Deliver
                        </button>
                      )}
                       {order.status?.toLowerCase() === 'delivered' && (
                        <div className="flex items-center justify-end gap-2 text-green-600">
                          <CheckCircleIcon className="h-5 w-5" />
                          <span className="text-sm font-semibold">Delivered</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}