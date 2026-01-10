import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiPlus, FiTrash2, FiDownload, FiChevronDown, FiEdit } from "react-icons/fi";
import QRCode from "qrcode";

// The base URL for the API from environment variables
const baseurl = import.meta.env.VITE_API_BASE_URL;
const qrurl = import.meta.env.VITE_QR_BASE_URL;

// A modern, reusable status badge
const StatusBadge = ({ status }) => {
  const statusStyles = {
    available: "bg-emerald-100 text-emerald-800",
    occupied: "bg-amber-100 text-amber-800",
    reserved: "bg-cyan-100 text-cyan-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// An improved loading skeleton with a refined animation
const TableSkeleton = () => (
    <div className="animate-pulse p-6">
        <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-6"></div>
        {/* Card skeletons for mobile */}
        <div className="space-y-4 lg:hidden">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 bg-gray-100 rounded-lg space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
        {/* Table skeleton for desktop */}
        <div className="hidden lg:block space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-6 gap-4">
                    <div className="h-5 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-5 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-5 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-5 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-5 bg-gray-200 rounded col-span-1"></div>
                    <div className="h-5 bg-gray-200 rounded col-span-1"></div>
                </div>
            ))}
        </div>
    </div>
);


// A reusable and styled modal component for adding/editing tables
const AddTableModal = ({ isOpen, onClose, onSave, form, setForm }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Table</h2>
        <form onSubmit={onSave} className="grid grid-cols-2 gap-x-4 gap-y-5">
          {/* Form Input Fields */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Type
            </label>
            <input
              id="type"
              name="type"
              type="text"
              placeholder="e.g., Booth"
              value={form.type}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Number
            </label>
            <input
              id="number"
              name="number"
              type="text"
              placeholder="e.g., 12B"
              value={form.number}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="floor"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Floor
            </label>
            <input
              id="floor"
              name="floor"
              type="text"
              placeholder="e.g., Rooftop"
              value={form.floor}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Capacity
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              placeholder="e.g., 4"
              value={form.capacity}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-input"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          {/* Action Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <FiPlus /> Add Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PlaceManagement = () => {
  const [places, setPlaces] = useState([]);
  const [form, setForm] = useState({
    type: "Table",
    number: "",
    floor: "",
    capacity: "",
    status: "available",
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [restaurantId, setRestaurantId] = useState("");

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseurl}/place`, {
        withCredentials: true,
      });
      setPlaces(res.data);
    } catch (err) {
      console.error("Failed to load places:", err);
    } finally {
      setLoading(false);
    }
  };

  const addPlace = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseurl}/place`, form, { withCredentials: true });
      setIsModalOpen(false);
      fetchPlaces();
    } catch (err) {
      console.error("Failed to add place:", err);
    }
  };

  const deletePlace = async (placeId) => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      try {
        await axios.delete(`${baseurl}/place/${placeId}`, {
          withCredentials: true,
        });
        fetchPlaces();
      } catch (err) {
        console.error("Failed to delete place:", err);
      }
    }
  };

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin && admin.restaurantId) {
      setRestaurantId(admin.restaurantId);
    }
    fetchPlaces();
  }, []);

  const handleDownloadQR = async (place) => {
    try {
      const qrUrl = `${qrurl}/${restaurantId}/${place._id}/${place.floor}/${place.type}${place.number}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, {
        errorCorrectionLevel: "H",
        type: "image/png",
        quality: 0.9,
        margin: 1,
        color: {
          dark: "#282c34",
          light: "#ffffff",
        },
      });

      const link = document.createElement("a");
      link.href = qrDataUrl;
      link.download = `table-${place.number}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("QR download error:", error);
    }
  };

  const floors = useMemo(
    () => ["all", ...new Set(places.map((p) => p.floor).filter(Boolean))],
    [places]
  );
  const filteredPlaces = useMemo(() => {
    if (selectedFloor === "all") return places;
    return places.filter((place) => place.floor === selectedFloor);
  }, [places, selectedFloor]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Table Management
            </h1>
            <p className="text-gray-500 mt-1">
              View, add, and manage your restaurant's tables.
            </p>
          </div>
          <button
            onClick={() => {
              setForm({
                type: "Table", number: "", floor: "", capacity: "", status: "available",
              });
              setIsModalOpen(true);
            }}
            className="btn-primary bg-blue-600 mt-4 sm:mt-0"
          >
            <FiPlus /> Add Table
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-lg">
          {loading ? (
            <TableSkeleton />
          ) : (
            <>
              <div className="p-4 border-b border-gray-200">
                <div className="relative w-full sm:w-64">
                  <select
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                  >
                    <option value="all">All Floors</option>
                    {floors.slice(1).map((floor) => (
                      <option key={floor} value={floor}>
                        {floor}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Responsive Container: Table on Desktop, Cards on Mobile */}
              <div className="lg:hidden"> {/* Mobile Card View */}
                <div className="space-y-4 p-4">
                  {filteredPlaces.map((place) => (
                    <div key={place._id} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg text-gray-800">{place.type} {place.number}</p>
                          <p className="text-sm text-gray-500">{place.floor}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleDownloadQR(place)} className="text-indigo-600 hover:text-indigo-800">
                            <FiDownload size={20} />
                          </button>
                          <button onClick={() => deletePlace(place._id)} className="text-gray-400 hover:text-red-600">
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Capacity: <span className="font-semibold text-gray-800">{place.capacity}</span>
                        </div>
                        <StatusBadge status={place.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto hidden lg:block"> {/* Desktop Table View */}
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-600 uppercase bg-gray-100/70">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Type</th>
                      <th className="px-6 py-4 font-semibold">Number</th>
                      <th className="px-6 py-4 font-semibold">Floor</th>
                      <th className="px-6 py-4 font-semibold">Capacity</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Download QR</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlaces.length > 0 ? (
                      filteredPlaces.map((place) => (
                        <tr key={place._id} className="bg-white border-b border-gray-200 hover:bg-gray-50/50">
                          <td className="px-6 py-4 font-medium text-gray-900">{place.type}</td>
                          <td className="px-6 py-4 text-gray-600">{place.number}</td>
                          <td className="px-6 py-4 text-gray-600">{place.floor}</td>
                          <td className="px-6 py-4 text-gray-600">{place.capacity}</td>
                          <td className="px-6 py-4"><StatusBadge status={place.status} /></td>
                          <td className="px-6 py-4">
                            <button onClick={() => handleDownloadQR(place)} className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800" title="Download QR">
                              <FiDownload size={18} /> QR
                            </button>
                          </td>
                          <td className="px-6 py-4 flex justify-end gap-3">
                            <button onClick={() => deletePlace(place._id)} className="text-gray-400 hover:text-red-600">
                              <FiTrash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-16 text-gray-500">
                          <p className="font-semibold">No tables found.</p>
                          <p className="text-sm mt-1">
                            Try a different filter or add a new table.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Table Modal */}
      <AddTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addPlace}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default PlaceManagement;