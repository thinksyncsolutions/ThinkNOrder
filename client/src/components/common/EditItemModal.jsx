import React, { useState } from "react";

const EditItemModal = ({ item, onClose, onSave }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.prices?.[0]?.price || 0);

  const submit = (e) => {
    e.preventDefault();
    onSave({
      name,
      prices: [{ price: Number(price) }],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white rounded-xl p-6 w-96 shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Edit Item</h3>

        <input
          className="w-full border rounded px-3 py-2 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />

        <input
          type="number"
          className="w-full border rounded px-3 py-2 mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItemModal;
