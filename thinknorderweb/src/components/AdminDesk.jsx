import React from "react";
import { Layers, MenuIcon, Receipt, TrendingUp, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDesk() {
  const features = [
    {
      icon: <Layers size={22} />,
      title: "Table & Floor Management",
      desc: "Organize your space by floors. Track live occupancy and turnover rates in real-time.",
    },
    {
      icon: <MenuIcon size={22} />,
      title: "Dynamic Menu Control",
      desc: "Update prices or toggle 'Out of Stock' items across all QR codes with one click.",
    },
    {
      icon: <Receipt size={22} />,
      title: "Automated Billing",
      desc: "Generate GST-ready invoices, manage split bills, and sync with your accounting.",
    }
  ];

  return (
    <section id="admin" className="relative py-12 bg-zinc-950 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <div>
            {/* <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
            >
              <Activity size={12} /> Command Center
            </motion.div> */}
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-[1.1]">
              COMPLETE <span className="text-orange-500">CONTROL</span> <br />
              <span className="text-zinc-700">FROM THE DESK.</span>
            </h2>

            <div className="grid gap-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="group flex gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="mt-1 text-orange-500 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{f.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Mockup */}
          <div className="relative">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full opacity-30 animate-pulse" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              className="relative bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                      <TrendingUp size={12} className="text-orange-500" />
                      <span className="text-[10px] text-orange-500 font-bold uppercase tracking-tighter">Live Sales</span>
                   </div>
                   <Users size={14} className="text-zinc-600" />
                </div>
              </div>

              {/* Mockup Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Active Orders</p>
                    <p className="text-2xl font-black text-white">14</p>
                 </div>
                 <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Floor Occupancy</p>
                    <p className="text-2xl font-black text-orange-500">82%</p>
                 </div>
              </div>

              {/* Floor Plan Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h5 className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Floor 01 Layout</h5>
                   <div className="w-12 h-1 bg-zinc-800 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className={`aspect-video rounded-xl flex flex-col items-center justify-center border transition-colors ${
                        i === 2 || i === 5 
                        ? 'bg-orange-500/10 border-orange-500/40 text-orange-500' 
                        : 'bg-zinc-900 border-white/5 text-zinc-600'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase">T-{i}</span>
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${i === 2 || i === 5 ? 'bg-orange-500 shadow-[0_0_8px_#f97316]' : 'bg-zinc-700'}`} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Notification Pop-up (Creative Detail) */}
              <motion.div 
                animate={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ delay: 2, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-orange-600 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-zinc-950"
              >
                 <div className="bg-white/20 p-2 rounded-lg"><TrendingUp size={16} className="text-white"/></div>
                 <div className="text-left leading-none">
                    <p className="text-[10px] font-black text-white/60 uppercase">New Order</p>
                    <p className="text-sm font-black text-white">$124.50</p>
                 </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}