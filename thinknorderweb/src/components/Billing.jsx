import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CreditCard,
  Receipt,
  ShieldCheck,
  Smartphone,
  Zap,
  Banknote,
  Globe
} from "lucide-react";

export default function Billing() {
  return (
    <section id="billing" className="relative py-12 bg-white overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-10 left-10 text-[15rem] font-black text-slate-50 select-none pointer-events-none -z-0 leading-none">
        PAY
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Interactive Checkout Visual */}
          <div className="order-2 lg:order-1 relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/5 blur-[100px] rounded-full" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-zinc-950 rounded-[3.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] text-white relative max-w-md mx-auto border border-white/10"
            >
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h4 className="font-black uppercase tracking-[0.2em] text-orange-500 text-xs mb-1">
                    Secure Checkout
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">ThinkSync Protocol</p>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                   <Receipt size={20} className="text-orange-500" />
                </div>
              </div>

              {/* Order Summary Line Items */}
              <div className="space-y-5 mb-12">
                <div className="flex justify-between items-center group">
                  <span className="text-zinc-400 text-sm group-hover:text-white transition-colors">Truffle Pizza x1</span>
                  <div className="flex-1 border-b border-dashed border-zinc-800 mx-4 mt-3" />
                  <span className="font-bold tabular-nums">$24.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Craft Cola x2</span>
                  <div className="flex-1 border-b border-dashed border-zinc-800 mx-4 mt-3" />
                  <span className="font-bold tabular-nums">$18.00</span>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-zinc-500 font-black uppercase mb-1">Total Amount</p>
                    <span className="text-4xl font-black text-orange-500 tracking-tighter">$42.00</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-green-500 font-black uppercase">Tax Included</p>
                    <p className="text-xs text-zinc-400 font-bold">Table 08</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div whileTap={{ scale: 0.95 }} className="bg-white/[0.03] p-5 rounded-3xl border border-white/10 flex flex-col items-center cursor-pointer hover:bg-orange-500/10 hover:border-orange-500/50 transition-all group">
                  <Smartphone size={24} className="mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Google Pay</span>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }} className="bg-white/[0.03] p-5 rounded-3xl border border-white/10 flex flex-col items-center cursor-pointer hover:bg-orange-500/10 hover:border-orange-500/50 transition-all group">
                  <CreditCard size={24} className="mb-3 text-orange-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Credit Card</span>
                </motion.div>
              </div>

              <button className="relative w-full group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 group-hover:scale-105 transition-transform duration-300" />
                <div className="relative py-5 rounded-2xl flex items-center justify-center gap-3 text-black font-black text-lg tracking-tight">
                   Finish & Pay <Zap size={20} fill="currentColor" />
                </div>
              </button>
            </motion.div>

            {/* Floating Security Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 right-0 md:-right-8 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-5 rounded-[2rem] flex items-center gap-4 border border-orange-100 z-20"
            >
              <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-200">
                <ShieldCheck size={24} />
              </div>
              <div className="text-left pr-4">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-0.5">Verified</p>
                <p className="text-sm font-black text-orange-950">Encrypted Payment</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Text Content */}
          <div className="order-1 lg:order-2">
            {/* <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <Globe size={12} /> Contactless Economy
            </motion.div>
             */}
            <h2 className="text-5xl md:text-7xl font-black text-orange-950 mb-6 leading-[0.9] tracking-tighter">
              BILLING THAT <br />
              <span className="text-orange-600 italic">FLOWS.</span>
            </h2>
            
            <p className="text-orange-900/60 text-xl mb-6 leading-relaxed font-medium">
              Eliminate the "waiting for the check" bottleneck. Customers can
              view their live bill and pay directly from their phones.
            </p>

            <div className="grid gap-8">
              {[
                {
                  title: "Split Checks",
                  desc: "Let customers split by item or amount instantly.",
                  icon: <Zap size={18} />
                },
                {
                  title: "Auto-Invoicing",
                  desc: "GST ready receipts sent straight to customer email.",
                  icon: <Receipt size={18} />
                },
                {
                  title: "Multi-Gateway",
                  desc: "Support for Apple Pay, Google Pay, and UPI.",
                  icon: <Banknote size={18} />
                },
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 10 }}
                  className="flex gap-5 group cursor-default"
                >
                  <div className="w-12 h-12 shrink-0 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-orange-950 uppercase text-sm tracking-widest mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-orange-900/40 text-sm font-medium leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}