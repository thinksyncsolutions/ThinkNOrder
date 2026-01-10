// components/Auth/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${baseURL}/auth/me`, {
          withCredentials: true, // Send cookies
        });
        setAuth(true);
      } catch (err) {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <div>Loading...</div>;
  if (!auth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
