import React from "react";
import { Flame } from "lucide-react";

export default function Kitchen() {
  return (
    <section id="kitchen" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-[0.3em] mb-4">
              <Flame size={16} fill="currentColor" /> Real-time Sync
            </div>
            <h2 className="text-5xl font-black text-orange-950 mb-6 tracking-tight">
              The Kitchen <br /> Never Misses a Beat.
            </h2>
            <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
              Orders from QR codes land instantly on the Kitchen Display System
              (KDS). No printers, no paper, no mistakes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-[2rem] bg-orange-50 border border-orange-100">
                <h4 className="font-black text-orange-950 mb-1">98%</h4>
                <p className="text-xs font-bold text-orange-900/40 uppercase">
                  Faster Prep
                </p>
              </div>
              <div className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                <h4 className="font-black text-zinc-950 mb-1">0%</h4>
                <p className="text-xs font-bold text-zinc-400 uppercase">
                  Lost Orders
                </p>
              </div>
            </div>
          </div>

          {/* KDS Mockup */}
          <div className="bg-zinc-900 rounded-[3rem] p-8 shadow-3xl relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                KDS LIVE MONITOR
              </span>
            </div>
            <div className="space-y-4">
              {[
                {
                  id: "T-08",
                  item: "2x Truffle Burger",
                  time: "02:45",
                  status: "In Prep",
                },
                {
                  id: "T-12",
                  item: "1x Margherita Pizza",
                  time: "08:12",
                  status: "Urgent",
                },
                {
                  id: "T-04",
                  item: "4x Coca Cola",
                  time: "00:30",
                  status: "Ready",
                },
              ].map((order, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-[10px] font-black text-orange-500">
                      {order.id}
                    </p>
                    <p className="text-white font-bold">{order.item}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-zinc-500 uppercase">
                      {order.time}
                    </p>
                    <p
                      className={`text-[10px] font-black uppercase mt-1 ${order.status === "Urgent" ? "text-red-500" : "text-green-500"}`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
