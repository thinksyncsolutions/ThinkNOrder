import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Utensils, IndianRupee, Clock, FileText, Leaf, Eye, EyeOff, Image as ImageIcon } from "lucide-react";

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

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        prices: initialData.prices?.length > 0 ? initialData.prices : [{ label: "", price: "" }],
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

  const handlePriceChange = (index, field, value) => {
    const updatedPrices = [...form.prices];
    updatedPrices[index][field] = value;
    setForm((prev) => ({ ...prev, prices: updatedPrices }));
  };

  const addPrice = () => {
    setForm((prev) => ({
      ...prev,
      prices: [...prev.prices, { label: "", price: "" }],
    }));
  };

  const removePrice = (index) => {
    const updatedPrices = form.prices.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      prices: updatedPrices.length ? updatedPrices : [{ label: "", price: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-orange-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-orange-950 p-8 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Menu Master</h2>
            <p className="text-2xl font-black italic uppercase tracking-tight">
              {isEditing ? "Modify Dish" : "New Recipe"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-orange-200">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* 🔥 NEW: IMAGE URL & PREVIEW SECTION */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <ImageIcon size={12} className="text-orange-600" /> Dish Display Image
            </label>
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border-2 border-dashed border-orange-200 flex items-center justify-center overflow-hidden shrink-0">
                {form.image ? (
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={24} className="text-orange-200" />
                )}
              </div>
              <input
                name="image"
                placeholder="Paste Image URL here..."
                value={form.image}
                onChange={handleChange}
                className="flex-1 bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all text-sm"
              />
            </div>
          </div>

          {/* Dish Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Utensils size={12} className="text-orange-600" /> Dish Title
            </label>
            <input
              name="name"
              placeholder="e.g. Butter Chicken"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all"
            />
          </div>

          {/* Dynamic Prices Section */}
          <div className="space-y-3 p-5 bg-orange-50/30 rounded-3xl border border-orange-100">
            <label className="text-[10px] font-black uppercase tracking-widest text-orange-950 flex items-center gap-2">
              <IndianRupee size={12} className="text-orange-600" /> Pricing Options
            </label>

            {form.prices.map((priceObj, index) => (
              <div key={index} className="flex gap-2 items-center animate-in slide-in-from-left-2 duration-200">
                <input
                  placeholder="Portion (Full/Half)"
                  value={priceObj.label}
                  onChange={(e) => handlePriceChange(index, "label", e.target.value)}
                  className="flex-1 bg-white border border-orange-100 rounded-xl px-4 py-2 text-sm font-bold text-orange-950 focus:border-orange-600 outline-none"
                />
                <input
                  type="number"
                  placeholder="₹"
                  value={priceObj.price}
                  onChange={(e) => handlePriceChange(index, "price", e.target.value)}
                  className="w-24 bg-white border border-orange-100 rounded-xl px-4 py-2 text-sm font-black text-orange-600 focus:border-orange-600 outline-none"
                  required
                />
                {form.prices.length > 1 && (
                  <button type="button" onClick={() => removePrice(index)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addPrice}
              className="flex items-center gap-2 text-[10px] font-black uppercase text-orange-600 hover:text-orange-700 pt-2 transition-colors"
            >
              <Plus size={14} strokeWidth={3} /> Add Variation
            </button>
          </div>

          {/* Description & Prep Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <FileText size={12} className="text-orange-600" /> Description
              </label>
              <input
                name="description"
                placeholder="Brief details..."
                value={form.description}
                onChange={handleChange}
                className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Clock size={12} className="text-orange-600" /> Wait Time (Min)
              </label>
              <input
                name="preparationTime"
                type="number"
                placeholder="15"
                value={form.preparationTime}
                onChange={handleChange}
                className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all text-sm"
              />
            </div>
          </div>

          {/* Toggles Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Veg Toggle */}
            <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-2xl border border-transparent hover:border-orange-100 transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${form.isVeg ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Leaf size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-950">Veg Only</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isVeg" checked={form.isVeg} onChange={handleChange} className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-2xl border border-transparent hover:border-orange-100 transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${form.isAvailable ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                  {form.isAvailable ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-950">In Stock</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col gap-3 pt-4 shrink-0">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-95"
            >
              {isEditing ? "Save Changes" : "Publish to Menu"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-950 transition-colors"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemModal;