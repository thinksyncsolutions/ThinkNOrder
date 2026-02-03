import React from "react";
import { motion } from "framer-motion";
import { Play, Monitor, Smartphone, Globe } from "lucide-react";

export default function VisualShowcase() {
  return (
    <section className="relative py-10 px-6 bg-white rounded-[4rem] mx-4 text-black text-center shadow-sm">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-black uppercase tracking-[0.2em] mb-6"
          >
            <Globe size={14} /> Global Deployment 2026
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-black mb-4 tracking-tighter">
            READY TO <span className="text-orange-500">SERVE</span> BETTER?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            ThinkNOrder is currently being deployed across premium dining locations. 
            Experience the interface that’s revolutionizing the guest journey.
          </p>
        </div>

        {/* The "Device" Stage (Clean White/Slate Theme) */}
        <div className="relative group">
          {/* Decorative Corner Brackets */}
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-orange-500/30 rounded-tl-3xl" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-orange-500/30 rounded-br-3xl" />

          {/* Main Interface Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video bg-[#1e1e1e] rounded-[3rem] border-[8px] border-[#2a2a2a] shadow-2xl overflow-hidden flex items-center justify-center group"
          >
            {/* Screen Content Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#252525] via-[#1a1a1a] to-[#252525] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform cursor-pointer">
                  <Play size={32} className="text-[#121212] ml-1" fill="currentColor" />
                </div>
                <span className="text-zinc-500 font-black tracking-[0.3em] text-sm uppercase">
                  Watch Interface Tour
                </span>
              </div>
            </div>

            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 left-10 p-4 bg-[#2a2a2a]/80 backdrop-blur-md rounded-2xl border border-white/10 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500">
                  <Smartphone size={18} />
                </div>
                <div className="text-left">
                  <div className="w-16 h-2 bg-zinc-600 rounded-full mb-1" />
                  <div className="w-10 h-2 bg-zinc-700 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 right-10 p-4 bg-[#2a2a2a]/80 backdrop-blur-md rounded-2xl border border-white/10 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500">
                  <Monitor size={18} />
                </div>
                <div className="text-left">
                  <div className="w-20 h-2 bg-zinc-600 rounded-full mb-1" />
                  <div className="w-12 h-2 bg-zinc-700 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Reflection Glow */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-orange-500/10 blur-3xl rounded-full" />
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 flex justify-center">
           <button className="group flex items-center gap-3 text-orange-600 font-black uppercase tracking-widest text-sm hover:text-black transition-colors">
              Be the first to revolutionize dining <div className="w-10 h-px bg-orange-500 group-hover:w-16 transition-all" />
           </button>
        </div>
      </div>
    </section>
  );
}