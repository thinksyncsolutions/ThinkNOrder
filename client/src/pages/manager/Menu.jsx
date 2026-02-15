import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFullMenu,
  updateMenuSection,
  deleteMenuSection,
  updateMenuItem,
  deleteMenuItem,
} from "../../redux/features/menu/menu.thunk";

import EditSectionModal from "../../components/common/EditSectionModal";
import EditItemModal from "../../components/common/EditItemModal";

const Menu = () => {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => state.menu);

  console.log("Sections in Menu.jsx:", sections); // Debug log

  const [editSection, setEditSection] = useState(null);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    dispatch(fetchFullMenu());
  }, [dispatch]);

  const handleUpdateSection = async (data) => {
    const res = await dispatch(
      updateMenuSection({ sectionId: editSection._id, data })
    );
    if (!res.error) {
      setEditSection(null);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm("Delete this section?")) return;
    const res = await dispatch(deleteMenuSection(sectionId));
    if (!res.error) dispatch(fetchFullMenu());
  };

  const handleUpdateItem = async (data) => {
    const res = await dispatch(
      updateMenuItem({ itemId: editItem._id, itemData: data })
    );
    if (!res.error) {
      dispatch(fetchFullMenu());
      setEditItem(null);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Delete this item?")) return;
    const res = await dispatch(deleteMenuItem(itemId));
    if (!res.error) dispatch(fetchFullMenu());
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>

      {loading && <p className="text-gray-500">Loading menu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {editSection && (
        <EditSectionModal
          section={editSection}
          onClose={() => setEditSection(null)}
          onSave={handleUpdateSection}
        />
      )}

      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleUpdateItem}
        />
      )}

      {sections.map((section) => (
        <div
          key={section._id}
          className="mb-8 border rounded-xl p-4 shadow-sm bg-white"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">{section.name}</h2>

            <div className="space-x-2">
              <button
                onClick={() => setEditSection(section)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteSection(section._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>

          <ul className="space-y-2">
            {section.items?.length > 0 ? (
              section.items.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded"
                >
                  <span>
                    {item.name} — ₹{item.prices?.[0]?.price}
                  </span>

                  <div className="space-x-2">
                    <button
                      onClick={() => setEditItem(item)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No items</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Menu;
