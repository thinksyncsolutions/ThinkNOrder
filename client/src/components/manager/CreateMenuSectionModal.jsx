import React, { useState } from "react";
import { X } from "lucide-react";

const CreateMenuSectionModal = ({ onClose, onSubmit, branches }) => {

  const [form, setForm] = useState({
    name: "",
    image: "",
    branchId: "",
    order: 0,
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {
  if (!form.name.trim()) return alert("Section name required");

  onSubmit({
    ...form,
    order: Number(form.order), // ensure number
  });
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-5">Create Menu Section</h2>

        {/* Section Name */}
        <div className="mb-4">
          <label className="text-sm font-medium">Section Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Eg. Starters"
          />
        </div>

        {/* Image URL */}
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

        {/* Branch Selector */}
        <div className="mb-4">
          <label className="text-sm font-medium">Branch</label>
          <select
            name="branchId"
            value={form.branchId}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
          >
            <option value="">All Branches</option>
            {branches?.map(b => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Order */}
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

        {/* Active Toggle */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          <label className="text-sm">Section is Active</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
          >
            Create Section
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMenuSectionModal;
