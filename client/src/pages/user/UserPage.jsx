import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFullMenu } from "../../redux/features/menu/menu.thunk";

const UserPage = () => {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => state.menu);
  const sectionRefs = useRef({});

  useEffect(() => {
    dispatch(fetchFullMenu());
  }, [dispatch]);

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div className="text-center py-20 text-xl">Loading delicious menu...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Menu</h1>
          
          {/* Category Quick Links */}
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {sections.map((section) => (
              <button
                key={section._id}
                onClick={() => scrollToSection(section._id)}
                className="whitespace-nowrap px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-medium text-sm hover:bg-orange-200 transition"
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {sections.map((section) => (
          <div 
            key={section._id} 
            ref={(el) => (sectionRefs.current[section._id] = el)}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-400 pb-2 mb-6">
              {section.name}
            </h2>

            <div className="grid gap-6">
              {section.items?.length > 0 ? (
                section.items.map((item) => (
                  <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-start border border-gray-100 hover:shadow-md transition">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        {/* Veg/Non-Veg Icon */}
                        <span className={`w-4 h-4 border-2 flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                          <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                        </span>
                        <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                        {item.description || "No description available."}
                      </p>
                      <p className="text-orange-600 font-bold text-lg">
                        ₹{item.prices?.[0]?.price}
                      </p>
                    </div>

                    {/* Image Placeholder or Actual Image */}
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded-lg bg-gray-200"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No items available in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;