import React from "react";
import { Smartphone, ChefHat, Layout, CheckCircle2 } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black text-white mb-6">
              Designed for Every Table.
            </h2>
            <p className="text-slate-400 text-lg">
              Digital waiter that never sleeps and never makes a mistake.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-400 font-bold">
              MERN Stack
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white font-bold">
              Real-time Sync
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Smartphone />,
              title: "QR Web App",
              desc: "No downloads. No friction. HD digital menu.",
              items: [
                "Multi-category browsing",
                "Cart Management",
                "Special Instructions",
              ],
            },
            {
              icon: <ChefHat />,
              title: "Kitchen Terminal",
              desc: "Orders hit kitchen instantly. One tap status.",
              items: [
                "Socket.io live updates",
                "Order prioritization",
                "Auto-print receipts",
              ],
            },
            {
              icon: <Layout />,
              title: "Admin Hub",
              desc: "Take total control. Edit prices, track revenue.",
              items: [
                "Dynamic Menu Editor",
                "Revenue Analytics",
                "Staff Management",
              ],
            },
          ].map((f, i) => (
            <div
              key={i}
              className="group p-10 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2.5rem] border border-white/5 hover:border-orange-500/40 transition-all"
            >
              <div className="text-orange-400 mb-8">
                {React.cloneElement(f.icon, { size: 48 })}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-6">{f.desc}</p>
              <ul className="space-y-3">
                {f.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle2 size={14} className="text-orange-500" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
