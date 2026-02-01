import React from "react";
import { Pizza, Github, Twitter, Instagram, Globe, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-orange-500/10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter">
              <div className="bg-orange-600 p-1 rounded-lg">
                <Pizza size={20} className="text-white" />
              </div>
              THINK<span className="text-orange-500">N</span>ORDER
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Synchronizing the chaotic beauty of high-volume kitchens with 
              seamless digital ordering. Built for the next generation of dining.
            </p>
            <div className="flex gap-4">
              <div className="p-2 bg-zinc-900 rounded-lg hover:text-orange-500 transition-colors cursor-pointer">
                <Twitter size={18} />
              </div>
              <div className="p-2 bg-zinc-900 rounded-lg hover:text-orange-500 transition-colors cursor-pointer">
                <Instagram size={18} />
              </div>
              <div className="p-2 bg-zinc-900 rounded-lg hover:text-orange-500 transition-colors cursor-pointer">
                <Github size={18} />
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">System</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-400">
              <li className="hover:text-white transition-colors cursor-pointer">QR Menu OS</li>
              <li className="hover:text-white transition-colors cursor-pointer">Kitchen Display (KDS)</li>
              <li className="hover:text-white transition-colors cursor-pointer">Admin Table Sync</li>
              <li className="hover:text-white transition-colors cursor-pointer">Bill Management</li>
              <li className="hover:text-white transition-colors cursor-pointer">API Documentation</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-400">
              <li className="hover:text-white transition-colors cursor-pointer">About ThinkSync</li>
              <li className="hover:text-white transition-colors cursor-pointer">Our Vision</li>
              <li className="hover:text-white transition-colors cursor-pointer">Partner Program</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact Support</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy & Legal</li>
            </ul>
          </div>

          {/* Newsletter / Status Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">Stay Synced</h4>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="restaurant@email.com" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-all"
              />
              <button className="absolute right-2 top-2 bg-orange-600 p-1.5 rounded-lg hover:bg-orange-700 transition-colors">
                <Zap size={14} fill="currentColor" />
              </button>
            </div>
            
            {/* Live Status Vibe */}
            <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">System Status</span>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Global Orders</span>
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">1.2M+ Served</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">
            <span>© 2026 ThinkSync Solutions</span>
            <span className="hidden md:block">•</span>
            <span>Made for the Modern Kitchen</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-600 italic text-xs">
            <Globe size={14} />
            <span>Serving across 12 countries and counting.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}