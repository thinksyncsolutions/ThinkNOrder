import React, { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    title: "Free delivery for spaghetti",
    subtitle: "Up to 3 times per day",
    buttonText: "Order now",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop",
    bgColor: "bg-[#212121]",
  },
  {
    id: 2,
    title: "20% Off Japanese Cuisine",
    subtitle: "Valid on all Sushi sets",
    buttonText: "View Menu",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
    bgColor: "bg-[#1a2e1a]",
  },
  {
    id: 3,
    title: "Fresh Morning Coffee",
    subtitle: "Buy 1 Get 1 Free",
    buttonText: "Claim Now",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
    bgColor: "bg-[#2e1a1a]",
  },
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // 2.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 py-4">
      <div className="relative h-52 w-full overflow-hidden rounded-[2.5rem] shadow-xl">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform flex items-center ${
              index === currentIndex
                ? "translate-x-0 opacity-100"
                : index < currentIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            } ${banner.bgColor}`}
          >
            {/* Content Left */}
            <div className="relative z-10 w-3/5 pl-8">
              <h2 className="text-white text-2xl font-bold leading-tight mb-1">
                {banner.title}
              </h2>
              <p className="text-slate-400 text-xs mb-4">{banner.subtitle}</p>
              <button className="bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-black shadow-lg active:scale-95 transition-transform">
                {banner.buttonText}
              </button>
            </div>

            {/* Image Right */}
            <img
              src={banner.image}
              alt="promo"
              className="absolute -right-8 -bottom-8 w-60 h-60 object-cover rounded-full rotate-12"
            />
          </div>
        ))}

        {/* Progress Indicators (Dots) */}
        <div className="absolute bottom-5 left-8 flex gap-1.5 z-20">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;