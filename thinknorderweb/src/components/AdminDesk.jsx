import React from "react";
import { Layers, MenuIcon, Receipt } from "lucide-react";

export default function AdminDesk() {
  return (
    <section id="admin" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Complete Control <br />
              <span className="text-zinc-600">from the Admin Desk.</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 text-orange-500">
                  <Layers size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Table & Floor Management
                  </h4>
                  <p className="text-zinc-500 text-sm mt-1">
                    Organize your space by floors. Track live occupancy.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 text-orange-500">
                  <MenuIcon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Dynamic Menu Control
                  </h4>
                  <p className="text-zinc-500 text-sm mt-1">
                    Update prices or toggle "Out of Stock" instantly.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 text-orange-500">
                  <Receipt size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Automated Billing
                  </h4>
                  <p className="text-zinc-500 text-sm mt-1">
                    Generate GST-ready invoices and manage split bills.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-transparent rounded-full absolute -inset-10 blur-3xl opacity-50" />
            <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-orange-500/50" />
                  <div className="w-3 h-3 rounded-full bg-orange-200/50" />
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  Admin Dashboard
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 w-full bg-white/5 rounded-md flex items-center px-3 justify-between">
                  <span className="text-xs text-zinc-400">
                    Floor 01 - Main Hall
                  </span>
                  <div className="h-2 w-12 bg-orange-500/20 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-video bg-zinc-800 rounded-lg flex flex-col items-center justify-center border border-white/5"
                    >
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">
                        Table {i}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
