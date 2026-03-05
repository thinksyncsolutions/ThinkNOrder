import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUserByManagerThunk,
  fetchUsersByBranchManagerThunk,
  updateUserByManagerThunk,
  deleteUserByManagerThunk,
} from "../../redux/features/user/user.thunk";
import { CreateStaffModal } from "../../components/manager/CreateStaffModal";
import { toast } from "react-hot-toast";
import { 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  Trash2, 
  Edit3, 
  UserCircle,
  MoreVertical 
} from "lucide-react";

const Staff = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersByBranchManagerThunk());
  }, [dispatch]);

  const handleCreateStaff = (staffData, id) => {
    const action = id 
      ? updateUserByManagerThunk({ id, data: staffData }) 
      : createUserByManagerThunk(staffData);

    dispatch(action)
      .unwrap()
      .then((data) => {
        toast.success(data.message || `Staff ${id ? "updated" : "created"}`);
        setShowModal(false);
        setEditUser(null);
        dispatch(fetchUsersByBranchManagerThunk());
      })
      .catch((err) => toast.error(err.message));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure? This staff member will lose system access.")) return;

    dispatch(deleteUserByManagerThunk(id))
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Access Revoked");
        dispatch(fetchUsersByBranchManagerThunk());
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading && !users.length) return (
    <div className="flex h-96 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Team <span className="text-orange-600">Directory</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Manage Staff Permissions & Access
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/10"
        >
          <UserPlus size={18} strokeWidth={3} />
          Add Staff Member
        </button>
      </div>

      {/* STAFF TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-50/50 border-b border-orange-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Employee</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Role & Access</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {!users || users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center opacity-20">
                      <UserCircle size={48} className="mb-2" />
                      <p className="font-black uppercase tracking-widest text-xs">No Staff Members Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-orange-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-black shadow-inner">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-black uppercase text-sm tracking-tight">{user.name}</p>
                          <div className="flex items-center gap-1.5 text-gray-400 mt-1">
                            <Mail size={12} />
                            <p className="text-[11px] font-medium tracking-tighter">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg ring-4 ring-orange-50 group-hover:bg-orange-600 transition-all">
                          {user.role}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="System Access Active" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end items-center gap-3">
                        <button
                          onClick={() => {
                            setEditUser(user);
                            setShowModal(true);
                          }}
                          className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all active:scale-95"
                        >
                          <Edit3 size={14} />
                          Modify
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                          title="Revoke Access"
                        >
                          <Trash2 size={20} />
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
          onClose={() => {
            setShowModal(false);
            setEditUser(null);
          }}
          onCreate={handleCreateStaff}
          editData={editUser}
        />
      )}
    </div>
  );
};

export default Staff;