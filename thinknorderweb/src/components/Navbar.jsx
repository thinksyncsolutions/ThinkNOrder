import React from "react";
import { QrCode } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <QrCode className="text-black w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            THINK<span className="text-orange-500">N</span>ORDER
          </span>
        </div>
        <div className="hidden md:flex gap-10 text-sm font-semibold uppercase tracking-widest text-white">
          <a href="/" className="hover:text-orange-400 transition">
            Home
          </a>
          <a href="/about" className="hover:text-orange-400 transition">
            About
          </a>
          <a href="/product" className="hover:text-orange-400 transition">
            The Product
          </a>
          <a href="/features" className="hover:text-orange-400 transition">
            Features
          </a>
          <a href="/workflow" className="hover:text-orange-400 transition">
            Workflow
          </a>
        </div>
        <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-500 hover:text-white transition-all">
          Book a Demo
        </button>
      </div>
    </nav>
  );
}
