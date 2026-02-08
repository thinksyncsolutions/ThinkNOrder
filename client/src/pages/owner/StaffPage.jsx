import { useState } from "react";
import { Plus } from "lucide-react";
import { CreateStaffModal } from "../../components/owner/CreateStaffModal";

// Mock branches
const mockBranches = [
  { _id: "1", name: "Main Branch" },
  { _id: "2", name: "Indiranagar" },
];

// Mock users
const mockUsers = [
  { _id: "u1", name: "Rohit Sharma", email: "rohit@thinknorder.com", role: "MANAGER", accessibleBranches: ["1"], isActive: true },
  { _id: "u2", name: "Amit Verma", email: "amit@thinknorder.com", role: "CASHIER", accessibleBranches: ["1"], isActive: true },
  { _id: "u3", name: "Neha Singh", email: "neha@thinknorder.com", role: "WAITER", accessibleBranches: ["2"], isActive: false },
  { _id: "u4", name: "Karan Patel", email: "karan@thinknorder.com", role: "KITCHEN", accessibleBranches: ["2"], isActive: true },
];

const roles = ["ALL", "ADMIN", "MANAGER", "CASHIER", "WAITER", "KITCHEN"];

const StaffPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [showModal, setShowModal] = useState(false);

  // Filtered users based on branch & role
  const filteredUsers = users.filter(user => {
    const branchMatch = selectedBranch === "ALL" || user.accessibleBranches.includes(selectedBranch);
    const roleMatch = selectedRole === "ALL" || user.role === selectedRole;
    return branchMatch && roleMatch;
  });

  const handleCreateStaff = (newStaff) => {
    setUsers(prev => [...prev, newStaff]);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded"
        >
          <Plus size={16} /> Add Staff
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedBranch}
          onChange={e => setSelectedBranch(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="ALL">All Branches</option>
          {mockBranches.map(branch => (
            <option key={branch._id} value={branch._id}>{branch.name}</option>
          ))}
        </select>

        <select
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredUsers.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No staff found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Branch</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="border-t">
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    {user.accessibleBranches
                      .map(id => mockBranches.find(b => b._id === id)?.name)
                      .join(", ")}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded ${
                      user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Staff Modal */}
      {showModal && (
        <CreateStaffModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateStaff}
        />
      )}
    </div>
  );
};

export default StaffPage;
