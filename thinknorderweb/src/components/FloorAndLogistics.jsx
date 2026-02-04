import React from "react";
import { Plus, Map, Users, CircleDot } from "lucide-react";
import { motion } from "framer-motion";

export default function FloorAndLogistics() {
  return (
    <section id="logistics" className="relative py-12 bg-white overflow-hidden">
      {/* Blueprint Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#f97316 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          {/* <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Map size={12} /> Spatial Intelligence
          </motion.div> */}
          <h2 className="text-5xl md:text-6xl font-black text-orange-950 mb-4 tracking-tighter">
            FLOOR & TABLE <br />
            <span className="text-orange-600">LOGISTICS.</span>
          </h2>
          <p className="text-orange-900/40 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Architect your dining experience. Add unlimited floors, map custom 
            layouts, and monitor live table occupancy at a glance.
          </p>
        </div>

        {/* The Floor Plan "Stage" */}
        <div className="max-w-5xl mx-auto relative">
          {/* Decorative Corner Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100/50 rounded-full blur-3xl" />
          
          <div className="bg-white rounded-[4rem] border border-orange-100 p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(249,115,22,0.1)] relative overflow-hidden">
            
            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
              <div className="flex p-1.5 bg-orange-50 rounded-3xl border border-orange-100 w-fit">
                <button className="px-8 py-3 bg-orange-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-orange-200 transition-all">
                  Level 1: Main Hall
                </button>
                <button className="px-8 py-3 bg-transparent text-orange-900/40 hover:text-orange-600 rounded-2xl text-xs font-bold transition-all">
                  Level 2: Rooftop
                </button>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CircleDot size={14} className="text-orange-600" />
                  <span className="text-[10px] font-black uppercase text-orange-900/40 tracking-widest">Live Sync On</span>
                </div>
                <button className="bg-orange-950 hover:bg-black text-white px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-xl">
                  <Plus size={16} /> Add Table
                </button>
              </div>
            </div>

            {/* Table Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[...Array(10)].map((_, i) => {
                const isOccupied = i === 2 || i === 4 || i === 7;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className={`relative aspect-square rounded-[2.5rem] border-2 flex flex-col items-center justify-center transition-all cursor-pointer group ${
                      isOccupied 
                      ? "bg-orange-600 border-orange-700 text-white shadow-2xl shadow-orange-200" 
                      : "bg-white border-orange-50 text-orange-950 hover:border-orange-200 hover:shadow-xl"
                    }`}
                  >
                    {/* Seat Icons Visualization */}
                    <div className="absolute -top-1 -left-1 w-full h-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                       <div className="absolute top-1/2 -left-2 w-4 h-6 bg-current rounded-full -translate-y-1/2" />
                       <div className="absolute top-1/2 -right-2 w-4 h-6 bg-current rounded-full -translate-y-1/2" />
                    </div>

                    <span className="text-xs font-black tracking-widest uppercase">T-{i + 1}</span>
                    
                    <div className={`mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                      isOccupied ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"
                    }`}>
                      {isOccupied && <Users size={10} />}
                      {isOccupied ? "Occupied" : "Vacant"}
                    </div>

                    {/* Occupancy Pulse for Live feel */}
                    {isOccupied && (
                      <div className="absolute top-4 right-4 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Scale Indicator */}
            <div className="mt-8 pt-8 border-t border-orange-50 flex justify-center">
              <div className="flex gap-8 text-[10px] font-black uppercase text-orange-900/20 tracking-[0.3em]">
                <span>North Entrance</span>
                <div className="w-20 h-px bg-orange-100 self-center" />
                <span>Service Bar Area</span>
              </div>
            </div>
          </div>

          {/* Floating Logic Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-orange-100 hidden lg:block"
          >
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">
                 <Users size={20} />
               </div>
               <div>
                 <p className="text-[10px] font-black text-zinc-400 uppercase">Current Capacity</p>
                 <p className="text-lg font-black text-orange-950">74% Full</p>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}