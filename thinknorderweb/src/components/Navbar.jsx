"use client";

import React, { useState, useEffect } from "react";
import { QrCode, Menu, X } from "lucide-react"; // Added Menu and X icons
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "The Product", href: "/product" },
    { name: "Features", href: "/features" },
    { name: "Workflow", href: "/workflow" },
  ];

  return (
    <nav className={`fixed w-full z-50 border-b transition-all duration-300 ${
      scrolled ? "bg-black/90 border-white/10 py-2" : "bg-black/80 border-white/5 py-0"
    } backdrop-blur-xl`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <QrCode className="text-black w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            THINK<span className="text-orange-500">N</span>ORDER
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 text-sm font-semibold uppercase tracking-widest text-white">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-orange-400 transition">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-500 hover:text-white transition-all">
            Book a Demo
          </button>
          
          {/* Hamburger Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-6 px-8 py-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-white uppercase tracking-widest hover:text-orange-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold mt-4">
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}