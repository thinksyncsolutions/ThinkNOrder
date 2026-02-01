'use client'
import React from 'react';
import { 
  QrCode, Zap, BarChart3, Clock, 
  CheckCircle2, ArrowRight, Layout, 
  Smartphone, Shield, ChefHat, 
  MenuIcon, Receipt, Layers, Filter, Settings2, Plus, UserCheck, MoveRight, BellRing, Utensils, Flame, CreditCard, ChevronRight, ShieldCheck, Pizza
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function ThinkAndOrderDedicated() {
   const [activeCategory, setActiveCategory] = useState('Main Course');

  const menuData = {
    'Main Course': [
      { name: 'Classic Cheeseburger', price: '12.99', modifiers: ['Extra Cheese', 'Bacon'] },
      { name: 'Wild Mushroom Pasta', price: '15.50', modifiers: ['Truffle Oil', 'Gluten Free'] }
    ],
    'Beverages': [
      { name: 'Iced Matcha', price: '4.50', modifiers: ['Oat Milk', 'Honey'] }
    ]
  };
  return (
    <div className="bg-[#050505] text-slate-300 selection:bg-emerald-500/30 font-sans">
      
      {/* --- Sticky Header --- */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <QrCode className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              THINK<span className="text-emerald-500">N</span>ORDER
            </span>
          </div>
          <div className="hidden md:flex gap-10 text-sm font-semibold uppercase tracking-widest text-slate-400">
            <a href="#product" className="hover:text-emerald-400 transition">The Product</a>
            <a href="#features" className="hover:text-emerald-400 transition">Features</a>
            <a href="#workflow" className="hover:text-emerald-400 transition">Workflow</a>
          </div>
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all">
            Get Started
          </button>
        </div>
      </nav>

      {/* --- Hero: The Main Hook --- */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Restaurants & Hotels
          </div>
          <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.85] tracking-tighter mb-10">
            DON'T JUST WAIT.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white">
              THINK & ORDER.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
            The world’s most intuitive QR-based ordering system. Boost revenue by 30%, 
            eliminate manual errors, and provide a 5-star digital experience.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="px-10 py-5 bg-emerald-500 text-black rounded-2xl font-black text-lg hover:bg-emerald-400 transition-all flex items-center gap-2">
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button className="px-10 py-5 bg-transparent text-white rounded-2xl font-black text-lg border-2 border-white/10 hover:bg-white/5 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

  <section className="relative pt-32 pb-20 bg-orange-50 overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-100 -skew-x-12 transform origin-top translate-x-20 -z-10" />
    
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          V3.0 Now Live
        </div>
        <h1 className="text-7xl lg:text-9xl font-black text-orange-950 leading-[0.8] tracking-tighter mb-8">
          CRISP <br />CODE, <br /><span className="text-orange-600 italic">HOT FOOD.</span>
        </h1>
        <p className="text-orange-900/60 text-xl font-medium max-w-sm leading-relaxed mb-10">
          The only software that handles your QR menu, billing, and kitchen sync as beautifully as you plate your food.
        </p>
        <button className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40 transform hover:-translate-y-1">
          Explore the Ecosystem
        </button>
      </motion.div>

      <div className="relative">
        <div className="absolute -inset-4 bg-orange-200/50 rounded-[3rem] blur-2xl" />
        <div className="relative bg-white p-4 rounded-[3rem] border-8 border-orange-950 shadow-2xl overflow-hidden aspect-[9/14]">
           <div className="bg-orange-600 rounded-2xl p-6 text-white mb-6">
              <p className="text-xs font-bold opacity-80 uppercase">Table 04 Order</p>
              <h3 className="text-2xl font-black mt-1">Spicy Miso Ramen</h3>
           </div>
           <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
                <p className="text-[10px] font-black text-orange-600 uppercase mb-2">Modifiers Added</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-lg text-xs font-bold shadow-sm">+ Extra Pork</span>
                  <span className="px-3 py-1 bg-white rounded-lg text-xs font-bold shadow-sm">+ Bamboo Shoots</span>
                </div>
              </div>
              <div className="h-40 w-full bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl flex items-center justify-center">
                <QrCode size={64} className="text-zinc-200" />
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>

    <section id="menu" className="py-24 bg-orange-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter">
              Manage Menus with <br /><span className="text-orange-500">Zero Effort.</span>
            </h2>
            <p className="text-orange-200/60 text-lg mb-12">
              From seasonal shifts to daily specials, update your categories and item modifiers in real-time across all QR codes.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-2 rounded-lg text-white"><Filter size={20}/></div>
                <div>
                  <h4 className="font-black text-xl">Dynamic Categories</h4>
                  <p className="text-orange-200/40 text-sm">Organize items by Breakfast, Lunch, or Special Events.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-2 rounded-lg text-white"><Settings2 size={20}/></div>
                <div>
                  <h4 className="font-black text-xl">Smart Modifiers</h4>
                  <p className="text-orange-200/40 text-sm">Add 'Extra Toppings' or 'Spiciness Levels' with custom pricing.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 shadow-3xl">
              <div className="flex gap-4 mb-8 border-b border-white/5 pb-4">
                {['Main Course', 'Beverages', 'Desserts'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-black uppercase tracking-widest ${activeCategory === cat ? 'text-orange-500' : 'text-zinc-600 hover:text-white transition-colors'}`}
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
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{item.name}</span>
                        <span className="text-orange-500 font-black">${item.price}</span>
                      </div>
                      <div className="flex gap-2">
                        {item.modifiers.map(mod => (
                          <span key={mod} className="text-[10px] bg-white/10 px-2 py-1 rounded font-medium text-orange-200/50 uppercase tracking-tighter">
                            + {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  )) || <div className="text-zinc-700 py-10 text-center font-bold italic">No items added yet...</div>}
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

  <section id="admin" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6 text-center mb-16">
      <h2 className="text-5xl font-black text-orange-950 mb-4 tracking-tighter">Floor & Table Logistics</h2>
      <p className="text-orange-900/40 font-medium">Add unlimited floors. Map every table. Track live status.</p>
    </div>
    
    <div className="max-w-5xl mx-auto bg-orange-50 rounded-[3rem] border border-orange-100 p-12 relative overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-2">
           <div className="px-6 py-2 bg-orange-600 text-white rounded-full text-sm font-black shadow-lg">Level 1: Main Hall</div>
           <div className="px-6 py-2 bg-white text-orange-900 rounded-full text-sm font-bold border border-orange-100 shadow-sm">Level 2: Rooftop</div>
        </div>
        <button className="text-orange-600 font-black text-sm uppercase flex items-center gap-1">
          <Plus size={16} /> Add Table
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`aspect-square rounded-[2rem] border-2 flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-105 shadow-sm ${i === 2 || i === 4 ? 'bg-orange-600 border-orange-700 text-white shadow-orange-200' : 'bg-white border-orange-100 text-orange-950'}`}>
            <span className="text-xs font-black">TABLE {i + 1}</span>
            <span className={`text-[8px] mt-1 font-bold uppercase px-2 py-0.5 rounded-full ${i === 2 || i === 4 ? 'bg-white/20' : 'bg-orange-100 text-orange-600'}`}>
              {i === 2 || i === 4 ? 'Occupied' : 'Vacant'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto bg-orange-600 rounded-[4rem] p-16 text-center text-white relative shadow-2xl shadow-orange-300 overflow-hidden">
             <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">THE KITCHEN <br /> IS CALLING.</h2>
             <p className="text-orange-100 text-xl font-medium mb-12 max-w-lg mx-auto italic">Join 500+ venues using ThinknOrder to modernize their food service.</p>
             <button className="bg-orange-950 text-white px-12 py-6 rounded-3xl text-2xl font-black hover:scale-105 transition-transform shadow-2xl">
               Book My Free Setup
             </button>
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
                <Pizza size={400} />
             </div>
          </div>
        </section>

  <section id="billing" className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          {/* Checkout Mockup */}
          <div className="bg-zinc-950 rounded-[3rem] p-8 shadow-3xl text-white relative max-w-md mx-auto">
             <div className="flex justify-between items-center mb-10">
                <h4 className="font-black uppercase tracking-widest text-orange-500">Checkout</h4>
                <Receipt size={20} className="text-zinc-600" />
             </div>
             <div className="space-y-4 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Order #1204 (Table 08)</span>
                  <span className="font-bold">$42.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Service Tax (5%)</span>
                  <span className="font-bold">$2.10</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-black">
                  <span>Total</span>
                  <span className="text-orange-500">$44.10</span>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center">
                   <Smartphone size={24} className="mb-2 text-orange-500" />
                   <span className="text-[10px] font-bold uppercase">Apple Pay</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center">
                   <CreditCard size={24} className="mb-2 text-orange-500" />
                   <span className="text-[10px] font-bold uppercase">Card</span>
                </div>
             </div>
             <button className="w-full bg-orange-600 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2">
               Pay Now <Zap size={18} fill="currentColor" />
             </button>
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 md:right-0 bg-white shadow-2xl p-4 rounded-2xl flex items-center gap-3 border border-orange-100">
             <div className="bg-green-100 p-2 rounded-full text-green-600"><ShieldCheck size={20}/></div>
             <div className="text-left">
               <p className="text-[10px] font-black uppercase text-zinc-400">Security</p>
               <p className="text-xs font-bold text-orange-950">PCI-DSS Compliant</p>
             </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-4xl md:text-6xl font-black text-orange-950 mb-6 leading-tight tracking-tighter">
            Billing that <br /><span className="text-orange-600">Flows.</span>
          </h2>
          <p className="text-orange-900/60 text-lg mb-10 leading-relaxed">
            Eliminate the "waiting for the check" bottleneck. Customers can view their live bill and pay directly from their phones.
          </p>
          <ul className="space-y-6">
            {[
              { title: "Split Checks", desc: "Let customers split by item or amount instantly." },
              { title: "Auto-Invoicing", desc: "GST/VAT ready receipts sent straight to customer email." },
              { title: "Multi-Gateway", desc: "Support for Apple Pay, Google Pay, Cards, and UPI." }
            ].map((feature, i) => (
              <li key={i} className="flex gap-4">
                <div className="bg-orange-100 text-orange-600 p-1 rounded-full self-start mt-1">
                  <ChevronRight size={16} />
                </div>
                <div>
                  <h4 className="font-black text-orange-950 uppercase text-sm tracking-widest">{feature.title}</h4>
                  <p className="text-orange-900/40 text-sm font-medium">{feature.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>

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
            Orders from QR codes land instantly on the Kitchen Display System (KDS). 
            No printers, no paper, no mistakes.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 rounded-[2rem] bg-orange-50 border border-orange-100">
                <h4 className="font-black text-orange-950 mb-1">98%</h4>
                <p className="text-xs font-bold text-orange-900/40 uppercase">Faster Prep</p>
             </div>
             <div className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                <h4 className="font-black text-zinc-950 mb-1">0%</h4>
                <p className="text-xs font-bold text-zinc-400 uppercase">Lost Orders</p>
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
             <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">KDS LIVE MONITOR</span>
          </div>
          <div className="space-y-4">
            {[
              { id: 'T-08', item: '2x Truffle Burger', time: '02:45', status: 'In Prep' },
              { id: 'T-12', item: '1x Margherita Pizza', time: '08:12', status: 'Urgent' },
              { id: 'T-04', item: '4x Coca Cola', time: '00:30', status: 'Ready' },
            ].map((order, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-orange-500">{order.id}</p>
                  <p className="text-white font-bold">{order.item}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-500 uppercase">{order.time}</p>
                  <p className={`text-[10px] font-black uppercase mt-1 ${order.status === 'Urgent' ? 'text-red-500' : 'text-green-500'}`}>{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="waiter-flow" className="py-24 bg-orange-950 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        
        <div className="relative order-2 lg:order-1">
          {/* Admin Table Injection Mockup */}
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-orange-50">
              <div className="bg-orange-100 p-2 rounded-full text-orange-600"><UserCheck size={20}/></div>
              <div>
                <h4 className="font-black text-orange-950 text-sm">Admin Dashboard</h4>
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Active Table: T-05</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <span className="font-bold text-orange-950 text-sm">Existing: 2x Ramen</span>
                <span className="text-[10px] font-black text-orange-600 uppercase italic">In Prep</span>
              </div>
              
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex justify-between items-center p-4 bg-white rounded-2xl border-2 border-dashed border-orange-300"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-orange-600 text-white p-1 rounded-md"><Plus size={14}/></div>
                  <span className="font-black text-orange-600 text-sm">Add: Extra Fries</span>
                </div>
                <button className="bg-orange-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">Inject</button>
              </motion.div>

              <div className="flex items-center gap-2 py-4 justify-center text-zinc-300">
                <MoveRight size={20} className="rotate-90" />
              </div>

              <div className="bg-zinc-900 rounded-2xl p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Kitchen Display:</span>
                </div>
                <span className="text-xs font-black text-orange-500 uppercase">+1 New Side (T-05)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-4">
            <BellRing size={16} /> Hybrid Service Flow
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            Waiter & Admin <br /><span className="text-orange-600">Perfectly Synced.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-md">
            When a customer wants "one more thing" during table-side service, your staff can add it instantly from the Admin panel.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                <Utensils size={24} />
              </div>
              <div>
                <h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">On-the-fly Additions</h4>
                <p className="text-zinc-500 text-sm">Waiters notify Admin, Admin adds the item to the active table session. No bill confusion.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-orange-500">
                <ChefHat size={24} />
              </div>
              <div>
                <h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">Instant Kitchen Fire</h4>
                <p className="text-zinc-500 text-sm">Add-ons appear on the KDS with a "Table Update" tag so chefs know it's for an ongoing order.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

      {/* --- Product Stats --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: 'Avg. Speedup', val: '40%' },
            { label: 'Order Accuracy', val: '100%' },
            { label: 'Staff Efficiency', val: '2X' },
            { label: 'Set Up Time', val: '5min' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-white mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-emerald-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- The Triple-Power Features --- */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black text-white mb-6">Designed for Every Table.</h2>
              <p className="text-slate-400 text-lg">Think&Order isn't just a menu; it's a digital waiter that never sleeps and never makes a mistake.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 font-bold">MERN Stack</div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white font-bold">Real-time Sync</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-10 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2.5rem] border border-white/5 hover:border-emerald-500/40 transition-all">
              <Smartphone className="w-12 h-12 text-emerald-400 mb-8" />
              <h3 className="text-2xl font-bold text-white mb-4">QR Web App</h3>
              <p className="text-slate-400 leading-relaxed mb-6">No downloads. No friction. Customers simply scan and browse your high-definition digital menu.</p>
              <ul className="space-y-3">
                {['Multi-category browsing', 'Cart Management', 'Special Instructions'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500"/> {item}</li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group p-10 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2.5rem] border border-white/5 hover:border-emerald-500/40 transition-all">
              <ChefHat className="w-12 h-12 text-emerald-400 mb-8" />
              <h3 className="text-2xl font-bold text-white mb-4">Kitchen Terminal</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Orders hit the kitchen instantly. Staff can update order status from 'Preparing' to 'Served' with one tap.</p>
              <ul className="space-y-3">
                {['Socket.io live updates', 'Order prioritization', 'Auto-print receipts'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500"/> {item}</li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group p-10 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2.5rem] border border-white/5 hover:border-emerald-500/40 transition-all">
              <Layout className="w-12 h-12 text-emerald-400 mb-8" />
              <h3 className="text-2xl font-bold text-white mb-4">Admin Hub</h3>
              <p className="text-slate-400 leading-relaxed mb-6">Take total control. Edit prices, hide items, and track your revenue in real-time from anywhere.</p>
              <ul className="space-y-3">
                {['Dynamic Menu Editor', 'Revenue Analytics', 'Staff Management'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 size={14} className="text-emerald-500"/> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      <section id="admin" className="py-24 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Complete Control <br /><span className="text-zinc-600">from the Admin Desk.</span>
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="mt-1 text-emerald-500"><Layers size={20} /></div>
              <div>
                <h4 className="text-white font-semibold">Table & Floor Management</h4>
                <p className="text-zinc-500 text-sm mt-1">Organize your space by floors. Add, remove, and track live occupancy for every table across your venue.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-emerald-500"><MenuIcon size={20} /></div>
              <div>
                <h4 className="text-white font-semibold">Dynamic Menu Control</h4>
                <p className="text-zinc-500 text-sm mt-1">Update prices, add seasonal dishes, or toggle "Out of Stock" instantly. No more reprinting menus.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-emerald-500"><Receipt size={20} /></div>
              <div>
                <h4 className="text-white font-semibold">Automated Billing</h4>
                <p className="text-zinc-500 text-sm mt-1">Generate GST-ready invoices, manage split bills, and view real-time sales analytics.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-transparent rounded-full absolute -inset-10 blur-3xl opacity-50" />
          <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl">
             {/* Mockup UI */}
             <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Admin Dashboard</div>
             </div>
             <div className="space-y-4">
                <div className="h-8 w-full bg-white/5 rounded-md flex items-center px-3 justify-between">
                  <span className="text-xs text-zinc-400">Floor 01 - Main Hall</span>
                  <div className="h-2 w-12 bg-emerald-500/20 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                   {[1,2,3,4,5,6].map(i => (
                     <div key={i} className="aspect-video bg-zinc-800 rounded-lg flex flex-col items-center justify-center border border-white/5">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Table {i}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* --- Visual Showcase --- */}
      <section className="py-24 px-6 bg-white rounded-[4rem] mx-4 text-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-8">Ready to serve better?</h2>
          <p className="text-xl text-slate-600 mb-12 font-medium">Think&Order is currently being deployed across premium dining locations. Be the first in your area to revolutionize dining.</p>
          <div className="aspect-video bg-slate-100 rounded-[3rem] border-[12px] border-slate-200 flex items-center justify-center shadow-2xl">
            <span className="text-slate-400 font-bold italic tracking-widest text-2xl uppercase">Interface Preview</span>
          </div>
        </div>
      </section>

      {/* --- Minimal Footer --- */}
      <footer className="py-20 text-center">
        <div className="text-2xl font-black text-white mb-4 tracking-tighter">
          THINK<span className="text-emerald-500">N</span>ORDER
        </div>
        <p className="text-slate-500 text-sm">Synchronizing Restaurants with the Future.</p>
        <div className="mt-8 flex justify-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-600">
          <a href="#" className="hover:text-emerald-400 transition">Privacy</a>
          <a href="#" className="hover:text-emerald-400 transition">Terms</a>
          <a href="#" className="hover:text-emerald-400 transition">Contact</a>
        </div>
        <div className="mt-12 text-[10px] text-slate-800 uppercase tracking-[0.3em]">
          Product of ThinkSync Solutions
        </div>
      </footer>

    </div>
  );
}