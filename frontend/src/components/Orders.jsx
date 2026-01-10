import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Orders = () => {
    const [places, setPlaces] = useState([]);
    const [groupedPlaces, setGroupedPlaces] = useState({});

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get(`${baseURL}/place`, { withCredentials: true });
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };
        fetchPlaces();
        
    }, []);


    useEffect(() => {
        const groupDataByFloor = (data) => {
            return data.reduce((acc, place) => {
                const floor = place.floor;
                if (!acc[floor]) {
                    acc[floor] = [];
                }
                acc[floor].push(place);
                return acc;
            }, {});
        };
        setGroupedPlaces(groupDataByFloor(places));
    }, [places]);

    return (
        <div className="p-4 md:p-4 lg:p-6 bg-gray-50 h-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">Bill Management</h1>
            {Object.keys(groupedPlaces).length > 0 ? (
                Object.keys(groupedPlaces).map((floor) => (
                    <div key={floor} className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-1">{floor}</h2>
                        <div className="flex flex-wrap gap-6">
                            {groupedPlaces[floor].map((place) => (
                                <Link to={`/table/${place._id}`} key={place._id} className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 no-underline">
                                    <div className="bg-white rounded-lg shadow-md p-5 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
                                        <h3 className="text-xl font-bold text-blue-600 mb-1">{place.type} {place.number}</h3>
                                        <p className="text-gray-600">Capacity: <span className="font-medium text-gray-800">{place.capacity}</span></p>
                                        <p className="text-gray-600">Status: <span className="font-medium text-green-600">{place.status}</span></p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 text-lg">Loading tables...</p>
            )}
        </div>
    );
};

export default Orders;