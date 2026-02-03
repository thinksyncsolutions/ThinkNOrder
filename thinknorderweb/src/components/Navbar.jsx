"use client";

import React, { useState, useEffect } from "react";
import { QrCode, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-[100] transition-all duration-500 ${
        scrolled 
        ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10" 
        : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* --- Brand Architecture --- */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-1 bg-orange-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <QrCode className="text-black w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            THINK<span className="text-orange-500">N</span>ORDER
          </span>
        </div>

        {/* --- Navigation Links --- */}
        <div className="hidden md:flex gap-10">
          {[
            { name: "The Product", href: "#product" },
            { name: "Features", href: "#features" },
            { name: "Workflow", href: "#workflow" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* --- Interactive CTA --- */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">v3.0 Live</span>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 py-2.5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:pr-10"
          >
            <span className="relative z-10">Get Started</span>
            <ChevronRight 
              size={16} 
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" 
            />
          </motion.button>
        </div>

      </div>
    </nav>
  );
}