import React from "react";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";

const ManagerDashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "1,245",
      icon: <ShoppingCart size={22} />,
    },
    {
      title: "Revenue",
      value: "₹2,45,000",
      icon: <DollarSign size={22} />,
    },
    {
      title: "Customers",
      value: "860",
      icon: <Users size={22} />,
    },
    {
      title: "Products",
      value: "120",
      icon: <Package size={22} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manager Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Overview of branch performance</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-xl font-semibold text-gray-800 mt-1">
                  {item.value}
                </h2>
              </div>

              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
            Manage Orders
          </button>

          <button className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
            Manage Inventory
          </button>

          <button className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
