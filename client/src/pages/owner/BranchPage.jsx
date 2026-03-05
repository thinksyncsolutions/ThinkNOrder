import React, { useEffect, useState } from "react";
import { Plus, Store, Users as UsersIcon, MapPin, Hash, CheckCircle2, ChevronRight, Globe } from "lucide-react";
import { CreateBranchModal } from "../../components/owner/CreateBranchModal";
import { useDispatch, useSelector } from "react-redux";
import { createBranchThunk, fetchBranchesThunk } from "../../redux/features/branch/branch.thunk";
import { fetchUsersByBranchThunk } from "../../redux/features/user/user.thunk";
import { toast } from "react-hot-toast";

const BranchPage = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const branchUsers = useSelector((state) => state.users.users);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    dispatch(fetchBranchesThunk())
      .unwrap()
      .catch((error) => toast.error(error.message || "Network Error"));
    
    if (selectedBranch) {
      dispatch(fetchUsersByBranchThunk(selectedBranch._id))
        .unwrap()
        .catch((error) => toast.error("User Sync Failed"));
    }
  }, [dispatch, selectedBranch]);

  const handleCreateBranch = (branchData) => {
    dispatch(createBranchThunk(branchData))
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Expansion Successful");
        setShowModal(false);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Branch <span className="text-orange-600">Network</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Global Infrastructure Management
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/10"
        >
          <Plus size={18} strokeWidth={3} /> Launch New Branch
        </button>
      </div>

      {/* BRANCH LIST TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-sm overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-50/50 border-b border-orange-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Location ID</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Branch Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">City</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {branches.map((branch) => (
                <tr
                  key={branch._id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`cursor-pointer transition-all duration-300 group
                    ${selectedBranch?._id === branch._id ? "bg-orange-600 text-white" : "hover:bg-orange-50/50 text-gray-600"}
                  `}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Hash size={14} className={selectedBranch?._id === branch._id ? "text-orange-200" : "text-orange-600"} />
                      <span className="font-mono font-bold tracking-widest text-xs uppercase">{branch.branchCode}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center
                        ${selectedBranch?._id === branch._id ? "bg-white/20" : "bg-orange-100 text-orange-600"}
                      `}>
                        <Store size={20} />
                      </div>
                      <div>
                        <p className={`font-black uppercase text-sm tracking-tight ${selectedBranch?._id === branch._id ? "text-white" : "text-orange-950"}`}>
                          {branch.name}
                        </p>
                        <p className={`text-[10px] font-bold uppercase tracking-tighter opacity-70`}>{branch.address.slice(0, 30)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase italic tracking-widest">
                      <MapPin size={14} className="opacity-50" />
                      {branch.city}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${branch.isOpen 
                        ? (selectedBranch?._id === branch._id ? "bg-white text-orange-600" : "bg-green-100 text-green-700")
                        : (selectedBranch?._id === branch._id ? "bg-black text-white" : "bg-red-100 text-red-700")
                      }
                    `}>
                      <div className={`h-2 w-2 rounded-full ${branch.isOpen ? 'bg-current animate-pulse' : 'bg-current'}`} />
                      {branch.isOpen ? "Live" : "Closed"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BRANCH USERS SECTION */}
      {selectedBranch && (
        <div className="bg-orange-950 rounded-[2.5rem] p-10 text-white shadow-2xl animate-in slide-in-from-bottom-6 duration-500">
          <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-600 p-3 rounded-2xl">
                <UsersIcon size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight italic">
                  Assigned <span className="text-orange-600">Personnel</span>
                </h2>
                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Deployment for {selectedBranch.name}</p>
              </div>
            </div>
            <span className="text-xs font-black bg-white/10 px-4 py-2 rounded-xl border border-white/5 tracking-[0.2em]">{branchUsers.length} STAFF MEMBERS</span>
          </div>

          {branchUsers.length === 0 ? (
            <div className="py-20 text-center opacity-30">
               <Globe size={48} className="mx-auto mb-4" />
               <p className="font-black uppercase tracking-widest text-xs">No users deployed to this sector</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="pb-4">Name</th>
                    <th className="pb-4">Contact</th>
                    <th className="pb-4 text-center">Status</th>
                    <th className="pb-4 text-right">Clearance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {branchUsers.map((user) => (
                    <tr key={user._id} className="group transition-colors">
                      <td className="py-5 font-black uppercase text-sm tracking-tight">{user.name}</td>
                      <td className="py-5">
                         <p className="text-xs text-orange-100 group-hover:text-orange-400 transition-colors font-bold">{user.email}</p>
                         <p className="text-[10px] text-gray-500 font-mono tracking-tighter mt-1">{user.number}</p>
                      </td>
                      <td className="py-5">
                        <div className="flex justify-center">
                          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ring-1
                            ${user.isActive ? "bg-green-500/10 text-green-400 ring-green-500/20" : "bg-red-500/10 text-red-400 ring-red-500/20"}
                          `}>
                            {user.isActive ? <CheckCircle2 size={10} /> : null}
                            {user.isActive ? "Active" : "Locked"}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 text-right">
                         <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-orange-500">
                           {user.role}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <CreateBranchModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateBranch}
        />
      )}
    </div>
  );
};

export default BranchPage;