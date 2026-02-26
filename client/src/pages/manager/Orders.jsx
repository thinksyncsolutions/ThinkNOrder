import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPlacesThunk,
  getRunningTablesThunk,
} from "../../redux/features/place/place.thunk";

const Orders = () => {
  const dispatch = useDispatch();

  const {
    places,
    runningTables,
    loadingPlaces,
    loadingRunningTables,
  } = useSelector((state) => state.place);

  const [, setTick] = useState(0);

  /* Fetch data */
  useEffect(() => {
    dispatch(getPlacesThunk());
    dispatch(getRunningTablesThunk());
  }, [dispatch]);

  /* Group places by floor */
  const groupedPlaces = useMemo(() => {
    return places.reduce((acc, place) => {
      acc[place.floor] = acc[place.floor] || [];
      acc[place.floor].push(place);
      return acc;
    }, {});
  }, [places]);

  /* Running table lookup */
  const runningTableMap = useMemo(() => {
    const map = {};
    runningTables.forEach((t) => {
      map[t.placeId] = t.startedAt;
    });
    return map;
  }, [runningTables]);

  /* Live timer */
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRunningTime = (startedAt) => {
    const diff = new Date() - new Date(startedAt);

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loadingPlaces || loadingRunningTables) {
    return <p className="text-center mt-10">Loading tables...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Bill Management</h1>

      {Object.keys(groupedPlaces).map((floor) => (
        <div key={floor} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{floor}</h2>

          <div className="flex flex-wrap gap-6">
            {groupedPlaces[floor].map((place) => {
              const isRunning = !!runningTableMap[place._id];

              return (
                <Link
                  to={`/manager/table/${place._id}`}
                  key={place._id}
                  className="w-64"
                >
                  <div
                    className={`bg-white p-5 rounded shadow hover:scale-105 transition ${
                      isRunning
                        ? "border-2 border-red-400"
                        : "border-2 border-green-400"
                    }`}
                  >
                    <h3 className="text-lg font-bold">
                      {place.type} {place.number}
                    </h3>

                    <p>Capacity: {place.capacity}</p>

                    <p
                      className={`font-semibold ${
                        isRunning ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {isRunning ? "Running" : "Available"}
                    </p>

                    {isRunning && (
                      <p className="text-sm mt-2 text-orange-600">
                        ⏱ {getRunningTime(runningTableMap[place._id])}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;