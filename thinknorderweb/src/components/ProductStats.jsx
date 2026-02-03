import React from "react";
import { motion } from "framer-motion";

export default function ProductStats() {
  const stats = [
    { label: "Avg. Speedup", val: "40", suffix: "%", desc: "Faster table turnover" },
    { label: "Order Accuracy", val: "100", suffix: "%", desc: "Zero manual errors" },
    { label: "Staff Efficiency", val: "2", suffix: "X", desc: "Doubled output" },
    { label: "Set Up Time", val: "5", suffix: "min", desc: "Plug & Play ready" },
  ];

  return (
    <section className="relative py-20 bg-[#050505] overflow-hidden border-y border-white/5">
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#f97316_0.5px,transparent_0.5px)] [background-size:24px_24px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="h-full p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-orange-500/30 transition-all duration-500">
                
                {/* Visual Accent: Glowing Ring */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col items-center text-center">
                  {/* Icon/Circle Indicator Placeholder */}
                  <div className="mb-6 relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-white/5"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="30"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray="188.5"
                        strokeDashoffset={188.5 - (188.5 * 75) / 100} // Animated feel
                        className="text-orange-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white tracking-tighter">
                      {stat.val}
                    </span>
                    <span className="text-2xl font-bold text-orange-500">
                      {stat.suffix}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                    {stat.label}
                  </div>
                  
                  <div className="mt-4 text-zinc-500 text-sm font-medium">
                    {stat.desc}
                  </div>
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}