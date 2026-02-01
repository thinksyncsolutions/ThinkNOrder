import React from "react";
import { Pizza } from "lucide-react";

export default function KitchenCall() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto bg-orange-600 rounded-[4rem] p-16 text-center text-white relative shadow-2xl shadow-orange-300 overflow-hidden">
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          THE KITCHEN <br /> IS CALLING.
        </h2>
        <p className="text-orange-100 text-xl font-medium mb-12 max-w-lg mx-auto italic">
          Join 500+ venues using ThinknOrder to modernize their food service.
        </p>
        <button className="bg-orange-950 text-white px-12 py-6 rounded-3xl text-2xl font-black hover:scale-105 transition-transform shadow-2xl">
          Book My Free Setup
        </button>
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
          <Pizza size={400} />
        </div>
      </div>
    </section>
  );
}
