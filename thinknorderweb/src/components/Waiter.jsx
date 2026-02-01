import React from "react";
import {
  BellRing,
  ChefHat,
  MoveRight,
  Plus,
  Utensils,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Waiter() {
  return (
    <section id="waiter-flow" className="py-24 bg-orange-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            {/* Admin Table Injection Mockup */}
            <div className="bg-white rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-orange-50">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h4 className="font-black text-orange-950 text-sm">
                    Admin Dashboard
                  </h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">
                    Active Table: T-05
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <span className="font-bold text-orange-950 text-sm">
                    Existing: 2x Ramen
                  </span>
                  <span className="text-[10px] font-black text-orange-600 uppercase italic">
                    In Prep
                  </span>
                </div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="flex justify-between items-center p-4 bg-white rounded-2xl border-2 border-dashed border-orange-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-600 text-white p-1 rounded-md">
                      <Plus size={14} />
                    </div>
                    <span className="font-black text-orange-600 text-sm">
                      Add: Extra Fries
                    </span>
                  </div>
                  <button className="bg-orange-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                    Inject
                  </button>
                </motion.div>

                <div className="flex items-center gap-2 py-4 justify-center text-zinc-300">
                  <MoveRight size={20} className="rotate-90" />
                </div>

                <div className="bg-zinc-900 rounded-2xl p-4 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                      Kitchen Display:
                    </span>
                  </div>
                  <span className="text-xs font-black text-orange-500 uppercase">
                    +1 New Side (T-05)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-4">
              <BellRing size={16} /> Hybrid Service Flow
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
              Waiter & Admin <br />
              <span className="text-orange-600">Perfectly Synced.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-md">
              When a customer wants "one more thing" during table-side service,
              your staff can add it instantly from the Admin panel.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                  <Utensils size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">
                    On-the-fly Additions
                  </h4>
                  <p className="text-zinc-500 text-sm">
                    Waiters notify Admin, Admin adds the item to the active
                    table session. No bill confusion.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-orange-500">
                  <ChefHat size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">
                    Instant Kitchen Fire
                  </h4>
                  <p className="text-zinc-500 text-sm">
                    Add-ons appear on the KDS with a "Table Update" tag so chefs
                    know it's for an ongoing order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
