import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Clock, Users, ChevronRight, Hash, Layers, UtensilsCrossed } from "lucide-react";
import {
  getPlacesThunk,
  getRunningTablesThunk,
} from "../../redux/features/place/place.thunk";
import { io } from "socket.io-client";

const socketURL = import.meta.env.VITE_SOCKET_URL;
const socket = io(socketURL);

const Orders = () => {
  const dispatch = useDispatch();
  const { places, runningTables, loadingPlaces, loadingRunningTables } = useSelector((state) => state.place);
  const [, setTick] = useState(0);
  const { restaurantId, branchId } = useSelector((state) => state.auth.user); 

  useEffect(() => {
    dispatch(getPlacesThunk());
    dispatch(getRunningTablesThunk());
  }, [dispatch]);

   useEffect(() => {
    // 2. Join the room as soon as the component mounts
    if (restaurantId && branchId) {
      socket.emit("joinRoom", restaurantId, branchId);
      console.log(`Joined room: restaurant:${restaurantId}:branch:${branchId}`);
    }

    // 3. Define the listener
    const handleWaiterCalled = (data) => {
      // console.log("🔔 Waiter Requested:", data);
      alert(`🔔 ${data.message}`);
    };

    // 4. Attach the listener
    socket.on("waiterCalled", handleWaiterCalled);

    // 5. CLEANUP: This is CRITICAL to prevent duplicate listeners
    return () => {
      socket.off("waiterCalled", handleWaiterCalled);
    };
  }, [restaurantId, branchId]); 

  const groupedPlaces = useMemo(() => {
    return places.reduce((acc, place) => {
      acc[place.floor] = acc[place.floor] || [];
      acc[place.floor].push(place);
      return acc;
    }, {});
  }, [places]);

  const runningTableMap = useMemo(() => {
    const map = {};
    runningTables.forEach((t) => { map[t.placeId] = t.startedAt; });
    return map;
  }, [runningTables]);

  useEffect(() => {
    const interval = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getRunningTime = (startedAt) => {
    const diff = new Date() - new Date(startedAt);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loadingPlaces || loadingRunningTables) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Floor <span className="text-orange-600">Overview</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-widest">
            Live Table Status & Billing
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold text-xs uppercase">
            <div className="h-2 w-2 rounded-full bg-orange-600 animate-pulse" />
            {runningTables.length} Active Tables
          </div>
        </div>
      </div>

      {/* Floors Mapping */}
      {Object.keys(groupedPlaces).map((floor) => (
        <section key={floor} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-lg text-white">
              <Layers size={20} />
            </div>
            <h2 className="text-xl font-black text-black uppercase tracking-tighter italic">
              {floor}
            </h2>
            <div className="h-[2px] flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groupedPlaces[floor].map((place) => {
              const isRunning = !!runningTableMap[place._id];

              return (
                <Link to={`/manager/table/${place._id}`} state={{place}} key={place._id} className="group">
                  <div className={`
                    relative overflow-hidden rounded-3xl p-6 transition-all duration-300
                    ${isRunning 
                      ? "bg-orange-600 text-white shadow-xl shadow-orange-600/20 translate-y-[-4px]" 
                      : "bg-white border-2 border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-md text-black"}
                  `}>
                    
                    {/* Background Decorative Icon */}
                    <div className={`absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110 ${isRunning ? 'text-white' : 'text-black'}`}>
                      <UtensilsCrossed size={120} />
                    </div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`
                          flex h-12 w-12 items-center justify-center rounded-2xl font-black text-xl
                          ${isRunning ? "bg-orange-950/30 text-white" : "bg-gray-100 text-black"}
                        `}>
                          {place.number}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          isRunning ? "bg-white text-orange-600" : "bg-green-100 text-green-700"
                        }`}>
                          {isRunning ? "Occupied" : "Vacant"}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className={`text-xs font-bold uppercase tracking-widest opacity-70`}>
                          {place.type}
                        </p>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span className="font-bold tracking-tight">Seats {place.capacity}</span>
                        </div>
                      </div>

                      {isRunning && (
                        <div className="mt-6 pt-4 border-t border-orange-400/30 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-orange-200" />
                            <span className="text-sm font-mono font-bold tracking-widest">
                              {getRunningTime(runningTableMap[place._id])}
                            </span>
                          </div>
                          <ChevronRight size={20} className="animate-bounce-x" />
                        </div>
                      )}
                      
                      {!isRunning && (
                        <div className="mt-6 pt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-xs font-black uppercase text-orange-600">Open Table →</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

// Add this to your Global CSS/Tailwind for the bounce animation
// @keyframes bounce-x {
//   0%, 100% { transform: translateX(0); }
//   50% { transform: translateX(4px); }
// }
// .animate-bounce-x { animation: bounce-x 1s infinite; }

export default Orders;