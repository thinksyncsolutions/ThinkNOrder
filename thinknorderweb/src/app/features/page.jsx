'use client';

import React from "react";
import { 
  Zap, 
  UtensilsCrossed, 
  CreditCard, 
  BarChart3, 
  Smartphone, 
  Clock,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Instant QR Ordering",
    desc: "Customers scan, browse, and order in seconds. No app downloads, no friction, just food delivered with precision.",
    icon: <Smartphone size={32} />,
    size: "lg:col-span-2",
    bg: "bg-white",
    accent: "text-orange-600"
  },
  {
    title: "Kitchen Sync",
    desc: "Real-time ticket routing straight to the line with zero lag.",
    icon: <UtensilsCrossed size={32} />,
    size: "lg:col-span-1",
    bg: "bg-orange-100",
    accent: "text-orange-600"
  },
  {
    title: "Flash Payments",
    desc: "Split bills, add tips, and settle via Apple Pay or Card in one tap.",
    icon: <CreditCard size={32} />,
    size: "lg:col-span-1",
    bg: "bg-orange-600",
    text: "text-white",
    accent: "text-white",
    glow: "shadow-[0_20px_50px_rgba(234,88,12,0.4)]"
  },
  {
    title: "Deep Analytics",
    desc: "Know exactly which dish is your hero and which hours are your goldmine with visual heatmaps and AI-driven growth insights.",
    icon: <BarChart3 size={32} />,
    size: "lg:col-span-2",
    bg: "bg-white",
    accent: "text-orange-600"
  }
];

export default function FeaturesPage() {
  return (
    <section className="relative py-32 bg-orange-50 min-h-screen overflow-hidden">
      {/* Abstract Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")` }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Sparkles size={12} /> Optimization Suite
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-[100px] font-black text-orange-950 tracking-tighter leading-[0.85] mb-4"
            >
              BUILT FOR <br />
              <span className="text-orange-600 italic">VELOCITY.</span>
            </motion.h2>
          </div>
          <p className="text-orange-900/40 text-xl font-bold max-w-sm leading-relaxed border-l-4 border-orange-200 pl-6 mb-4">
            Everything you need to run a high-volume venue without the 
            technical debt of legacy POS systems.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`${feature.bg} ${feature.size} ${feature.glow || "shadow-xl shadow-orange-900/5"} p-12 rounded-[3.5rem] flex flex-col justify-between min-h-[380px] border border-orange-200/50 relative overflow-hidden group transition-all duration-500`}
            >
              <div className={`${feature.accent} relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-4xl font-black tracking-tight ${feature.text || "text-orange-950"}`}>
                    {feature.title}
                  </h3>
                  <ArrowUpRight className={`opacity-0 group-hover:opacity-100 transition-opacity ${feature.text || "text-orange-400"}`} />
                </div>
                <p className={`text-lg font-medium leading-relaxed ${feature.bg.includes('orange-600') ? 'text-orange-50/80' : 'text-orange-900/60'}`}>
                  {feature.desc}
                </p>
              </div>

              {/* Card Bottom Detail */}
              <div className={`absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
                 {feature.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Feature Row: Advanced Widgets */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-7 bg-orange-950 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-2xl"
          >
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-widest mb-4">
                 <Zap size={14} fill="currentColor" /> Real-time Reliability
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">99.9% Uptime</h3>
              <p className="text-orange-200/40 text-lg font-medium max-w-sm">
                Because hungry customers don't wait for server reboots or legacy system lag.
              </p>
            </div>
            <div className="relative mt-8 md:mt-0">
               <div className="absolute inset-0 bg-orange-500 blur-[60px] opacity-20" />
               <Zap className="text-orange-600 relative z-10 animate-pulse" size={120} strokeWidth={1} />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-5 bg-white p-12 rounded-[4rem] flex flex-col justify-center border border-orange-200 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-6 mb-8">
               <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                  <Clock size={28} />
               </div>
               <div>
                  <h3 className="text-3xl font-black text-orange-950 tracking-tight">24/7 Support</h3>
                  <p className="text-orange-600 font-black text-[10px] uppercase tracking-widest">Always on Call</p>
               </div>
            </div>
            <p className="text-orange-900/60 text-lg font-medium leading-relaxed italic">
              "When you're deep in the weeds, you don't need a bot. You need a human expert on the line."
            </p>
            
            {/* Visual Time Ticker Overlay */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.05] text-8xl font-black italic select-none">
              SYNC
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}