import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const MenuItemModal = ({ initialData, onClose, onSubmit }) => {
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    name: "",
    prices: [{ label: "", price: "" }],
    image: "",
    description: "",
    preparationTime: "",
    isVeg: false,
    isAvailable: true,
  });

  // Sync edit data
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        prices:
          initialData.prices?.length > 0
            ? initialData.prices
            : [{ label: "", price: "" }],
        image: initialData.image || "",
        description: initialData.description || "",
        preparationTime: initialData.preparationTime || "",
        isVeg: initialData.isVeg || false,
        isAvailable: initialData.isAvailable ?? true,
      });
    }
  }, [initialData]);

  // Normal input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Price change
  const handlePriceChange = (index, field, value) => {
    const updatedPrices = [...form.prices];
    updatedPrices[index][field] = value;
    setForm((prev) => ({
      ...prev,
      prices: updatedPrices,
    }));
  };

  // Add new price row
  const addPrice = () => {
    setForm((prev) => ({
      ...prev,
      prices: [...prev.prices, { label: "", price: "" }],
    }));
  };

  // Remove price row
  const removePrice = (index) => {
    const updatedPrices = form.prices.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      prices: updatedPrices.length
        ? updatedPrices
        : [{ label: "", price: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Item name required");

    const payload = {
      ...form,
      prices: form.prices.map((p) => ({
        label: p.label || "default",
        price: Number(p.price),
      })),
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
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Item" : "Add New Item"}
        </h2>

        <div className="space-y-3">
          {/* Item Name */}
          <input
            name="name"
            placeholder="Item name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {/* Prices Section */}
          <div>
            <label className="text-sm font-semibold">Prices</label>

            {form.prices.map((priceObj, index) => (
              <div key={index} className="flex gap-2 mt-2 items-center">
                <input
                  placeholder="Label (half/full)"
                  value={priceObj.label}
                  onChange={(e) =>
                    handlePriceChange(index, "label", e.target.value)
                  }
                  className="flex-1 p-2 border rounded"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={priceObj.price}
                  onChange={(e) =>
                    handlePriceChange(index, "price", e.target.value)
                  }
                  className="w-24 p-2 border rounded"
                  required
                />

                {form.prices.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePrice(index)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addPrice}
              className="flex items-center gap-1 text-sm text-green-600 mt-2"
            >
              <Plus size={16} /> Add Price
            </button>
          </div>

          {/* Description */}
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Prep Time */}
          <input
            name="preparationTime"
            type="number"
            placeholder="Prep Time (min)"
            value={form.preparationTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Veg Toggle */}
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
            isEditing
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isEditing ? "Update Item" : "Create Item"}
        </button>
      </form>
    </div>
  );
};

export default MenuItemModal;