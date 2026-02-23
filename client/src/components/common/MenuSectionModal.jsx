import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const MenuSectionModal = ({ initialData, onClose, onSubmit }) => {
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    name: "",
    image: "",
    order: 0,
    isActive: true,
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        image: initialData.image || "",
        order: initialData.order || 0,
        isActive: initialData.isActive ?? true,
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
    if (!form.name.trim()) return alert("Section name required");

    onSubmit({
      ...form,
      order: Number(form.order),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-5">
          {isEditing ? "Edit Section" : "Create Menu Section"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium">Section Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Eg. Starters"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Paste image link"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Display Order</label>
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <label htmlFor="isActive" className="text-sm">
              Section is Active
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                isEditing ? "bg-blue-600" : "bg-black"
              } hover:opacity-90`}
            >
              {isEditing ? "Save Changes" : "Create Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuSectionModal;