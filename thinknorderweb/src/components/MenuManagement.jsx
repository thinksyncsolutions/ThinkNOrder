"use client";

import React, { useState } from "react";
import { Filter, Settings2, Plus, Sparkles, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuManagement() {
  const [activeCategory, setActiveCategory] = useState("Main Course");

  const menuData = {
    "Main Course": [
      { name: "Classic Cheeseburger", price: "12.99", modifiers: ["Extra Cheese", "Bacon"] },
      { name: "Wild Mushroom Pasta", price: "15.50", modifiers: ["Truffle Oil", "Gluten Free"] },
    ],
    Beverages: [
      { name: "Iced Matcha", price: "4.50", modifiers: ["Oat Milk", "Honey"] },
      { name: "Cold Brew", price: "5.00", modifiers: ["Vanilla", "Cream"] },
    ],
    Desserts: [
      { name: "Lava Cake", price: "8.50", modifiers: ["Ice Cream", "Berries"] },
    ],
  };

  return (
    <section id="menu" className="relative py-12 bg-orange-950 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-orange-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Side: Content & Copy */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <Sparkles size={12} /> Real-time CMS
            </motion.div>

            <h2 className="text-6xl font-black mb-8 leading-[0.9] tracking-tighter">
              MANAGE MENUS <br />
              <span className="text-orange-500 italic">WITH ZERO EFFORT.</span>
            </h2>
            
            <p className="text-orange-200/50 text-xl mb-12 leading-relaxed font-medium">
              From seasonal shifts to daily specials, update your categories and
              item modifiers in real-time across all QR codes instantly.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: <LayoutGrid size={20} />,
                  title: "Dynamic Categories",
                  desc: "Organize items by Breakfast, Lunch, or Special Events."
                },
                {
                  icon: <Settings2 size={20} />,
                  title: "Smart Modifiers",
                  desc: "Add 'Extra Toppings' or 'Spiciness' with custom pricing."
                }
              ].map((feature, i) => (
                <div key={i} className="group">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                    {feature.icon}
                  </div>
                  <h4 className="font-black text-xl mb-2">{feature.title}</h4>
                  <p className="text-orange-200/30 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: The Interactive Menu Editor Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full opacity-30" />
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] p-8 shadow-3xl overflow-hidden"
            >
              {/* Fake Window Header */}
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
                <div className="flex items-center gap-6">
                  {Object.keys(menuData).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="relative py-2 group"
                    >
                      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeCategory === cat ? "text-orange-500" : "text-zinc-500 hover:text-white"}`}>
                        {cat}
                      </span>
                      {activeCategory === cat && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="min-h-70">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {menuData[activeCategory]?.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white/3 p-5 rounded-3xl border border-white/5 hover:border-orange-500/30 hover:bg-white/5 transition-all"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-lg group-hover:text-orange-500 transition-colors">{item.name}</span>
                          <span className="text-orange-500 font-black tabular-nums tracking-tighter text-xl">
                            ${item.price}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.modifiers.map((mod) => (
                            <span
                              key={mod}
                              className="text-[9px] bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full font-black text-orange-400 uppercase tracking-tighter"
                            >
                              + {mod}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Add New Item Action */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-5 rounded-3xl border-2 border-dashed border-orange-500/20 text-orange-500/40 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Add New {activeCategory}
              </motion.button>
            </motion.div>

            {/* Floating Contextual Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-4 bg-orange-600 rounded-2xl shadow-2xl rotate-6 hidden md:block"
            >
              <div className="text-black font-black text-xs uppercase italic tracking-tighter">Sync Success!</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}