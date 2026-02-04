import React from "react";
import {
  BellRing,
  ChefHat,
  MoveRight,
  Plus,
  Utensils,
  UserCheck,
  Zap,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Waiter() {
  return (
    <section id="waiter-flow" className="relative py-12 bg-orange-950 overflow-hidden">
      {/* Creative Background: Animated Mesh & Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#f97316_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#000_0%,transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: The "Live Injection" Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-[4rem]" />
            
            <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden border border-orange-100/50">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-orange-50">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-600 p-3 rounded-2xl text-white shadow-lg shadow-orange-200">
                    <UserCheck size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-orange-950 text-base tracking-tight">Admin Terminal</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Table T-05 Active</p>
                    </div>
                  </div>
                </div>
                <Zap size={20} className="text-orange-200" />
              </div>

              {/* Order Stream Animation */}
              <div className="space-y-6 relative">
                {/* Visual Connection Line */}
                <div className="absolute left-[22px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-orange-200 via-orange-500 to-orange-200 border-dashed border-l" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-11 h-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">01</div>
                  <div className="flex-1 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 backdrop-blur-sm">
                    <span className="font-bold text-orange-950 text-sm">2x Miso Ramen</span>
                    <p className="text-[9px] font-black text-orange-400 uppercase mt-0.5">Kitchen Preparing</p>
                  </div>
                </div>

                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="flex items-center gap-4 relative z-10"
                >
                  <div className="w-11 h-11 rounded-full bg-orange-600 shadow-lg shadow-orange-200 flex items-center justify-center text-white">
                    <Plus size={20} />
                  </div>
                  <div className="flex-1 p-4 bg-white rounded-2xl border-2 border-dashed border-orange-400 shadow-xl shadow-orange-500/5 flex justify-between items-center">
                    <div>
                      <span className="font-black text-orange-600 text-sm">Extra Spicy Fries</span>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase mt-0.5">Staff Injection</p>
                    </div>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors">
                      Inject
                    </button>
                  </div>
                </motion.div>

                {/* The "Result" on KDS */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 bg-zinc-950 rounded-[2rem] p-5 text-white flex justify-between items-center shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      <Activity size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-zinc-500 uppercase">KDS LIVE Update</span>
                      <p className="text-xs font-bold text-white tracking-tight">+1 Item Added to T-05</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Features */}
          <div className="order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-orange-400 font-black text-xs uppercase tracking-[0.4em] mb-6"
            >
              <BellRing size={18} className="animate-bounce" /> Hybrid Service Flow
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              WAITER & ADMIN <br />
              <span className="text-orange-500 italic">PERFECTLY SYNCED.</span>
            </h2>
            
            <p className="text-orange-100/60 text-xl mb-12 leading-relaxed max-w-lg font-medium">
              Hybrid dining is here. Let customers order via QR while your staff manages 
              special requests and on-the-fly additions from a centralized hub.
            </p>

            <div className="grid gap-10">
              {[
                {
                  icon: <Utensils size={24} />,
                  title: "On-the-fly Additions",
                  desc: "Waiters notify Admin, Admin adds the item instantly. No bill confusion, no manual tallies."
                },
                {
                  icon: <ChefHat size={24} />,
                  title: "Instant Kitchen Fire",
                  desc: "Add-ons appear on the KDS with a 'Table Update' tag so chefs know it's for an ongoing order."
                }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/10 border border-white/10 rounded-[1.5rem] flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-2xl mb-2 tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-orange-100/40 text-base leading-relaxed font-medium">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}