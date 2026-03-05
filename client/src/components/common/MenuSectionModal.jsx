import React, { useState, useEffect } from "react";
import { X, LayoutGrid, Image as ImageIcon, ListOrdered, CheckCircle2 } from "lucide-react";

const MenuSectionModal = ({ initialData, onClose, onSubmit }) => {
  const isEditing = !!initialData;

  const [form, setForm] = useState({
    name: "",
    image: "",
    order: 0,
    isActive: true,
  });

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
    if (!form.name.trim()) return;

    onSubmit({
      ...form,
      order: Number(form.order),
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-orange-100">
        
        {/* Header */}
        <div className="bg-orange-950 p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Menu Architecture
            </h2>
            <p className="text-2xl font-black italic uppercase tracking-tight">
              {isEditing ? "Edit Category" : "New Section"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-orange-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* SECTION NAME */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <LayoutGrid size={12} className="text-orange-600" /> Section Title
            </label>
            <input
              name="name"
              placeholder="e.g. Main Course, Beverages"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all placeholder:text-gray-300"
            />
          </div>

          {/* IMAGE URL */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <ImageIcon size={12} className="text-orange-600" /> Cover Image URL
            </label>
            <input
              name="image"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all placeholder:text-gray-300 text-sm"
            />
          </div>

          {/* DISPLAY ORDER */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <ListOrdered size={12} className="text-orange-600" /> Sort Priority
            </label>
            <input
              type="number"
              name="order"
              placeholder="0"
              value={form.order}
              onChange={handleChange}
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all"
            />
          </div>

          {/* ACTIVE STATUS SWITCH */}
          <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-2xl border border-transparent hover:border-orange-100 transition-all">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${form.isActive ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                <CheckCircle2 size={18} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-orange-950">Live on Menu</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="isActive" 
                checked={form.isActive} 
                onChange={handleChange} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-95"
            >
              {isEditing ? "Update Category" : "Establish Section"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-950 transition-colors"
            >
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuSectionModal;