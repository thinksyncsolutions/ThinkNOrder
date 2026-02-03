'use client';

import React from "react";
import { motion } from "framer-motion";
import { Users, Rocket, ShieldCheck, Heart, Sparkles, Zap, Globe, ChefHat } from "lucide-react";

const stats = [
  { label: "Orders Processed", value: "2M+", desc: "Seamless transactions" },
  { label: "Partner Venues", value: "500+", desc: "Global trust" },
  { label: "Table Turnover", value: "15min", desc: "Average time saved" },
];

export default function AboutPage() {
  return (
    <section className="relative bg-white py-32 overflow-hidden">
      {/* Creative Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }} />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-100/50 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Hero: Asymmetric Intro --- */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Sparkles size={12} /> The ThinkSync Manifesto
            </div>
            <h1 className="text-7xl md:text-[120px] font-black text-orange-950 tracking-tighter leading-[0.8] mb-10">
              WE THINK. <br />
              <span className="text-orange-600 italic">YOU ORDER.</span>
            </h1>
            <p className="text-2xl font-bold text-orange-900/30 italic max-w-xl leading-relaxed">
              "Technology should be invisible at the table but invincible in the kitchen."
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-6 bg-orange-100 rounded-[5rem] rotate-3 blur-sm" />
            <div className="relative bg-orange-600 p-12 rounded-[4rem] text-white shadow-[0_50px_100px_-20px_rgba(234,88,12,0.4)]">
              <Zap className="text-orange-200 mb-6" size={40} />
              <p className="text-xl font-medium leading-relaxed italic">
                ThinkNOrder is a digital ecosystem designed to redefine the friction 
                between hunger and fulfillment. We synchronize the chaos of 
                hospitality into a single, seamless flow.
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- Mission: The Dual Perspectives --- */}
        <div className="grid lg:grid-cols-2 gap-12 mb-40">
          <motion.div 
            whileHover={{ y: -10 }}
            className="group p-12 bg-orange-50 rounded-[4rem] border border-orange-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
               <Globe size={200} />
            </div>
            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-orange-200/50 mb-10 group-hover:rotate-6 transition-transform">
              <Users className="text-orange-600" size={36} />
            </div>
            <h3 className="text-4xl font-black text-orange-950 mb-6 tracking-tight text-center lg:text-left">For the Guest</h3>
            <p className="text-xl text-orange-900/60 font-medium leading-relaxed">
              No app downloads. No friction. We turn every smartphone into a 
              high-definition portal to your menu. Browse, customize, and pay 
              with the same ease as sending a text.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="group p-12 bg-orange-950 rounded-[4rem] text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute bottom-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
               <ChefHat size={200} />
            </div>
            <div className="w-20 h-20 bg-orange-800 rounded-[2rem] flex items-center justify-center mb-10 group-hover:-rotate-6 transition-transform">
              <Rocket className="text-orange-400" size={36} />
            </div>
            <h3 className="text-4xl font-black mb-6 tracking-tight text-center lg:text-left">For the Team</h3>
            <p className="text-orange-100/60 text-xl font-medium leading-relaxed">
              The nerve center of your kitchen. We offer a real-time dashboard 
              that eliminates lost tickets, slashes wait times, and provides 
              deep-dive analytics to scale your revenue.
            </p>
          </motion.div>
        </div>

        {/* --- Stats: High-Contrast Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative p-10 text-center border-b-4 md:border-b-0 md:border-r-4 border-orange-100 last:border-0"
            >
              <div className="text-6xl lg:text-8xl font-black text-orange-950 tracking-tighter mb-4">
                {stat.value}
              </div>
              <div className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2">
                {stat.label}
              </div>
              <p className="text-zinc-400 text-sm font-bold italic">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* --- Closing Vision: The Heart Stage --- */}
        <div className="relative py-24 px-8 bg-orange-50 rounded-[5rem] text-center border-2 border-dashed border-orange-200 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
             <Heart size={600} fill="currentColor" className="text-orange-600" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-lg text-orange-600">
              <Heart size={32} fill="currentColor" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-orange-950 tracking-tighter leading-tight mb-12">
              From boutique cafés to global chains, we build tools that make 
              hospitality feel <span className="text-orange-600 underline decoration-orange-200 underline-offset-8 italic">human</span> again.
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-8 py-4 bg-white rounded-2xl shadow-sm border border-orange-100 flex items-center gap-3 text-orange-950 font-black text-xs uppercase tracking-widest">
                <ShieldCheck className="text-orange-500" size={20} /> Enterprise-Grade Security
              </div>
              <div className="px-8 py-4 bg-white rounded-2xl shadow-sm border border-orange-100 flex items-center gap-3 text-orange-950 font-black text-xs uppercase tracking-widest">
                <Rocket className="text-orange-500" size={20} /> Cloud-Native Speed
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}