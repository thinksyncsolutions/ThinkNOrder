import React from "react";
import { Pizza, ArrowRight, Utensils, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function KitchenCall() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Main CTA Card */}
        <div className="bg-orange-600 rounded-[4.5rem] p-10 md:p-12 text-center text-white relative shadow-[0_40px_100px_-20px_rgba(234,88,12,0.4)] overflow-hidden">
          
          {/* Creative Background: Animated Mesh */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#fff_0%,transparent_60%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,#000_0%,transparent_60%)]" />
          </div>

          {/* Floating Icon Decor */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 opacity-10 pointer-events-none"
          >
            <Pizza size={500} strokeWidth={1} />
          </motion.div>

          {/* Content Layer */}
          <div className="relative z-10">
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10"
            >
              <Star size={12} fill="currentColor" /> Limited Slots for 2026
            </motion.div> */}

            <h2 className="text-6xl md:text-[90px] font-black mb-8 leading-[0.85] tracking-tighter">
              THE KITCHEN <br /> 
              <span className="text-orange-950/30">IS CALLING.</span>
            </h2>

            <p className="text-orange-50 text-xl md:text-2xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Join <span className="text-white font-black underline decoration-orange-400 underline-offset-8">500+ venues</span> synchronizing their service with <span className="italic">ThinkNOrder.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-orange-950 text-white px-12 py-7 rounded-[2.5rem] text-2xl font-black flex items-center gap-4 shadow-2xl transition-all hover:bg-black"
              >
                Book My Free Setup <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-10 opacity-60">
               <div className="flex items-center gap-2">
                  <Utensils size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Ready to Plate</span>
               </div>
               <div className="flex items-center gap-2">
                  <Zap size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">Instant Activation</span>
               </div>
            </div>
          </div>
        </div>

        {/* Floating Creative Accessory: The "Join" Card */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[3rem] shadow-2xl border border-orange-100 hidden lg:block z-20"
        >
          <div className="flex items-center gap-5">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-4 border-white bg-orange-${i}00 flex items-center justify-center text-[10px] font-bold text-white`}>
                  {i}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-orange-950 font-black text-lg leading-none">4 New Venues</p>
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1">Joined this week</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}