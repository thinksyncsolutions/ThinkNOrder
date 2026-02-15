import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBranchThunk } from "../redux/features/auth/auth.thunk";

const SelectBranchScreen = () => {
  const dispatch = useDispatch();
  const { branches, loading } = useSelector((state) => state.auth);

  const selectBranch = (branchId) => {
    dispatch(selectBranchThunk(branchId));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Select Your Branch
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Choose the branch you want to continue with
        </p>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 animate-pulse">
            Loading branches...
          </p>
        )}

        {/* No branches */}
        {!loading && branches.length === 0 && (
          <p className="text-center text-red-500 font-medium">
            No branches available
          </p>
        )}

        {/* Branch grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {branches.map((b) => (
            <button
              key={b._id}
              onClick={() => selectBranch(b._id)}
              className="group p-6 border rounded-2xl bg-gray-50 hover:bg-blue-50 hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                  {b.name}
                </h3>

                <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition">
                  →
                </span>
              </div>

              <p className="text-sm text-gray-400 mt-1">
                Click to continue
              </p>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SelectBranchScreen;
