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
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="bg-gray-50 h-full flex flex-col">

      {/* Header */}
      <div className="p-4 bg-white shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Table Menu
        </h2>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-1 rounded ${
              activeCategory === "All"
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
          >
            All
          </button>

          {sections.map((section) => (
            <button
              key={section._id}
              onClick={() => setActiveCategory(section.name)}
              className={`px-4 py-1 rounded whitespace-nowrap ${
                activeCategory === section.name
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-6 overflow-y-auto flex-1 space-y-8">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <div key={section._id}>
              <h3 className="text-xl font-bold mb-4 text-purple-700">
                {section.name}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {section.items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-4 rounded shadow"
                  >
                    <h4 className="font-semibold mb-2">
                      {item.name}
                    </h4>

                    {item.prices?.map((p) => {
                      const itemInCart = tableCart.find(
                        (cartItem) =>
                          cartItem.itemId === item._id &&
                          cartItem.selectedPrice._id === p._id
                      );

                      const quantity = itemInCart
                        ? itemInCart.quantity
                        : 0;

                      return (
                        <div key={p._id} className="mt-2 border-t pt-2">
                          <div className="flex justify-between">
                            <span>{p.size}</span>
                            <span className="font-bold">
                              ₹ {p.price}
                            </span>
                          </div>

                          {quantity === 0 ? (
                            <button
                              onClick={() =>
                                handleAddItem(item, p)
                              }
                              className="mt-2 w-full bg-purple-500 text-white py-1 rounded"
                            >
                              Add
                            </button>
                          ) : (
                            <div className="flex justify-center items-center gap-3 mt-2">
                              <button
                                onClick={() =>
                                  removeFromTableCart(
                                    item._id,
                                    p._id
                                  )
                                }
                              >
                                <MinusCircle size={20} />
                              </button>

                              <span>{quantity}</span>

                              <button
                                onClick={() =>
                                  handleAddItem(item, p)
                                }
                              >
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
          ))
        ) : (
          <p className="text-center text-gray-500">
            No items found
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;