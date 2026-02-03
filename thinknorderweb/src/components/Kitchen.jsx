import React from "react";
import { Flame, Clock, Zap, Timer, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

export default function Kitchen() {
  const kdsOrders = [
    { id: "T-08", item: "2x Truffle Burger", time: "02:45", status: "In Prep", color: "text-orange-500" },
    { id: "T-12", item: "1x Margherita Pizza", time: "08:12", status: "Urgent", color: "text-red-500" },
    { id: "T-04", item: "4x Coca Cola", time: "00:30", status: "Ready", color: "text-white" },
  ];

  return (
    <section id="kitchen" className="relative py-32 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/50 -skew-x-12 translate-x-20 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-[0.4em] mb-6"
            >
              <div className="relative">
                <Flame size={18} className="relative z-10" fill="currentColor" />
                <Flame size={18} className="absolute inset-0 animate-ping opacity-50" fill="currentColor" />
              </div>
              Live Kitchen Sync
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-orange-950 mb-8 leading-[1.1] tracking-tighter">
              THE KITCHEN <br />
              <span className="text-orange-600 italic">NEVER MISSES.</span>
            </h2>

            <p className="text-zinc-500 text-xl mb-10 leading-relaxed font-medium max-w-lg">
              Orders land instantly on the Kitchen Display System (KDS). 
              Eliminate paper trails and synchronize your chefs with the speed of thought.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2.5rem] bg-orange-600 shadow-[0_20px_40px_-10px_rgba(234,88,12,0.3)] text-white"
              >
                <Timer className="mb-4 opacity-80" size={28} />
                <h4 className="font-black text-4xl mb-1">98%</h4>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Faster Prep Time</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2.5rem] bg-zinc-950 text-white shadow-2xl"
              >
                <Zap className="mb-4 text-orange-500" size={28} />
                <h4 className="font-black text-4xl mb-1">0%</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Lost Tickets</p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: KDS Terminal Mockup */}
          <div className="relative group">
            {/* Terminal Shadow/Glow */}
            <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full group-hover:bg-orange-500/20 transition-all duration-700" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative bg-zinc-900 rounded-[3.5rem] p-8 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-white/5"
            >
              {/* Terminal Header */}
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <div className="w-3 h-3 rounded-full bg-white/20 border border-white/50" />
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">KDS Live monitor</span>
                </div>
              </div>

              {/* Order List */}
              <div className="space-y-4">
                {kdsOrders.map((order, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-5 flex justify-between items-center transition-colors hover:bg-white/[0.06] hover:border-orange-500/30"
                  >
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center font-black text-orange-500 text-sm border border-white/5">
                          {order.id}
                       </div>
                       <div>
                          <p className="text-white font-black text-lg tracking-tight">{order.item}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <Clock size={12} className="text-zinc-500" />
                             <span className="text-[10px] font-bold text-zinc-500">{order.time} elapsed</span>
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${order.status === 'Urgent' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-white/5 border-white/10 text-zinc-300'}`}>
                          {order.status === 'Ready' && '✅ '}{order.status}
                       </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Decoration: Tablet Home Bar */}
              <div className="mt-8 flex justify-center">
                 <div className="w-24 h-1.5 bg-zinc-800 rounded-full" />
              </div>
            </motion.div>

            {/* Floating Chef Badge (Creative Detail) */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-10 -right-10 bg-white p-5 rounded-[2rem] shadow-2xl border border-orange-100 hidden xl:flex items-center gap-4"
            >
               <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white">
                  <ChefHat size={24} />
               </div>
               <div className="text-left pr-4">
                  <p className="text-[10px] font-black text-zinc-400 uppercase">Station</p>
                  <p className="text-sm font-black text-orange-950">Main Kitchen</p>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}