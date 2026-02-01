'use client';

import React from "react";
import { 
  Zap, 
  UtensilsCrossed, 
  CreditCard, 
  BarChart3, 
  Smartphone, 
  Clock 
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Instant QR Ordering",
    desc: "Customers scan, browse, and order in seconds. No app downloads, no friction, just food.",
    icon: <Smartphone className="text-orange-600" size={32} />,
    size: "lg:col-span-2",
    bg: "bg-white"
  },
  {
    title: "Kitchen Sync",
    desc: "Real-time ticket routing straight to the line.",
    icon: <UtensilsCrossed className="text-orange-600" size={32} />,
    size: "lg:col-span-1",
    bg: "bg-orange-100"
  },
  {
    title: "Flash Payments",
    desc: "Split bills, add tips, and settle via Apple Pay or Card in one tap.",
    icon: <CreditCard className="text-orange-600" size={32} />,
    size: "lg:col-span-1",
    bg: "bg-orange-600 text-white",
    iconColor: "text-white"
  },
  {
    title: "Deep Analytics",
    desc: "Know exactly which dish is your hero and which hours are your goldmine with visual heatmaps.",
    icon: <BarChart3 className="text-orange-600" size={32} />,
    size: "lg:col-span-2",
    bg: "bg-white"
  }
];

export default function FeaturesPage() {
  return (
    <section className="py-24 bg-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-orange-950 tracking-tighter mb-6"
          >
            BUILT FOR <br />
            <span className="text-orange-600 italic">VELOCITY.</span>
          </motion.h2>
          <p className="text-orange-900/60 text-xl font-medium max-w-xl">
            Everything you need to run a high-volume restaurant without the 
            technical headaches of legacy POS systems.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${feature.bg} ${feature.size} p-10 rounded-[3rem] shadow-xl shadow-orange-900/5 flex flex-col justify-between min-h-[320px] border border-orange-200/50 hover:border-orange-600/30 transition-colors group`}
            >
              <div className={`${feature.iconColor || ""}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-3xl font-black mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className={`text-lg font-medium leading-snug ${feature.bg.includes('orange-600') ? 'text-orange-50/80' : 'text-orange-900/60'}`}>
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Feature Row */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-950 p-10 rounded-[3rem] text-white flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-2">99.9% Uptime</h3>
              <p className="text-orange-200/60 font-medium">Because hungry customers don't wait for server reboots.</p>
            </div>
            <Zap className="text-orange-600 absolute right-[-20px] opacity-20" size={160} />
          </div>
          
          <div className="bg-white p-10 rounded-[3rem] flex items-center justify-between border border-orange-200/50 shadow-xl shadow-orange-900/5">
            <div>
              <h3 className="text-3xl font-black mb-2 text-orange-950">24/7 Support</h3>
              <p className="text-orange-900/60 font-medium">Humans on the phone when you're in the weeds.</p>
            </div>
            <Clock className="text-orange-200" size={60} />
          </div>
        </div>
      </div>
    </section>
  );
}