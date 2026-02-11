import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchesThunk } from "../../redux/features/branch/branch.thunk";

const roles = ["ADMIN", "MANAGER", "CASHIER", "WAITER", "KITCHEN"];

export const CreateStaffModal = ({ onClose, onCreate, editData }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [branchIds, setBranchIds] = useState([]);

  // ✅ Prefill when editing
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setEmail(editData.email);
      setRole(editData.role);
      setBranchIds(editData.accessibleBranches || []);
    }
  }, [editData]);

  // Reset branches only when creating new + role changes
  useEffect(() => {
    if (!editData) setBranchIds([]);
  }, [role, editData]);

  // Fetch branches if empty
  useEffect(() => {
    if (branches.length === 0) {
      dispatch(fetchBranchesThunk()).catch(() => {});
    }
  }, [dispatch, branches.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const staffData = {
      name,
      email,
      role,
      branchIds,
      isActive: true,
    };

    onCreate(staffData, editData?._id); // 👈 id only in edit mode
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {editData ? "Edit Staff" : "Create Staff"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
              disabled={!!editData} // optional: prevent email change
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>

            {role === "MANAGER" ? (
              <select
                multiple
                value={branchIds}
                onChange={(e) => {
                  const selected = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value,
                  );
                  setBranchIds(selected);
                }}
                className="w-full border rounded px-3 py-2 text-sm h-28"
              >
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={branchIds[0] || ""}
                onChange={(e) => setBranchIds([e.target.value])}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-slate-900 text-white"
            >
              {editData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
