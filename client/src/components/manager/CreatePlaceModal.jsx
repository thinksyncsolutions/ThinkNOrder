import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaceThunk } from "../../redux/features/place/place.thunk";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        
        <h2 className="text-xl font-semibold mb-4">Create Place</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* TYPE SELECT */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            name="number"
            placeholder="Number"
            value={form.number}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

            {/* FLOOR SELECT */}
            <select
            name="floor"
            value={form.floor}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </select>

            <input 
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          


          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaceModal;
