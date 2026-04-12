import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createMenuSections,
  createMenuItem,
  fetchFullMenu,
  updateMenuSection,
  deleteMenuSection,
  updateMenuItem,
  deleteMenuItem,
} from "../../redux/features/menu/menu.thunk";

import MenuSectionModal from "../../components/common/MenuSectionModal";
import MenuItemModal from "../../components/common/MenuItemModal";
import {
  Pencil,
  Plus,
  Trash2,
  Utensils,
  LayoutGrid,
  ChevronRight,
} from "lucide-react";
import PageHeader from "../../components/common/PageHeader";

const MenuManagement = () => {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => state.menu);

  const [showCreateSection, setShowCreateSection] = useState(false);
  const [createItemSection, setCreateItemSection] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    dispatch(fetchFullMenu());
  }, [dispatch]);

  const handleCreateSection = async (data) => {
    const res = await dispatch(createMenuSections(data));
    if (!res.error) setShowCreateSection(false);
  };

  const handleUpdateSection = async (data) => {
    const res = await dispatch(
      updateMenuSection({ sectionId: editSection._id, data }),
    );

    if (!res.error) {
      setEditSection(null);
    }
  };

  const handleCreateItem = async (data) => {
    const res = await dispatch(
      createMenuItem({ sectionId: createItemSection._id, data }),
    );
    if (!res.error) setCreateItemSection(null);
  };

  const handleUpdateItem = async (data) => {
    const res = await dispatch(
      updateMenuItem({ itemId: editItem._id, itemData: data }),
    );

    if (!res.error) {
      dispatch(fetchFullMenu());

      setEditItem(null);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm("Permanent Action: Delete this entire category?"))
      return;
    const res = await dispatch(deleteMenuSection(sectionId));
    if (!res.error) dispatch(fetchFullMenu());
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Remove this item from the menu?")) return;
    const res = await dispatch(deleteMenuItem(itemId));
    if (!res.error) dispatch(fetchFullMenu());
  };

  if (error)
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 font-bold rounded-r-xl uppercase text-xs">
        Error: {error?.message}
      </div>
    );

  if (loading && !sections.length)
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <PageHeader 
  title="Menu"
  highlight="Master"
  subtitle="Build and Organize Your Offerings"
  buttonText="Create New Section"
  buttonIcon={LayoutGrid}
  onButtonClick={() => setShowCreateSection(true)}
/>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 font-bold rounded-r-xl uppercase text-xs">
          Error: {error}
        </div>
      )}

      {/* SECTIONS GRID */}
      {sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-18 px-4 border-2 border-dashed border-orange-200 rounded-[3rem] bg-orange-50/30">
          <div className="h-20 w-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
            <Utensils size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-black text-orange-950 uppercase italic">No Menu Found</h3>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2 mb-8 text-center">
            Your digital menu hasn't been configured yet.
          </p>
          <button
            onClick={() => setShowCreateSection(true)}
            className="flex items-center gap-3 bg-orange-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black transition-all shadow-2xl shadow-orange-600/20 active:scale-95"
          >
            <Plus size={20} strokeWidth={3} />
            Create Your First Section
          </button>
        </div>
      ) : (
      <div className="grid gap-8">
        {sections.map((section) => (
          <div
            key={section._id}
            className="group bg-white rounded-[2.5rem] border border-orange-100 shadow-sm hover:shadow-xl hover:shadow-orange-950/5 transition-all overflow-hidden"
          >
            {/* SECTION HEADER */}
            <div className="bg-orange-50/50 px-8 py-6 flex justify-between items-center border-b border-orange-100">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg">
                  <Utensils size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-orange-950 uppercase tracking-tight italic">
                    {section.name}
                  </h2>
                  <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em]">
                    {section.items?.length || 0} Items Available
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCreateItemSection(section)}
                  className="flex items-center gap-2 bg-white text-orange-600 border border-orange-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  <Plus size={14} strokeWidth={4} /> Add Item
                </button>
                <button
                  onClick={() => setEditSection(section)}
                  className="p-2.5 text-gray-400 hover:text-black transition-colors"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDeleteSection(section._id)}
                  className="p-2.5 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* ITEMS LIST */}
            <div className="p-4 bg-white">
              <div className="grid gap-2">
                {section.items?.length > 0 ? (
                  section.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50/30 transition-all border border-transparent hover:border-orange-100 group/item"
                    >
                      <div className="flex items-center gap-4">
                        <ChevronRight
                          size={14}
                          className="text-orange-300 group-hover/item:translate-x-1 transition-transform"
                        />
                        <div>
                          <p className="font-black text-orange-950 uppercase text-sm tracking-tight">
                            {item.name}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.prices?.map((p, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md"
                              >
                                {p.label && p.label !== "default"
                                  ? `${p.label}: `
                                  : ""}
                                <span className="text-orange-600 font-black">
                                  ₹{p.price}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-100 hover:text-orange-600 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-100 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center opacity-20">
                    <p className="font-black uppercase tracking-widest text-[10px]">
                      Empty Section
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* MODALS */}
      {(showCreateSection || editSection) && (
        <MenuSectionModal
          initialData={editSection}
          onClose={() => {
            setShowCreateSection(false);
            setEditSection(null);
          }}
          onSubmit={editSection ? handleUpdateSection : handleCreateSection}
        />
      )}

      {(createItemSection || editItem) && (
        <MenuItemModal
          initialData={editItem}
          onClose={() => {
            setCreateItemSection(null);
            setEditItem(null);
          }}
          onSubmit={editItem ? handleUpdateItem : handleCreateItem}
        />
      )}
    </div>
  );
};

export default MenuManagement;
