'use client';

import React from "react";
import { motion } from "framer-motion";
import { Scan, MousePointerClick, CookingPot, CheckCircle2, ArrowDown, Activity } from "lucide-react";

const steps = [
  {
    title: "The Scan",
    actor: "Customer",
    desc: "The guest scans the unique QR code at their table. No apps, no downloads—just instant access to your digital menu.",
    icon: <Scan size={32} />,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Smart Selection",
    actor: "Customer",
    desc: "Browse high-res photos, filter for allergens, and customize items with modifiers that sync with your inventory.",
    icon: <MousePointerClick size={32} />,
    color: "bg-orange-200 text-orange-700"
  },
  {
    title: "Kitchen Routing",
    actor: "The System",
    desc: "Orders are instantly fired to the KDS (Kitchen Display System) or printers, categorized by station (Bar, Hot, Cold).",
    icon: <CookingPot size={32} />,
    color: "bg-orange-600 text-white"
  },
  {
    title: "Fulfillment",
    actor: "Staff",
    desc: "When the dish is marked ready, staff receive a notification. The bill is updated in real-time for effortless checkout.",
    icon: <CheckCircle2 size={32} />,
    color: "bg-orange-950 text-white"
  }
];

export default function WorkflowPage() {
  return (
    <section className="bg-orange-50 py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
       {/* Header */}
        <div className="text-center mb-14">
          {/* <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Activity size={12} /> The Synchronized Process
          </motion.div> */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-8xl font-black text-orange-950 tracking-tighter leading-none mb-2"
          >
            THE <span className="text-orange-600 italic">FLOW.</span>
          </motion.h1>
          <p className="text-orange-900/40 text-xl font-bold max-w-2xl mx-auto leading-relaxed italic">
            "Eliminating the friction between hunger and fulfillment."
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-orange-200 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-orange-900/5 border border-orange-100 relative">
                    <span className="text-xs font-black uppercase tracking-widest text-orange-600 mb-2 block">
                      Step {index + 1} — {step.actor}
                    </span>
                    <h3 className="text-3xl font-black text-orange-950 mb-4">{step.title}</h3>
                    <p className="text-orange-900/60 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Icon Circle (The "Node") */}
                <div className="relative z-10 w-20 h-20 shrink-0 rounded-full flex items-center justify-center shadow-xl shadow-orange-900/10 border-4 border-orange-50 outline outline-8 outline-orange-100/50">
                  <div className={`${step.color} w-full h-full rounded-full flex items-center justify-center`}>
                    {step.icon}
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center">
             <div className="w-1 h-12 bg-gradient-to-b from-orange-200 to-orange-600 mb-6 rounded-full animate-bounce" />
             <h2 className="text-3xl font-black text-orange-950 mb-8 italic">And that's how we plate perfection.</h2>
             <button className="bg-orange-950 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all shadow-2xl">
               See It In Action
             </button>
          </div>
        </motion.div>


        {/* Final CTA Visual */}
        {/* <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 text-center"
        >
          <div className="relative inline-block">
             <div className="absolute inset-0 border-2 border-orange-200 rounded-[3rem] -rotate-3 -z-10" />
             <div className="bg-orange-950 text-white p-12 md:p-20 rounded-[3rem] shadow-3xl relative overflow-hidden">
                <Sparkles className="absolute top-10 right-10 text-orange-500 opacity-20" size={60} />
                <h2 className="text-4xl md:text-5xl font-black mb-8 italic tracking-tighter">
                  Ready to plate <span className="text-orange-500">perfection?</span>
                </h2>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-orange-600 hover:bg-white hover:text-orange-950 text-white px-14 py-6 rounded-2xl font-black text-2xl transition-all shadow-2xl flex items-center gap-4 mx-auto"
                >
                  See It In Action <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
             </div>
          </div>
        </motion.div> */}

      </div>
    </section>
  );
}