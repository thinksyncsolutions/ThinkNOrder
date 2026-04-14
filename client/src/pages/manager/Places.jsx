import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import QRCodeStyling from "qr-code-styling";
import { Layers, Plus, Trash2, Download, Table as TableIcon } from "lucide-react";
import {
  getPlacesThunk,
  deletePlaceThunk,
  updatePlaceStatusThunk,
} from "../../redux/features/place/place.thunk";
import Loader from "../../components/common/Loader";

import CreatePlaceModal from "../../components/manager/CreatePlaceModal";
import PageHeader from "../../components/common/PageHeader";
import ConfirmModal from "../../components/common/ConfirmModal";

const qrurl = import.meta.env.VITE_QR_BASE_URL;

const Places = () => {
  const dispatch = useDispatch();
  const { places, loading, error } = useSelector((state) => state.place);
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getPlacesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Group places by floor for a cleaner UI
  const groupedPlaces = useMemo(() => {
    return places.reduce((acc, place) => {
      acc[place.floor] = acc[place.floor] || [];
      acc[place.floor].push(place);
      return acc;
    }, {});
  }, [places]);

  const handleDownloadQR = (place) => {
    const url = `${qrurl}/${place.placeCode}`;
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      margin: 10,
      dotsOptions: { color: "#1e293b", type: "rounded" },
      backgroundOptions: { color: "#ffffff" },
      cornersSquareOptions: { type: "extra-rounded", color: "#f54a00" },
    });

    qrCode.download({
      name: `${place.type}-${place.number}-QR`,
      extension: "png",
    });
  };

  const changeStatus = (id, status) => {
    dispatch(updatePlaceStatusThunk({ id, status }));
  };

  // Handlers
  const handleFinalDelete = () => {
    if (!deleteId) return;
    dispatch(deletePlaceThunk(deleteId));
    setDeleteId(null);
  };

  if (loading) return (
    <Loader message="Loading Floor Data..." />
  );

  return (
    <div className="space-y-10">
      {/* HEADER */}
      {/* SHARED HEADER */}
      <PageHeader 
        title="Sitting"
        highlight="Management"
        subtitle="Organize Tables & Floor Layouts"
        buttonText="Add New Place"
        buttonIcon={Plus}
        onButtonClick={() => setOpenModal(true)}
      />

      {/* RENDER BY FLOOR */}
{Object.keys(groupedPlaces).length === 0 ? (
  <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-orange-200 rounded-[3rem] bg-orange-50/30 animate-in fade-in zoom-in duration-500">
    <div className="h-24 w-24 bg-white text-orange-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-orange-950/5 border border-orange-100">
      <TableIcon size={40} strokeWidth={1.5} />
    </div>
    
    <div className="text-center space-y-2">
      <h3 className="text-2xl font-black text-black uppercase italic tracking-tight">
        Floor Map <span className="text-orange-600">Empty</span>
      </h3>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] max-w-xs mx-auto">
        You haven't configured any tables or seating areas yet.
      </p>
    </div>

    <button
      onClick={() => setOpenModal(true)}
      className="mt-10 flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-2xl shadow-orange-950/20 active:scale-95"
    >
      <Plus size={20} strokeWidth={3} />
      Initialize Floor Layout
    </button>
  </div>
) : (
        Object.keys(groupedPlaces).sort().map((floor) => (
          <section key={floor} className="space-y-4">
            {/* Floor Divider */}
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                <Layers size={20} />
              </div>
              <h2 className="text-xl font-black text-black uppercase italic tracking-tighter">
                {floor}
              </h2>
              <div className="h-[1px] flex-1 bg-gray-100" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {groupedPlaces[floor].length} Units
              </span>
            </div>

            {/* Tables for this Floor */}
            <div className="overflow-hidden border border-gray-100 rounded-[2rem] shadow-sm bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-50">
                    <th className="px-8 py-4">Unit Info</th>
                    <th className="px-8 py-4">Capacity</th>
                    <th className="px-8 py-4">Live Status</th>
                    <th className="px-8 py-4 text-right">Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {groupedPlaces[floor].map((place) => (
                    <tr key={place._id} className="hover:bg-orange-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-md shadow-orange-600/20">
                            {place.number}
                          </div>
                          <div>
                            <div className="font-black text-gray-900 uppercase text-xs">
                              {place.type}
                            </div>
                            <div className="text-[9px] font-bold text-gray-400 tracking-widest">
                              {place.placeCode}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-black text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {place.capacity} SEATS
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <select
                          value={place.status}
                          onChange={(e) => changeStatus(place._id, e.target.value)}
                          className={`text-[10px] font-black px-4 py-1.5 rounded-xl border-2 outline-none transition-all cursor-pointer ${
                            place.status === "AVAILABLE"
                              ? "bg-green-50 text-green-700 border-green-100"
                              : place.status === "OCCUPIED"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : "bg-yellow-50 text-yellow-700 border-yellow-100"
                          }`}
                        >
                          <option value="AVAILABLE">🟢 AVAILABLE</option>
                          <option value="OCCUPIED">🔴 OCCUPIED</option>
                          <option value="RESERVED">🟡 RESERVED</option>
                        </select>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-end items-center gap-3">
                          <button
                            onClick={() => handleDownloadQR(place)}
                            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm"
                          >
                            <Download size={14} /> Get QR
                          </button>
                          <button
                            onClick={() => setDeleteId(place._id)}
                            className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Table"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}

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

      {/* --- REUSABLE DELETE CONFIRMATION --- */}
      <ConfirmModal
        open={!!deleteId} // Open if deleteId has a value
        variant="danger"
        title="Remove this unit?"
        message="Deleting this table/room will remove it from the floor map permanently. This cannot be undone."
        confirmText="Delete Permanently"
        cancelText="Keep Unit"
        onConfirm={handleFinalDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Places;