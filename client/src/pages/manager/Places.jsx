import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import QRCodeStyling from "qr-code-styling";
import { 
  Plus, 
  QrCode, 
  Trash2, 
  MapPin, 
  Users as UsersIcon, 
  ChevronDown,
  Download
} from "lucide-react";

import {
  getPlacesThunk,
  deletePlaceThunk,
  updatePlaceStatusThunk,
} from "../../redux/features/place/place.thunk";

import CreatePlaceModal from "../../components/manager/CreatePlaceModal";
const qrurl = import.meta.env.VITE_QR_BASE_URL;

const Places = () => {
  const dispatch = useDispatch();
  const { places, loading, error } = useSelector((state) => state.place);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getPlacesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleDownloadQR = (place) => {
    const url = `${qrurl}/${place.placeCode}`;
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      margin: 10,
      dotsOptions: {
        color: "#0c0a09", // Orange-950 (Near Black)
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#ea580c", // Orange-600
      },
      cornersDotOptions: {
        color: "#ea580c",
      }
    });

    qrCode.download({
      name: `ThinkNOrder-${place.type}-${place.number}`,
      extension: "png",
    });
  };

  const changeStatus = (id, status) => {
    dispatch(updatePlaceStatusThunk({ id, status }));
  };

  const deletePlace = (id) => {
    if (window.confirm("Permanent Action: Delete this Place?")) {
      dispatch(deletePlaceThunk(id));
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-black uppercase tracking-tight">
            Floor <span className="text-orange-600">Plan</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">
            Layout & QR Generation
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-orange-950/10"
        >
          <Plus size={18} strokeWidth={3} />
          Add New Place
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-50/50 border-b border-orange-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Identification</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Location</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950 text-center">Capacity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-orange-950 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {places.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center opacity-20">
                      <MapPin size={48} className="mb-2" />
                      <p className="font-black uppercase tracking-widest text-xs">No tables mapped yet</p>
                    </div>
                  </td>
                </tr>
              ) : (
                places.map((place) => (
                  <tr key={place._id} className="hover:bg-orange-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:bg-orange-600 transition-colors">
                          {place.number}
                        </div>
                        <div>
                          <p className="font-black text-black uppercase text-sm tracking-tight">{place.type}</p>
                          <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-tighter">ID: {place._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-600 italic">
                      {place.floor}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2 font-black text-orange-950">
                        <UsersIcon size={16} className="text-orange-400" />
                        {place.capacity} <span className="text-[10px] text-gray-400">PAX</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="relative inline-block w-40">
                        <select
                          value={place.status}
                          onChange={(e) => changeStatus(place._id, e.target.value)}
                          className={`appearance-none w-full text-[10px] font-black uppercase tracking-[0.15em] px-4 py-2.5 rounded-xl border-2 outline-none transition-all cursor-pointer ${
                            place.status === "AVAILABLE"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : place.status === "OCCUPIED"
                              ? "bg-orange-100 text-orange-700 border-orange-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          <option value="AVAILABLE">● Available</option>
                          <option value="OCCUPIED">● Occupied</option>
                          <option value="RESERVED">● Reserved</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end items-center gap-3">
                        <button
                          onClick={() => handleDownloadQR(place)}
                          className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all active:scale-95"
                        >
                          <QrCode size={16} />
                          Download
                        </button>
                        <button
                          onClick={() => deletePlace(place._id)}
                          className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                          title="Delete Place"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreatePlaceModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        types={["TABLE", "ROOM", "COUNTER", "DOME"]}
        floors={[
          "Ground Floor",
          "First Floor",
          "Second Floor",
          "Roof Top",
          "Outdoor Area",
        ]}
      />
    </div>
  );
};

export default Places;