import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const CreateMenuItemModal = ({ isOpen, onClose, onSubmit, sections }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    sectionId: "",
    isVeg: false,
    isAvailable: true,
    preparationTime: 10
  });

  const [prices, setPrices] = useState([{ label: "", price: "" }]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handlePriceChange = (index, field, value) => {
    const updated = [...prices];
    updated[index][field] = value;
    setPrices(updated);
  };

  const addPriceField = () => {
    setPrices([...prices, { label: "", price: "" }]);
  };

  const removePriceField = (index) => {
    const updated = prices.filter((_, i) => i !== index);
    setPrices(updated);
  };

  const handleSubmit = () => {
    if (!form.name || !form.sectionId) {
      return alert("Name and Section are required");
    }

    onSubmit({ ...form, prices });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative overflow-y-auto max-h-[90vh]">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-5">Create Menu Item</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm font-medium">Item Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        {/* Section */}
        <div className="mb-4">
          <label className="text-sm font-medium">Section</label>
          <select
            name="sectionId"
            value={form.sectionId}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          >
            <option value="">Select Section</option>
            {sections?.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="text-sm font-medium">Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        {/* Prices */}
        <div className="mb-4">
          <label className="text-sm font-medium">Prices</label>
          {prices.map((p, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input
                placeholder="Size (Half/Full)"
                value={p.label}
                onChange={(e) => handlePriceChange(i, "label", e.target.value)}
                className="flex-1 p-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Price"
                value={p.price}
                onChange={(e) => handlePriceChange(i, "price", e.target.value)}
                className="flex-1 p-2 border rounded-lg"
              />
              {prices.length > 1 && (
                <button
                  onClick={() => removePriceField(i)}
                  className="text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addPriceField}
            className="flex items-center gap-1 text-sm text-blue-600 mt-2"
          >
            <Plus size={16} /> Add Price Option
          </button>
        </div>

        {/* Veg + Availability */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isVeg"
              checked={form.isVeg}
              onChange={handleChange}
            />
            Veg
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>
        </div>

        {/* Prep Time */}
        <div className="mb-6">
          <label className="text-sm font-medium">Preparation Time (mins)</label>
          <input
            type="number"
            name="preparationTime"
            value={form.preparationTime}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg"
          >
            Create Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMenuItemModal;
