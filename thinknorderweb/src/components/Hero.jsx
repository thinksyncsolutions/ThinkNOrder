import React from "react";
import { QrCode, ArrowRight, BarChart3, LayoutDashboard, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ClientFacedHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 bg-white overflow-hidden">
      {/* Professional Tech Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/40 -skew-x-12 transform origin-top translate-x-32 -z-0" />
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-orange-200/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        
        {/* Left Content: Business Value Proposition */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Zap size={12} className="text-orange-400" />
            Enterprise Hospitality Suite
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-orange-950 tracking-tighter mb-8 leading-[0.85]">
            OWN THE <br />
            <span className="text-orange-600 italic">
              EXPERIENCE.
            </span>
          </h1>

          <p className="text-zinc-500 text-xl font-medium max-w-md leading-relaxed mb-10">
            Increase table turnover by <span className="text-zinc-900 font-bold">22%</span> and eliminate order friction. The complete OS for modern restaurants, from QR-menus to deep kitchen analytics.
          </p>

          <div className="flex flex-wrap gap-5">
            <button className="bg-orange-950 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-950/20 transform hover:-translate-y-1 flex items-center gap-2">
              Book a Demo <ArrowRight size={24} />
            </button>
            <button className="px-10 py-5 bg-white text-zinc-900 rounded-2xl font-black text-xl border-2 border-zinc-100 hover:border-orange-600 transition-all flex items-center gap-2">
               View Pricing
            </button>
          </div>

          {/* Client Proof Points */}
          <div className="mt-12 pt-10 border-t border-zinc-100 grid grid-cols-2 gap-8">
            <div>
              <p className="text-3xl font-black text-zinc-900">30%</p>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Avg. Revenue Boost</p>
            </div>
            <div>
              <p className="text-3xl font-black text-zinc-900">0.0s</p>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Kitchen Sync Lag</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content: The Admin/Merchant View */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[340px]"> 
            <div className="absolute -inset-10 bg-orange-100/60 rounded-[4rem] blur-3xl" />
            
            <div className="relative bg-white p-4 rounded-[3.5rem] border-[12px] border-zinc-900 shadow-2xl overflow-hidden aspect-[9/18.5]">
              
              <div className="relative h-full flex flex-col pt-6">
                {/* Merchant Branding */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="h-8 w-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <LayoutDashboard size={18} className="text-white" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-zinc-400 uppercase">Storefront</p>
                        <p className="text-xs font-bold text-zinc-900">The Grand Bistro</p>
                    </div>
                </div>

                {/* Real-time Business Metrics */}
                <div className="space-y-4">
                  <div className="p-5 bg-zinc-900 rounded-3xl text-white">
                    <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Live Revenue</p>
                    <h3 className="text-3xl font-black">$4,280.50</h3>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-orange-400">
                        <BarChart3 size={12} />
                        <span>+12% from yesterday</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <p className="text-[10px] font-black text-orange-600 uppercase">Active Tables</p>
                        <p className="text-xl font-black text-zinc-900">18/20</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <p className="text-[10px] font-black text-orange-600 uppercase">Orders</p>
                        <p className="text-xl font-black text-zinc-900">42</p>
                    </div>
                  </div>

                  {/* Merchant Management Tools */}
                  <div className="mt-4 space-y-2">
                    <p className="text-[10px] font-black text-zinc-400 uppercase px-2">Quick Actions</p>
                    <div className="w-full p-4 bg-white border border-zinc-100 rounded-2xl flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-700">Update Menu</span>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="w-full p-4 bg-white border border-zinc-100 rounded-2xl flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-700">POS Integration</span>
                        <span className="text-[10px] font-black text-orange-600 uppercase">Connected</span>
                    </div>
                  </div>
                </div>

                {/* QR Generation Highlight */}
                <div className="mt-auto mb-8 p-6 bg-orange-600 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg shadow-orange-600/20">
                  <div className="bg-white p-2 rounded-xl mb-3">
                    <QrCode size={32} className="text-orange-600" />
                  </div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">
                    Generate Table QRs
                  </p>
                </div>

                <div className="w-20 h-1 bg-zinc-200 rounded-full mx-auto mb-2" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 