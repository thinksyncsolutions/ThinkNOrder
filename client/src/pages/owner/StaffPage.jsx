import { useEffect, useState } from "react";
import { Delete, Edit, Plus, Trash } from "lucide-react";
import { CreateStaffModal } from "../../components/owner/CreateStaffModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserThunk,
  fetchUsersThunk,
  updateUserThunk,
  deleteUserThunk,
} from "../../redux/features/user/user.thunk";
import { fetchBranchesThunk } from "../../redux/features/branch/branch.thunk";
import { toast } from "react-hot-toast";

const roles = ["ALL", "ADMIN", "MANAGER", "CASHIER", "WAITER", "KITCHEN"];

const StaffPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const branches = useSelector((state) => state.branch.branches);
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);


  // Filtered users based on branch & role
  const filteredUsers = users.filter((user) => {
    const branchMatch =
      selectedBranch === "ALL" ||
      user.accessibleBranches.includes(selectedBranch);
    const roleMatch = selectedRole === "ALL" || user.role === selectedRole;
    return branchMatch && roleMatch;
  });

  useEffect(() => {
    dispatch(fetchBranchesThunk())
      .unwrap()
      .catch((error) => {
        toast.error(error.message || "Failed to fetch branches");
      });
    dispatch(fetchUsersThunk())
      .unwrap()
      .catch((error) => {
        toast.error(error.message || "Failed to fetch users");
      });
  }, [dispatch]);

 const handleCreateStaff = (staffData, id) => {
  if (id) {
    // EDIT MODE
    dispatch(updateUserThunk({ id, data: staffData }))
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Staff updated");
        setShowModal(false);
        setEditUser(null);
        dispatch(fetchUsersThunk());
      })
      .catch((error) => toast.error(error.message));
  } else {
    // CREATE MODE
    dispatch(createUserThunk(staffData))
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Staff created");
        setShowModal(false);
        dispatch(fetchUsersThunk());
      })
      .catch((error) => toast.error(error.message));
  }
};

  const handleDelete = (id) => {
  if (!window.confirm("Delete this staff member?")) return;

  dispatch(deleteUserThunk(id))
    .unwrap()
    .then((data) => {
      toast.success(data.message || "Deleted");
      dispatch(fetchUsersThunk());
    })
    .catch((error) => toast.error(error.message));
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
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="ALL">All Branches</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.name}
            </option>
          ))}
        </select>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
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
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    {user.accessibleBranches?.length
                      ? user.accessibleBranches
                          .map(
                            (id) =>
                              branches.find((b) => b._id === id)?.name ||
                              "Unknown",
                          )
                          .join(", ")
                      : "—"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditUser(user);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={18} />
                    </button>
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
    onClose={() => {
      setShowModal(false);
      setEditUser(null);
    }}
    onCreate={handleCreateStaff}
    editData={editUser} // 👈 important
  />
)}

    </div>
  );
};

export default StaffPage;
