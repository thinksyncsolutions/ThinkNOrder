'use client';

import React from "react";
import { motion } from "framer-motion";
import { Users, Rocket, ShieldCheck, Heart } from "lucide-react";

const stats = [
  { label: "Orders Processed", value: "2M+" },
  { label: "Partner Venues", value: "500+" },
  { label: "Faster Table Turn", value: "15min" },
];

export default function AboutPage() {
  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-7xl md:text-8xl font-black text-orange-950 tracking-tighter leading-[0.85] mb-8">
              WE THINK. <br />
              YOU <span className="text-orange-600">ORDER.</span>
            </h1>
            <p className="text-2xl font-bold text-orange-900/40 italic mb-10">
              Redefining the friction between hunger and fulfillment.
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-100 rounded-[4rem] -rotate-2" />
            <div className="relative bg-orange-600 p-12 rounded-[4rem] text-white shadow-2xl">
              <p className="text-xl font-medium leading-relaxed">
                ThinkNOrder is a cutting-edge digital ecosystem designed to enhance 
                the dining experience. We believe technology should be invisible 
                at the table but invincible in the kitchen.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-orange-50 rounded-[3rem] border border-orange-100"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8">
              <Users className="text-orange-600" size={32} />
            </div>
            <h3 className="text-3xl font-black text-orange-950 mb-6">For the Guest</h3>
            <p className="text-lg text-orange-900/60 font-medium leading-relaxed">
              Our platform allows restaurants to create customizable digital menus that can 
              be easily accessed via QR codes. Customers browse, order, and pay 
              seamlessly from their own devices—no app downloads, just instant service.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-orange-950 rounded-[3rem] text-white"
          >
            <div className="w-16 h-16 bg-orange-800 rounded-2xl flex items-center justify-center mb-8">
              <Rocket className="text-orange-400" size={32} />
            </div>
            <h3 className="text-3xl font-black mb-6">For the Team</h3>
            <p className="text-orange-200/60 text-lg font-medium leading-relaxed">
              We offer a comprehensive management dashboard that streamlines order 
              processing and kitchen communication. Improve operational efficiency, 
              reduce wait times, and stay ahead in a competitive industry.
            </p>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-y-2 border-orange-100 py-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-5xl md:text-7xl font-black text-orange-950 tracking-tighter mb-2">
                {stat.value}
              </div>
              <div className="text-orange-600 font-black uppercase tracking-[0.2em] text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Closing Vision */}
        <div className="mt-32 text-center max-w-4xl mx-auto">
          <Heart className="mx-auto text-orange-600 mb-8" size={48} fill="currentColor" />
          <h2 className="text-4xl md:text-5xl font-black text-orange-950 tracking-tight leading-tight">
            Whether you're a small café or a global chain, we provide the tools to 
            modernize your hospitality.
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-orange-100 rounded-full text-orange-700 font-bold text-sm">
              <ShieldCheck size={18} /> Enterprise Ready
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-orange-100 rounded-full text-orange-700 font-bold text-sm">
              <Rocket size={18} /> Scaleable Tech
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}