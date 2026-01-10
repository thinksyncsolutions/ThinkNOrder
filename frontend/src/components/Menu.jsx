import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Search, UtensilsCrossed, PlusCircle, MinusCircle } from "lucide-react";

// Fallback for environment variable to avoid compilation errors
const baseURL = import.meta.env.VITE_API_BASE_URL;

// The Menu now accepts tableCart and removeFromTableCart to manage quantity
const Menu = ({ addToTableCart, removeFromTableCart, tableCart }) => {
  const [menu, setMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${baseURL}/menu/getMenu`, {
          withCredentials: true,
        });
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = useMemo(() => {
    if (!menu) return [];

    let categoryFiltered =
      activeCategory === "All"
        ? menu.sections
        : menu.sections.filter((s) => s.sectionname === activeCategory);

    if (!searchTerm) return categoryFiltered;

    return categoryFiltered
      .map((section) => {
        const filteredItems = section.items.filter((item) =>
          item.itemname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);
  }, [menu, searchTerm, activeCategory]);

  const handleAddItem = (item, price) => {
    // This is a simple pass-through to the parent's logic
    addToTableCart({
      ...item,
      selectedPrice: price,
    });
  };

  if (!menu) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <UtensilsCrossed className="w-12 h-12 mb-4 animate-pulse" />
        <p className="text-lg">Loading Menu...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 h-full flex flex-col font-sans">
      {/* Sticky Header with Search and Filters */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm p-4 border-b border-gray-100">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-4 text-center">
          Table Management
        </h2>

        {/* Search Input */}
        <div className="relative mb-4 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Find your yummy treat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-full bg-white focus:ring-2 focus:ring-purple-300 outline-none text-gray-700"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-center">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out ${
              activeCategory === "All"
                ? "bg-purple-500 text-white shadow-md transform scale-105"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200 hover:shadow-sm"
            }`}
          >
            All Goodies
          </button>
          {menu.sections.map((section) => (
            <button
              key={section._id}
              onClick={() => setActiveCategory(section.sectionname)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out whitespace-nowrap ${
                activeCategory === section.sectionname
                  ? "bg-purple-500 text-white shadow-md transform scale-105"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200 hover:shadow-sm"
              }`}
            >
              {section.sectionname}
            </button>
          ))}
        </div>
      </header>

      {/* Menu Content */}
      <main className="p-6 overflow-y-auto flex-1">
        <div className="space-y-10">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((section) => (
              <div key={section._id} id={section.sectionname}>
                <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">
                  -- {section.sectionname} --
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {section.items.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform group relative"
                    >
                     
                      <div className="flex flex-col items-center text-center flex-grow">
                        <h4 className="text-base font-semibold text-gray-800 mb-2 leading-tight">
                          {item.itemname}
                        </h4>
                        <div className="mt-auto space-y-1 w-full">
                          {item.prices && item.prices.length > 0 ? (
                            item.prices.map((p) => {
                              const itemInCart = tableCart.find(
                                (cartItem) =>
                                  cartItem.itemId === item._id &&
                                  cartItem.selectedPrice._id === p._id
                              );
                              const quantity = itemInCart ? itemInCart.quantity : 0;

                              return (
                                <div
                                  key={p._id}
                                  className="flex flex-col bg-purple-50 p-2 rounded-lg text-sm group-hover:bg-purple-100 transition-colors"
                                >
                                  <div className="flex justify-between items-center w-full">
                                    <span className="text-gray-600 uppercase font-medium">
                                      {p.size}:
                                    </span>
                                    <span className="font-bold text-green-700">
                                      ₹ {p.price}
                                    </span>
                                  </div>
                                  
                                  <div className="flex justify-center items-center pt-1.5 mt-1.5 border-t border-purple-200">
                                    {/* === UPDATED LOGIC: Show 'Add' button first === */}
                                    {quantity === 0 ? (
                                      <button
                                        onClick={() => handleAddItem(item, p)}
                                        className="w-full bg-purple-100 text-purple-700 font-semibold py-1 rounded-md hover:bg-purple-200 transition-colors text-sm"
                                        aria-label={`Add ${item.itemname} (${p.size})`}
                                      >
                                        Add
                                      </button>
                                    ) : (
                                      <div className="flex items-center gap-3">
                                        <button
                                          onClick={() => removeFromTableCart(item._id, p._id)}
                                          className="p-1 text-red-500 rounded-full hover:text-red-700 transition-colors"
                                          aria-label={`Remove one ${item.itemname} (${p.size})`}
                                        >
                                          <MinusCircle size={22} />
                                        </button>
                                        <span className="font-bold text-xl text-purple-800 w-5 text-center">{quantity}</span>
                                        <button
                                          onClick={() => handleAddItem(item, p)}
                                          className="p-1 text-green-600 rounded-full hover:text-green-800 transition-colors"
                                          aria-label={`Add one more ${item.itemname} (${p.size})`}
                                        >
                                          <PlusCircle size={22} />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-xs text-gray-400 mt-2">No price</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="font-semibold text-lg">Oops! No yummy treats found.</p>
              <p className="text-sm">Try searching for something else or explore our categories!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Menu;

