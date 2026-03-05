import React from "react";
import { 
  TrendingUp, 
  Store, 
  Users, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  MoreHorizontal,
  Plus
} from "lucide-react";

const OwnerDashboard = () => {
  const businessStats = [
    { title: "Total Portfolio Value", value: "₹24.8L", change: "+14.2%", positive: true, icon: IndianRupee },
    { title: "Total Footfall", value: "12,450", change: "+5.1%", positive: true, icon: Users },
    { title: "Active Branches", value: "08", change: "0 pending", positive: true, icon: Store },
    { title: "Avg. Profit Margin", value: "32%", change: "-1.2%", positive: false, icon: Target },
  ];

  const branchPerformance = [
    { name: "Downtown Branch", revenue: "₹8.2L", status: "High Growth", color: "bg-green-500" },
    { name: "Cyber Hub Outlet", revenue: "₹6.1L", status: "Stable", color: "bg-orange-500" },
    { name: "Airport Lounge", revenue: "₹4.8L", status: "Expanding", color: "bg-blue-500" },
    { name: "Westside Diner", revenue: "₹3.2L", status: "Under Review", color: "bg-red-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Executive <span className="text-orange-600">Suite</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Global Portfolio Overview
          </p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/10">
          <Plus size={16} strokeWidth={3} />
          Launch New Branch
        </button>
      </div>

      {/* EXECUTIVE STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-[2.5rem] p-8 border border-orange-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
                stat.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}>
                {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.title}</p>
            <h2 className="text-3xl font-black text-orange-950 italic tracking-tighter">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BRANCH LEADERBOARD */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-orange-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-orange-50 flex justify-between items-center">
            <h3 className="text-lg font-black text-black uppercase tracking-tight italic">
              Branch <span className="text-orange-600">Leaderboard</span>
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-orange-600 underline">Detailed Audit</button>
          </div>
          <div className="divide-y divide-orange-50">
            {branchPerformance.map((branch, i) => (
              <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-orange-50/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`h-3 w-3 rounded-full ${branch.color}`} />
                  <div>
                    <p className="font-black text-orange-950 uppercase text-sm tracking-tight">{branch.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{branch.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-black">{branch.revenue}</p>
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">+12% Monthly</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STRATEGIC ACTIONS */}
        <div className="space-y-6">
          <div className="bg-orange-950 rounded-[2.5rem] p-8 text-white">
            <h3 className="text-lg font-black uppercase tracking-tight italic mb-6 text-orange-500">
              System <span className="text-white">Health</span>
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span>Platform Uptime</span>
                  <span className="text-green-400 text-xs text-xs">99.9%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[99%] shadow-[0_0_10px_#22c55e]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span>Server Load (8 Nodes)</span>
                  <span className="text-orange-500 text-xs">Normal</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 w-[45%] shadow-[0_0_10px_#ea580c]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-orange-100 p-8 flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
              <TrendingUp size={32} />
            </div>
            <h4 className="font-black uppercase tracking-tight text-orange-950">Growth Report</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-6">Generated 2 hours ago</p>
            <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;