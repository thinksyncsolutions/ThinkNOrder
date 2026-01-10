import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Layout and Protected Route Component
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Import Page Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MenuManager from './components/MenuManager';
import Orders from './components/Orders';
import UserPage from './components/UserPage';
import KitchenOrders from './components/KitechenOrders';
import Test from './components/Test';
import PlaceManagement from './components/PlaceManagement';
import AdminTableManagement from './components/AdminTableManagement';

function App() {
  return (
      <div className="App">
        <Routes>
          {/* Public Routes - These do not have the admin header */}
          <Route path="/:restaurantId/:placeId/:floor/:table" element={<UserPage />} />
          <Route path="/test" element={<Test />} />

          {/* Admin Auth Routes - These do not have the admin header */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Admin Routes with Shared Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Default route inside the layout redirects to dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Child routes that will render inside AdminLayout's <Outlet /> */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="orders" element={<Orders />} />
            <Route path="kitchen" element={<KitchenOrders />} />
            <Route path="tables" element={<PlaceManagement />} />
            <Route path="table/:tableId" element={<AdminTableManagement />} />
          </Route>

          {/* Fallback redirect for any other paths */}
           <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </div>
  );
}

export default App;

