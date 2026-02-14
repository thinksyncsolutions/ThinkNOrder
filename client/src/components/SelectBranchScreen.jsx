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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Select Your Branch
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Please choose the branch you want to continue with
        </p>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading branches...</p>
        )}

        {/* No branches */}
        {!loading && branches.length === 0 && (
          <p className="text-center text-red-500">No branches available</p>
        )}

        {/* Branch grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {branches.map((b) => (
            <button
              key={b}
              onClick={() => selectBranch(b)}
              className="p-5 border rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-lg font-medium"
            >
              {b}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SelectBranchScreen;
