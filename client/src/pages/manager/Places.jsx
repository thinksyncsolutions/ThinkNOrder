import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import QRCodeStyling from "qr-code-styling";

import {
  getPlacesThunk,
  deletePlaceThunk,
  updatePlaceStatusThunk,
} from "../../redux/features/place/place.thunk";

import CreatePlaceModal from "../../components/manager/CreatePlaceModal";
const qrurl = import.meta.env.VITE_QR_BASE_URL;

const Places = () => {
  const dispatch = useDispatch();
  const { restaurantId, branchId } = useSelector((state) => state.auth.user);
  const { places, loading, error } = useSelector((state) => state.place);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getPlacesThunk());
  }, [dispatch]);

  console.log("User:", { restaurantId, branchId });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // ✅ FIXED: Proper QR download logic without UI rendering
  const handleDownloadQR = (place) => {
    const url = `${qrurl}/${place.placeCode}`; // Adjust as needed
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      margin: 10,
      dotsOptions: {
        color: "#1e293b",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#f54a00",
      },
    });

    qrCode.download({
      name: `${place.type}-${place.number}-QR`,
      extension: "png",
    });
  };

  const changeStatus = (id, status) => {
    dispatch(updatePlaceStatusThunk({ id, status }));
  };

  const deletePlace = (id) => {
    if (window.confirm("Are you sure you want to delete this Place?")) {
      dispatch(deletePlaceThunk(id));
    }
  };

  if (loading)
    return <div className="p-8 text-gray-500 italic">Loading places...</div>;

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Place Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your restaurant layout and export QR codes.
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm"
        >
          + Add New Place
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold"> Info</th>
              <th className="px-6 py-4 font-semibold">Floor</th>
              <th className="px-6 py-4 font-semibold">Capacity</th>
              <th className="px-6 py-4 font-semibold">Current Status</th>
              <th className="px-6 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {places.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-gray-400"
                >
                  No places found in the database.
                </td>
              </tr>
            ) : (
              places.map((place) => (
                <tr
                  key={place._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">
                      {place.type} {place.number}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {place._id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {place.floor}
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {place.capacity} Pax
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={place.status}
                      onChange={(e) =>
                        changeStatus(place._id, e.target.value)
                      }
                      className={`text-xs font-bold px-3 py-1 rounded-full border outline-none ${
                        place.status === "AVAILABLE"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : place.status === "OCCUPIED"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="OCCUPIED">Occupied</option>
                      <option value="RESERVED">Reserved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() =>
                          handleDownloadQR(place)
                        }
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-semibold flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Get QR
                      </button>
                      <button
                        onClick={() => deletePlace(place._id)}
                        className="text-red-400 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <CreatePlaceModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        types={["TABLE", "ROOM", "COUNTER", "DOME"]}
        floors={[
          "Ground Floor",
          "First Floor",
          "Second Floor",
          "Third Floor",
          "Fourth Floor",
          "Fifth Floor",
        ]}
      />
    </div>
  );
};

export default Places;