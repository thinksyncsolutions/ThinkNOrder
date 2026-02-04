'use client';

import React from "react";
import { ChevronRight, Tablet, Layout, Cpu, Globe, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: "01",
    name: "Core OS",
    tagline: "The Nerve Center",
    desc: "A centralized dashboard that unifies your front-of-house and back-of-house. Manage menus, prices, and staff permissions in real-time across multiple locations with zero latency.",
    icon: <Layout size={32} />,
    color: "bg-orange-600",
    shadow: "shadow-orange-600/20"
  },
  {
    id: "02",
    name: "Terminal Pro",
    tagline: "Industrial Grade",
    desc: "Sleek, splash-proof 15-inch displays designed to withstand the heat of a busy kitchen and the pace of a high-volume bar. Gorilla Glass durability meets OLED clarity.",
    icon: <Tablet size={32} />,
    color: "bg-zinc-950",
    shadow: "shadow-zinc-950/20"
  },
  {
    id: "03",
    name: "Kitchen Link",
    tagline: "Smart Routing",
    desc: "Our proprietary bridge between digital orders and physical printers. Ensuring zero ticket loss even during peak hour surges or local network failures.",
    icon: <Cpu size={32} />,
    color: "bg-orange-600",
    shadow: "shadow-orange-600/20"
  },
  {
    id: "04",
    name: "Global Menu",
    tagline: "Translate & Transact",
    desc: "AI-driven language translation and currency conversion. Let tourists order in their native tongue while your kitchen receives instructions in theirs.",
    icon: <Globe size={32} />,
    color: "bg-zinc-950",
    shadow: "shadow-zinc-950/20"
  }
];

export default function ProductPage() {
  return (
    <section className="relative bg-white py-28 min-h-screen overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")` }} />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/30 -skew-x-12 translate-x-32" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl">
              {/* <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
              >
                <Sparkles size={12} /> The Hardware & Software Suite
              </motion.div> */}
              <h1 className="text-7xl md:text-8xl font-black text-orange-950 tracking-[0.02em] leading-[0.85]">
                THE <br />
                <span className="text-orange-600 italic">ECOSYSTEM.</span>
              </h1>
            </div>
            <div className="max-w-sm">
               <p className="text-orange-900/40 text-xl font-bold leading-relaxed mb-6 border-l-4 border-orange-200 pl-6">
                 Synchronizing the world's most demanding venues with industrial precision.
               </p>
               <button className="text-orange-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                  Scroll to Explore <ChevronRight size={14} />
               </button>
            </div>
          </div>
        </header>

        {/* Product List */}
        <div className="space-y-6">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white hover:bg-orange-50/30 border border-orange-100 p-8 md:p-12 rounded-[4rem] flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center transition-all duration-500"
            >
              {/* Numbering & Identity */}
              <div className="lg:col-span-4 flex items-center gap-10">
                <span className="text-6xl font-black text-orange-100 group-hover:text-orange-200 transition-colors">
                  {product.id}
                </span>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-orange-950 mb-2 tracking-tight group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-orange-500 font-black uppercase text-[10px] tracking-[0.3em]">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* Description Body */}
              <div className="lg:col-span-5">
                <p className="text-lg text-orange-900/60 font-medium leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Action/Visual Module */}
              <div className="lg:col-span-3 flex justify-end items-center gap-8 w-full">
                <motion.div 
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  className={`${product.color} ${product.shadow} w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl transition-all duration-500 relative overflow-hidden`}
                >
                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                   {React.cloneElement(product.icon, { className: "relative z-10" })}
                </motion.div>
                
                <button className="w-14 h-14 rounded-full border-2 border-orange-100 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all shadow-sm">
                   <ArrowUpRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 relative group"
        >
          <div className="absolute inset-0 bg-orange-600 rounded-[5rem] blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity" />
          
          <div className="relative bg-orange-600 p-10 md:p-16 rounded-[4.5rem] text-center text-white overflow-hidden shadow-[0_40px_100px_-20px_rgba(234,88,12,0.4)]">
            {/* Visual Decor inside CTA */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10"><Cpu size={200} strokeWidth={1} /></div>
              <div className="absolute bottom-10 right-10"><Globe size={200} strokeWidth={1} /></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85]">
                READY TO <br />
                <span className="text-orange-950/40">UPGRADE?</span>
              </h2>
              <p className="text-orange-100 text-xl font-medium mb-12 italic">
                Synchronize your venue today. Limited implementation slots for Q1 2026.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-14 py-6 rounded-[2rem] font-black text-2xl hover:bg-orange-950 hover:text-white transition-all shadow-2xl flex items-center gap-4 mx-auto"
              >
                Book a Live Demo <ChevronRight size={28} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}