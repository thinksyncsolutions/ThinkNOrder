import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-lg shadow text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Unauthorized</h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
