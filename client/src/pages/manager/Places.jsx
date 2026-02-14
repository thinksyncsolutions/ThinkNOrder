import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
  getPlacesThunk,
  deletePlaceThunk,
  updatePlaceStatusThunk,
} from "../../redux/features/place/place.thunk";

import CreatePlaceModal from "../../components/manager/CreatePlaceModal";

const Places = () => {
  const dispatch = useDispatch();
  const { places, loading, error } = useSelector((state) => state.place);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getPlacesThunk());
  }, [dispatch]);

  useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);

  const changeStatus = (id, status) => {
    dispatch(updatePlaceStatusThunk({ id, status }));
  };

  const deleteTable = (id) => {
    if (window.confirm("Delete table?")) {
      dispatch(deletePlaceThunk(id));
    }
  };

  const getStatusColor = (status) => {
    if (status === "AVAILABLE") return "bg-green-100 border-green-400";
    if (status === "OCCUPIED") return "bg-red-100 border-red-400";
    return "bg-yellow-100 border-yellow-400";
  };

  if (loading) return <p className="p-6">Loading tables...</p>;

  return (
    <div className="p-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tables</h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Table
        </button>
      </div>

      {/* ================= GRID ================= */}
      {places.length === 0 ? (
        <p>No tables found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {places.map((table) => (
            <div
              key={table._id}
              className={`border rounded-xl p-4 shadow-sm ${getStatusColor(table.status)}`}
            >
              <h3 className="font-semibold text-lg mb-1">
                 {table.type} {table.number}
              </h3>

              <p className="text-sm">Floor: {table.floor}</p>
              <p className="text-sm">Capacity: {table.capacity}</p>
              <p className="text-sm font-medium mt-1">
                Status: {table.status}
              </p>

              {/* STATUS BUTTONS */}
              <div className="flex gap-2 mt-3 flex-wrap">
                <button
                  onClick={() => changeStatus(table._id, "AVAILABLE")}
                  className="text-xs px-2 py-1 rounded bg-green-600 text-white"
                >
                  Available
                </button>

                <button
                  onClick={() => changeStatus(table._id, "OCCUPIED")}
                  className="text-xs px-2 py-1 rounded bg-red-600 text-white"
                >
                  Occupied
                </button>

                <button
                  onClick={() => changeStatus(table._id, "RESERVED")}
                  className="text-xs px-2 py-1 rounded bg-yellow-600 text-white"
                >
                  Reserved
                </button>
              </div>

              <button
                onClick={() => deleteTable(table._id)}
                className="mt-3 text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      <CreatePlaceModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  types={["TABLE", "ROOM", "COUNTER", "DOME"]}
  floors={["Ground Floor", "First Floor", "Second Floor", "Third Floor", "Fourth Floor", "Fifth Floor"]}
/>
    </div>
  );
};

export default Places;
