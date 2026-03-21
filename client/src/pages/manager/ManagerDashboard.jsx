import React, { useEffect } from "react";
import { 
  Users, 
  ShoppingCart, 
  IndianRupee, 
  Utensils, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  Plus, 
  FileBarChart 
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardSummary } from "../../redux/features/dashboard/dashboard.thunk";

const ManagerDashboard = () => {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth);
  const {summary, loading, error} = useSelector((state) => state.dashboard);

  console.log(summary)

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch, user]);

  const stats = [
    {
      title: "Today's Orders",
      value: summary?.todayOrders || 0,
      change: "+12% vs yesterday",
      icon: <ShoppingCart size={24} />,
      color: "bg-orange-600",
    },
    {
      title: "Net Revenue",
      value: `₹${summary?.netRevenue?.[0]?.total || 0}`,
      change: "+8% vs yesterday",
      icon: <IndianRupee size={24} />,
      color: "bg-black",
    },
    {
      title: "Active Tables",
      value:  summary?.activeTables || "0/0",
      change: "60% Occupancy",
      icon: <Utensils size={24} />,
      color: "bg-orange-950",
    },
    {
      title: "Avg. Prep Time",
      value: "18m",
      change: "-2m improvement",
      icon: <Clock size={24} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Branch <span className="text-orange-600">Analytics</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            ThinkNOrder Command Center
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/10">
            <Plus size={16} strokeWidth={3} />
            New Order
          </button>
          <button className="flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-100 transition-all active:scale-95">
            <FileBarChart size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-[2.5rem] p-6 border border-orange-100 shadow-sm hover:shadow-xl hover:shadow-orange-950/5 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${item.color} p-3 rounded-2xl text-white shadow-lg`}>
                {item.icon}
              </div>
              <div className="flex items-center gap-1 text-green-600 font-black text-[10px] bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} />
                {item.change.split(' ')[0]}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {item.title}
              </p>
              <h2 className="text-3xl font-black text-orange-950 mt-1 italic tracking-tighter">
                {item.value}
              </h2>
              <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
                {item.change.split(' ').slice(1).join(' ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT PERFORMANCE / TOP SELLING */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-orange-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-black uppercase tracking-tight italic">
              Top Selling <span className="text-orange-600">Dishes</span>
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-colors">
              View All Items →
            </button>
          </div>
          
          <div className="space-y-6">
            {[
              { name: "Butter Chicken", sales: 42, revenue: "₹18,900", progress: "w-[85%]" },
              { name: "Paneer Tikka", sales: 38, revenue: "₹12,450", progress: "w-[70%]" },
              { name: "Garlic Naan", sales: 110, revenue: "₹5,500", progress: "w-[95%]" },
            ].map((dish, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-black text-orange-950 uppercase text-sm tracking-tight">{dish.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{dish.sales} orders today</p>
                  </div>
                  <p className="font-black text-orange-600">{dish.revenue}</p>
                </div>
                <div className="h-2 w-full bg-orange-50 rounded-full overflow-hidden">
                  <div className={`h-full bg-orange-600 rounded-full ${dish.progress}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK MANAGEMENT */}
        <div className="bg-orange-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight italic mb-2">
                Operational <span className="text-orange-500">Links</span>
              </h3>
              <p className="text-xs font-bold text-orange-200/60 uppercase tracking-widest mb-8">
                Quick Access Controls
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Manage Floor Plan", path: "/manager/tables" },
                { label: "Menu Editor", path: "/manager/menu" },
                { label: "Staff Directory", path: "/manager/staff" },
                { label: "Billing Reports", path: "/manager/orders" },
              ].map((link, i) => (
                <button 
                  key={i}
                  className="w-full flex justify-between items-center group/btn bg-white/5 hover:bg-orange-600 p-4 rounded-2xl transition-all duration-300"
                >
                  <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
                  <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
          <Utensils className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;