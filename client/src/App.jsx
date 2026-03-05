import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { Toaster } from "react-hot-toast";
// import Login from "./pages/auth/Login";
// import RegisterOwner from "./pages/auth/RegisterOwner";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: '#0c0a09', // Orange-950 (Black)
      color: '#fff',
      borderRadius: '1.5rem',
      padding: '16px 24px',
      fontSize: '12px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      border: '1px solid rgba(234, 88, 12, 0.2)', // Subtle Orange-600 border
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    },
    success: {
      iconTheme: {
        primary: '#ea580c', // Orange-600
        secondary: '#fff',
      },
    },
    error: {
      style: {
        border: '1px solid #ef4444', // Red-500 for errors
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  }}
/>
    </>
   );
}

export default App;
