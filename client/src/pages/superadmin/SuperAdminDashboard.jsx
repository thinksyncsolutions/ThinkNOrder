import React from "react";
import { 
  ShieldCheck, 
  Store, 
  Users, 
  Activity, 
  Globe, 
  TrendingUp, 
  AlertTriangle,
  Server,
  CreditCard,
  Plus,
  ArrowUpRight
} from "lucide-react";

const SuperAdminDashboard = () => {
  const platformStats = [
    { title: "Total Enterprises", value: "124", change: "+4 this month", icon: Store, color: "bg-orange-600" },
    { title: "Active Nodes", value: "842", change: "99.9% Uptime", icon: Server, color: "bg-black" },
    { title: "Platform Revenue", value: "₹84.2L", change: "+22% Year-to-date", icon: CreditCard, color: "bg-orange-950" },
    { title: "Global Users", value: "12.5k", change: "Live across 12 cities", icon: Globe, color: "bg-orange-500" },
  ];

  const recentClients = [
    { name: "The Grand Pavilion", owner: "S. Kapoor", status: "Active", plan: "Enterprise", date: "2 hours ago" },
    { name: "Urban Bites Co.", owner: "M. Verma", status: "Pending Setup", plan: "Professional", date: "5 hours ago" },
    { name: "Spice Route", owner: "R. Singh", status: "Suspended", plan: "Basic", date: "1 day ago" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight flex items-center gap-3">
            System <span className="text-orange-600 underline">Nexus</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Global Infrastructure & Client Oversight
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all active:scale-95 shadow-xl shadow-orange-600/20">
            <Plus size={18} strokeWidth={3} />
            Onboard Enterprise
          </button>
        </div>
      </div>

      {/* SYSTEM CRITICAL ALERTS (Simulated) */}
      <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-lg text-white">
            <Activity size={18} className="animate-pulse" />
          </div>
          <p className="text-xs font-bold text-orange-950 uppercase tracking-tight">
            System Pulse: <span className="text-green-600">All Nodes Operational</span>
          </p>
        </div>
        <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest px-4">Last Sync: 12s ago</span>
      </div>

      {/* PLATFORM METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-[2.5rem] p-8 border border-orange-100 shadow-sm hover:shadow-xl transition-all">
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.title}</p>
            <h2 className="text-3xl font-black text-orange-950 tracking-tighter italic">{stat.value}</h2>
            <p className="text-[10px] font-bold text-orange-400 mt-2 uppercase tracking-wide">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CLIENT REGISTRY PREVIEW */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-orange-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-orange-50 flex justify-between items-center bg-orange-50/30">
            <h3 className="text-lg font-black text-black uppercase tracking-tight italic">
              Recent <span className="text-orange-600">Onboarding</span>
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-orange-950 underline">View Full Registry</button>
          </div>
          <div className="divide-y divide-orange-50 px-4">
            {recentClients.map((client, i) => (
              <div key={i} className="py-6 px-4 flex items-center justify-between group hover:bg-orange-50/50 rounded-2xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center text-white font-black text-xs">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-orange-950 uppercase text-sm tracking-tight">{client.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Owner: {client.owner}</p>
                  </div>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="hidden md:block text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">{client.plan}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{client.date}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm
                    ${client.status === "Active" ? "bg-green-100 text-green-700" : 
                      client.status === "Suspended" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}
                  `}>
                    {client.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY & MAINTENANCE */}
        <div className="space-y-6">
          <div className="bg-orange-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-orange-500 mb-6">
                  <ShieldCheck size={20} />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Security Shield</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Firewall Status</span>
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest underline">Hardened</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">SSL Expiry</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">342 Days</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Pending Updates</span>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest italic">None</span>
                  </div>
                </div>
             </div>
             <Activity className="absolute -bottom-10 -left-10 w-40 h-40 text-white/5" />
          </div>

          <div className="bg-black rounded-[2.5rem] p-8 text-white group cursor-pointer hover:bg-orange-600 transition-all duration-300">
             <div className="flex justify-between items-start">
                <AlertTriangle className="text-orange-500 group-hover:text-white transition-colors" size={32} />
                <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
             </div>
             <h4 className="mt-8 font-black uppercase tracking-tight text-xl italic">Incident <br/>Logs</h4>
             <p className="mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">0 Critical errors detected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;