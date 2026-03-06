import React, { useEffect, useState, useMemo } from "react";
import { Search, UtensilsCrossed, PlusCircle, MinusCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFullMenu } from "../../redux/features/menu/menu.thunk";

const Menu = ({ addToTableCart, removeFromTableCart, tableCart }) => {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => state.menu);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  /* ✅ Fetch menu same as MenuManagement */
  useEffect(() => {
    dispatch(fetchFullMenu());
  }, [dispatch]);

  /* ✅ Filtered Menu Logic */
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
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);
  }, [sections, searchTerm, activeCategory]);

  const handleAddItem = (item, price) => {
    // This is a simple pass-through to the parent's logic
    addToTableCart({
      ...item,
      selectedPrice: price,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <UtensilsCrossed className="w-10 h-10 animate-pulse text-purple-500" />
        <p className="ml-3 text-gray-600">Loading Menu...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  // inside Menu.jsx
return (
  <div className="bg-white h-full flex flex-col">
    <div className="p-6 bg-white border-b border-orange-100">
      <div className="relative group">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-orange-400 group-focus-within:text-orange-600 transition-colors" />
        <input
          type="text"
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-orange-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-600 outline-none font-medium transition-all"
        />
      </div>

      <div className="flex gap-2 mt-6 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
            activeCategory === "All" ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-orange-50 text-orange-900 hover:bg-orange-100"
          }`}
        >
          All Items
        </button>
        {sections.map((section) => (
          <button
            key={section._id}
            onClick={() => setActiveCategory(section.name)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeCategory === section.name ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-orange-50 text-orange-900 hover:bg-orange-100"
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>
    </div>

    <div className="p-6 overflow-y-auto flex-1 space-y-10 custom-scrollbar">
      {filteredSections.map((section) => (
        <div key={section._id}>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-orange-950 mb-6 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-orange-600"></span>
            {section.name}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div key={item._id} className="bg-white border border-orange-100 p-5 rounded-3xl hover:shadow-xl hover:shadow-orange-900/5 transition-all group">
                <h4 className="font-bold text-orange-950 text-lg group-hover:text-orange-600 transition-colors">{item.name}</h4>
                {item.prices?.map((p) => {
                  const itemInCart = tableCart.find(c => c.itemId === item._id && c.selectedPrice._id === p._id);
                  const quantity = itemInCart ? itemInCart.quantity : 0;
                  return (
                    <div key={p._id} className="mt-4 pt-4 border-t border-orange-50 flex flex-col gap-3">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-xs text-orange-400 uppercase tracking-tighter">{p.size}</span>
                        <span className="text-orange-900">₹{p.price}</span>
                      </div>
                      {quantity === 0 ? (
                        <button
                          onClick={() => handleAddItem(item, p)}
                          className="w-full flex items-center justify-center gap-2 bg-orange-50 text-orange-600 py-2.5 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-all active:scale-95"
                        >
                          <PlusCircle size={18} /> Add
                        </button>
                      ) : (
                        <div className="flex justify-between items-center bg-orange-600 p-1 rounded-xl text-white shadow-lg shadow-orange-600/30">
                          <button onClick={() => removeFromTableCart(item._id, p._id)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                            <MinusCircle size={20} />
                          </button>
                          <span className="font-black text-sm">{quantity}</span>
                          <button onClick={() => handleAddItem(item, p)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                            <PlusCircle size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Menu;
