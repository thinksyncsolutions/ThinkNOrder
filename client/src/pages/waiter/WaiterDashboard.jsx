import React from "react";
import { 
  Bell, 
  Clock, 
  CheckCircle2, 
  UtensilsCrossed, 
  ArrowUpRight, 
  Timer, 
  MapPin,
  Plus,
  Navigation
} from "lucide-react";

const WaiterDashboard = () => {
  const activeTasks = [
    { table: "T-04", floor: "Ground", action: "Order Ready", time: "Just now", type: "Kitchen" },
    { table: "T-12", floor: "Rooftop", action: "Call for Bill", time: "3m ago", type: "Customer" },
    { table: "T-02", floor: "Ground", action: "Pickup Food", time: "8m ago", type: "Kitchen" },
  ];

  const tableSummary = [
    { label: "My Tables", value: "06", icon: MapPin },
    { label: "Open Orders", value: "04", icon: UtensilsCrossed },
    { label: "Pending Bills", value: "02", icon: Bell },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Service <span className="text-orange-600">Hub</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Active Shift Performance
          </p>
        </div>
        <button className="h-14 w-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-xl shadow-orange-950/20 active:scale-90 transition-all">
          <Plus size={28} strokeWidth={3} />
        </button>
      </div>

      {/* QUICK STATUS CHIPS */}
      <div className="grid grid-cols-3 gap-4">
        {tableSummary.map((item, idx) => (
          <div key={idx} className="bg-white border border-orange-100 p-4 rounded-3xl text-center shadow-sm">
            <item.icon size={18} className="mx-auto text-orange-600 mb-2" />
            <p className="text-[18px] font-black text-orange-950 leading-none">{item.value}</p>
            <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PRIORITY NOTIFICATIONS (The "Hustle" Area) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-black uppercase tracking-tight italic">
              Priority <span className="text-orange-600">Alerts</span>
            </h3>
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest animate-pulse">Live Tracking</span>
          </div>

          <div className="space-y-4">
            {activeTasks.map((task, i) => (
              <div key={i} className={`flex items-center justify-between p-6 bg-white rounded-[2rem] border-2 transition-all ${
                i === 0 ? "border-orange-600 shadow-lg shadow-orange-600/10" : "border-gray-100"
              }`}>
                <div className="flex items-center gap-6">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl italic ${
                    i === 0 ? "bg-orange-600 text-white" : "bg-black text-white"
                  }`}>
                    {task.table}
                  </div>
                  <div>
                    <p className="font-black text-orange-950 uppercase text-sm tracking-tight">{task.action}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{task.floor} Floor • {task.time}</p>
                  </div>
                </div>
                
                <button className={`p-4 rounded-2xl transition-all active:scale-95 ${
                  i === 0 ? "bg-orange-950 text-white" : "bg-orange-50 text-orange-600"
                }`}>
                  <CheckCircle2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICE STATS & TOOLS */}
        <div className="space-y-6">
          <div className="bg-orange-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-orange-500 mb-6">
                  <Timer size={20} />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Efficiency</h3>
                </div>
                <div className="space-y-6">
                   <div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                        <span>Table Turnover</span>
                        <span className="text-orange-400">Avg 42m</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-600 w-[75%] shadow-[0_0_10px_#ea580c]"></div>
                      </div>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Service Rating</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => <div key={s} className="w-2 h-2 rounded-full bg-orange-500" />)}
                      </div>
                   </div>
                </div>
             </div>
             <Navigation className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 -rotate-12" />
          </div>

          <div className="bg-white rounded-[2.5rem] border border-orange-100 p-8 flex flex-col items-center text-center group cursor-pointer hover:border-orange-600 transition-all">
            <div className="h-16 w-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-4 transition-transform group-hover:scale-110">
              <UtensilsCrossed size={32} />
            </div>
            <h4 className="font-black uppercase tracking-tight text-orange-950">Floor Map</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-6">View live table availability</p>
            <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all">
              Launch Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterDashboard;