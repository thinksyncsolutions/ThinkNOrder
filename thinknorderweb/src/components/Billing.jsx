import React from "react";
import {
  ChevronRight,
  CreditCard,
  Receipt,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";

export default function Billing() {
  return (
    <section id="billing" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Checkout Mockup */}
            <div className="bg-zinc-950 rounded-[3rem] p-8 shadow-3xl text-white relative max-w-md mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h4 className="font-black uppercase tracking-widest text-orange-500">
                  Checkout
                </h4>
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
                  <span className="text-[10px] font-bold uppercase">
                    Google Pay
                  </span>
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
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-zinc-400">
                  Security
                </p>
                <p className="text-xs font-bold text-orange-950">
                  PCI-DSS Compliant
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black text-orange-950 mb-6 leading-tight tracking-tighter">
              Billing that <br />
              <span className="text-orange-600">Flows.</span>
            </h2>
            <p className="text-orange-900/60 text-lg mb-10 leading-relaxed">
              Eliminate the "waiting for the check" bottleneck. Customers can
              view their live bill and pay directly from their phones.
            </p>
            <ul className="space-y-6">
              {[
                {
                  title: "Split Checks",
                  desc: "Let customers split by item or amount instantly.",
                },
                {
                  title: "Auto-Invoicing",
                  desc: "GST/VAT ready receipts sent straight to customer email.",
                },
                {
                  title: "Multi-Gateway",
                  desc: "Support for Apple Pay, Google Pay, Cards, and UPI.",
                },
              ].map((feature, i) => (
                <li key={i} className="flex gap-4">
                  <div className="bg-orange-100 text-orange-600 p-1 rounded-full self-start mt-1">
                    <ChevronRight size={16} />
                  </div>
                  <div>
                    <h4 className="font-black text-orange-950 uppercase text-sm tracking-widest">
                      {feature.title}
                    </h4>
                    <p className="text-orange-900/40 text-sm font-medium">
                      {feature.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
