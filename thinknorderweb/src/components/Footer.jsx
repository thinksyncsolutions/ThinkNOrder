'use client';
import React from "react";
import { Pizza, Github, Twitter, Instagram, Globe, Zap, ArrowUpRight, Activity, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white pt-32 pb-10 overflow-hidden border-t border-white/5">
      {/* --- Abstract Background Glow --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Manifesto Column (Span 4) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 text-3xl font-black tracking-tighter">
              <div className="relative group">
                <div className="absolute -inset-2 bg-orange-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition" />
                <div className="relative bg-orange-600 p-2 rounded-xl">
                  <Pizza size={24} className="text-white" />
                </div>
              </div>
              THINK<span className="text-orange-500">N</span>ORDER
            </div>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium">
              We synchronize the chaotic beauty of high-volume hospitality with 
              uncompromising digital precision. 
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Twitter size={18} />, label: "Twitter" },
                { icon: <Instagram size={18} />, label: "Instagram" },
                { icon: <Github size={18} />, label: "Github" },
                { icon: <Terminal size={18} />, label: "API" }
              ].map((social, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, color: '#f97316' }}
                  className="p-3 bg-zinc-900/50 border border-white/5 rounded-xl transition-colors cursor-pointer text-zinc-400"
                >
                  {social.icon}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links Group (Span 4) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> Ecosystem
              </h4>
              <ul className="space-y-4 text-sm font-bold text-zinc-400">
                {['QR Menu OS', 'Kitchen (KDS)', 'Admin Hub', 'Live Billing', 'Analytics'].map((link) => (
                  <li key={link} className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:text-orange-500 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> Agency
              </h4>
              <ul className="space-y-4 text-sm font-bold text-zinc-400">
                {['ThinkSync Studio', 'Our Vision', 'Partners', 'Contact', 'Legal'].map((link) => (
                  <li key={link} className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:text-orange-500 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Live System Stats (Span 4) */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-8 flex items-center gap-2">
              <Activity size={14} /> Network Status
            </h4>
            
            <div className="relative group p-1 bg-gradient-to-br from-white/10 to-transparent rounded-2xl">
              <div className="relative bg-[#0a0a0a] rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Servers</span>
                  <span className="flex items-center gap-2 text-[10px] font-black text-green-500 uppercase">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    99.9% Uptime
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500">
                    <span>Active Sessions</span>
                    <span className="text-white">1,240+</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '70%' }}
                      className="h-full bg-orange-600 shadow-[0_0_10px_#ea580c]" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input 
                    type="email" 
                    placeholder="Join the Sync" 
                    className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500/50 transition-all"
                  />
                  <button className="bg-orange-600 p-3 rounded-xl hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20">
                    <Zap size={16} fill="currentColor" className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Metadata Bar --- */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            <span>© 2026 ThinkSync Solutions</span>
            <span className="hidden md:block">|</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Security</span>
            <span className="hidden md:block">|</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Policy</span>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
            <Globe size={14} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Active in 12 Countries
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}