import React from "react";
import { Plus } from "lucide-react";

export default function FloorAndLogistics() {
  return (
    <section id="admin" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-5xl font-black text-orange-950 mb-4 tracking-tighter">
          Floor & Table Logistics
        </h2>
        <p className="text-orange-900/40 font-medium">
          Add unlimited floors. Map every table. Track live status.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-orange-50 rounded-[3rem] border border-orange-100 p-12 relative overflow-hidden">
        <div className="flex items-center justify-between mb-12">
          <div className="flex gap-2">
            <div className="px-6 py-2 bg-orange-600 text-white rounded-full text-sm font-black shadow-lg">
              Level 1: Main Hall
            </div>
            <div className="px-6 py-2 bg-white text-orange-900 rounded-full text-sm font-bold border border-orange-100 shadow-sm">
              Level 2: Rooftop
            </div>
          </div>
          <button className="text-orange-600 font-black text-sm uppercase flex items-center gap-1">
            <Plus size={16} /> Add Table
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-[2rem] border-2 flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-105 shadow-sm ${i === 2 || i === 4 ? "bg-orange-600 border-orange-700 text-white shadow-orange-200" : "bg-white border-orange-100 text-orange-950"}`}
            >
              <span className="text-xs font-black">TABLE {i + 1}</span>
              <span
                className={`text-[8px] mt-1 font-bold uppercase px-2 py-0.5 rounded-full ${i === 2 || i === 4 ? "bg-white/20" : "bg-orange-100 text-orange-600"}`}
              >
                {i === 2 || i === 4 ? "Occupied" : "Vacant"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
