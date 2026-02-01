import React from "react";

export default function ProductStats() {
  return (
    <section className="py-20 border-y border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        {[
          { label: "Avg. Speedup", val: "40%" },
          { label: "Order Accuracy", val: "100%" },
          { label: "Staff Efficiency", val: "2X" },
          { label: "Set Up Time", val: "5min" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-black text-white mb-2">
              {stat.val}
            </div>
            <div className="text-xs uppercase tracking-widest text-orange-500 font-bold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
