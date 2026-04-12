import React from "react";
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChefHat, 
  BarChart3, 
  Timer,
  UtensilsCrossed,
  ArrowUpRight
} from "lucide-react";
import PageHeader from "../../components/common/PageHeader";

const KitchenDashboard = () => {
  const kitchenStats = [
    { title: "Current Load", value: "8 Tickets", change: "High Intensity", icon: Flame, color: "bg-orange-600" },
    { title: "Avg. Prep Time", value: "14m", change: "-2m vs last hr", icon: Timer, color: "bg-black" },
    { title: "Completed", value: "84 Dishes", change: "Today", icon: CheckCircle2, color: "bg-orange-950" },
    { title: "Pending KOTs", value: "03", change: "Needs attention", icon: AlertCircle, color: "bg-red-500" },
  ];

  const stationStatus = [
    { name: "Main Gallery (Hot)", load: "85%", status: "At Capacity", color: "bg-red-500" },
    { name: "Appetizers / Cold", load: "30%", status: "Stable", color: "bg-green-500" },
    { name: "Bakery / Desserts", load: "10%", status: "Idle", color: "bg-orange-400" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      {/* SHARED HEADER IMPLEMENTATION */}
      <PageHeader 
        title="Kitchen"
        highlight="Ops"
        subtitle="Real-time Production Analytics"
        buttonText="View Live KDS"
        buttonIcon={ChefHat}
        onButtonClick={() => {/* Navigate to KDS logic */}}
      />

      {/* OPERATIONAL STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kitchenStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-[2.5rem] p-8 border border-orange-100 shadow-sm group hover:shadow-xl transition-all">
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.title}</p>
            <h2 className="text-3xl font-black text-orange-950 italic tracking-tighter">{stat.value}</h2>
            <p className="text-[9px] font-bold text-orange-400 mt-2 uppercase tracking-widest">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* STATION PERFORMANCE */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-orange-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-orange-50 flex justify-between items-center bg-orange-50/30">
            <h3 className="text-lg font-black text-black uppercase tracking-tight italic">
              Station <span className="text-orange-600">Utilization</span>
            </h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Traffic</span>
          </div>
          <div className="p-8 space-y-8">
            {stationStatus.map((station, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-black text-orange-950 uppercase text-sm tracking-tight">{station.name}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${station.color.replace('bg-', 'text-')}`}>{station.status}</p>
                  </div>
                  <p className="font-black text-orange-950">{station.load}</p>
                </div>
                <div className="h-3 w-full bg-orange-50 rounded-full overflow-hidden border border-orange-100/50">
                  <div className={`h-full ${station.color} rounded-full transition-all duration-1000`} style={{ width: station.load }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOST ORDERED RIGHT NOW */}
        <div className="bg-orange-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-orange-500 mb-8">
              <BarChart3 size={20} />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Prep Demand</h3>
            </div>
            
            <div className="space-y-6">
               {[
                 { name: "Spicy Ramen", qty: 12 },
                 { name: "Truffle Fries", qty: 9 },
                 { name: "Grilled Salmon", qty: 5 },
               ].map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center group cursor-default">
                    <span className="text-xs font-black uppercase tracking-tight text-orange-100 group-hover:text-orange-500 transition-colors">{item.name}</span>
                    <span className="bg-white/10 px-3 py-1 rounded-lg text-xs font-black italic">x{item.qty}</span>
                 </div>
               ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
               <p className="text-[10px] font-bold text-orange-200/50 uppercase tracking-[0.2em] mb-4 text-center text-center">Kitchen health is optimal</p>
               <button className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                 Generate Shift Summary
               </button>
            </div>
          </div>
          <UtensilsCrossed size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;