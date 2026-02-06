import React from "react";
import { QrCode, ArrowRight, BarChart3, LayoutDashboard, Zap, Star, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function ClientFacedHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-26 pb-10 bg-white overflow-hidden">
      {/* --- High-End Background Architecture --- */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-orange-50/50 -skew-x-12 transform origin-top translate-x-24 z-0" />
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-orange-200/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-5%] right-[10%] w-[30%] h-[30%] bg-orange-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 w-full">
        
        {/* --- Left Content: The Power Copy --- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl shadow-orange-950/10">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </div>
            Global Hospitality OS 2026
          </div> */}

          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black text-zinc-950 tracking-tighter mb-10 leading-[0.8] lg:leading-[0.85]">
            OWN THE <br />
            <span className="text-orange-600 italic">
              EXPERIENCE.
            </span>
          </h1>

          <p className="text-zinc-500 text-xl font-medium max-w-lg leading-relaxed mb-10">
            Eliminate ordering friction. The complete operating system for modern venues—synchronizing <span className="text-zinc-950 font-bold italic">QR-Menus</span>, <span className="text-zinc-950 font-bold italic">Kitchen Prep</span>, and <span className="text-zinc-950 font-bold italic">Deep Analytics</span>.
          </p>

          <div className="flex flex-wrap gap-6 mb-16">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-zinc-950 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-950/20 flex items-center gap-3"
            >
              Get Started Free <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
            {/* <button className="px-12 py-6 bg-transparent text-zinc-900 rounded-2xl font-black text-xl border-2 border-zinc-200 hover:border-orange-600 hover:bg-orange-50/50 transition-all">
               Watch the Sync
            </button> */}
          </div>

          {/* Social Proof / Stats Area */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-zinc-100 pt-10">
            <div>
              <p className="text-3xl font-black text-zinc-950 tracking-tighter">30%</p>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Revenue Growth</p>
            </div>
            <div>
              <p className="text-3xl font-black text-zinc-950 tracking-tighter">100%</p>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Order Accuracy</p>
            </div>
            {/* <div className="hidden md:block">
              <div className="flex gap-1 text-orange-500 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Industry Leader</p>
            </div> */}
          </div>
        </motion.div>

        {/* --- Right Content: Floating Terminal --- */}
      
          <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-85"> 
            <div className="absolute -inset-10 bg-orange-100/60 rounded-[4rem] blur-3xl" />
            
            <div className="relative bg-white p-4 rounded-[3.5rem] border-12 border-zinc-900 shadow-2xl overflow-hidden aspect-[9/18.5]">
              
              <div className="relative h-full flex flex-col pt-6">
                {/* Merchant Branding */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="h-8 w-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <LayoutDashboard size={18} className="text-white" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-zinc-400 uppercase">Storefront</p>
                        <p className="text-xs font-bold text-zinc-900">The Grand Bistro</p>
                    </div>
                </div>

                 {/* Real-time Business Metrics */}
                 <div className="space-y-4">
                   <div className="p-6 bg-black border border-white/10 rounded-[2.5rem] backdrop-blur-xl mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-black text-zinc-200 uppercase tracking-widest">Revenue Flow</p>
                    <Globe size={14} className="text-zinc-200" />
                  </div>
                  <h3 className="text-4xl font-black text-white tracking-tighter">₹4,280.50</h3>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-orange-600" 
                      />
                    </div>
                    <span className="text-[10px] font-black text-orange-500">+12%</span>
                  </div>
                </div>
                  
                   <div className="grid grid-cols-2 gap-3">
                     <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                         <p className="text-[10px] font-black text-orange-600 uppercase">Active Tables</p>
                         <p className="text-xl font-black text-zinc-900">18/20</p>
                     </div>
                     <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                         <p className="text-[10px] font-black text-orange-600 uppercase">Orders</p>
                         <p className="text-xl font-black text-zinc-900">42</p>
                     </div>
                   </div>

                   {/* Merchant Management Tools */}
                   <div className="mt-4 space-y-2">
                     <p className="text-[10px] font-black text-zinc-400 uppercase px-2">Quick Actions</p>
                     <div className="w-full p-4 bg-white border border-zinc-100 rounded-2xl flex items-center justify-between">
                         <span className="text-xs font-bold text-zinc-700">Update Menu</span>
                         <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                     </div>
                     <div className="w-full p-4 bg-white border border-zinc-100 rounded-2xl flex items-center justify-between">
                         <span className="text-xs font-bold text-zinc-700">POS Integration</span>
                         <span className="text-[10px] font-black text-orange-600 uppercase">Connected</span>
                     </div>
                   </div>
                 </div>

                 {/* QR Generation Highlight */}
                 <div className="mt-auto mb-8 p-6 bg-orange-600 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg shadow-orange-600/20">
                   <div className="bg-white p-2 rounded-xl mb-3">
                     <QrCode size={32} className="text-orange-600" />
                   </div>
                   <p className="text-[10px] font-black text-white uppercase tracking-widest">
                     Generate Table QRs
                   </p>
                 </div>

                 <div className="w-20 h-1 bg-zinc-200 rounded-full mx-auto mb-2" />
              </div>
             </div>
           </div>

           {/* Creative Floating Accessory: Table Pin */}
            {/* <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-12 p-5 bg-white shadow-2xl rounded-3xl border border-zinc-100 hidden xl:flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <BarChart3 size={20} />
              </div>
              <div className="text-left pr-4">
                <p className="text-[10px] font-black text-zinc-400 uppercase">Peak Time</p>
                <p className="text-sm font-black text-zinc-950">19:30 - 21:00</p>
              </div>
            </motion.div> */}
            
         </motion.div>

      
        </div>
    </section>
  );
}


// import React from "react";
// import { QrCode, ArrowRight, BarChart3, LayoutDashboard, Zap, Star, Globe } from "lucide-react";
// import { motion } from "framer-motion";

// export default function ClientFacedHero() {
//   return (
//     <section className="relative min-h-screen flex items-center pt-32 pb-20 bg-white overflow-hidden">
//       {/* --- High-End Background Architecture --- */}
//       <div className="absolute top-0 right-0 w-[55%] h-full bg-orange-50/50 -skew-x-12 transform origin-top translate-x-24 -z-0" />
//       <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-orange-200/20 blur-[150px] rounded-full" />
//       <div className="absolute bottom-[-5%] right-[10%] w-[30%] h-[30%] bg-orange-500/5 blur-[120px] rounded-full" />

//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 w-full">
        
//         {/* --- Left Content: The Power Copy --- */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl shadow-orange-950/10">
//             <div className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
//             </div>
//             Global Hospitality OS 2026
//           </div>

//           <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black text-zinc-950 tracking-tighter mb-10 leading-[0.8] lg:leading-[0.85]">
//             OWN THE <br />
//             <span className="text-orange-600 italic">
//               EXPERIENCE.
//             </span>
//           </h1>

//           <p className="text-zinc-500 text-xl font-medium max-w-lg leading-relaxed mb-12">
//             Eliminate ordering friction. The complete operating system for modern venues—synchronizing <span className="text-zinc-950 font-bold italic">QR-Menus</span>, <span className="text-zinc-950 font-bold italic">Kitchen Prep</span>, and <span className="text-zinc-950 font-bold italic">Deep Analytics</span>.
//           </p>

//           <div className="flex flex-wrap gap-6 mb-16">
//             <motion.button 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className="group bg-zinc-950 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-950/20 flex items-center gap-3"
//             >
//               Get Started Free <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
//             </motion.button>
//             <button className="px-12 py-6 bg-transparent text-zinc-900 rounded-2xl font-black text-xl border-2 border-zinc-200 hover:border-orange-600 hover:bg-orange-50/50 transition-all">
//                Watch the Sync
//             </button>
//           </div>

//           {/* Social Proof / Stats Area */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-zinc-100 pt-10">
//             <div>
//               <p className="text-3xl font-black text-zinc-950 tracking-tighter">30%</p>
//               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Revenue Growth</p>
//             </div>
//             <div>
//               <p className="text-3xl font-black text-zinc-950 tracking-tighter">100%</p>
//               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Order Accuracy</p>
//             </div>
//             <div className="hidden md:block">
//               <div className="flex gap-1 text-orange-500 mb-1">
//                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
//               </div>
//               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Industry Leader</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* --- Right Content: Floating Terminal --- */}
//         <div className="relative flex justify-center lg:justify-end">
//           <motion.div 
//             initial={{ opacity: 0, y: 50, rotateY: -15 }}
//             animate={{ opacity: 1, y: 0, rotateY: 0 }}
//             transition={{ duration: 1, delay: 0.3 }}
//             className="relative w-full max-w-[360px]"
//           >
//             {/* Ambient Shadow Layer */}
//             <div className="absolute -inset-10 bg-orange-500/10 rounded-[5rem] blur-[80px] pointer-events-none" />
            
//             <div className="relative bg-zinc-950 p-4 rounded-[4rem] border-[12px] border-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden aspect-[9/19]">
              
//               <div className="relative h-full flex flex-col pt-8 px-2">
//                 {/* Internal App Header */}
//                 <div className="flex items-center justify-between mb-10 px-2">
//                    <div className="h-10 w-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
//                       <Zap size={22} className="text-white fill-white" />
//                    </div>
//                    <div className="flex flex-col items-end">
//                       <div className="flex items-center gap-1.5 text-[10px] font-black text-orange-500 uppercase tracking-widest">
//                         <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
//                         Live Hub
//                       </div>
//                       <p className="text-xs font-bold text-white mt-0.5">ThinkNOrder v3.0</p>
//                    </div>
//                 </div>

//                 {/* Dashboard Widget 1: Live Revenue */}
//                 <div className="p-6 bg-white/[0.05] border border-white/10 rounded-[2.5rem] backdrop-blur-xl mb-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Revenue Flow</p>
//                     <Globe size={14} className="text-zinc-600" />
//                   </div>
//                   <h3 className="text-4xl font-black text-white tracking-tighter">$4,280.50</h3>
//                   <div className="mt-4 flex items-center gap-2">
//                     <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
//                       <motion.div 
//                         initial={{ width: 0 }}
//                         animate={{ width: "70%" }}
//                         transition={{ duration: 2, delay: 1 }}
//                         className="h-full bg-orange-600" 
//                       />
//                     </div>
//                     <span className="text-[10px] font-black text-orange-500">+12%</span>
//                   </div>
//                 </div>

//                 {/* Dashboard Widget 2: Table Status */}
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                    <div className="p-5 bg-white text-zinc-950 rounded-[2rem] shadow-xl">
//                       <p className="text-[10px] font-black text-zinc-400 uppercase">Occupancy</p>
//                       <p className="text-2xl font-black mt-1">90%</p>
//                    </div>
//                    <div className="p-5 bg-orange-600 text-white rounded-[2rem] shadow-xl">
//                       <p className="text-[10px] font-black text-white/60 uppercase">Tickets</p>
//                       <p className="text-2xl font-black mt-1">42</p>
//                    </div>
//                 </div>

//                 {/* Dashboard Widget 3: KDS Status */}
//                 <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[2.5rem]">
//                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Kitchen Sync</p>
//                    <div className="space-y-3">
//                       {[1, 2].map(i => (
//                         <div key={i} className="flex items-center justify-between">
//                            <div className="flex items-center gap-3">
//                               <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-orange-500 shadow-[0_0_8px_#f97316]' : 'bg-zinc-700'}`} />
//                               <div className="w-16 h-2 bg-zinc-800 rounded-full" />
//                            </div>
//                            <div className="w-8 h-2 bg-zinc-800 rounded-full" />
//                         </div>
//                       ))}
//                    </div>
//                 </div>

//                 {/* Bottom Speaker Bar */}
//                 <div className="mt-auto mb-6 text-center">
//                    <div className="w-20 h-1.5 bg-zinc-800 rounded-full mx-auto" />
//                 </div>
//               </div>
//             </div>

//             {/* Creative Floating Accessory: Table Pin */}
//             <motion.div 
//               animate={{ y: [0, -15, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute -top-6 -right-12 p-5 bg-white shadow-2xl rounded-3xl border border-zinc-100 hidden xl:flex items-center gap-4"
//             >
//               <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
//                 <BarChart3 size={20} />
//               </div>
//               <div className="text-left pr-4">
//                 <p className="text-[10px] font-black text-zinc-400 uppercase">Peak Time</p>
//                 <p className="text-sm font-black text-zinc-950">19:30 - 21:00</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }