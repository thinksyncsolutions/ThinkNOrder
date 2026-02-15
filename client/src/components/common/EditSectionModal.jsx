import React, { useState } from "react";

const EditSectionModal = ({ section, onClose, onSave }) => {
  const [name, setName] = useState(section.name);
  const [order, setOrder] = useState(section.order || 0);

  const submit = (e) => {
    e.preventDefault();
    onSave({ name, order });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white rounded-xl p-6 w-96 shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Edit Section</h3>

        <input
          className="w-full border rounded px-3 py-2 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Section name"
        />

        <input
          type="number"
          className="w-full border rounded px-3 py-2 mb-4"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="Order"
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

export default EditSectionModal;
