import React, { useEffect, useState, useMemo } from "react";
import { Search, UtensilsCrossed, PlusCircle, MinusCircle, Plus, Minus, Inbox } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFullMenu } from "../../redux/features/menu/menu.thunk";

const Menu = ({ addToTableCart, removeFromTableCart, tableCart }) => {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => state.menu);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchFullMenu());
  }, [dispatch]);

  const filteredSections = useMemo(() => {
    if (!sections) return [];

    let categoryFiltered =
      activeCategory === "All"
        ? sections
        : sections.filter((s) => s.name === activeCategory);

    if (!searchTerm) return categoryFiltered;

    return categoryFiltered
      .map((section) => {
        const filteredItems = section.items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);
  }, [sections, searchTerm, activeCategory]);

  const handleAddItem = (item, price) => {
    addToTableCart({
      ...item,
      selectedPrice: price,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <div className="relative">
          <UtensilsCrossed className="w-12 h-12 text-orange-600 animate-bounce" />
          <div className="absolute inset-0 w-12 h-12 bg-orange-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-950">Syncing Menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="bg-red-50 text-red-600 p-4 rounded-2xl font-bold uppercase text-xs border border-red-100 italic">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white h-full flex flex-col animate-in fade-in duration-500">
      {/* SEARCH & CATEGORIES - STICKY TOP */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-orange-100 p-6 space-y-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400 group-focus-within:text-orange-600 transition-colors" />
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-orange-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-orange-600 outline-none font-black uppercase text-[11px] tracking-widest transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeCategory === "All"
                ? "bg-black text-white shadow-xl"
                : "bg-orange-50 text-orange-900 hover:bg-orange-100"
            }`}
          >
            All Items
          </button>
          {sections.map((section) => (
            <button
              key={section._id}
              onClick={() => setActiveCategory(section.name)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                activeCategory === section.name
                  ? "bg-black text-white shadow-xl"
                  : "bg-orange-50 text-orange-900 hover:bg-orange-100"
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* DISHES LIST */}
      <div className="p-6 overflow-y-auto flex-1 space-y-12 custom-scrollbar bg-white">
        {filteredSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <Inbox size={48} className="mb-4" />
            <p className="font-black uppercase text-xs tracking-[0.2em]">No dishes found</p>
          </div>
        ) : (
          filteredSections.map((section) => (
            <div key={section._id}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-950 whitespace-nowrap">
                  {section.name}
                </h3>
                <div className="h-[1px] w-full bg-orange-100"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => {
                  // Check if any variant of this item is in cart to highlight the whole card
                  const hasInCart = tableCart.some(c => c._id === item._id);

                  return (
                    <div
                      key={item._id}
                      className={`relative bg-white border-2 p-5 rounded-[2rem] transition-all duration-300 group ${
                        hasInCart ? "border-orange-600 shadow-xl shadow-orange-900/5" : "border-orange-50 hover:border-orange-200"
                      }`}
                    >
                      <h4 className="font-black text-orange-950 text-sm uppercase tracking-tight mb-4 italic group-hover:text-orange-600">
                        {item.name}
                      </h4>

                      <div className="space-y-3">
                        {item.prices?.map((p) => {
                          const itemInCart = tableCart.find(
                            (c) => c._id === item._id && c.selectedPrice?._id === p._id
                          );
                          const quantity = itemInCart ? itemInCart.quantity : 0;

                          return (
                            <div key={p._id} className="pt-3 border-t border-orange-50 flex flex-col gap-3">
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded">
                                  {p.size || p.label || 'Standard'}
                                </span>
                                <span className="text-sm font-black text-orange-950">₹{p.price}</span>
                              </div>

                              {quantity === 0 ? (
                                <button
                                  onClick={() => handleAddItem(item, p)}
                                  className="w-full flex items-center justify-center gap-2 bg-white border border-orange-100 text-orange-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all active:scale-95"
                                >
                                  <Plus size={14} strokeWidth={3} /> Add Item
                                </button>
                              ) : (
                                <div className="flex justify-between items-center bg-black p-1 rounded-xl text-white">
                                  <button
                                    onClick={() => removeFromTableCart(item._id, p._id)}
                                    className="h-8 w-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                                  >
                                    <Minus size={14} strokeWidth={3} />
                                  </button>
                                  <span className="font-black text-xs">{quantity}</span>
                                  <button
                                    onClick={() => handleAddItem(item, p)}
                                    className="h-8 w-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                                  >
                                    <Plus size={14} strokeWidth={3} />
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;