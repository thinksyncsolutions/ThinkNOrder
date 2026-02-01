import React from "react";

export default function VisualShowcase() {
  return (
    <section className="py-24 px-6 bg-white rounded-[4rem] mx-4 text-black text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-black mb-8">Ready to serve better?</h2>
        <p className="text-xl text-slate-600 mb-12 font-medium">
          Think&Order is currently being deployed across premium dining
          locations. Be the first in your area to revolutionize dining.
        </p>
        <div className="aspect-video bg-slate-100 rounded-[3rem] border-[12px] border-slate-200 flex items-center justify-center shadow-2xl">
          <span className="text-slate-400 font-bold italic tracking-widest text-2xl uppercase">
            Interface Preview
          </span>
        </div>
      </div>
    </section>
  );
}
