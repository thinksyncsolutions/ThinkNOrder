'use client';

import React from "react";
import { ChevronRight, Tablet, Layout, Cpu, Globe } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: "01",
    name: "Core OS",
    tagline: "The Brain of Your Business",
    desc: "A centralized dashboard that unifies your front-of-house and back-of-house. Manage menus, prices, and staff permissions in real-time across multiple locations.",
    icon: <Layout size={24} />,
    color: "bg-orange-600",
  },
  {
    id: "02",
    name: "Terminal Pro",
    tagline: "Industrial Grade Hardware",
    desc: "Sleek, splash-proof 15-inch displays designed to withstand the heat of a busy kitchen and the pace of a high-volume bar.",
    icon: <Tablet size={24} />,
    color: "bg-orange-950",
  },
  {
    id: "03",
    name: "Kitchen Link",
    tagline: "Smart Routing Technology",
    desc: "Our proprietary hardware that bridges the gap between digital orders and physical printers, ensuring zero ticket loss.",
    icon: <Cpu size={24} />,
    color: "bg-orange-600",
  },
  {
    id: "04",
    name: "Global Menu",
    tagline: "Translate and Transact",
    desc: "Automatic language translation and currency conversion for international tourists. Let them order in their language, you receive it in yours.",
    icon: <Globe size={24} />,
    color: "bg-orange-950",
  }
];

export default function ProductPage() {
  return (
    <section className="bg-white py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block"
              >
                The Hardware & Software Suite
              </motion.span>
              <h1 className="text-7xl md:text-8xl xl:text-9xl font-black text-orange-950 tracking-tighter leading-none">
                THE <br />
                <span className="text-orange-600">ECOSYSTEM.</span>
              </h1>
            </div>
            <p className="text-orange-900/60 text-xl font-medium max-w-sm mb-4">
              Explore the range of products offered by ThinkNOrder to enhance your restaurant's ordering system.
            </p>
          </div>
        </header>

        {/* Product List */}
        <div className="divide-y divide-orange-100">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group py-16 flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center hover:bg-orange-50/50 transition-colors px-6 -mx-6 rounded-[3rem]"
            >
              {/* Numbering & Name */}
              <div className="lg:col-span-4 flex items-start gap-8">
                <span className="text-2xl font-black text-orange-200 mt-1">{product.id}</span>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-orange-950 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-orange-600 font-bold uppercase text-xs tracking-widest italic">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p className="text-lg text-orange-900/70 font-medium leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Action/Visual Placeholder */}
              <div className="lg:col-span-4 flex justify-end items-center gap-6">
                <div className={`${product.color} w-32 h-32 rounded-3xl flex items-center justify-center text-white shadow-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500`}>
                   {product.icon}
                </div>
                <button className="w-16 h-16 rounded-full border-2 border-orange-950 flex items-center justify-center group-hover:bg-orange-950 group-hover:text-white transition-all">
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          whileInView={{ scale: [0.98, 1] }}
          className="mt-32 bg-orange-600 p-12 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
              READY TO <br />UPGRADE?
            </h2>
            <button className="bg-white text-orange-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-orange-950 hover:text-white transition-all shadow-xl">
              Book a Live Demo
            </button>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Layout size={300} strokeWidth={1} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}