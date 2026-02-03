import React from "react";
import { Smartphone, ChefHat, Layout, CheckCircle2, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <Smartphone />,
      title: "QR Web App",
      desc: "Zero downloads. Zero friction. A high-definition ordering experience directly in the mobile browser.",
      items: ["Multi-category browsing", "Smart Cart Management", "Special Instructions"],
      color: "from-orange-500/20"
    },
    {
      icon: <ChefHat />,
      title: "Kitchen Terminal",
      desc: "Instant synchronization between table and prep station. Keep your chefs in the flow.",
      items: ["Real-time Socket.io updates", "Priority Queueing", "Auto-print receipts"],
      color: "from-orange-600/20"
    },
    {
      icon: <Layout />,
      title: "Admin Hub",
      desc: "The nerve center of your business. Total control over pricing, inventory, and staff.",
      items: ["Live Menu Editor", "Revenue Analytics", "Permissions Control"],
      color: "from-orange-400/20"
    }
  ];

  return (
    <section id="features" className="relative py-32 px-6 bg-[#050505] overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-600/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Sparkles size={12} /> The Ecosystem
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              DESIGNED FOR <br />
              <span className="text-orange-500 italic">EVERY TABLE.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-zinc-400 text-sm font-bold flex items-center gap-2">
              <Zap size={16} className="text-orange-500" /> MERN Stack
            </div>
            <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-zinc-400 text-sm font-bold flex items-center gap-2">
              <ShieldCheck size={16} className="text-orange-500" /> Real-time Sync
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[3rem] transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="relative h-full p-10 bg-[#0a0a0a] rounded-[2.8rem] border border-white/5 overflow-hidden">
                {/* Glow Effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon Container */}
                <div className="relative w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 mb-10 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500">
                  {React.cloneElement(f.icon, { size: 32 })}
                </div>

                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{f.title}</h3>
                <p className="text-zinc-500 leading-relaxed mb-8 font-medium">
                  {f.desc}
                </p>

                <ul className="space-y-4">
                  {f.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-zinc-300 font-semibold">
                      <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                        <CheckCircle2 size={12} className="text-orange-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Bottom Reveal Arrow */}
                <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                   <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Learn More</span>
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-colors">
                      <Zap size={14} fill="currentColor" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}