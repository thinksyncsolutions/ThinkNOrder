import React from "react";
import { 
  Wallet, 
  Banknote, 
  CreditCard, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Receipt,
  CircleDollarSign,
  History
} from "lucide-react";

const CashierDashboard = () => {
  const paymentStats = [
    { title: "Cash in Hand", value: "₹12,450", icon: Banknote, color: "text-green-600", bg: "bg-green-50" },
    { title: "UPI / Digital", value: "₹28,200", icon: CircleDollarSign, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Card Payments", value: "₹8,400", icon: CreditCard, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Total Collection", value: "₹49,050", icon: Wallet, color: "text-orange-950", bg: "bg-orange-100" },
  ];

  const pendingSettlements = [
    { table: "T-04", floor: "Ground", amount: "₹1,240", time: "5m ago", status: "Bill Printed" },
    { table: "T-12", floor: "Rooftop", amount: "₹4,850", time: "2m ago", status: "Pending" },
    { table: "T-09", floor: "Ground", amount: "₹890", time: "12m ago", status: "Bill Printed" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Cash <span className="text-orange-600">Counter</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Settlement & Transaction Hub
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-orange-950 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all shadow-lg">
            <History size={16} />
            Today's History
          </button>
        </div>
      </div>

      {/* DRAWER STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-[2.5rem] p-6 border border-orange-100 shadow-sm flex flex-col justify-between group hover:border-orange-600 transition-all">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.title}</p>
              <h2 className="text-2xl font-black text-orange-950 italic mt-1">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PENDING SETTLEMENTS */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-orange-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-orange-50 flex justify-between items-center bg-orange-50/30">
            <h3 className="text-lg font-black text-black uppercase tracking-tight italic">
              Pending <span className="text-orange-600">Settlements</span>
            </h3>
            <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase">
              {pendingSettlements.length} Tables
            </span>
          </div>
          
          <div className="divide-y divide-orange-50">
            {pendingSettlements.map((item, i) => (
              <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-orange-50/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xl italic shadow-lg">
                    {item.table}
                  </div>
                  <div>
                    <p className="font-black text-orange-950 uppercase text-sm tracking-tight">{item.amount}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.floor} Floor • {item.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden md:block text-right mr-4">
                    <span className="text-[10px] font-black uppercase text-orange-400 block tracking-tighter">{item.status}</span>
                  </div>
                  <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-700 active:scale-95 transition-all shadow-md">
                    Settle Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS & SHIFT INFO */}
        <div className="space-y-6">
          <div className="bg-orange-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 mb-6">Shift Report</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-end border-b border-white/10 pb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Started At</span>
                      <span className="text-xs font-black">09:00 AM</span>
                   </div>
                   <div className="flex justify-between items-end border-b border-white/10 pb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Transactions</span>
                      <span className="text-xs font-black">48 Bills</span>
                   </div>
                   <div className="flex justify-between items-end pt-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Voided/Ref</span>
                      <span className="text-xs font-black text-red-400">₹0.00</span>
                   </div>
                </div>
                <button className="w-full mt-8 bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/5">
                  Print X-Report
                </button>
             </div>
             <Receipt className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 -rotate-12" />
          </div>

          <div className="bg-white rounded-[2.5rem] border border-orange-100 p-8 flex flex-col items-center text-center group">
            <div className="h-16 w-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4 transition-transform group-hover:rotate-12">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="font-black uppercase tracking-tight text-orange-950">End Shift</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-6">Reconcile cash & close counter</p>
            <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all shadow-xl active:scale-95">
              Close Counter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;