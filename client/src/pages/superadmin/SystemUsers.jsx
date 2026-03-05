import React from "react";
import { 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Mail, 
  MoreVertical, 
  UserCog, 
  Globe,
  Trash2,
  Lock
} from "lucide-react";

const SystemUsers = () => {
  // Simulated System-Level Admins (Internal ThinkNOrder Team)
  const systemAdmins = [
    { id: 1, name: "Aman Sharma", email: "aman@thinknorder.io", role: "SuperAdmin", status: "Active", lastActive: "Just now" },
    { id: 2, name: "Sarah Jones", email: "sarah.j@thinknorder.io", role: "Support Lead", status: "Active", lastActive: "14m ago" },
    { id: 3, name: "Vikram Das", email: "vikram@thinknorder.io", role: "System Auditor", status: "Inactive", lastActive: "2 days ago" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            System <span className="text-orange-600">Personnel</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            ThinkNOrder Platform Governance Team
          </p>
        </div>
        <button
          className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/10"
        >
          <UserPlus size={18} strokeWidth={3} />
          Invite System Admin
        </button>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-4 rounded-3xl border border-orange-100 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search system registry..."
            className="w-full pl-12 pr-4 py-3 bg-orange-50/50 border-none rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-orange-600 transition-all"
          />
        </div>
        <div className="h-10 w-[2px] bg-orange-100 hidden md:block" />
        <div className="flex gap-2">
            <span className="bg-orange-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">All Roles</span>
            <span className="bg-orange-50 text-orange-900 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-orange-100 cursor-pointer">Support</span>
        </div>
      </div>

      {/* REGISTRY TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-950 text-white">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Access Rank</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">System Activity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 text-right">Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {systemAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-orange-50/30 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xs shadow-inner group-hover:bg-orange-600 group-hover:text-white transition-all">
                        {admin.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-black text-orange-950 uppercase text-sm tracking-tight leading-none">{admin.name}</p>
                        <div className="flex items-center gap-1.5 text-gray-400 mt-2">
                           <Mail size={12} />
                           <p className="text-[11px] font-bold tracking-tighter">{admin.email}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-orange-600" />
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-black bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">
                        {admin.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${admin.status === 'Active' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-gray-300'}`} />
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${admin.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                          {admin.status}
                        </p>
                        <p className="text-[10px] font-bold text-gray-300 mt-0.5 italic">Seen {admin.lastActive}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="p-3 bg-white border border-orange-100 rounded-xl text-gray-400 hover:text-orange-600 hover:border-orange-600 transition-all shadow-sm">
                          <UserCog size={16} />
                       </button>
                       <button className="p-3 bg-white border border-orange-100 rounded-xl text-gray-400 hover:text-red-600 hover:border-red-600 transition-all shadow-sm">
                          <Lock size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="flex items-center gap-4 px-4 py-2 bg-black text-white rounded-2xl w-fit">
         <Globe size={14} className="text-orange-500" />
         <p className="text-[9px] font-black uppercase tracking-[0.3em]">
           Platform Root Access Restricted to authorized IP Ranges
         </p>
      </div>
    </div>
  );
};

export default SystemUsers;