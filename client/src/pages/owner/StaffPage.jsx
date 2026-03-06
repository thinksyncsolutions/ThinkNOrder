import React, { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Users as UsersIcon, Filter, Shield, Building2 } from "lucide-react";
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

  const filteredUsers = users.filter((user) => {
    const branchMatch = selectedBranch === "ALL" || user.accessibleBranches.includes(selectedBranch);
    const roleMatch = selectedRole === "ALL" || user.role === selectedRole;
    return branchMatch && roleMatch;
  });

  useEffect(() => {
    dispatch(fetchBranchesThunk()).unwrap().catch((err) => toast.error(err.message));
    dispatch(fetchUsersThunk()).unwrap().catch((err) => toast.error(err.message));
  }, [dispatch]);

  const handleCreateStaff = (staffData, id) => {
    const action = id ? updateUserThunk({ id, data: staffData }) : createUserThunk(staffData);
    dispatch(action)
      .unwrap()
      .then((data) => {
        toast.success(data.message || `Staff ${id ? "updated" : "added"}`);
        setShowModal(false);
        setEditUser(null);
        dispatch(fetchUsersThunk());
      })
      .catch((error) => toast.error(error.message));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Permanent Action: Revoke system access for this member?")) return;
    dispatch(deleteUserThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Personnel Removed");
        dispatch(fetchUsersThunk());
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Personnel <span className="text-orange-600">Registry</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Global Workforce Access Management
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/10"
        >
          <Plus size={18} strokeWidth={3} /> Add New Personnel
        </button>
      </div>

      {/* FILTERS BAR */}
      <div className="flex flex-wrap items-center gap-4 bg-orange-50/50 p-4 rounded-[1.5rem] border border-orange-100">
        <div className="flex items-center gap-2 px-3 text-orange-600">
          <Filter size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Filters:</span>
        </div>
        
        <div className="relative">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="appearance-none bg-white border-2 border-transparent focus:border-orange-600 rounded-xl px-4 py-2 pr-10 text-xs font-bold text-orange-950 outline-none transition-all shadow-sm"
          >
            <option value="ALL">Global (All Branches)</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
          <Building2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="appearance-none bg-white border-2 border-transparent focus:border-orange-600 rounded-xl px-4 py-2 pr-10 text-xs font-bold text-orange-950 outline-none transition-all shadow-sm"
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role} Access</option>
            ))}
          </select>
          <Shield size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" />
        </div>
      </div>

      {/* STAFF TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-sm overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-950 text-white">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 border-b border-orange-900">Member</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 border-b border-orange-900">Clearance</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 border-b border-orange-900">Assigned Sectors</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 border-b border-orange-900 text-center">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 border-b border-orange-900 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center opacity-20">
                    <UsersIcon size={48} className="mx-auto mb-2" />
                    <p className="font-black uppercase tracking-widest text-xs">No personnel found in registry</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-orange-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xs group-hover:bg-orange-600 group-hover:text-white transition-all">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-black uppercase text-sm tracking-tight leading-none">{user.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-tighter">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-100">
                         {user.role}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {user.accessibleBranches?.length ? (
                          user.accessibleBranches.map((id) => (
                            <span key={id} className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter">
                              {branches.find((b) => b._id === id)?.name || "—"}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-300 text-[10px] italic">No branches assigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                          ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                        `}>
                          <div className={`h-1.5 w-1.5 rounded-full ${user.isActive ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`} />
                          {user.isActive ? "Authorized" : "Revoked"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => { setEditUser(user); setShowModal(true); }}
                          className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <CreateStaffModal
          onClose={() => { setShowModal(false); setEditUser(null); }}
          onCreate={handleCreateStaff}
          editData={editUser}
        />
      )}
    </div>
  );
};

export default StaffPage;