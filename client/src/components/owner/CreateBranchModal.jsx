import { Plus, X } from "lucide-react";

export const CreateBranchModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Create Branch</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Branch Name"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Branch Code (e.g. THINKNORDER-BR3)"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Address"
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
