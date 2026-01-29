import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Orders = () => {
  const [places, setPlaces] = useState([]);
  const [groupedPlaces, setGroupedPlaces] = useState({});
  const [runningTables, setRunningTables] = useState([]);
  const [, setTick] = useState(0); // for live timer re-render

  // 🔹 Fetch all places
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${baseURL}/place`, {
          withCredentials: true,
        });
        setPlaces(res.data);
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    };
    fetchPlaces();
  }, []);

  // 🔹 Fetch running tables
  useEffect(() => {
    const fetchRunningTables = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/place/running-tables`,
          { withCredentials: true }
        );
        setRunningTables(res.data);
      } catch (err) {
        console.error("Error fetching running tables:", err);
      }
    };
    fetchRunningTables();
  }, []);

  // 🔹 Group places by floor
  useEffect(() => {
    const grouped = places.reduce((acc, place) => {
      acc[place.floor] = acc[place.floor] || [];
      acc[place.floor].push(place);
      return acc;
    }, {});
    setGroupedPlaces(grouped);
  }, [places]);

  // 🔹 Running table lookup (placeId → startedAt)
  const runningTableMap = useMemo(() => {
    const map = {};
    runningTables.forEach((t) => {
      map[t.placeId] = t.startedAt;
    });
    return map;
  }, [runningTables]);

  // 🔹 Live timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Time formatter
  const getRunningTime = (startedAt) => {
    const start = new Date(startedAt);
    const now = new Date();
    const diff = now - start;

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="p-4 lg:p-6 bg-gray-50 h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Bill Management
      </h1>

      {Object.keys(groupedPlaces).length > 0 ? (
        Object.keys(groupedPlaces).map((floor) => (
          <div key={floor} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-1">
              {floor}
            </h2>

            <div className="flex flex-wrap gap-6">
              {groupedPlaces[floor].map((place) => {
                const isRunning = !!runningTableMap[place._id];

                return (
                  <Link
                    to={`/table/${place._id}`}
                    key={place._id}
                    className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 no-underline"
                  >
                    <div
                      className={`bg-white rounded-lg shadow-md p-5 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer border-2 ${
                        isRunning ? "border-red-400" : "border-green-300"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-blue-600 mb-1">
                        {place.type} {place.number}
                      </h3>

                      <p className="text-gray-600">
                        Capacity:{" "}
                        <span className="font-medium text-gray-800">
                          {place.capacity}
                        </span>
                      </p>

                      <p className="text-gray-600">
                        Status:
                        <span
                          className={`font-medium ml-1 ${
                            isRunning ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {isRunning ? "Running" : "Available"}
                        </span>
                      </p>

                      {isRunning && (
                        <p className="mt-2 text-sm font-semibold text-orange-600">
                          ⏱ {getRunningTime(runningTableMap[place._id])}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">
          Loading tables...
        </p>
      )}
    </div>
  );
};

export default Orders;
