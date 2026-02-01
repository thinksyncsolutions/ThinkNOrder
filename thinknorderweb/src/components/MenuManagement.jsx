"use client";

import React from "react";
import { Filter, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function MenuManagement() {
  const [activeCategory, setActiveCategory] = useState("Main Course");

  const menuData = {
    "Main Course": [
      {
        name: "Classic Cheeseburger",
        price: "12.99",
        modifiers: ["Extra Cheese", "Bacon"],
      },
      {
        name: "Wild Mushroom Pasta",
        price: "15.50",
        modifiers: ["Truffle Oil", "Gluten Free"],
      },
    ],
    Beverages: [
      { name: "Iced Matcha", price: "4.50", modifiers: ["Oat Milk", "Honey"] },
    ],
  };
  return (
    <section
      id="menu"
      className="py-24 bg-orange-950 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">
              Manage Menus with <br />
              <span className="text-orange-500">Zero Effort.</span>
            </h2>
            <p className="text-orange-200/60 text-lg mb-12">
              From seasonal shifts to daily specials, update your categories and
              item modifiers in real-time across all QR codes.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-2 rounded-lg text-white">
                  <Filter size={20} />
                </div>
                <div>
                  <h4 className="font-black text-xl">Dynamic Categories</h4>
                  <p className="text-orange-200/40 text-sm">
                    Organize items by Breakfast, Lunch, or Special Events.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-2 rounded-lg text-white">
                  <Settings2 size={20} />
                </div>
                <div>
                  <h4 className="font-black text-xl">Smart Modifiers</h4>
                  <p className="text-orange-200/40 text-sm">
                    Add 'Extra Toppings' or 'Spiciness Levels' with custom
                    pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 shadow-3xl">
              <div className="flex gap-4 mb-8 border-b border-white/5 pb-4">
                {["Main Course", "Beverages", "Desserts"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-black uppercase tracking-widest ${activeCategory === cat ? "text-orange-500" : "text-zinc-600 hover:text-white transition-colors"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {menuData[activeCategory]?.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 p-4 rounded-2xl border border-white/5"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{item.name}</span>
                        <span className="text-orange-500 font-black">
                          ${item.price}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {item.modifiers.map((mod) => (
                          <span
                            key={mod}
                            className="text-[10px] bg-white/10 px-2 py-1 rounded font-medium text-orange-200/50 uppercase tracking-tighter"
                          >
                            + {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  )) || (
                    <div className="text-zinc-700 py-10 text-center font-bold italic">
                      No items added yet...
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <button className="w-full mt-6 py-4 rounded-xl border-2 border-dashed border-orange-500/30 text-orange-500/50 text-xs font-bold uppercase hover:bg-orange-500/5 transition-all">
                + Add New Item to {activeCategory}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
