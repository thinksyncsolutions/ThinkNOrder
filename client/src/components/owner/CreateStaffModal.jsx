import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranchesThunk } from "../../redux/features/branch/branch.thunk";

const roles = ["ADMIN", "MANAGER", "CASHIER", "WAITER", "KITCHEN"];

export const CreateStaffModal = ({ onClose, onCreate }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [branchId, setBranchId] = useState(branches.length > 0 ? branches[0]._id : "");

  useEffect(() => {
    if (branches.length === 0) {
      dispatch(fetchBranchesThunk())
        .unwrap()
        .catch((error) => {
          console.error("Failed to fetch branches:", error);
        });
    }
  }, [dispatch, branches.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStaff = {
      _id: Date.now().toString(),
      name,
      email,
      role,
      branchIds: [branchId],
      isActive: true,
    };

    onCreate(newStaff); // send back to parent
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <button
          className="absolute top-3 right-3"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Create Staff</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              value={branchId}
              onChange={e => setBranchId(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              {branches.map(b => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
