import { useState } from "react";
import { Plus } from "lucide-react";
import {CreateBranchModal} from "../../components/owner/CreateBranchModal";

const mockBranches = [
  {
    _id: "1",
    branchCode: "THINKNORDER-BR1",
    name: "Think N Order – Main Branch",
    city: "Bangalore",
    address: "MG Road, Bangalore",
    isOpen: true,
  },
  {
    _id: "2",
    branchCode: "THINKNORDER-BR2",
    name: "Think N Order – Indiranagar",
    city: "Bangalore",
    address: "Indiranagar 100ft Road",
    isOpen: false,
  },
];

const mockUsers = [
  {
    _id: "u1",
    name: "Rohit Sharma",
    email: "rohit@thinknorder.com",
    number: "857543210",
    role: "MANAGER",
    accessibleBranches: ["1"],
  },
  {
    _id: "u2",
    name: "Amit Verma",
    email: "amit@thinknorder.com",
    number: "857543211",
    role: "CASHIER",
    accessibleBranches: ["1"],
  },
  {
    _id: "u3",
    name: "Neha Singh",
    email: "neha@thinknorder.com",
    number: "857543212",
    role: "WAITER",
    accessibleBranches: ["2"],
  },
  {
    _id: "u4",
    name: "Karan Patel",
    email: "karan@thinknorder.com",
    number: "857543213",
    role: "KITCHEN",
    accessibleBranches: ["2"],
  },
];

const BranchPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const branchUsers = selectedBranch
    ? mockUsers.filter((u) =>
        u.accessibleBranches.includes(selectedBranch._id)
      )
    : [];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Branches</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded"
        >
          <Plus size={16} /> Create Branch
        </button>
      </div>

      {/* Branch List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Branch Code</th>
              <th className="p-3">Name</th>
              <th className="p-3">City</th>
              <th className="p-3">Address</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockBranches.map((branch) => (
              <tr
                key={branch._id}
                onClick={() => setSelectedBranch(branch)}
                className={`border-t cursor-pointer hover:bg-slate-50 ${
                  selectedBranch?._id === branch._id
                    ? "bg-slate-50"
                    : ""
                }`}
              >
                <td className="p-3 font-medium">{branch.branchCode}</td>
                <td className="p-3">{branch.name}</td>
                <td className="p-3">{branch.city}</td>
                <td className="p-3">{branch.address}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      branch.isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {branch.isOpen ? "Open" : "Closed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Users of Selected Branch */}
      {selectedBranch && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            Users – {selectedBranch.name}
          </h2>

          {branchUsers.length === 0 ? (
            <p className="text-sm text-gray-500">
              No users assigned to this branch.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Number</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {branchUsers.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.number}</td>
                    <td className="p-2 font-medium">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Create Branch Modal */}
      {showModal && (
        <CreateBranchModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BranchPage;
