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
import PageHeader from "../../components/common/PageHeader";

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
      <PageHeader 
        title="Team"
        highlight="Directory"
        subtitle="Manage Staff Permissions & Access"
        buttonText="Add Staff Member"
        buttonIcon={UserPlus}
        onButtonClick={() => setShowModal(true)}
      />

      {/* STAFF TABLE */}
      {!users || users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-orange-200 rounded-[3rem] bg-orange-50/30 animate-in fade-in zoom-in duration-500">
          <div className="h-24 w-24 bg-white text-orange-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-orange-950/5 border border-orange-100">
            <UserCircle size={44} strokeWidth={1.5} />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-black uppercase italic tracking-tight">
              Squad <span className="text-orange-600">Offline</span>
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] max-w-xs mx-auto">
              No staff members have been onboarded to this branch yet.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-10 flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-2xl shadow-orange-950/20 active:scale-95"
          >
            <UserPlus size={20} strokeWidth={3} />
            Onboard First Member
          </button>
        </div>
      ) : (
        /* ACTUAL TABLE */
        <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-sm overflow-hidden shadow-xl shadow-orange-950/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-50/50 border-b border-orange-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950 text-center w-24">Initial</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Employee Detail</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Role & Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-orange-50/30 transition-colors group">
                    <td className="px-8 py-6">
                       <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                          {user.name.charAt(0).toUpperCase()}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-black text-black uppercase text-base tracking-tight italic">{user.name}</p>
                        <div className="flex items-center gap-1.5 text-gray-400 mt-0.5">
                          <Mail size={12} strokeWidth={3} className="text-orange-400" />
                          <p className="text-[11px] font-bold tracking-widest uppercase">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <span className="w-fit px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-[0.15em] rounded-lg">
                          {user.role}
                        </span>
                        <div className="flex items-center gap-2">
                           <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Access</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => {
                            setEditUser(user);
                            setShowModal(true);
                          }}
                          className="p-3 bg-white border border-orange-100 text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all shadow-sm active:scale-90"
                        >
                          <Edit3 size={16} strokeWidth={3} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-3 bg-white border border-red-50 text-gray-300 hover:text-red-600 hover:border-red-100 rounded-xl transition-all active:scale-90"
                        >
                          <Trash2 size={16} strokeWidth={3} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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