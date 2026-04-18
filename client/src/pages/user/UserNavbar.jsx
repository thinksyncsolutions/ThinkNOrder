import React from "react";
import { Home, ShoppingBag, Search, UtensilsCrossed, User } from "lucide-react";

const UserNavbar = ({ activeTab, setActiveTab, setIsCartOpen, cartCount }) => {
  return (
    <>
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <nav className="bg-[#FFB800] rounded-full p-2 flex items-center justify-between shadow-2xl">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            activeTab === "home" ? "bg-black text-white shadow-lg" : "text-black"
          }`}
        >
          <Home size={20} />
          {activeTab === "home" && <span className="text-sm font-bold">Home</span>}
        </button>

        <div className="flex flex-1 justify-around px-2">
          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-black/70 relative active:scale-90 transition-transform"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 bg-black text-[#FFB800] text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#FFB800]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Search (Placeholder logic) */}
          <button className="p-2 text-black/70 active:scale-90 transition-transform">
            <Search size={22} />
          </button>

          {/* Orders Tab */}
          <button
            onClick={() => setActiveTab("orders")}
            className={`p-2 transition-all duration-300 active:scale-90 ${
              activeTab === "orders" ? "text-black scale-110" : "text-black/70"
            }`}
          >
            <UtensilsCrossed size={22} />
          </button>

          {/* Profile/User (Placeholder) */}
          <button className="p-2 text-black/70 active:scale-90 transition-transform">
            <User size={22} />
          </button>
        </div>
      </nav>
    </div>



    <div className="fixed bottom-25 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <nav className="bg-orange-600 rounded-full p-2 flex items-center justify-between shadow-2xl">
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            activeTab === "home" ? "bg-black text-white shadow-lg" : "text-black"
          }`}
        >
          <Home size={20} />
          {activeTab === "home" && <span className="text-sm font-bold">Home</span>}
        </button>

        <div className="flex flex-1 justify-around px-2">
          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-white relative active:scale-90 transition-transform"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 bg-black text-[#FFB800] text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#FFB800]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Search (Placeholder logic) */}
          <button className="p-2 text-white active:scale-90 transition-transform">
            <Search size={22} />
          </button>

          {/* Orders Tab */}
          <button
            onClick={() => setActiveTab("orders")}
            className={`p-2 transition-all duration-300 active:scale-90 ${
              activeTab === "orders" ? "text-black scale-110" : "text-white"
            }`}
          >
            <UtensilsCrossed size={22} />
          </button>

          {/* Profile/User (Placeholder) */}
          <button className="p-2 text-white active:scale-90 transition-transform">
            <User size={22} />
          </button>
        </div>
      </nav>
    </div>
</>
  );
};

export default UserNavbar;

