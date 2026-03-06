import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaceThunk } from "../../redux/features/place/place.thunk";
import { X, MapPin, Hash, Users, Layers } from "lucide-react";

const CreatePlaceModal = ({ isOpen, onClose, types = [], floors = [] }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    type: types[0] || "",
    number: "",
    floor: floors[0] || "",
    capacity: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlaceThunk(form));
    onClose();

    setForm({
      type: types[0] || "",
      number: "",
      floor: floors[0] || "",
      capacity: "",
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
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Add New</h2>
            <p className="text-2xl font-black italic uppercase tracking-tight">Location</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-orange-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* TYPE SELECT */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <MapPin size={12} className="text-orange-600" /> Place Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all appearance-none"
            >
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* NUMBER INPUT */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Hash size={12} className="text-orange-600" /> Number
              </label>
              <input
                name="number"
                type="text"
                placeholder="Ex: 10"
                value={form.number}
                onChange={handleChange}
                required
                className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 placeholder:text-gray-300 transition-all"
              />
            </div>

            {/* CAPACITY INPUT */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Users size={12} className="text-orange-600" /> Capacity
              </label>
              <input 
                name="capacity"
                type="number"
                placeholder="Pax"
                value={form.capacity}
                onChange={handleChange}
                required
                className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 placeholder:text-gray-300 transition-all"
              />
            </div>
          </div>

          {/* FLOOR SELECT */}
          <div className="space-y-1.5 pb-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Layers size={12} className="text-orange-600" /> Floor Level
            </label>
            <select
              name="floor"
              value={form.floor}
              onChange={handleChange}
              required
              className="w-full bg-orange-50/50 border-2 border-transparent focus:border-orange-600 rounded-2xl px-4 py-3 outline-none font-bold text-orange-950 transition-all appearance-none"
            >
              {floors.map((floor) => (
                <option key={floor} value={floor}>{floor}</option>
              ))}
            </select>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition-all active:scale-95"
            >
              Confirm & Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-950 transition-colors"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaceModal;