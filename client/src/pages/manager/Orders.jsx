import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  Clock, 
  Users, 
  ChevronRight, 
  Layers, 
  UtensilsCrossed, 
  BellRing,
  LayoutDashboard
} from "lucide-react";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import {
  getPlacesThunk,
  getRunningTablesThunk,
} from "../../redux/features/place/place.thunk";
import PageHeader from "../../components/common/PageHeader";

const socketURL = import.meta.env.VITE_SOCKET_URL;
const socket = io(socketURL);

const Orders = () => {
  const dispatch = useDispatch();
  const { places, runningTables, loadingPlaces, loadingRunningTables } = useSelector((state) => state.place);
  const { user } = useSelector((state) => state.auth);
  const [, setTick] = useState(0);

  // 1. Initial Data Fetch
  useEffect(() => {
    dispatch(getPlacesThunk());
    dispatch(getRunningTablesThunk());
  }, [dispatch]);

  // 2. Real-time Socket Integration (Waiter Calls)
  useEffect(() => {
    if (user?.restaurantId && user?.branchId) {
      socket.emit("joinRoom", user.restaurantId, user.branchId);
    }

    const handleWaiterCalled = (data) => {
      // Enhanced Toast Notification instead of Browser Alert
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-black shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-orange-500`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                  <BellRing size={20} className="animate-bounce" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-black text-white uppercase tracking-tight italic">
                  Waiter Requested!
                </p>
                <p className="mt-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {data.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-800">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-xs font-black text-orange-500 hover:text-orange-400 focus:outline-none uppercase"
            >
              OK
            </button>
          </div>
        </div>
      ), { duration: 6000 });
    };

    socket.on("waiterCalled", handleWaiterCalled);
    return () => { socket.off("waiterCalled", handleWaiterCalled); };
  }, [user?.restaurantId, user?.branchId]);

  // 3. Logic: Grouping & Timers
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

  // 4. Loading State
  if (loadingPlaces || loadingRunningTables) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
        <p className="mt-4 font-black uppercase tracking-widest text-[10px] text-orange-950">Scanning Floors...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* HEADER */}
      <PageHeader 
  title="Floor"
  highlight="Overview"
  subtitle="Live Table Status & Billing"
  extraPill={
    <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold text-xs uppercase">
      <div className="h-2 w-2 rounded-full bg-orange-600 animate-pulse" />
      {runningTables.length} Active Tables
    </div>
  }
/>

      {/* 5. EMPTY STATE */}
      {Object.keys(groupedPlaces).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-orange-200 rounded-[3rem] bg-orange-50/30">
          <div className="h-24 w-24 bg-white text-orange-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl border border-orange-100">
            <LayoutDashboard size={40} strokeWidth={1.5} />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-black uppercase italic tracking-tight">
              Blueprint <span className="text-orange-600">Missing</span>
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] max-w-xs mx-auto">
              You haven't added any tables to your restaurant layout yet.
            </p>
          </div>
          <Link
            to="/manager/places"
            className="mt-10 flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-2xl active:scale-95"
          >
            Go to Sitting Management
          </Link>
        </div>
      ) : (
        /* 6. FLOOR SECTIONS */
        Object.keys(groupedPlaces).sort().map((floor) => (
          <section key={floor} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-600 p-2.5 rounded-xl text-white shadow-lg">
                <Layers size={18} />
              </div>
              <h2 className="text-xl font-black text-black uppercase tracking-tighter italic">
                {floor}
              </h2>
              <div className="h-[1px] flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedPlaces[floor].map((place) => {
                const isRunning = !!runningTableMap[place._id];

                return (
                  <Link 
                    to={`/manager/table/${place._id}`} 
                    state={{ place }} 
                    key={place._id} 
                    className="group"
                  >
                    <div className={`
                      relative overflow-hidden rounded-[2.5rem] p-7 transition-all duration-500
                      ${isRunning 
                        ? "bg-orange-600 text-white shadow-2xl shadow-orange-600/30 -translate-y-2 ring-4 ring-orange-100" 
                        : "bg-white border-2 border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl text-black"}
                    `}>
                      
                      {/* Place Type Badge */}
                      <div className={`absolute top-0 right-0 px-5 py-2 rounded-bl-3xl font-black uppercase text-[8px] tracking-[0.2em]
                        ${isRunning ? "bg-orange-700/50 text-white" : "bg-gray-50 text-gray-400"}`}>
                        {place.type}
                      </div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className={`
                            flex h-14 w-14 items-center justify-center rounded-2xl font-black text-2xl shadow-inner transition-transform group-hover:scale-110
                            ${isRunning ? "bg-white text-orange-600" : "bg-orange-100 text-orange-600"}
                          `}>
                            {place.number}
                          </div>
                          
                          <div className="flex flex-col items-end gap-1">
                             <div className={`h-2.5 w-2.5 rounded-full ${isRunning ? "bg-white animate-pulse" : "bg-green-500"}`} />
                             <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                               {isRunning ? "Live" : "Ready"}
                             </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Users size={16} className={isRunning ? "text-orange-200" : "text-gray-400"} />
                            <span className="text-sm font-black uppercase">Seats {place.capacity}</span>
                          </div>

                          {isRunning ? (
                            <div className="pt-4 border-t border-white/20">
                              <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-orange-200" />
                                  <span className="text-sm font-mono font-black tracking-tighter">
                                    {getRunningTime(runningTableMap[place._id])}
                                  </span>
                                </div>
                                <ChevronRight size={18} className="animate-pulse" />
                              </div>
                            </div>
                          ) : (
                            <div className="pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                               <span className="text-[10px] font-black uppercase text-orange-600 tracking-widest">New Session</span>
                               <ChevronRight size={16} className="text-orange-600" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Ghost Background Icon */}
                      <div className={`absolute -right-6 -bottom-6 opacity-[0.03] rotate-12 transition-transform group-hover:scale-150
                        ${isRunning ? "text-white" : "text-black"}`}>
                        <UtensilsCrossed size={140} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Orders;