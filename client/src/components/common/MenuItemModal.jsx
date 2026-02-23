import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const MenuItemModal = ({ initialData, onClose, onSubmit }) => {
  // Check if we are editing or creating
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    preparationTime: "",
    isVeg: false,
    isAvailable: true,
  });

  // Sync form state if initialData changes (useful for editing)
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        price: initialData.prices?.[0]?.price || "",
        image: initialData.image || "",
        description: initialData.description || "",
        preparationTime: initialData.preparationTime || "",
        isVeg: initialData.isVeg || false,
        isAvailable: initialData.isAvailable ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Item name required");

    const payload = {
      ...form,
      prices: [{ label: "default", price: Number(form.price) }],
      preparationTime: Number(form.preparationTime),
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-xl w-full max-w-md relative shadow-xl"
      >
        <button type="button" onClick={onClose} className="absolute right-3 top-3">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Item" : "Add New Item"}
        </h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Item name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="preparationTime"
            type="number"
            placeholder="Prep Time (min)"
            value={form.preparationTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          
          <label className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              name="isVeg"
              checked={form.isVeg}
              onChange={handleChange}
            />
            <span className="text-sm font-medium">Veg Item</span>
          </label>
        </div>

        <button
          type="submit"
          className={`w-full mt-4 py-2 rounded text-white font-bold ${
            isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isEditing ? "Update Item" : "Create Item"}
        </button>
      </form>
    </div>
  );
};

export default MenuItemModal;